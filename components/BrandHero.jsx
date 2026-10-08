import HeroPagination from "./HeroPagination";
import heroStyles from "./HeroPagination.module.css";
import brandCopy from "../content/brand-translations.json";

const slides = [
  {
    eyebrow: "KILL DEZ · АЛМАТЫ",
    title: <>Дезинфекция и борьба <br />с вредителями</>,
    description: "Клопы, тараканы, грызуны или плесень? Уточним, что нужно обработать, согласуем стоимость и подготовку до выезда.",
    cta: "Узнать стоимость обработки ↗",
    href: "#contacts",
    picture: "/images/hero-business.jpg",
    alt: "Светлый современный интерьер с видом на горы Алматы",
  },
  {
    eyebrow: "РЕШЕНИЯ ДЛЯ БИЗНЕСА",
    title: <>Санитарная обработка <br />для вашего бизнеса</>,
    description: "Кафе, гостиница, магазин или склад. Согласуем зоны обработки, доступ в помещения и время возвращения сотрудников.",
    cta: "Подобрать обработку для бизнеса ↗",
    href: "/objects/",
    picture: "/images/hero-restaurant.jpg",
    alt: "Современный ресторан с чистым и светлым залом",
  },
  {
    eyebrow: "ДОМА И ПРИЛЕГАЮЩИЕ ТЕРРИТОРИИ",
    title: <>Защита дома начинается <br />с очага проблемы</>,
    description: "Насекомые в комнатах, грызуны в подвале, клещи на участке — разные задачи. Выберем обработку для нужной зоны.",
    cta: "Посмотреть обработку дома ↗",
    href: "/objects/houses",
    picture: "/images/hero-garden.jpg",
    alt: "Ухоженная зелёная территория частного дома",
  },
];

export default function BrandHero() {
  return (
    <section className="visual-hero brand-hero" aria-roledescription="карусель" aria-label="Решения KILL DEZ">
      <div className="hero-slides">
        {slides.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2";
          return (
            <article key={slide.href} className={`hero-slide ${heroStyles.frame}`} data-slide="" aria-label={`${index + 1} из 3`} hidden={index !== 0}>
              <div className="wrap slide-content">
                <div className="hero-copy">
                  <span className="slide-eyebrow" data-i18n={`slide.${index + 1}.eyebrow`}>{slide.eyebrow}</span>
                  <div className="brand-manifesto" data-i18n={`brand.hero.${index + 1}`} dangerouslySetInnerHTML={{ __html: brandCopy.ru[`brand.hero.${index + 1}`] }} />
                  <Heading data-i18n={`slide.${index + 1}.title`}>{slide.title}</Heading>
                  <p data-i18n={`slide.${index + 1}.desc`}>{slide.description}</p>
                  <a className="btn btn-green" href={slide.href} data-action={index === 0 ? "order" : undefined} data-i18n={`slide.${index + 1}.cta`}>{slide.cta}</a>
                </div>
                <div className={`hero-art ${index === 0 ? "hero-art--mark" : "hero-art--photo"}`}>
                  <img className="slide-image" src={slide.picture} alt={slide.alt} width="1672" height="941" loading={index ? "lazy" : "eager"} />
                  <img className="hero-skullbug" src="/images/brand/skullbug.webp" width="1254" height="1254" alt="" aria-hidden="true" fetchPriority={index === 0 ? "high" : "auto"} />
                  <span className="hero-sticker" aria-hidden="true">NO BUGS.<br />NO B.S.</span>
                  <span className="hero-art-caption" data-i18n="brand.art.caption">{brandCopy.ru["brand.art.caption"]}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <HeroPagination />
    </section>
  );
}
