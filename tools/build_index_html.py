import re

with open('original_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the huge <style>...</style> block and replace with <link rel="stylesheet" href="css/style.css">
# First find the <style>...</style>
style_pattern = r'<style>[\s\S]*?</style>'
assert re.search(style_pattern, html), "Style tag not found!"
html = re.sub(style_pattern, '<link rel="stylesheet" href="css/style.css">', html, count=1)

# 2. Remove the bottom <script>...</script> (the main application script) and replace with <script src="js/main.js"></script>
# It's at the end of the body
main_script_pattern = r'<script>\s*/\* ===== i18n DICTIONARY ===== \*/[\s\S]*?</script>'
assert re.search(main_script_pattern, html), "Main script tag not found!"
html = re.sub(main_script_pattern, '<script src="js/main.js"></script>', html, count=1)

# 3. Replace all `/images/` with `images/`
html = html.replace('href="/images/', 'href="images/')
html = html.replace('src="/images/', 'src="images/')
html = html.replace('content="/images/', 'content="images/')
html = html.replace('"https://sanitex.kz/images/', '"images/')

# 4. Add favicon.ico in addition to favicon.png
if '<link rel="icon" type="image/png" href="images/favicon.png">' in html:
    html = html.replace(
        '<link rel="icon" type="image/png" href="images/favicon.png">',
        '<link rel="icon" type="image/png" href="images/favicon.png">\n  <link rel="shortcut icon" href="favicon.ico">'
    )

# 5. Comment or preserve Google tag with clear comment
gtag_block = """  <!-- Google tag (gtag.js) - Replace ID with your own Google Analytics / Ads ID -->
  <!--
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18184183102"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-18184183102');
  </script>
  -->"""

html = re.sub(r'<!-- Google tag \(gtag\.js\) -->[\s\S]*?gtag\(\'config\', \'AW-18184183102\'\);\s*</script>', gtag_block, html, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated clean index.html successfully!")
print(f"Total size: {len(html)} chars")
