export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Развлечения и услуги"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Каталог объектов · Алматы"}</span>
            <h1>{"Развлечения и услуги"}</h1>
            <p className={"detail-lead"}>
              {
                "Согласуем обработку на время без посетителей, учитывая мягкую мебель, инвентарь и рабочие места мастеров."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Развлечения и услуги"}
              >
                {"Обсудить задачу ↗"}
              </button>
              <a href={"tel:+77076203813"} className={"detail-phone"}>
                {"+7 707 620 38 13"}
              </a>
            </div>
            <p className={"detail-caption"}>
              {"Разовый выезд или регулярное обслуживание"}
            </p>
          </div>
          <aside className={"object-focus"}>
            <span className={"focus-symbol"} aria-hidden={"true"}>
              {"↗"}
            </span>
            <span className={"s-eyebrow"}>{"Индивидуальный план"}</span>
            <h2>{"В фокусе работы"}</h2>
            <p>{"Кинотеатры · Салоны красоты · Парикмахерские · Бани"}</p>
            <div className={"focus-footer"}>
              <span>{"01 / Обсуждение задачи"}</span>
              <span>{"02 / Согласование работ"}</span>
              <span>{"03 / Обработка и рекомендации"}</span>
            </div>
          </aside>
        </div>
      </section>
      <section className={"catalog-body"}>
        <div className={"wrap"}>
          <div className={"facility-list"}>
            <a className={"facility-row"} href={"/objects/cinemas"}>
              <span>
                <h2>{"Кинотеатры"}</h2>
                <p>
                  {
                    "Планируем обслуживание кинозалов между сеансами или в техническое окно. Проверяем места с остатками еды и труднодоступные участки под креслами."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/beauty"}>
              <span>
                <h2>{"Салоны красоты"}</h2>
                <p>
                  {
                    "Разделяем рабочие места, зону ожидания и хозяйственные помещения. Обработку согласуем с записью клиентов и внутренним графиком уборки."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/hairdressers"}>
              <span>
                <h2>{"Парикмахерские"}</h2>
                <p>
                  {
                    "Для парикмахерской подбираем обработку с учётом моек, кресел и складирования расходных материалов. Планируем визит после завершения записей."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/baths"}>
              <span>
                <h2>{"Бани"}</h2>
                <p>
                  {
                    "В банном комплексе оцениваем влажные и сухие зоны отдельно. При появлении плесени дополнительно обращаем внимание на протечки и вентиляцию."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
          </div>
        </div>
      </section>
      <section className={"catalog-cta"}>
        <div className={"wrap"}>
          <div>
            <span className={"s-eyebrow"}>{"Обсудим ваш объект"}</span>
            <h2>{"Начнём с вашей задачи"}</h2>
            <p>
              {
                "Сообщите тип помещения, площадь и адрес. Согласуем состав работ, стоимость и время выезда."
              }
            </p>
          </div>
          <button
            className={"btn btn-green"}
            data-action={"order"}
            data-service={"Развлечения и услуги"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
