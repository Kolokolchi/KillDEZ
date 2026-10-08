import WhatsAppLink from "./WhatsAppLink";
import "../css/quick-contact.css";

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export default function QuickContact() {
  return (
    <details className="quick-contact" id="quickContact">
      <summary aria-controls="quickContactPanel" aria-expanded="false">
        <PhoneIcon />
        <span className="quick-contact-label" data-i18n="contact.choose">Связаться с нами</span>
      </summary>
      <div className="quick-contact-panel" id="quickContactPanel">
        <p data-i18n="contact.choose">Связаться с нами</p>
        <a href="tel:+77076203813" className="quick-contact-call">
          <PhoneIcon />
          <span><strong data-i18n="contact.call">Позвонить</strong><small>+7 707 620 38 13</small></span>
        </a>
        <WhatsAppLink className="quick-contact-chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5 9 9 0 01-4-.9L3 21l1.9-5.5a9 9 0 01-.9-4A8.5 8.5 0 0112.5 3a8.5 8.5 0 018.5 8.5z" />
          </svg>
          <span data-i18n="contact.chat">Написать в WhatsApp</span>
        </WhatsAppLink>
      </div>
    </details>
  );
}
