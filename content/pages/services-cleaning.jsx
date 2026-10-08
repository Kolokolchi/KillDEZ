export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"../index.html"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"../index.html#services"}>{"Услуги"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Клининг помещений"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Услуги · Алматы"}</span>
            <h1>{"Клининг помещений"}</h1>
            <p className={"detail-lead"}>
              {
                "Организуем уборку жилых и коммерческих помещений: согласуем зоны, объём загрязнений и требования к результату."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Клининг помещений"}
              >
                {"Обсудить задачу ↗"}
              </button>
              <a className={"detail-phone"} href={"tel:+77076203813"}>
                {"+7 707 620 38 13"}
              </a>
            </div>
            <p className={"detail-caption"}>
              {"Разовый выезд или регулярное обслуживание"}
            </p>
          </div>
          <div className={"detail-photo"}>
            <img
              src={"../images/hero-business.jpg"}
              alt={"Клининг помещений"}
              width={"1200"}
              height={"800"}
            />
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Зоны работы"}</h2>
          <div className={"detail-copy"}>
            <p>
              {"Полы, доступные поверхности, санузлы, кухонные и общие зоны."}
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Порядок работ"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Определяем перечень задач и подходящие средства для покрытий. Сложные загрязнения, высотные работы и уборку после ремонта обсуждаем отдельно."
              }
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Подготовка"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Сообщите об особенностях отделки, уберите ценные вещи и обеспечьте доступ к воде и электричеству."
              }
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Стоимость"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Расчёт зависит от площади, состояния помещения и согласованного перечня задач. Отправьте описание объекта — уточним объём и стоимость до выезда."
              }
            </p>
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
            data-service={"Клининг помещений"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
