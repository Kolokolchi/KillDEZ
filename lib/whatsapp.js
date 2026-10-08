import { CONFIG } from "./site-config";

export function whatsAppAppUrl(text) {
  return `whatsapp://send?phone=${CONFIG.whatsappNumber}&text=${encodeURIComponent(text)}`;
}

export function contactWhatsAppUrl(lang = "ru") {
  const lines = lang === "kz"
    ? [
        "Сәлеметсіз бе! Алматыда өңдеу қызметіне тапсырыс бергім келеді.",
        "Қызмет / мәселе: ...",
        "Нысан түрі: ...",
        "Ауданы: ... м²",
        "Мекенжай / аудан: ...",
        "Ыңғайлы уақыт: ...",
        "Бағасы мен дайындық тәртібін айтып беріңізші.",
      ]
    : [
        "Здравствуйте! Хочу заказать обработку в Алматы.",
        "Услуга / проблема: ...",
        "Тип объекта: ...",
        "Площадь: ... м²",
        "Адрес / район: ...",
        "Удобное время: ...",
        "Подскажите стоимость и порядок подготовки.",
      ];
  return whatsAppAppUrl(lines.join("\n"));
}
