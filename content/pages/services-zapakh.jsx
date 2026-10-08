export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"../index.html"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"../index.html#services"}>{"Услуги"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Устранение неприятных запахов"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"ДЕЗОДОРАЦИЯ · Алматы"}</span>
            <h1>{"Устранение неприятных запахов"}</h1>
            <p className={"detail-lead"}>
              {
                "Работаем с неприятными запахами в жилых и коммерческих помещениях. Начинаем с поиска источника, а не с его маскировки."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Устранение неприятных запахов"}
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
              src={"../images/clean/svc-odor.jpg"}
              alt={"Устранение неприятных запахов"}
              width={"1200"}
              height={"800"}
            />
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Где работаем"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Мягкая мебель, текстиль, места загрязнений, технические и хозяйственные зоны."
              }
            </p>
            <a className={"inline-link"} href={"../objects.html"}>
              {"Подобрать решение по типу объекта →"}
            </a>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Как решаем задачу"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Уточняем происхождение запаха, согласуем очистку источника и подходящую дезодорацию. Метод зависит от материалов и условий помещения."
              }
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Подготовка к обработке"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Расскажите, когда появился запах и что уже предпринимали; уберите личные вещи из зоны работ."
              }
            </p>
            <p>
              {
                "До выезда передадим инструкцию. Время отсутствия людей и животных, проветривание и порядок уборки согласуем с учётом метода и применяемого средства."
              }
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Стоимость"}</h2>
          <div className={"detail-copy"}>
            <div className={"service-quote"}>
              <strong>{"от 15 000 ₸"}</strong>
              <p>
                {
                  "Ориентир для базового объёма работ. Итог зависит от площади, доступа к зонам обработки и характера проблемы. Согласуем цену до начала работ."
                }
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"После обработки"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Вы получите рекомендации по дальнейшему уходу за помещением и профилактике. Необходимость контроля и повторной обработки обсуждаем отдельно. Условия обслуживания фиксируем при согласовании заказа."
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
            data-service={"Устранение неприятных запахов"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
