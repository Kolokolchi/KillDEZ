import { notFound } from "next/navigation";
import { pages } from "../../../content/pages";
import seo from "../../../content/seo.json";
import routes from "../../../content/routes.json";
import routing from "../../../lib/public-routes.cjs";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import SiteInteractions from "../../../components/SiteInteractions";
import Analytics from "../../../components/Analytics";

// Known URLs are prerendered; unknown URLs go through the explicit notFound guard.
export const dynamicParams = true;

export function generateStaticParams() {
  return routes.map((route) => ({
    slug: routing.publicPath(route).split("/").filter(Boolean),
  }));
}

async function resolvePage(params) {
  const { slug = [] } = await params;
  const path = '/' + slug.join("/");
  const route = routing.contentRoutes[path] || routing.contentRoutes[path + '/'];
  if (!Object.hasOwn(pages, route)) notFound();
  return { route, Content: pages[route], ...seo[route] };
}

export async function generateMetadata({ params }) {
  return (await resolvePage(params)).metadata;
}

export default async function Page({ params }) {
  const { route, Content, schema } = await resolvePage(params);
  const home = route === "index.html";
  const prefix = route === 'objects.html' ? '/' : route.includes("/") ? "../" : "";
  return (
    <>
      {schema.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <SiteHeader home={home} prefix={prefix} />
      <Content />
      <SiteFooter home={home} prefix={prefix} />
      <SiteInteractions />
      <Analytics />
    </>
  );
}
