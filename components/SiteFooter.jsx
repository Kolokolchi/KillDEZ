import WhatsAppLink from "./WhatsAppLink";
import BusinessForm from "./BusinessForm";
import QuickContact from "./QuickContact";

export default function SiteFooter({ home = false, prefix = "" }) {
  const link = (value) =>
    value.startsWith("#")
      ? home
        ? value
        : "/" + value
      : value.startsWith("/") ? value : prefix + value;
  const footer = (
    <footer>
      {"\n  "}
      <div className={"wrap"}>
        <div className="footer-manifesto">NO BUGS. <span>NO B.S.</span></div>
        {"\n    "}
        <div className={"foot-grid"}>
          {"\n      "}
          <div className={"foot-col foot-brand-col"}>
            {"\n        "}
            <div className={"foot-brand-wide"}>
              {"\n          "}
              <img
                className={"brand-logo"}
                src={link("/images/brand/wordmark.webp")}
                alt={"KILL DEZ"}
                width={"2056"}
                height={"765"}
              />
              {"\n        "}
            </div>
            {"\n        "}
            <div className={"foot-tag"} data-i18n={"foot.tag"}>
              {"— Профессиональная служба дезинфекции —"}
            </div>
            {"\n        "}
            <p
              style={{ marginTop: "10px", marginBottom: "14px" }}
              data-i18n={"foot.desc"}
            >
              {
                "Дезинфекция, дезинсекция и дератизация. Для дома и бизнеса в Алматы."
              }
            </p>
            {"\n\n        "}
            {"\n\n\n        "}
            <div className={"foot-social"} style={{ marginTop: "14px" }}>
              {"\n          "}
              <WhatsAppLink
                aria-label={"WhatsApp"}
              >
                <svg viewBox={"0 0 24 24"} fill={"currentColor"}>
                  <path
                    d={
                      "M17.5 14.38c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.09-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.47l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.85.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.06-.12-.25-.2-.53-.34zM12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.45 1.33 4.95L2 22l5.22-1.36c1.45.79 3.08 1.21 4.78 1.21 5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.17-2.92-7.05C17.17 3.07 14.66 2.04 12 2.04"
                    }
                  ></path>
                </svg>
              </WhatsAppLink>
              {"\n          "}
              <a href={"tel:+77076203813"} aria-label={"Телефон"}>
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
              </a>
              {"\n        "}
            </div>
            {"\n      "}
          </div>
          {"\n\n      "}
          <div className={"foot-col"}>
            {"\n        "}
            <h4 data-i18n={"foot.h1"}>{"Услуги"}</h4>
            {"\n        "}
            <ul>
              {"\n          "}
              <li>
                <a href={link("/services/klopy")} data-i18n={"foot.s1"}>
                  {"Уничтожение клопов"}
                </a>
              </li>
              {"\n          "}
              <li>
                <a href={link("/services/tarakany")} data-i18n={"foot.s2"}>
                  {"Уничтожение тараканов"}
                </a>
              </li>
              {"\n          "}
              <li>
                <a
                  href={link("/services/krysy-myshi")}
                  data-i18n={"foot.s3"}
                >
                  {"Дератизация"}
                </a>
              </li>
              {"\n          "}
              <li>
                <a href={link("/services/blokhi")} data-i18n={"foot.s4"}>
                  {"Уничтожение блох"}
                </a>
              </li>
              {"\n          "}
              <li>
                <a href={link("/services/komary")} data-i18n={"foot.s5"}>
                  {"Уничтожение комаров"}
                </a>
              </li>
              {"\n          "}
              <li>
                <a href={link("/services/kleshchi")} data-i18n={"foot.s6"}>
                  {"Уничтожение клещей"}
                </a>
              </li>
              {"\n\n          "}
              <li>
                <a href={link("#methods")} data-i18n={"foot.s7"}>
                  {"Все методы"}
                </a>
              </li>
              {"\n        "}
            </ul>
            {"\n      "}
          </div>
          {"\n\n      "}
          <div className={"foot-col"}>
            {"\n        "}
            <h4 data-i18n={"foot.h2"}>{"География выезда"}</h4>
            {"\n        "}
            <ul>
              {"\n          "}
              <li>
                <a href={link("#services")}>{"Алматы"}</a>
              </li>
              {"\n          "}
              <li>
                <a href={link("#services")}>{"Алмалинский р-н"}</a>
              </li>
              {"\n          "}
              <li>
                <a href={link("#services")}>{"Бостандыкский р-н"}</a>
              </li>
              {"\n          "}
              <li>
                <a href={link("#services")}>{"Медеуский р-н"}</a>
              </li>
              {"\n          "}
              <li>
                <a href={link("#services")}>{"Ауэзовский р-н"}</a>
              </li>
              {"\n          "}
              <li>
                <a href={link("#services")}>{"Жетысуский р-н"}</a>
              </li>
              {"\n        "}
            </ul>
            {"\n      "}
          </div>
          {"\n\n      "}
          <div className={"foot-col"}>
            {"\n        "}
            <h4 data-i18n={"foot.h3"}>{"Контакты"}</h4>
            {"\n        "}
            <ul>
              {"\n          "}
              <li>
                <a href={"tel:+77076203813"}>{"+7 707 620 38 13"}</a>
              </li>
              {"\n          "}
              <li>
                <WhatsAppLink
                >
                  {"WhatsApp"}
                </WhatsAppLink>
              </li>
              {"\n          "}
              <li data-i18n={"foot.mode"}>{"Режим: круглосуточно"}</li>
              {"\n          "}
              <li data-i18n={"foot.area"}>{"Алматы"}</li>
              {"\n        "}
            </ul>
            {"\n        "}
            <div style={{ marginTop: "14px" }}>
              {"\n          "}
              <button
                className={"btn btn-green"}
                style={{ padding: "10px 16px", fontSize: "13px" }}
                data-action={"order"}
              >
                {"\n            "}
                <span data-i18n={"foot.btn"}>{"Обсудить обработку"}</span>
                {"\n          "}
              </button>
              {"\n        "}
            </div>
            {"\n      "}
          </div>
          {"\n    "}
        </div>
        {"\n\n    "}
        <div className={"foot-bot"}>
          {"\n      "}
          <div>
            {"© "}
            <span id={"year"}></span>
            {" KILL DEZ. "}
            <span data-i18n={"foot.rights"}>{"Все права защищены."}</span>
          </div>
          {"\n\n      "}
          <div>
            <a href={link("#contacts")} data-i18n={"nav.contacts"}>
              {"Контакты"}
            </a>
          </div>
          {"\n    "}
        </div>
        {"\n  "}
      </div>
      {"\n"}
    <p className="wrap detail-caption"><a href={link("/instructions")} data-i18n="guide.short">Памятка: до и после обработки ↗</a></p>
    </footer>
  );
  const backToTop = (
    <button className={"btt"} id={"bttBtn"} aria-label={"Наверх"}>
      {"\n  "}
      <svg
        viewBox={"0 0 24 24"}
        fill={"none"}
        stroke={"currentColor"}
        strokeWidth={"2.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      >
        <path d={"M12 19V5M5 12l7-7 7 7"}></path>
      </svg>
      {"\n"}
    </button>
  );
  const mobile = (
    <nav className={"mbb"} aria-label={"Быстрые действия"}>
      {"\n  "}
      <div className={"mbb-row"}>
        {"\n    "}
        <a href={link("#services")} className={"mbb-btn"}>
          {"\n      "}
          <svg
            viewBox={"0 0 24 24"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"2.2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          >
            <rect x={"3"} y={"3"} width={"7"} height={"7"}></rect>
            <rect x={"14"} y={"3"} width={"7"} height={"7"}></rect>
            <rect x={"14"} y={"14"} width={"7"} height={"7"}></rect>
            <rect x={"3"} y={"14"} width={"7"} height={"7"}></rect>
          </svg>
          {"\n      "}
          <span data-i18n={"mbb.services"}>{"Услуги"}</span>
          {"\n    "}
        </a>
        {"\n\n    "}
        <a href={"tel:+77076203813"} className={"mbb-btn r"}>
          {"\n      "}
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
          {"\n      "}
          <span data-i18n={"mbb.call"}>{"Звонок"}</span>
          {"\n    "}
        </a>
        {"\n    "}
        <WhatsAppLink
          className={"mbb-btn w"}
        >
          {"\n      "}
          <svg viewBox={"0 0 24 24"} fill={"currentColor"}>
            <path
              d={
                "M17.5 14.38c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.09-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.47l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.85.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.06-.12-.25-.2-.53-.34zM12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.45 1.33 4.95L2 22l5.22-1.36c1.45.79 3.08 1.21 4.78 1.21 5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.17-2.92-7.05C17.17 3.07 14.66 2.04 12 2.04"
              }
            ></path>
          </svg>
          {"\n      "}
          <span>{"WhatsApp"}</span>
          {"\n    "}
        </WhatsAppLink>
        {"\n  "}
      </div>
      {"\n"}
    </nav>
  );
  const menu = (
    <div
      className={"bmenu"}
      id={"burgerMenu"}
      role={"dialog"}
      aria-modal={"true"}
      aria-label={"Меню"}
    >
      {"\n  "}
      <div className={"bmenu-ov"} data-action={"close-menu"}></div>
      {"\n  "}
      <aside className={"bmenu-panel"}>
        {"\n    "}
        <div className={"bmenu-head"}>
          {"\n      "}
          <div className={"brand"}>
            {"\n        "}
            <img
              className={"brand-logo"}
              src={link("/images/brand/wordmark.webp")}
              alt={"KILL DEZ"}
              width={"2056"}
              height={"765"}
            />
            {"\n      "}
          </div>
          {"\n      "}
          <button
            className={"bmenu-close"}
            data-action={"close-menu"}
            aria-label={"Закрыть"}
          >
            {"\n        "}
            <svg
              viewBox={"0 0 24 24"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={"2.5"}
              strokeLinecap={"round"}
            >
              <path d={"M18 6L6 18M6 6l12 12"}></path>
            </svg>
            {"\n      "}
          </button>
          {"\n    "}
        </div>
        {"\n    "}
        <div className={"bmenu-body"}>
          {"\n      "}
          <div className={"bmenu-grp"}>
            {"\n        "}
            <h5 data-i18n={"menu.main"}>{"Основное"}</h5>
            {"\n        "}
            <a href={link("#services")} data-action={"close-menu"}>
              <span data-i18n={"nav.services"}>{"Услуги"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n\n        "}
            <a href={link("/objects/")}>
              <span data-i18n={"nav.objects"}>{"Объекты"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            <a href={link("#methods")} data-action={"close-menu"}>
              <span data-i18n={"nav.methods"}>{"Методы обработки"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#why")} data-action={"close-menu"}>
              <span data-i18n={"menu.why"}>{"Преимущества"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n\n        "}
            <a href={link("#process")} data-action={"close-menu"}>
              <span data-i18n={"nav.process"}>{"Как мы работаем"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n\n        "}
            <a href={link("#b2b")} data-action={"close-menu"}>
              <span data-i18n={"menu.b2b"}>{"Юрлицам"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#faq")} data-action={"close-menu"}>
              <span data-i18n={"nav.faq"}>{"FAQ"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#contacts")} data-action={"close-menu"}>
              <span data-i18n={"nav.contacts"}>{"Контакты"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n      "}
          </div>
          {"\n\n      "}
          <div className={"bmenu-grp"}>
            {"\n        "}
            <h5 data-i18n={"menu.popular"}>{"Популярные услуги"}</h5>
            {"\n        "}
            <a href={link("#services")} data-action={"close-menu"}>
              <span data-i18n={"svc.short.1"}>{"Уничтожение клопов"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#services")} data-action={"close-menu"}>
              <span data-i18n={"svc.short.2"}>{"Уничтожение тараканов"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#services")} data-action={"close-menu"}>
              <span data-i18n={"svc.short.3"}>
                {"Дератизация (крысы, мыши)"}
              </span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#services")} data-action={"close-menu"}>
              <span data-i18n={"svc.short.4"}>{"Уничтожение блох"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#services")} data-action={"close-menu"}>
              <span data-i18n={"svc.short.5"}>{"Уничтожение клещей"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n        "}
            <a href={link("#services")} data-action={"close-menu"}>
              <span data-i18n={"menu.all"}>{"Все услуги"}</span>
              <span className={"arr"}>{"→"}</span>
            </a>
            {"\n      "}
          </div>
          {"\n\n      "}
          <div className={"bmenu-cta"}>
            {"\n        "}
            <div className={"tx"} data-i18n={"menu.cta"}>{"Состав работ и стоимость — до выезда"}</div>
            {"\n        "}
            <WhatsAppLink
              className={"btn btn-green"}
            >
              {"\n          "}
              <svg
                viewBox={"0 0 24 24"}
                fill={"currentColor"}
                width={"16"}
                height={"16"}
              >
                <path
                  d={
                    "M17.5 14.38c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.09-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.47l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.85.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.06-.12-.25-.2-.53-.34zM12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.45 1.33 4.95L2 22l5.22-1.36c1.45.79 3.08 1.21 4.78 1.21 5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.17-2.92-7.05C17.17 3.07 14.66 2.04 12 2.04"
                  }
                ></path>
              </svg>
              {"\n          WhatsApp\n        "}
            </WhatsAppLink>
            {"\n      "}
          </div>
          {"\n\n      "}
          <div className={"bmenu-lang"}>
            {"\n        "}
            <button data-lang={"ru"} className={"active"}>
              {"Русский"}
            </button>
            {"\n        "}
            <button data-lang={"kz"}>{"Қазақша"}</button>
            {"\n      "}
          </div>
          {"\n    "}
        </div>
        {"\n  "}
      </aside>
      {"\n"}
    </div>
  );
  const modal = (
    <div
      className={"modal"}
      id={"modalOrder"}
      role={"dialog"}
      aria-modal={"true"}
      aria-labelledby={"orderTitle"}
    >
      {"\n  "}
      <div className={"modal-ov"} data-action={"close"}></div>
      {"\n  "}
      <div className={"modal-box"}>
        {"\n    "}
        <div className={"modal-head"}>
          {"\n      "}
          <h3 id={"orderTitle"} data-i18n={"form.title"}>{"Узнать стоимость обработки"}</h3>
          {"\n      "}
          <button
            className={"modal-close"}
            data-action={"close"}
            aria-label={"Закрыть"}
          >
            {"\n        "}
            <svg
              viewBox={"0 0 24 24"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={"2.5"}
              strokeLinecap={"round"}
              width={"18"}
              height={"18"}
            >
              <path d={"M18 6L6 18M6 6l12 12"}></path>
            </svg>
            {"\n      "}
          </button>
          {"\n    "}
        </div>
        {"\n    "}
        <div className={"modal-body"}>
          {"\n      "}
          <form id={"orderForm"} data-order-form="">
            {"\n        "}
            <div className={"frow two"}>
              {"\n          "}
              <div className={"ffield"}>
                <label data-i18n={"form.name"}>{"Имя *"}</label>
                <input
                  type={"text"}
                  name={"name"}
                  required={true}
                  placeholder={"Как к вам обращаться"}
                />
              </div>
              {"\n          "}
              <div className={"ffield"}>
                <label data-i18n={"form.phone"}>{"Телефон *"}</label>
                <input
                  type={"tel"}
                  name={"phone"}
                  required={true}
                  placeholder={"+7 ___ ___ __ __"}
                />
              </div>
              {"\n        "}
            </div>
            {"\n        "}
            <div className={"frow two"}>
              {"\n          "}
              <div className={"ffield"}>
                <label data-i18n={"form.city"}>{"Город"}</label>
                <input
                  type={"text"}
                  name={"city"}
                  defaultValue={"Алматы"}
                  placeholder={"Алматы"}
                />
              </div>
              {"\n          "}
              <div className={"ffield"}>
                <label data-i18n={"form.object"}>{"Объект"}</label>
                <select name={"object"}>
                  {"\n            "}
                  <option value={""} data-i18n={"form.obj.0"}>
                    {"Выберите тип"}
                  </option>
                  {"\n            "}
                  <option data-i18n={"form.obj.1"}>{"Квартира"}</option>
                  {"\n            "}
                  <option data-i18n={"form.obj.2"}>{"Частный дом"}</option>
                  {"\n            "}
                  <option data-i18n={"form.obj.3"}>{"Офис"}</option>
                  {"\n            "}
                  <option data-i18n={"form.obj.4"}>{"Ресторан / кафе"}</option>
                  {"\n            "}
                  <option data-i18n={"form.obj.5"}>{"Магазин"}</option>
                  {"\n            "}
                  <option data-i18n={"form.obj.6"}>{"Склад"}</option>
                  {"\n            "}
                  <option data-i18n={"form.obj.7"}>{"Дача / участок"}</option>
                  {"\n            "}
                  <option data-i18n={"form.obj.8"}>{"Другое"}</option>
                  {"\n          "}
                </select>
              </div>
              {"\n        "}
            </div>
            {"\n        "}
            <div className={"frow two"}>
              {"\n          "}
              <div className={"ffield"}>
                <label data-i18n={"form.service"}>{"Услуга"}</label>
                <select name={"service"} id={"orderService"}>
                  {"\n            "}
                  <option value={""} data-i18n={"form.svc.0"}>
                    {"Выберите услугу"}
                  </option>
                  {"\n            "}
                  <option>{"Уничтожение клопов"}</option>
                  {"\n            "}
                  <option>{"Уничтожение тараканов"}</option>
                  {"\n            "}
                  <option>{"Уничтожение крыс и мышей"}</option>
                  {"\n            "}
                  <option>{"Уничтожение блох"}</option>
                  {"\n            "}
                  <option>{"Уничтожение комаров"}</option>
                  {"\n            "}
                  <option>{"Уничтожение муравьёв"}</option>
                  {"\n            "}
                  <option>{"Уничтожение клещей"}</option>
                  {"\n            "}
                  <option>{"Уничтожение пауков и каракуртов"}</option>
                  {"\n            "}
                  <option>{"Уничтожение осиных гнёзд"}</option>
                  {"\n            "}
                  <option>{"Уничтожение моли"}</option>
                  {"\n            "}
                  <option>{"Уничтожение мокриц"}</option>
                  {"\n            "}
                  <option>{"Уничтожение чешуйниц"}</option>
                  {"\n            "}
                  <option>{"Уничтожение кожееда"}</option>
                  {"\n            "}
                  <option>{"Уничтожение грибка"}</option>
                  {"\n            "}
                  <option>{"Уничтожение плесени"}</option>
                  {"\n            "}
                  
                  {"\n            "}
                  
                  {"\n            "}
                  
                  {"\n            "}
                  <option>{"Обработка участка"}</option>
                  {"\n            "}
                  <option>{"Консультация"}</option>
                  {"\n          "}
                </select>
              </div>
              {"\n          "}
              <div className={"ffield"}>
                <label data-i18n={"form.area"}>{"Площадь, м²"}</label>
                <input
                  type={"text"}
                  name={"area"}
                  placeholder={"Например, 65"}
                />
              </div>
              {"\n        "}
            </div>
            {"\n        "}
            <div className={"frow"}>
              {"\n          "}
              <div className={"ffield"}>
                <label data-i18n={"form.comment"}>{"Описание проблемы"}</label>
                <textarea
                  name={"comment"}
                  placeholder={"Когда заметили, особенности"}
                ></textarea>
              </div>
              {"\n        "}
            </div>
            {"\n        "}
            <button
              type={"submit"}
              className={"fsubmit"}
              data-i18n={"form.submit"}
            >
              {"Продолжить в WhatsApp"}
            </button>
            {"\n        "}
            <p className={"fnote"} data-i18n={"form.note"}>
              {
                "Откроется WhatsApp с готовым текстом. Отправьте сообщение менеджеру, чтобы подтвердить заявку."
              }
            </p>
            {"\n      "}
          </form>
          {"\n    "}
        </div>
        {"\n  "}
      </div>
      {"\n"}
    </div>
  );
  const toast = (
    <div className={"toast"} id={"toast"} role={"status"} data-i18n={"toast"}>
      {"Отправьте подготовленное сообщение в WhatsApp."}
    </div>
  );
  return (
    <>
      {footer}
      <QuickContact />
      {home && backToTop}
      {home ? (
        <>
          {mobile}
          {menu}
        </>
      ) : (
        <>
          {menu}
          {mobile}
        </>
      )}
      {modal}
      <BusinessForm />
      {toast}
    </>
  );
}
