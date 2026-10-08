export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Общепит"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Каталог объектов · Алматы"}</span>
            <h1>{"Общепит"}</h1>
            <p className={"detail-lead"}>
              {
                "Работы на кухне и в гостевых зонах планируем отдельно. Защиту продуктов, посуды и оборудования согласуем до начала обработки."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Общепит"}
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
            <p>{"Рестораны · Кафе · Столовые · Бары · Точки фастфуда"}</p>
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
            <a className={"facility-row"} href={"/objects/restaurants"}>
              <span>
                <h2>{"Рестораны"}</h2>
                <p>
                  {
                    "Для ресторана разрабатываем план с учётом кухни, зала и складов. Проверяем места поступления товара и возможного перемещения вредителей."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/cafes"}>
              <span>
                <h2>{"Кафе"}</h2>
                <p>
                  {
                    "В кафе уделяем внимание компактной кухне, витринам и кофейной зоне. Время работ согласуем с приготовлением продукции и приёмом гостей."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/canteens"}>
              <span>
                <h2>{"Столовые"}</h2>
                <p>
                  {
                    "Обслуживание столовой планируем вокруг приготовления и раздачи блюд. При нескольких цехах составляем последовательность работ по помещениям."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/bars"}>
              <span>
                <h2>{"Бары"}</h2>
                <p>
                  {
                    "В баре проверяем влажные зоны под стойкой и места хранения тары. Работы согласуем на период без гостей и барного персонала."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/fastfood"}>
              <span>
                <h2>{"Точки фастфуда"}</h2>
                <p>
                  {
                    "Для фастфуда учитываем плотную расстановку техники и короткие перерывы. На фуд-корте дополнительно обсуждаем общие зоны с администрацией."
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
            data-service={"Общепит"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
