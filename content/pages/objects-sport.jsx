export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Спортивные объекты"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Каталог объектов · Алматы"}</span>
            <h1>{"Спортивные объекты"}</h1>
            <p className={"detail-lead"}>
              {
                "Планируем работы вокруг тренировок и времени посещений. Особое внимание — влажным зонам, раздевалкам и местам общего пользования."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Спортивные объекты"}
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
            <p>{"Фитнес-клубы · Тренажёрные залы · Бассейны · Сауны"}</p>
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
            <a className={"facility-row"} href={"/objects/fitness"}>
              <span>
                <h2>{"Фитнес-клубы"}</h2>
                <p>
                  {
                    "Для фитнес-клуба составляем план по зонам: от входной группы до раздевалок. Учитываем групповые занятия и вечернюю загрузку."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/gyms"}>
              <span>
                <h2>{"Тренажёрные залы"}</h2>
                <p>
                  {
                    "Обработку тренажёрного зала согласуем с уборкой и обслуживанием оборудования. Подбираем подход к покрытиям и контактным поверхностям."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/pools"}>
              <span>
                <h2>{"Бассейны"}</h2>
                <p>
                  {
                    "Работаем с помещениями вокруг бассейна: раздевалками, душевыми и техническими зонами. Обслуживание воды обсуждается отдельно и не входит в стандартную обработку помещений."
                  }
                </p>
              </span>
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"facility-row"} href={"/objects/saunas"}>
              <span>
                <h2>{"Сауны"}</h2>
                <p>
                  {
                    "При обработке сауны учитываем дерево, влажность и температурный режим. Работы проводим после остановки оборудования и подготовки помещений."
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
            data-service={"Спортивные объекты"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
