export default function PageContent() {
  return (
    <main id={"main-content"}>
      <nav className={"catalog-breadcrumbs wrap"} aria-label={"Хлебные крошки"}>
        <a href={"/"}>{"Главная"}</a>
        <span>{"/"}</span>
        <span aria-current={"page"}>{"Объекты"}</span>
      </nav>
      <section className={"catalog-heading"}>
        <div className={"wrap"}>
          <span className={"s-eyebrow"}>{"Для дома и бизнеса"}</span>
          <h1>
            {"Пространства, о которых"}
            <br />
            {"мы заботимся"}
          </h1>
          <p>
            {
              "11 направлений. 39 типов объектов. Решение под ваши помещения и график."
            }
          </p>
        </div>
      </section>
      <section className={"catalog-body"}>
        <div className={"wrap"}>
          <div className={"object-grid"}>
            <a className={"object-card"} href={"/objects/medicine"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/medicine-clinic.jpg"}
                  alt={"Медицинские учреждения"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"01"}</span>
                <h3>{"Медицинские учреждения"}</h3>
                <p>{"поликлиники, частные клиники, стоматологии, аптеки"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/sport"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/sport.jpg"}
                  alt={"Спортивные объекты"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"02"}</span>
                <h3>{"Спортивные объекты"}</h3>
                <p>{"фитнес-клубы, тренажёрные залы, бассейны, сауны"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/leisure"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/leisure.jpg"}
                  alt={"Развлечения и услуги"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"03"}</span>
                <h3>{"Развлечения и услуги"}</h3>
                <p>{"кинотеатры, салоны красоты, парикмахерские, бани"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/logistics"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/logistics.jpg"}
                  alt={"Транспорт и логистика"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"04"}</span>
                <h3>{"Транспорт и логистика"}</h3>
                <p>{"вокзалы, аэропорты, склады, распределительные центры"}</p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/business"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/business.jpg"}
                  alt={"Офисы и бизнес-центры"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"05"}</span>
                <h3>{"Офисы и бизнес-центры"}</h3>
                <p>{"офисы, бизнес-центры, коворкинги"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/food"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/food.jpg"}
                  alt={"Общепит"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"06"}</span>
                <h3>{"Общепит"}</h3>
                <p>{"рестораны, кафе, столовые, бары, точки фастфуда"}</p>
                <span className={"object-link"}>
                  {"5 типов объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/retail"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/retail.jpg"}
                  alt={"Торговые объекты"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"07"}</span>
                <h3>{"Торговые объекты"}</h3>
                <p>{"торговые центры, магазины, супермаркеты"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/education"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/education.jpg"}
                  alt={"Детские и образовательные учреждения"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"08"}</span>
                <h3>{"Детские и образовательные учреждения"}</h3>
                <p>{"детские сады, школы, развивающие центры"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/government"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/government.jpg"}
                  alt={"Государственные учреждения"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"09"}</span>
                <h3>{"Государственные учреждения"}</h3>
                <p>{"административные здания, офисы ведомств"}</p>
                <span className={"object-link"}>
                  {"2 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/hospitality"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/hospitality.jpg"}
                  alt={"Гостиницы и коллективное проживание"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"10"}</span>
                <h3>{"Гостиницы и коллективное проживание"}</h3>
                <p>{"общежития, хостелы, гостиницы и отели"}</p>
                <span className={"object-link"}>
                  {"3 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
            </a>
            <a className={"object-card"} href={"/objects/other"}>
              <div className={"object-card-photo"}>
                <img
                  src={"/images/objects/other.jpg"}
                  alt={"Жильё и производство"}
                  width={"1200"}
                  height={"900"}
                  loading={"lazy"}
                  decoding={"async"}
                />
              </div>
              <div className={"object-card-body"}>
                <span className={"object-number"}>{"11"}</span>
                <h3>{"Жильё и производство"}</h3>
                <p>
                  {
                    "квартиры, частные дома, производственные помещения, общие зоны жилых домов"
                  }
                </p>
                <span className={"object-link"}>
                  {"4 типа объектов "}
                  <span>{"↗"}</span>
                </span>
              </div>
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
            data-service={"Подбор обработки объекта"}
          >
            {"Рассчитать стоимость ↗"}
          </button>
        </div>
      </section>
    </main>
  );
}
