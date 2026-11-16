# QUEEN — Link-in-Bio

Мобільна односторінкова digital-візитівка магазину жіночого одягу QUEEN.

## Локальний запуск

```bash
npm install
npm run dev
```

## Налаштування контактів

Усі дані магазину зібрані в одному файлі: `src/config/store.ts`.

Актуальні телефони, Instagram, TikTok, адресу та Google Maps посилання вже внесено в `src/config/store.ts`. Телефонні картки підтримують дзвінок через `tel:` і копіювання номера через Clipboard API.

## Перевірки

```bash
npm run lint
npm run typecheck
npm run build
```

## Деплой на Vercel

1. Створіть репозиторій і запуште цей проєкт у GitHub, GitLab або Bitbucket.
2. У Vercel натисніть **Add New → Project** і виберіть репозиторій.
3. Framework preset: **Next.js**. Build command, output directory і install command можна залишити за замовчуванням.
4. Натисніть **Deploy**.

Проєкт не потребує змінних середовища, бази даних або бекенда.
