import copy from "../guide-translations.json";

const Text = ({ id, as: Tag = "p", ...props }) => <Tag data-i18n={id} {...props}>{copy.ru[id]}</Tag>;

export default function Instructions() {
  return (
    <main id="main-content" className="treatment-guide">
      <link rel="stylesheet" href="/css/treatment-guide.css" />
      <nav className="catalog-breadcrumbs wrap" aria-label="Хлебные крошки">
        <Text as="a" href="/" id="guide.home" /><span>/</span><Text as="span" aria-current="page" id="guide.label" />
      </nav>
      <section className="detail-hero">
        <div className="wrap">
          <Text as="span" className="s-eyebrow" id="guide.label" />
          <Text as="h1" id="guide.title" />
          <Text className="detail-lead" id="guide.lead" />
          <div className="detail-actions">
            <Text as="a" className="btn btn-green" href="#before-treatment" id="guide.before.link" />
            <Text as="a" className="detail-phone" href="#after-treatment" id="guide.after.link" />
          </div>
        </div>
      </section>
      <div className="wrap">
        <aside className="guide-notice">
          <Text as="h2" id="guide.warning.title" /><Text id="guide.warning.text" />
        </aside>
      </div>
      {[['before', 6, 'before-treatment'], ['after', 5, 'after-treatment']].map(([phase, count, anchor]) => (
        <section className="guide-section" id={anchor} key={phase}>
          <div className="wrap">
            <div className="guide-heading">
              <div><span className="s-eyebrow">{phase === 'before' ? '01' : '02'}</span><Text as="h2" id={`guide.${phase}.title`} /></div>
              <figure>
                <img src={`/images/brand/guide-${phase}.svg`} width="720" height="360" alt="" loading="lazy" />
                <Text as="figcaption" id={`guide.${phase}.caption`} />
              </figure>
            </div>
            <ol className="guide-steps">
              {Array.from({ length: count }, (_, i) => (
                <li key={i}>
                  <span className="guide-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div><Text as="h3" id={`guide.${phase}.${i + 1}.title`} /><Text id={`guide.${phase}.${i + 1}.text`} /></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}
      <section className="guide-section">
        <div className="wrap">
          <aside className="guide-notice"><Text as="h2" id="guide.check.title" /><Text id="guide.check.text" /></aside>
          <aside className="guide-help"><Text as="h2" id="guide.help.title" /><Text id="guide.help.text" /></aside>
          <Text className="guide-sources" id="guide.sources" />
          <p className="guide-sources"><a href="https://npic.orst.edu/factsheets/MinimizingExposure.html">NPIC: exposure</a> · <a href="https://npic.orst.edu/factsheets/petspest.html">NPIC: pets</a> · <a href="https://npic.orst.edu/factsheets/cleanup.html">NPIC: cleanup</a> · <a href="https://www.cdc.gov/hygiene/about/cleaning-and-disinfecting-with-bleach.html">CDC</a></p>
          <Text as="a" className="btn btn-green" href="tel:+77076203813" id="guide.call" />
        </div>
      </section>
    </main>
  );
}
