import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18496121436"
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-18184183102');
      gtag('config', 'AW-18496121436');
    `}</Script>
    </>
  );
}
