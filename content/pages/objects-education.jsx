export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>
          {"Детские и образовательные учреждения"}
        </span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Каталог объектов · Алматы"}</span>
            <h1>{"Детские и образовательные учреждения"}</h1>
            <p className={"detail-lead"}>
              {
                "Обрабатываем помещения в согласованное время без детей и посетителей. Порядок подготовки и возвращения передаём ответственному сотруднику."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Детские и образовательные учреждения"}
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
            <p>{"Детские сады · Школы · Развивающие центры"}</p>
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
            <a className={"facility-row"} href={"/objects/kindergartens"}>
              <span>
                <h2>{"Детские сады"}</h2>
                <p>
                  {
                    "Для детского сада составляем план отдельно для групп, спален и пищеблока. Учитываем игрушки, текстиль и поверхности частого контакта."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/schools"}>
              <span>
                <h2>{"Школы"}</h2>
                <p>
                  {
                    "В школе планируем работы по корпусам и этажам, учитывая уроки, секции и питание. Заранее согласуем доступ к техническим помещениям."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/learning-centers"}>
              <span>
                <h2>{"Развивающие центры"}</h2>
                <p>
                  {
                    "В развивающем центре учитываем игровые зоны, мягкие модули и учебные материалы. Подбираем формат работ под небольшие помещения и смены групп."
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
            data-service={"Детские и образовательные учреждения"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
