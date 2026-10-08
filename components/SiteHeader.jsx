export default function SiteHeader({ home = false, prefix = "" }) {
  const link = (value) =>
    value.startsWith("#")
      ? home
        ? value
        : "/" + value
      : value.startsWith("/") ? value : prefix + value;
  return (
    <>
      <a href="#main-content" className={"skip-link"}>
        {"К содержимому"}
      </a>
      <header>
        {"\n  "}
        <div className={"wrap hrow"}>
          {"\n    "}
          <a
            href={link("/")}
            className={"brand"}
            aria-label={"KILL DEZ"}
          >
            {"\n      "}
            <img
              className={"brand-logo"}
              src={link("/images/brand/wordmark.webp")}
              alt={"KILL DEZ"}
              width={"2056"}
              height={"765"}
            />
            {"\n    "}
          </a>
          {"\n\n    "}
          <nav className={"nav"} aria-label={"Главная навигация"}>
            {"\n      "}
            <a href={link("#services")} data-i18n={"nav.services"}>
              {"Услуги"}
            </a>
            {"\n\n      "}
            <a href={link("/objects/")} data-i18n={"nav.objects"}>
              {"Объекты"}
            </a>
            {"\n\n\n      "}
            <a href={link("#faq")} data-i18n={"nav.faq"}>
              {"FAQ"}
            </a>
            {"\n      "}
            <a href={link("#contacts")} data-i18n={"nav.contacts"}>
              {"Контакты"}
            </a>
            {"\n    "}
          </nav>
          {"\n\n    "}
          <div className={"h-actions"}>
            {"\n      "}
            <div className={"lang-switch"} role={"group"} aria-label={"Язык"}>
              {"\n        "}
              <button data-lang={"ru"} className={"active"}>
                {"RU"}
              </button>
              {"\n        "}
              <button data-lang={"kz"}>{"KZ"}</button>
              {"\n      "}
            </div>
            {"\n      "}
            <a href={"tel:+77076203813"} className={"phone-btn"}>
              {"\n        "}
              <svg
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2.2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path
                  d={
                    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                  }
                ></path>
              </svg>
              {"\n        "}
              <span>{"+7 707 620 38 13"}</span>
              {"\n      "}
            </a>
            {"\n      "}
            <button className={"burger"} id={"burgerBtn"} aria-label={"Меню"}>
              {"\n        "}
              <svg
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2.5"}
                strokeLinecap={"round"}
              >
                <path d={"M3 6h18M3 12h18M3 18h18"}></path>
              </svg>
              {"\n      "}
            </button>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </header>
    </>
  );
}
