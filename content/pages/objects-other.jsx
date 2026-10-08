export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Жильё и производство"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Каталог объектов · Алматы"}</span>
            <h1>{"Жильё и производство"}</h1>
            <p className={"detail-lead"}>
              {
                "Дополнительные направления для частных клиентов, управляющих компаний и производственных площадок."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Жильё и производство"}
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
            <p>
              {
                "Квартиры · Частные дома · Производственные помещения · Общие зоны жилых домов"
              }
            </p>
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
            <a className={"facility-row"} href={"/objects/apartments"}>
              <span>
                <h2>{"Квартиры"}</h2>
                <p>
                  {
                    "Подбираем обработку квартиры по проблеме и расположению комнат. Учитываем соседние помещения, домашних животных и особенности мебели."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/houses"}>
              <span>
                <h2>{"Частные дома"}</h2>
                <p>
                  {
                    "Осматриваем жилые и хозяйственные зоны дома, возможные пути проникновения с участка и через технические помещения."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/production"}>
              <span>
                <h2>{"Производственные помещения"}</h2>
                <p>
                  {
                    "Подбираем план с учётом технологии, сырья и графика смен. Пищевые производства требуют отдельного согласования зон и защиты продукции."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/common-areas"}>
              <span>
                <h2>{"Общие зоны жилых домов"}</h2>
                <p>
                  {
                    "Работаем с управляющей организацией по подвалам, подъездам и местам накопления отходов. Уточняем доступ и границы общей территории."
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
            data-service={"Жильё и производство"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
