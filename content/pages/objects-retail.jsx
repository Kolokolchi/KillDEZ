export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Торговые объекты"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Каталог объектов · Алматы"}</span>
            <h1>{"Торговые объекты"}</h1>
            <p className={"detail-lead"}>
              {
                "Согласуем обслуживание с поставками, выкладкой и режимом работы. Учитываем как торговые залы, так и скрытые технические зоны."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Торговые объекты"}
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
            <p>{"Торговые центры · Магазины · Супермаркеты"}</p>
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
            <a className={"facility-row"} href={"/objects/malls"}>
              <span>
                <h2>{"Торговые центры"}</h2>
                <p>
                  {
                    "В ТЦ организуем работы совместно с администрацией и арендаторами. Особое внимание — общим коммуникациям, зонам питания и приёмке товара."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/shops"}>
              <span>
                <h2>{"Магазины"}</h2>
                <p>
                  {
                    "Для магазина подбираем объём работ по ассортименту и расположению подсобных помещений. Проверяем пути поступления вредителей с тарой и товаром."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/supermarkets"}>
              <span>
                <h2>{"Супермаркеты"}</h2>
                <p>
                  {
                    "Обслуживание супермаркета охватывает путь товара от разгрузки до полки. Для пекарни, кулинарии и открытой продукции согласуем отдельные условия."
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
            data-service={"Торговые объекты"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
