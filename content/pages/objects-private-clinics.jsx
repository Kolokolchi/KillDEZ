export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <a href={"/objects/"}>{"Объекты"}</a>
        <span>{"/"}</span>
        <a href={"/objects/medicine"}>{"Медицинские учреждения"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Частные клиники"}</span>
      </nav>
      <section className={"detail-hero"}>
        <div className={"wrap detail-hero-grid"}>
          <div>
            <span className={"s-eyebrow"}>
              {"Медицинские учреждения · Алматы"}
            </span>
            <h1>{"Частные клиники"}</h1>
            <p className={"detail-lead"}>
              {
                "Подбираем формат обработки для небольшой клиники или многопрофильного центра с учётом процедурных кабинетов и времени между приёмами."
              }
            </p>
            <div className={"detail-actions"}>
              <button
                className={"btn btn-green"}
                data-action={"order"}
                data-service={"Обработка объекта: Частные клиники"}
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
                "Зоны ожидания, кабинеты, комнаты персонала и подсобные помещения."
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
      <section className={"detail-section"}>
        <div className={"wrap detail-grid"}>
          <h2>{"Что учитываем"}</h2>
          <div className={"detail-copy"}>
            <p>
              {
                "Учитываем разделение потоков, режим приёма и внутренние правила учреждения. Работы согласуем с ответственным сотрудником."
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
                "Сообщите о чувствительном оборудовании и согласуйте окно без пациентов."
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
              <a href={"/objects/polyclinics"}>{"Поликлиники ↗"}</a>
              <a href={"/objects/dentistry"}>{"Стоматологии ↗"}</a>
              <a href={"/objects/pharmacies"}>{"Аптеки ↗"}</a>
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
            data-service={"Обработка объекта: Частные клиники"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
