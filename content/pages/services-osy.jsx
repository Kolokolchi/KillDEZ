export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/#services"}>{"Услуги"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Уничтожение ос и осиных гнёзд"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"ДЕЗИНСЕКЦИЯ · Алматы"}</span>
            <h1>{"Уничтожение ос и осиных гнёзд"}</h1>
            <p className={"detail-lead"}>
              {
                "Оцениваем расположение осиного гнезда и возможность доступа. Объём работ зависит от высоты, конструкции и близости людей."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Уничтожение ос и осиных гнёзд"}
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
              src={"../images/clean/svc-wasp.jpg"}
              alt={"Уничтожение ос и осиных гнёзд"}
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
                "Карнизы, чердаки, хозяйственные постройки и полости конструкций."
              }
            </p>
            <a className={"inline-link"} href={"/objects/"}>
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
                "Сначала уточняем расположение гнезда по описанию или фото с безопасного расстояния, затем согласуем способ работ и ограничения доступа."
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
                "Не тревожьте гнездо. Ограничьте доступ к месту до приезда специалиста."
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
              <strong>{"от 16 000 ₸"}</strong>
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
            data-service={"Уничтожение ос и осиных гнёзд"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
