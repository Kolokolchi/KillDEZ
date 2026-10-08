import { contactWhatsAppUrl } from "../lib/whatsapp";

export default function WhatsAppLink({ children, ...props }) {
  return (
    <a
      {...props}
      href={contactWhatsAppUrl()}
      data-whatsapp-contact=""
      title="Написать в WhatsApp"
    >
      {children}
    </a>
  );
}
