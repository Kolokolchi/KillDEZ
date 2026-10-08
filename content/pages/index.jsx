import WhatsAppLink from "../../components/WhatsAppLink";

import BrandHero from "../../components/BrandHero";
import brandCopy from "../brand-translations.json";

export default function PageContent() {
  return (
    <main id={"main-content"}>
      {"\n\n"}
      {"\n"}
      <BrandHero />
      <div className={"tstrip"}>
        {"\n  "}
        <div className={"wrap tstrip-grid"}>
          {"\n    "}
          <div className={"tstrip-item"}>
            {"\n      "}
            <div className={"ic"}>
              <svg
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2.2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path d={"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}></path>
              </svg>
            </div>
            {"\n      "}
            <span data-i18n={"trust.1"}>{"Под ваш объект"}</span>
            {"\n    "}
          </div>
          {"\n    "}
          <div className={"tstrip-item"}>
            {"\n      "}
            <div className={"ic"}>
              <svg
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2.2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path
                  d={"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}
                ></path>
                <path d={"M14 2v6h6"}></path>
              </svg>
            </div>
            {"\n      "}
            <span data-i18n={"trust.2"}>{"Договор и АВР"}</span>
            {"\n    "}
          </div>
          {"\n    "}
          <div className={"tstrip-item"}>
            {"\n      "}
            <div className={"ic"}>
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
                    "M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  }
                ></path>
              </svg>
            </div>
            {"\n      "}
            <span data-i18n={"trust.3"}>{"Инструкции по подготовке"}</span>
            {"\n    "}
          </div>
          {"\n    "}
          <div className={"tstrip-item"}>
            {"\n      "}
            <div className={"ic"}>
              <svg
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2.2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <circle cx={"12"} cy={"12"} r={"10"}></circle>
                <path d={"M12 6v6l4 2"}></path>
              </svg>
            </div>
            {"\n      "}
            <span data-i18n={"trust.4"}>{"Стоимость до начала работ"}</span>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </div>
      {"\n\n\n\n\n\n\n\n\n"}
      {"\n"}
      <section id={"services"}>
        {"\n  "}
        <div className={"wrap"}>
          {"\n    "}
          <div className={"s-head"}>
            {"\n      "}
            <div className={"s-eyebrow"} data-i18n={"svc.eyebrow"}>
              {"Каталог услуг"}
            </div>
            {"\n      "}
            <h2 data-i18n={"svc.title"}>{"Услуги для дома и бизнеса"}</h2>
            {"\n      "}
            <p className={"lead"} data-i18n={"svc.lead"}>
              {
                "Дезинфекция помещений, обработка от насекомых, грызунов, грибка и плесени. Выберите задачу — расскажем о порядке работ и подготовке."
              }
            </p>
            {"\n    "}
          </div>
          {"\n\n            "}
          <div className={"work-overview"}>
            <a href={"/services/dezinfekciya"}>
              <span>{"01 / ДЕЗИНФЕКЦИЯ"}</span>
              <h3>{"Обработка помещений ↗"}</h3>
              <p>{"Поверхности и общие зоны — с учётом назначения объекта."}</p>
            </a>
            <a href={"/instructions"}>
              <span data-i18n="overview.guide.label">{"02 / ПАМЯТКА"}</span>
              <h3 data-i18n="overview.guide.title">{"До и после обработки ↗"}</h3>
              <p data-i18n="overview.guide.text">{"Как подготовить помещение и что делать после обработки."}</p>
            </a>
          </div>
          <div className={"svc-grid"}>
            {"\n      "}
            <a className={"svc"} href={"/services/klopy"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-bedbug.jpg"}
                  alt={"Клопы"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.1.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.1.main"}>{"Клопов"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 12 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a
              className={"svc"}
              href={"/services/tarakany"}
              rel={"noopener"}
            >
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-cockroach.jpg"}
                  alt={"Тараканы"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.2.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.2.main"}>{"Тараканов"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 11 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            
            {"\n      "}
            <a className={"svc"} href={"/services/gribok"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-fungus.jpg"}
                  alt={"Грибок"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.4.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.4.main"}>{"Грибка"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 14 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a className={"svc"} href={"/services/plesen"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-mold.jpg"}
                  alt={"Плесень"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.5.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.5.main"}>{"Плесени"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 14 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            
            {"\n      "}
            
            {"\n      "}
            <a
              className={"svc"}
              href={"/services/kozheed"}
              rel={"noopener"}
            >
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-carpetbeetle.jpg"}
                  alt={"Кожеед"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.8.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.8.main"}>{"Кожееда"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 13 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a
              className={"svc"}
              href={"/services/krysy-myshi"}
              rel={"noopener"}
            >
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-rat.jpg"}
                  alt={"Крысы"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.9.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.9.main"}>{"Крыс и мышей"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 14 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a className={"svc"} href={"/services/komary"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-mosquito.jpg"}
                  alt={"Комары"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.10.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.10.main"}>{"Комаров"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 18 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a
              className={"svc"}
              href={"/services/mokricy"}
              rel={"noopener"}
            >
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-woodlouse.jpg"}
                  alt={"Мокрицы"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.11.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.11.main"}>{"Мокриц"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 11 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a
              className={"svc"}
              href={"/services/cheshujnicy"}
              rel={"noopener"}
            >
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-silverfish.jpg"}
                  alt={"Чешуйницы"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.12.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.12.main"}>{"Чешуйниц"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 11 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a className={"svc"} href={"/services/pauki"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-spider.jpg"}
                  alt={"Пауки"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.13.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.13.main"}>{"Пауков"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 13 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a
              className={"svc"}
              href={"/services/kleshchi"}
              rel={"noopener"}
            >
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-tick.jpg"}
                  alt={"Клещи"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.14.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.14.main"}>{"Клещей"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 19 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a className={"svc"} href={"/services/osy"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-wasp.jpg"}
                  alt={"Осы"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.15.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.15.main"}>{"Осиных гнёзд"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 16 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a className={"svc"} href={"/services/muravi"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-ant.jpg"}
                  alt={"Муравьи"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.16.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.16.main"}>{"Муравьёв"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 11 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a className={"svc"} href={"/services/blokhi"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-flea.jpg"}
                  alt={"Блохи"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.17.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.17.main"}>{"Блох"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 11 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a className={"svc"} href={"/services/mol"} rel={"noopener"}>
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-moth.jpg"}
                  alt={"Моль"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.18.pre"}>
                  {"Уничтожение"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.18.main"}>{"Моли"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 12 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <a
              className={"svc"}
              href={"/services/obrabotka-uchastka"}
              rel={"noopener"}
            >
              {"\n        "}
              <div className={"svc-img"}>
                <img
                  src={"images/clean/svc-yard.jpg"}
                  alt={"Обработка участка"}
                  loading={"lazy"}
                />
              </div>
              {"\n        "}
              <div className={"svc-body"}>
                {"\n          "}
                <div className={"svc-pre"} data-i18n={"svc.19.pre"}>
                  {"Обработка"}
                </div>
                {"\n          "}
                <div className={"svc-title"}>
                  <span data-i18n={"svc.19.main"}>{"Участка"}</span>
                </div>
                {"\n          "}
                <div className={"svc-bot"}>
                  {"\n            "}
                  <span className={"svc-price"}>{"от 25 000 ₸"}</span>
                  {"\n            "}
                  <span className={"svc-act"}>
                    <span data-i18n={"svc.learn_more"}>{"Подробнее"}</span>{" "}
                    <span>{"→"}</span>
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </a>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </section>
      {"\n"}
      <section id={"objects"}>
        <div className={"wrap"}>
          <div className={"s-head"}>
            <span className={"s-eyebrow"}>{"Решения по типу объекта"}</span>
            <h2>
              {"У каждого пространства"}
              <br />
              {"свои задачи"}
            </h2>
            <p className={"lead"}>
              {
                "От квартиры до распределительного центра. Выберите свой объект — расскажем, что учесть и как подготовиться."
              }
            </p>
          </div>
          <div className={"object-grid"}>
            <a className={"object-card"} href={"/objects/medicine"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/medicine-clinic.jpg"}
                  alt={"Медицинские учреждения"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"01"}</span>
                <h3>{"Медицинские учреждения"}</h3>
                <p>{"поликлиники, частные клиники, стоматологии, аптеки"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/sport"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/sport.jpg"}
                  alt={"Спортивные объекты"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"02"}</span>
                <h3>{"Спортивные объекты"}</h3>
                <p>{"фитнес-клубы, тренажёрные залы, бассейны, сауны"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/leisure"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/leisure.jpg"}
                  alt={"Развлечения и услуги"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"03"}</span>
                <h3>{"Развлечения и услуги"}</h3>
                <p>{"кинотеатры, салоны красоты, парикмахерские, бани"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/logistics"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/logistics.jpg"}
                  alt={"Транспорт и логистика"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"04"}</span>
                <h3>{"Транспорт и логистика"}</h3>
                <p>{"вокзалы, аэропорты, склады, распределительные центры"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/business"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/business.jpg"}
                  alt={"Офисы и бизнес-центры"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"05"}</span>
                <h3>{"Офисы и бизнес-центры"}</h3>
                <p>{"офисы, бизнес-центры, коворкинги"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/food"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/food.jpg"}
                  alt={"Общепит"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"06"}</span>
                <h3>{"Общепит"}</h3>
                <p>{"рестораны, кафе, столовые, бары, точки фастфуда"}</p>
                <span className={"object-link"}>
                  {"5 типов объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/retail"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/retail.jpg"}
                  alt={"Торговые объекты"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"07"}</span>
                <h3>{"Торговые объекты"}</h3>
                <p>{"торговые центры, магазины, супермаркеты"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/education"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/education.jpg"}
                  alt={"Детские и образовательные учреждения"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"08"}</span>
                <h3>{"Детские и образовательные учреждения"}</h3>
                <p>{"детские сады, школы, развивающие центры"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/government"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/government.jpg"}
                  alt={"Государственные учреждения"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"09"}</span>
                <h3>{"Государственные учреждения"}</h3>
                <p>{"административные здания, офисы ведомств"}</p>
                <span className={"object-link"}>
                  {"2 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/hospitality"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/hospitality.jpg"}
                  alt={"Гостиницы и коллективное проживание"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"10"}</span>
                <h3>{"Гостиницы и коллективное проживание"}</h3>
                <p>{"общежития, хостелы, гостиницы и отели"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/other"}>
              <div className={"object-card-photo"}>
                <img
                  src={"images/objects/other.jpg"}
                  alt={"Жильё и производство"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"11"}</span>
                <h3>{"Жильё и производство"}</h3>
                <p>
                  {
                    "квартиры, частные дома, производственные помещения, общие зоны жилых домов"
                  }
                </p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
          </div>
          <a className={"catalog-all"} href={"/objects/"}>
            {"Весь каталог объектов →"}
          </a>
        </div>
      </section>
      {"\n\n\n"}
      {"\n\n\n"}
      {"\n"}
      <section id={"methods"}>
        {"\n  "}
        <div className={"wrap"}>
          {"\n    "}
          <div className={"s-head"}>
            {"\n      "}
            <div className={"s-eyebrow"} data-i18n={"met.eyebrow"}>
              {"Методы обработки"}
            </div>
            {"\n      "}
            <h2 data-i18n={"met.title"}>
              {"Профессиональное "}
              <span className={"g"}>{"оборудование"}</span>
            </h2>
            {"\n      "}
            <p className={"lead"} data-i18n={"met.lead"}>
              {
                "Подбираем метод индивидуально — в зависимости от типа вредителя, площади и особенностей помещения."
              }
            </p>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"met-scroll-wrap"}>
            {"\n      "}
            <div className={"met-grid"}>
              {"\n        "}
              <div className={"met"}>
                {"\n          "}
                <div className={"method-art method-photo"}>
                  <img
                    src={"images/methods/hot-fog.jpg"}
                    alt={
                      "Термогенератор с металлическим соплом и плотным туманом"
                    }
                    width={"1200"}
                    height={"900"}
                    loading={"lazy"}
                    decoding={"async"}
                  />
                  <span className={"method-index"}>{"01"}</span>
                </div>
                {"\n          "}
                <div>
                  {"\n            "}
                  <h3 data-i18n={"met.1.title"}>{"Горячий туман"}</h3>
                  {"\n            "}
                  <p data-i18n={"met.1.text"}>
                    {
                      "Препарат нагревается до 60°С и распыляется парогенератором. Микрокапли проникают во все щели и мебель. Эффективен против тараканов, клопов, блох."
                    }
                  </p>
                  {"\n            "}
                  <div className={"met-tags"}>
                    {"\n              "}
                    <span data-i18n={"met.1.tag1"}>
                      {"максимум проникновения"}
                    </span>
                    {"\n              "}
                    <span data-i18n={"met.1.tag2"}>{"тараканы"}</span>
                    {"\n              "}
                    <span data-i18n={"met.1.tag3"}>{"клопы"}</span>
                    {"\n            "}
                  </div>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"met"}>
                {"\n          "}
                <div className={"method-art method-photo"}>
                  <img
                    src={"images/methods/cold-fog.jpg"}
                    alt={
                      "Электрический генератор холодного тумана с мелким распылением"
                    }
                    width={"1200"}
                    height={"900"}
                    loading={"lazy"}
                    decoding={"async"}
                  />
                  <span className={"method-index"}>{"02"}</span>
                </div>
                {"\n          "}
                <div>
                  {"\n            "}
                  <h3 data-i18n={"met.2.title"}>{"Холодный туман"}</h3>
                  {"\n            "}
                  <p data-i18n={"met.2.text"}>
                    {
                      "Распыление препарата под высоким давлением без нагрева. Капли мельче, оседают равномерно. Безопасен для помещений с электроникой и мебелью."
                    }
                  </p>
                  {"\n            "}
                  <div className={"met-tags"}>
                    {"\n              "}
                    <span data-i18n={"met.2.tag1"}>{"безопасный"}</span>
                    {"\n              "}
                    <span data-i18n={"met.2.tag2"}>{"универсальный"}</span>
                    {"\n              "}
                    <span data-i18n={"met.2.tag3"}>{"квартиры"}</span>
                    {"\n            "}
                  </div>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"met"}>
                {"\n          "}
                <div className={"method-art method-photo"}>
                  <img
                    src={"images/methods/barrier.jpg"}
                    alt={
                      "Обработка стыка пола и плинтуса распылительной штангой"
                    }
                    width={"1200"}
                    height={"900"}
                    loading={"lazy"}
                    decoding={"async"}
                  />
                  <span className={"method-index"}>{"03"}</span>
                </div>
                {"\n          "}
                <div>
                  {"\n            "}
                  <h3 data-i18n={"met.3.title"}>{"Барьерная обработка"}</h3>
                  {"\n            "}
                  <p data-i18n={"met.3.text"}>
                    {
                      "Создаём защитный барьер по периметру помещения и на путях миграции вредителей. Долгосрочная защита от повторного заражения."
                    }
                  </p>
                  {"\n            "}
                  <div className={"met-tags"}>
                    {"\n              "}
                    <span data-i18n={"met.3.tag1"}>{"профилактика"}</span>
                    {"\n              "}
                    <span data-i18n={"met.3.tag2"}>{"дома"}</span>
                    {"\n              "}
                    <span data-i18n={"met.3.tag3"}>{"склады"}</span>
                    {"\n            "}
                  </div>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"met"}>
                {"\n          "}
                <div className={"method-art method-photo"}>
                  <img
                    src={"images/methods/gel.jpg"}
                    alt={"Точечное нанесение гелевой приманки аппликатором"}
                    width={"1200"}
                    height={"900"}
                    loading={"lazy"}
                    decoding={"async"}
                  />
                  <span className={"method-index"}>{"04"}</span>
                </div>
                {"\n          "}
                <div>
                  {"\n            "}
                  <h3 data-i18n={"met.4.title"}>{"Гелевая обработка"}</h3>
                  {"\n            "}
                  <p data-i18n={"met.4.text"}>
                    {
                      "Точечное нанесение геля в согласованных местах активности насекомых. Приманки размещают вдали от продуктов и вне доступа детей и животных."
                    }
                  </p>
                  {"\n            "}
                  <div className={"met-tags"}>
                    {"\n              "}
                    <span data-i18n={"met.4.tag1"}>{"без запаха"}</span>
                    {"\n              "}
                    <span data-i18n={"met.4.tag2"}>{"офисы"}</span>
                    {"\n              "}
                    <span data-i18n={"met.4.tag3"}>{"кафе"}</span>
                    {"\n            "}
                  </div>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n\n    "}
          <p className={"scroll-hint"}>
            {"\n      "}
            <svg
              viewBox={"0 0 24 24"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={"2.2"}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
            >
              <path d={"M5 12h14M13 5l7 7-7 7"}></path>
            </svg>
            {"\n      "}
            <span data-i18n={"met.hint"}>
              {"Листайте вправо, чтобы посмотреть все методы"}
            </span>
            {"\n    "}
          </p>
          {"\n  "}
        </div>
        {"\n"}
      </section>
      {"\n\n"}
      {"\n"}
      <section id={"why"}>
        {"\n  "}
        <div className={"wrap"}>
          {"\n    "}
          <div className={"s-head"}>
            {"\n      "}
            <div className={"s-eyebrow"} data-i18n={"why.eyebrow"}>
              {"Преимущества"}
            </div>
            {"\n      "}
            <h2 data-i18n={"why.title"}>
              {"Почему выбирают "}
              <span className={"b"}>{"Dis"}</span>{" "}
              <span className={"g"}>{"Cleaning"}</span>
            </h2>
            {"\n      "}
            <p className={"lead"} data-i18n={"why.lead"}>{"До начала работ важно понимать, что будет обработано, сколько это стоит и как подготовить помещение. Эти вопросы обсуждаем при заказе."}</p>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"why-grid"}>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <circle cx={"12"} cy={"12"} r={"9"}></circle>
                  <path d={"M12 7v5l3 2M4 4l-2 3M20 4l2 3"}></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.1.t"}>{"Время выезда по согласованию"}</h3>
              {"\n        "}
              <p data-i18n={"why.1.d"}>{"Уточним адрес в Алматы и предложим доступное время с учётом вашей подготовки."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <path
                    d={
                      "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 14h8"
                    }
                  ></path>
                  <path d={"m10 17 1 1 3-3"}></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.2.t"}>{"Метод под вашу задачу"}</h3>
              {"\n        "}
              <p data-i18n={"why.2.d"}>{"Учитываем вид вредителя, места его появления и особенности помещения."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <path d={"m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"}></path>
                  <path d={"m8 12 3 3 5-6"}></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.3.t"}>{"Понятный объём работ"}</h3>
              {"\n        "}
              <p data-i18n={"why.3.d"}>{"Согласуем зоны и стоимость обработки. Дополнительные работы рассчитываем отдельно до их начала."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <path
                    d={
                      "M14 3H6a1 1 0 0 0-1 1v16h14V8l-5-5ZM14 3v5h5M9 12h6M9 16h4"
                    }
                  ></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.4.t"}>{"Договор и документы"}</h3>
              {"\n        "}
              <p data-i18n={"why.4.d"}>
                {"Заключаем договор перед обработкой. Для юрлиц — АВР, ЭСФ."}
              </p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <path d={"m3 11 9-8 9 8M5 10v11h14V10"}></path>
                  <path d={"M12 12c-4-4-7 2 0 6 7-4 4-10 0-6Z"}></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.5.t"}>{"Подготовка без догадок"}</h3>
              {"\n        "}
              <p data-i18n={"why.5.d"}>{"Объясним, что убрать и защитить, когда можно вернуться с детьми и животными."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <circle cx={"12"} cy={"9"} r={"6"}></circle>
                  <path d={"m8 14-2 7 6-3 6 3-2-7M10 9l1.5 1.5L14 7"}></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.6.t"}>{"Внимание к очагам"}</h3>
              {"\n        "}
              <p data-i18n={"why.6.d"}>{"Обсудим, где замечены вредители и чем уже обрабатывали помещение: это влияет на план работ."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <rect
                    x={"5"}
                    y={"10"}
                    width={"14"}
                    height={"11"}
                    rx={"3"}
                  ></rect>
                  <path d={"M8 10V7a4 4 0 0 1 8 0v3M12 14v3"}></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.7.t"}>{"Доступ к нужным зонам"}</h3>
              {"\n        "}
              <p data-i18n={"why.7.d"}>{"Заранее уточним доступ к мебели, коммуникациям, подсобным помещениям и территории."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"why"}>
              {"\n        "}
              <div className={"benefit-icon"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.65"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                  focusable={"false"}
                >
                  <rect
                    x={"3"}
                    y={"6"}
                    width={"18"}
                    height={"15"}
                    rx={"3"}
                  ></rect>
                  <path
                    d={"M3 8V5a2 2 0 0 1 2-2h12v3M21 11h-6v5h6M17 13.5h.1"}
                  ></path>
                </svg>
              </div>
              {"\n        "}
              <h3 data-i18n={"why.8.t"}>{"Цена до начала работ"}</h3>
              {"\n        "}
              <p data-i18n={"why.8.d"}>{"Итог зависит от площади, задачи и состава обработки. Сумму и порядок оплаты согласуем заранее."}</p>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </section>
      {"\n\n\n\n\n"}
      {"\n"}
      <section id={"process"}>
        {"\n  "}
        <div className={"wrap"}>
          {"\n    "}
          <div className={"s-head"}>
            {"\n      "}
            <div className={"s-eyebrow"} data-i18n={"proc.eyebrow"}>
              {"Как мы работаем"}
            </div>
            {"\n      "}
            <h2 data-i18n={"proc.title"}>
              {"От заявки до "}
              <span className={"g"}>{"результата"}</span>
            </h2>
            {"\n      "}
            <p className={"lead"} data-i18n={"proc.lead"}>
              {
                "Прозрачный процесс из 5 шагов — от первого звонка до контрольной проверки эффективности."
              }
            </p>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"proc-grid"}>
            {"\n      "}
            <div className={"proc"}>
              {"\n        "}
              <div className={"step-visual"}>
                <div className={"step-icon"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.65"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    aria-hidden={"true"}
                    focusable={"false"}
                  >
                    <path
                      d={
                        "M20 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v9ZM7 8h9M7 12h6"
                      }
                    ></path>
                  </svg>
                </div>
                <span className={"step-number"}>{"01"}</span>
              </div>
              {"\n        "}
              <h3 data-i18n={"proc.1.t"}>{"Заявка"}</h3>
              {"\n        "}
              <p data-i18n={"proc.1.d"}>
                {"Звоните, пишете в WhatsApp или заполняете форму на сайте."}
              </p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"proc"}>
              {"\n        "}
              <div className={"step-visual"}>
                <div className={"step-icon"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.65"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    aria-hidden={"true"}
                    focusable={"false"}
                  >
                    <path d={"M14 14H7l-4 3V5h14v6M10 17v3h7l4 2V10h-2"}></path>
                    <path d={"M7 8h6"}></path>
                  </svg>
                </div>
                <span className={"step-number"}>{"02"}</span>
              </div>
              {"\n        "}
              <h3 data-i18n={"proc.2.t"}>{"Оценка и стоимость"}</h3>
              {"\n        "}
              <p data-i18n={"proc.2.d"}>{"Уточняем вредителя, площадь, очаги и предыдущие обработки. Согласуем состав работ и цену."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"proc"}>
              {"\n        "}
              <div className={"step-visual"}>
                <div className={"step-icon"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.65"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    aria-hidden={"true"}
                    focusable={"false"}
                  >
                    <path d={"M3 6h11v12H3V6ZM14 10h4l3 4v4h-7M14 14h7"}></path>
                    <circle cx={"7"} cy={"18"} r={"2"}></circle>
                    <circle cx={"17"} cy={"18"} r={"2"}></circle>
                  </svg>
                </div>
                <span className={"step-number"}>{"03"}</span>
              </div>
              {"\n        "}
              <h3 data-i18n={"proc.3.t"}>{"Выезд"}</h3>
              {"\n        "}
              <p data-i18n={"proc.3.d"}>{"Назначаем время и передаём инструкцию по подготовке. На месте уточняем доступ к зонам обработки."}</p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"proc"}>
              {"\n        "}
              <div className={"step-visual"}>
                <div className={"step-icon"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.65"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    aria-hidden={"true"}
                    focusable={"false"}
                  >
                    <path
                      d={
                        "M5 8h9l-2 5H6L5 8ZM6 13l-2 8h10l-2-8M8 8V4h7v3h-4M15 5h2M20 3h1M20 7h1M18 5h3"
                      }
                    ></path>
                  </svg>
                </div>
                <span className={"step-number"}>{"04"}</span>
              </div>
              {"\n        "}
              <h3 data-i18n={"proc.4.t"}>{"Обработка"}</h3>
              {"\n        "}
              <p data-i18n={"proc.4.d"}>
                {
                  "Профессиональная обработка с договором и актом выполненных работ."
                }
              </p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"proc"}>
              {"\n        "}
              <div className={"step-visual"}>
                <div className={"step-icon"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.65"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    aria-hidden={"true"}
                    focusable={"false"}
                  >
                    <path d={"m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"}></path>
                    <path d={"m8 12 3 3 5-6"}></path>
                  </svg>
                </div>
                <span className={"step-number"}>{"05"}</span>
              </div>
              {"\n        "}
              <h3 data-i18n={"proc.5.t"}>{"После обработки"}</h3>
              {"\n        "}
              <p data-i18n={"proc.5.d"}>{"Объясняем порядок возвращения и уборки. Необходимость, объём и стоимость повторной обработки обсуждаем отдельно."}</p>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </section>
      {"\n\n\n\n\n"}
      {"\n\n\n"}
      {"\n"}
      <section className="brand-statement" aria-label="KILL DEZ">
        <div className="wrap">
          <div className="brand-statement-line" data-i18n="brand.statement">{brandCopy.ru["brand.statement"]}</div>
          <p data-i18n="brand.statement.note">{brandCopy.ru["brand.statement.note"]}</p>
        </div>
      </section>
      <section id={"b2b"}>
        {"\n  "}
        <div className={"wrap"}>
          {"\n    "}
          <div className={"s-head"}>
            {"\n      "}
            <div className={"s-eyebrow"} data-i18n={"b2b.eyebrow"}>
              {"Юридическим лицам"}
            </div>
            {"\n      "}
            <h2 data-i18n={"b2b.title"}>
              {"Работаем с "}
              <span className={"g"}>{"организациями"}</span>
            </h2>
            {"\n      "}
            <p className={"lead"} data-i18n={"b2b.lead"}>
              {
                "Договоры на регулярное обслуживание для ресторанов, магазинов, складов, гостиниц, медучреждений. Безналичный расчёт, полный пакет документов."
              }
            </p>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"b2b-grid"}>
            {"\n      "}
            <ul className={"b2b-list"}>
              {"\n        "}
              <li data-i18n={"b2b.l1"}>
                {"План работ под особенности объекта"}
              </li>
              {"\n        "}
              <li data-i18n={"b2b.l2"}>
                {"Разовый выезд или регулярное обслуживание"}
              </li>
              {"\n        "}
              <li data-i18n={"b2b.l3"}>
                {"Согласование стоимости до начала работ"}
              </li>
              {"\n        "}
              <li data-i18n={"b2b.l4"}>
                {"Учёт графика сотрудников и посетителей"}
              </li>
              {"\n        "}
              <li data-i18n={"b2b.l5"}>
                {"Согласованный доступ к каждой зоне"}
              </li>
              {"\n        "}
              <li data-i18n={"b2b.l6"}>{"Рекомендации после обработки"}</li>
              {"\n      "}
            </ul>
            {"\n\n\n\n      "}
            <div className={"b2b-cta"}>
              {"\n        "}
              <h3 data-i18n={"b2b.cta.t"}>
                {"Нужно регулярное обслуживание объекта?"}
              </h3>
              {"\n        "}
              <p data-i18n={"b2b.cta.d"}>{"Укажите назначение объекта, площадь и проблему. Подготовим предложение по составу работ и периодичности обслуживания."}</p>
              {"\n        "}
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-request-type={"business"}
              >
                {"\n          "}
                <span data-i18n={"b2b.cta.btn"}>{"Запросить расчёт для объекта"}</span>
                {"\n        "}
              </button>
              {"\n        "}
              <div className={"b2b-docs"}>
                <span>{"Согласованный график"}</span>
                <span>{"Разовые работы"}</span>
                <span>{"Регулярное обслуживание"}</span>
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </section>
      {"\n\n"}
      {"\n"}
      <section id={"faq"}>
        {"\n  "}
        <div className={"wrap"}>
          {"\n    "}
          <div className={"s-head"}>
            {"\n      "}
            <div className={"s-eyebrow"} data-i18n={"faq.eyebrow"}>
              {"Вопросы и ответы"}
            </div>
            {"\n      "}
            <h2 data-i18n={"faq.title"}>
              {"Частые "}
              <span className={"g"}>{"вопросы"}</span>
            </h2>
            {"\n      "}
            <p className={"lead"} data-i18n={"faq.lead"}>{"Стоимость, подготовка и порядок обработки — ответы на вопросы перед заказом."}</p>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"faq-wrap"}>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.1.q"}>
                  {"Безопасна ли обработка для детей и животных?"}
                </span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.1.a"}>
                  {
                    "Порядок подготовки, время отсутствия людей и животных, проветривание и уборка зависят от метода и применяемого средства. Перед выездом специалист передаст инструкцию для вашего объекта."
                  }
                </p>
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.2.q"}>{"Сколько стоит обработка?"}</span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.2.a"}>{"Цена зависит от площади, вида вредителя, количества зон и метода обработки. Цены «от» в каталоге — начальный ориентир. Итоговую стоимость согласуем до начала работ."}</p>
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.3.q"}>{"Что делать, если нужна повторная обработка?"}</span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.3.a"}>{"Сообщите, когда проводилась обработка и где снова замечены вредители. Обсудим возможные причины и дальнейшие действия. Повторная обработка — платная услуга; её объём и стоимость согласуем отдельно до выезда."}</p>
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.4.q"}>
                  {"Нужно ли освобождать квартиру?"}
                </span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.4.a"}>{"На время обработки людей и животных нужно вывести из рабочей зоны. Срок возвращения, проветривание и уборка зависят от средства и метода. Перед работами получите инструкцию для вашего помещения."}</p>
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.5.q"}>
                  {"Будет ли запах после обработки?"}
                </span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.5.a"}>
                  {
                    "Запах зависит от средства и способа обработки. Его отсутствие не означает, что можно возвращаться. Соблюдайте время входа и порядок проветривания из памятки специалиста."
                  }
                </p>
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.6.q"}>
                  {"Работаете с юридическими лицами?"}
                </span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.6.a"}>
                  {
                    "Да, с ТОО и ИП. Полный пакет документов: договор, счёт, АВР, ЭСФ, акт обработки. Возможен договор на регулярное обслуживание с индивидуальными тарифами."
                  }
                </p>
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.7.q"}>{"Что сообщить при заказе?"}</span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.7.a"}>{"Назовите тип помещения, площадь, адрес в Алматы и опишите проблему. Уточните, где замечены вредители, есть ли дети и животные и проводилась ли обработка раньше. Это поможет согласовать подходящий план работ."}</p>
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"faq-i"}>
              {"\n        "}
              <button className={"faq-q"}>
                <span data-i18n={"faq.8.q"}>
                  {"В каких районах работаете?"}
                </span>
                <span className={"pl"}>{"+"}</span>
              </button>
              {"\n        "}
              <div className={"faq-a"}>
                <p data-i18n={"faq.8.a"}>{"Работаем по Алматы. Назовите адрес при обращении — согласуем возможность и время выезда."}</p>
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </section>
      {"\n\n"}
      {"\n"}
      <section id={"contacts"}>
        {"\n  "}
        <div className={"wrap"}>
          {"\n    "}
          <div className={"fc-inner"}>
            {"\n      "}
            <h2 data-i18n={"fc.title"}>{"Узнайте стоимость обработки"}</h2>
            {"\n      "}
            <p data-i18n={"fc.sub"}>{"Расскажите о проблеме и площади помещения — согласуем состав работ, цену и подготовку."}</p>
            {"\n      "}
            <div className={"fc-row"}>
              {"\n        "}

              {"\n        "}
              <button className={"btn btn-out"} data-action={"order"}>
                {"\n          "}
                <span data-i18n={"fc.btn2"}>{"Уточнить стоимость"}</span>
                {"\n        "}
              </button>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"fc-cards"}>
            {"\n      "}
            <a href={"tel:+77076203813"} className={"fc-card"}>
              {"\n        "}
              <div className={"ic"}>
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
              </div>
              {"\n        "}
              <div>
                <div className={"t"} data-i18n={"fc.c1.t"}>
                  {"Телефон"}
                </div>
                <div className={"v"}>{"+7 707 620 38 13"}</div>
              </div>
              {"\n      "}
            </a>
            {"\n      "}
            <WhatsAppLink
              className={"fc-card"}
            >
              {"\n        "}
              <div className={"ic wa"}>
                <svg viewBox={"0 0 24 24"} fill={"currentColor"}>
                  <path
                    d={
                      "M17.5 14.38c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.09-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.47l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.85.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.06-.12-.25-.2-.53-.34zM12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.45 1.33 4.95L2 22l5.22-1.36c1.45.79 3.08 1.21 4.78 1.21 5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.17-2.92-7.05C17.17 3.07 14.66 2.04 12 2.04"
                    }
                  ></path>
                </svg>
              </div>
              {"\n        "}
              <div>
                <div className={"t"} data-i18n={"fc.c2.t"}>
                  {"WhatsApp"}
                </div>
                <div className={"v"} data-i18n={"fc.c2.v"}>
                  {"Написать в чат"}
                </div>
              </div>
              {"\n      "}
            </WhatsAppLink>
            {"\n      "}
            <div className={"fc-card"}>
              {"\n        "}
              <div className={"ic"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"2.2"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                >
                  <circle cx={"12"} cy={"12"} r={"10"}></circle>
                  <path d={"M12 6v6l4 2"}></path>
                </svg>
              </div>
              {"\n        "}
              <div>
                <div className={"t"} data-i18n={"fc.c3.t"}>
                  {"Режим работы"}
                </div>
                <div className={"v"} data-i18n={"fc.c3.v"}>
                  {"Круглосуточно, 24/7"}
                </div>
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n"}
      </section>
      {"\n\n"}
      {"\n"}
    </main>
  );
}
