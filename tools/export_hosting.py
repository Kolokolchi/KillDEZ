"""Build the public Next.js site for Apache/Plesk, preserving clean URLs."""
from datetime import datetime
from pathlib import Path
import hashlib
import json
import re
import shutil
import subprocess
import zipfile
from audit_hosting import audit

ROOT = Path(__file__).resolve().parents[1]


def main():
    output = ROOT / "artifacts" / ("publication-" + datetime.now().strftime("%Y%m%d-%H%M%S"))
    stage, hosting = output / "build", output / "httpdocs"
    stage.mkdir(parents=True)
    for name in ("components", "content", "lib", "css"):
        shutil.copytree(ROOT / name, stage / name)
    shutil.copytree(ROOT / "app/(site)", stage / "app/(site)")
    for file in (ROOT / "app").iterdir():
        if file.is_file():
            shutil.copy2(file, stage / "app" / file.name)
    for name in ("package.json", "package-lock.json"):
        shutil.copy2(ROOT / name, stage / name)
    public = stage / "public"
    public.mkdir()
    for name in ("css", "images"):
        shutil.copytree(ROOT / name, public / name, ignore=shutil.ignore_patterns("*.md", "*.json"))
    for name in ("favicon.ico", "favicon.png", "apple-touch-icon.png", "robots.txt", "sitemap.xml"):
        shutil.copy2(ROOT / name, public / name)
    (stage / "next.config.mjs").write_text(
        "export default { output: 'export', poweredByHeader: false, agentRules: false, images: { unoptimized: true } };\n"
    )
    page = stage / "app/(site)/[[...slug]]/page.jsx"
    source = page.read_text(encoding="utf-8")
    assert "dynamicParams = true" in source, "Review export configuration after route changes"
    page.write_text(source.replace("dynamicParams = true", "dynamicParams = false"), encoding="utf-8")
    subprocess.run(["node", str(ROOT / "node_modules/next/dist/bin/next"), "build", str(stage), "--webpack"], cwd=ROOT, check=True)

    routes = json.loads((ROOT / "content/routes.json").read_text(encoding="utf-8"))
    shutil.copytree(public, hosting)
    shutil.copytree(stage / "out/_next", hosting / "_next")
    for route in routes:
        assert re.fullmatch(r"(?:[a-z0-9-]+/)*[a-z0-9-]+\.html", route), route
        target = hosting / ('objects/index.html' if route == 'objects.html' else route)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(stage / "out" / route, target)
    shutil.copy2(stage / "out/404.html", hosting / "404.html")

    rules = ["Options -MultiViews", "DirectoryIndex index.html", "ErrorDocument 404 /404.html", "RewriteEngine On"]
    # THE_REQUEST only matches the browser's URL, never an internal clean-URL rewrite.
    for route in routes:
        clean = "/" if route == "index.html" else "/objects/" if route == "objects.html" else "/" + route[:-5]
        escaped = re.escape(route)
        rules += [f"RewriteCond %{{THE_REQUEST}} \\s/+{escaped}(?:[?\\s]) [NC]", f"RewriteRule ^{escaped}$ {clean} [R=308,L,NE]"]
    for route in routes:
        if route == "objects.html":
            # nginx adds a slash for this physical directory before Apache runs.
            # Serve a real index there; never redirect it back to /objects.
            rules += ["RewriteRule ^objects$ /objects/ [R=308,L,NE]"]
        elif route != "index.html":
            clean = re.escape(route[:-5])
            rules += [f"RewriteRule ^{clean}/$ /{route[:-5]} [R=308,L,NE]", f"RewriteRule ^{clean}$ {route} [END]"]
    (hosting / ".htaccess").write_text("\n".join(rules) + "\n")
    errors = audit(hosting, routes)
    if errors:
        raise RuntimeError('Hosting link audit failed:\n' + '\n'.join(errors))
    archive = output / "killdez.kz-hosting.zip"
    files = sorted(p for p in hosting.rglob("*") if p.is_file())
    published_at = datetime.now().timetuple()[:6]
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for file in files:
            info = zipfile.ZipInfo(file.relative_to(hosting).as_posix(), date_time=published_at)
            info.external_attr = 0o100644 << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            zip_file.writestr(info, file.read_bytes())
    with zipfile.ZipFile(archive) as zip_file:
        assert zip_file.testzip() is None
    manifest = {"archive": str(archive), "pages": len(routes), "files": len(files), "sha256": hashlib.sha256(archive.read_bytes()).hexdigest()}
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
