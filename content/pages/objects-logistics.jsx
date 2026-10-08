export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Транспорт и логистика"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Каталог объектов · Алматы"}</span>
            <h1>{"Транспорт и логистика"}</h1>
            <p className={"detail-lead"}>
              {
                "Учитываем движение пассажиров и товаров, зоны разгрузки и график смен. Для пищевых грузов отдельно согласуем защиту продукции."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Транспорт и логистика"}
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
            <p>{"Вокзалы · Аэропорты · Склады · Распределительные центры"}</p>
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
            <a className={"facility-row"} href={"/objects/stations"}>
              <span>
                <h2>{"Вокзалы"}</h2>
                <p>
                  {
                    "Обслуживание вокзала разбиваем на участки с согласованным доступом. Особое внимание уделяем общим зонам и точкам накопления отходов."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/airports"}>
              <span>
                <h2>{"Аэропорты"}</h2>
                <p>
                  {
                    "Для аэропорта заранее согласуем пропуска, требования к оборудованию и доступ в служебные зоны. Объём работ определяем по конкретным помещениям."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/warehouses"}>
              <span>
                <h2>{"Склады"}</h2>
                <p>
                  {
                    "На складе проверяем периметр, ворота и участки хранения. План контроля вредителей учитывает тип груза, стеллажи и частоту поставок."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/distribution"}>
              <span>
                <h2>{"Распределительные центры"}</h2>
                <p>
                  {
                    "В распределительном центре связываем обработку с движением партий и сменами персонала. Для продуктовых зон согласуем отдельный порядок защиты товара."
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
            data-service={"Транспорт и логистика"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
