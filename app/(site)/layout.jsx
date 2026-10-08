import "../../css/rebrand.css";
import "../../css/graffiti.css";

export const metadata = {
  icons: {
    icon: "/images/brand/favicon.svg",
    shortcut: "/images/brand/favicon.svg",
    apple: "/images/brand/apple-touch-icon.png",
  },
};

export default function PublicLayout({ children }) {
  return (
    <>
      <link rel="preload" href="/images/brand/Oswald-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/theme.css" />
      <div className="rebrand">{children}</div>
    </>
  );
}
