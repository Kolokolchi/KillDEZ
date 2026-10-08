export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/#services"}>{"Услуги"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Дезинфекция помещений"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Услуги · Алматы"}</span>
            <h1>{"Дезинфекция помещений"}</h1>
            <p className={"detail-lead"}>
              {
                "Подбираем обработку поверхностей для дома, офиса или организации. Учитываем назначение комнат, материалы и график использования."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Дезинфекция помещений"}
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
          <div className={"detail-photo"}>
            <img
              src={"../images/hero-business.jpg"}
              alt={"Дезинфекция помещений"}
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
              {"Контактные поверхности, санузлы, общие и хозяйственные зоны."}
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
                "Согласуем перечень поверхностей, совместимость материалов и способ нанесения. Для медицинских объектов учитываем внутренний режим учреждения."
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
                "Уберите личные вещи и защитите материалы, которые не подлежат обработке."
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
            data-service={"Дезинфекция помещений"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
