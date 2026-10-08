import "../css/rebrand.css";

export default function NotFound() {
  return (
    <main className="rebrand rebrand-error">
      <div className="wrap">
        <a href="/" aria-label="KILL DEZ — на главную"><img src="/images/brand/wordmark.webp" alt="KILL DEZ" width="2056" height="765" /></a>
        <div className="error-number" aria-hidden="true">404<span>×</span></div>
        <h1>Страница не найдена</h1>
        <p>Проверьте адрес или перейдите на главную.</p>
        <a className="btn btn-green" href="/">KILL DEZ — на главную ↗</a>
      </div>
    </main>
  );
}
