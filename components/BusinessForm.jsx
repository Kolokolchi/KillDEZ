export default function BusinessForm() {
  return (
    <div className="modal" id="modalBusiness" role="dialog" aria-modal="true" aria-labelledby="businessTitle">
      <div className="modal-ov" data-action="close"></div>
      <div className="modal-box">
        <div className="modal-head">
          <h3 id="businessTitle" data-i18n="business.title">Заявка для юридического лица</h3>
          <button className="modal-close" data-action="close" aria-label="Закрыть">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <form id="businessForm" data-order-form="" data-request-type="business">
            <div className="frow">
              <div className="ffield">
                <label data-i18n="business.organization">Название организации *</label>
                <input type="text" name="organization" required autoComplete="organization" />
              </div>
            </div>
            <div className="frow two">
              <div className="ffield">
                <label data-i18n="business.name">Контактное лицо *</label>
                <input type="text" name="name" required autoComplete="name" />
              </div>
              <div className="ffield">
                <label data-i18n="form.phone">Телефон *</label>
                <input type="tel" name="phone" required placeholder="+7 ___ ___ __ __" />
              </div>
            </div>
            <div className="frow two">
              <div className="ffield">
                <label data-i18n="business.object">Тип объекта</label>
                <input type="text" name="object" />
              </div>
              <div className="ffield">
                <label data-i18n="form.area">Площадь, м²</label>
                <input type="text" name="area" inputMode="decimal" />
              </div>
            </div>
            <div className="frow">
              <div className="ffield">
                <label data-i18n="business.address">Адрес объекта в Алматы</label>
                <input type="text" name="address" />
              </div>
            </div>
            <div className="frow two">
              <div className="ffield">
                <label data-i18n="business.service">Услуга / проблема</label>
                <input type="text" name="service" />
              </div>
              <div className="ffield">
                <label data-i18n="business.frequency">Периодичность</label>
                <select name="frequency">
                  <option value="" data-i18n="business.frequency.choose">Выберите вариант</option>
                  <option value="once" data-i18n="business.frequency.once">Разовые работы</option>
                  <option value="regular" data-i18n="business.frequency.regular">Регулярное обслуживание</option>
                  <option value="discuss" data-i18n="business.frequency.discuss">Обсудить с менеджером</option>
                </select>
              </div>
            </div>
            <div className="frow">
              <div className="ffield">
                <label data-i18n="business.comment">График и дополнительные пожелания</label>
                <textarea name="comment"></textarea>
              </div>
            </div>
            <button type="submit" className="fsubmit" data-i18n="business.submit">Запросить предложение в WhatsApp</button>
            <p className="fnote" data-i18n="form.note">Откроется WhatsApp с готовым текстом. Отправьте сообщение менеджеру, чтобы подтвердить заявку.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
