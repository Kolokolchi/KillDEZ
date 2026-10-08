export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <a href={"/objects/sport"}>{"Спортивные объекты"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Сауны"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>{"Спортивные объекты · Алматы"}</span>
            <h1>{"Сауны"}</h1>
            <p className={"detail-lead"}>
              {
                "При обработке сауны учитываем дерево, влажность и температурный режим. Работы проводим после остановки оборудования и подготовки помещений."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Обработка объекта: Сауны"}
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
            <p>{"Комнаты отдыха, душевые, санузлы и стыки отделки."}</p>
            <div className={"focus-footer"}>
              <span>{"01 / Обсуждение задачи"}</span>
              <span>{"02 / Согласование работ"}</span>
              <span>{"03 / Обработка и рекомендации"}</span>
            </div>
          </aside>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Что учитываем"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Планируем работы вокруг тренировок и времени посещений. Особое внимание — влажным зонам, раздевалкам и местам общего пользования."
              }
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Работы под вашу задачу"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Состав обработки выбираем после обсуждения проблемы и осмотра. Можно согласовать разовый выезд или график регулярного обслуживания."
              }
            </p>
            <div className={"work-links"}>
              <a href={"/services/dezinfekciya"}>
                {"Дезинфекция поверхностей ↗"}
              </a>
              <a href={"/services/tarakany"}>{"Контроль насекомых ↗"}</a>
              <a href={"/services/krysy-myshi"}>
                {"Контроль грызунов ↗"}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Перед выездом"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Дайте помещениям остыть, уберите текстиль и обеспечьте доступ к вентиляции."
              }
            </p>
            <p>
              {
                "Перед началом работ согласуем доступ, защиту имущества и период, когда помещение нельзя использовать. Порядок уборки, проветривания и возвращения зависит от метода и применяемого средства."
              }
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Стоимость и график"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Для расчёта нужны площадь, адрес, характер проблемы и режим работы объекта. Дополнительные зоны и повторные визиты обсуждаем заранее. Итоговый объём и стоимость согласуем до начала работ."
              }
            </p>
          </div>
        </div>
      </section>
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"В этом разделе"}</h2>
          <div className={"detail-copy"}>
            <div className={"work-links"}>
              <a href={"/objects/fitness"}>{"Фитнес-клубы ↗"}</a>
              <a href={"/objects/gyms"}>{"Тренажёрные залы ↗"}</a>
              <a href={"/objects/pools"}>{"Бассейны ↗"}</a>
            </div>
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
            data-service={"Обработка объекта: Сауны"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
