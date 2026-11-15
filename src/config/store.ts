/**
 * Єдине місце для редагування інформації магазину.
 *
 * Залишайте поле порожнім, якщо контакт ще не налаштований — відповідна
 * кнопка не відображатиметься на сторінці.
 */
export const store = {
  name: "QUEEN",
  eyebrow: "Жіночий одяг",
  subtitle: "Магазин жіночого одягу",
  description: "Куртки • Дублянки • Пальта • Купальники",
  welcome:
    "Речі з характером для моментів, у яких хочеться відчувати себе особливо.",
  address: "м. Луцьк, Варшавський ринок, магазин №271",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D0%BC.%20%D0%9B%D1%83%D1%86%D1%8C%D0%BA%2C%20%D0%92%D0%B0%D1%80%D1%88%D0%B0%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D1%80%D0%B8%D0%BD%D0%BE%D0%BA%2C%20%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%20%E2%84%96271",
  phones: [
    { number: "+380987439323", display: "+38 (098) 743-93-23" },
    { number: "+380508003181", display: "+38 (050) 800-31-81" },
    { number: "+380959328297", display: "+38 (095) 932-82-97" },
  ],
  links: {
    instagram: "https://www.instagram.com/queen_makeyourday",
    tiktok: "https://www.tiktok.com/@queen_makeyourday",
    telegram: "",
    viber: "",
  },
} as const;

export type StoreLinkKey = keyof typeof store.links;
