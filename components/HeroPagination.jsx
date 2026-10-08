import styles from "./HeroPagination.module.css";

export default function HeroPagination() {
  return (
    <div className={styles.root} role="group" aria-label="Выбор слайда">
      {[
        ["Услуги", "Қызметтер"],
        ["Для бизнеса", "Бизнеске"],
        ["Дом и участок", "Үй мен аула"],
      ].map(([ru, kz], index) => (
        <button key={ru} type="button" className={styles.dot}
          data-slide-to={index} aria-current={index === 0 ? "true" : "false"}
          aria-label={`${index + 1}: ${ru}`}
          data-label-ru={`${index + 1}: ${ru}`} data-label-kz={`${index + 1}: ${kz}`}>
          <span className={styles.number} aria-hidden="true">0{index + 1}</span>
          <span className={styles.label} data-i18n={`slider.tab.${index + 1}`}>{ru}</span>
        </button>
      ))}
      <span id="slide-count" className={styles.count} aria-live="off">01 / 03</span>
      <button type="button" className={styles.pause} data-slide-play=""
        aria-label="Остановить автопрокрутку" aria-pressed="true">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path className={styles.pauseIcon} d="M9 6v12M15 6v12" />
          <path className={styles.playIcon} d="m9 5 10 7-10 7Z" />
        </svg>
      </button>
    </div>
  );
}
