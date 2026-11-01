# E-commercePetGoodsWebsite — интернет-магазин товаров для питомцев

## Ссылки

| Что | Адрес |
|---|---|
| Фронтенд (GitHub Pages) | https://katsiarynamartsinovich.github.io/E-commercePetGoodsWebsite/ |
| API (Render) | https://e-commercepetgoodswebsite.onrender.com |
| Swagger (интерактивная документация) | https://e-commercepetgoodswebsite.onrender.com/docs |
| Health-check | https://e-commercepetgoodswebsite.onrender.com/health |

> API размещён на бесплатном тарифе Render: после 15 минут без запросов сервис засыпает, и первый запрос после простоя может занять около минуты. Перед проверкой откройте `/health` и подождите ответа.

## Локальный запуск через Docker Compose

Требуется установленный Docker Desktop и Git.

1. Клонируйте репозиторий и перейдите в папку бэкенда:
   ```bash
   git clone https://github.com/KatsiarynaMartsinovich/E-commercePetGoodsWebsite.git
   cd E-commercePetGoodsWebsite/backend
   ```
2. Создайте файл `.env` из шаблона:
   ```bash
   # Windows (PowerShell / cmd)
   copy .env.example .env
   # macOS / Linux
   cp .env.example .env
   ```
3. Откройте `.env` и заполните как минимум:
   - `JWT_SECRET` — любая длинная случайная строка;
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET` — данные проекта Supabase.

   Адреса `DATABASE_URL`, `DIRECT_URL` и `REDIS_URL` внутри Docker Compose переопределяются автоматически: приложение подключается к локальным контейнерам `postgres` и `redis`.
4. Запустите сборку и контейнеры:
   ```bash
   docker compose up --build
   ```
5. Проверьте, что всё работает:
   - http://localhost:3000/health — статус сервера;
   - http://localhost:3000/docs — Swagger UI;
   - http://localhost:3000/api/products — каталог.
6. Остановка:
   ```bash
   docker compose down        # остановить контейнеры, данные БД сохраняются в volume pgdata
   docker compose down -v     # остановить и удалить данные (volumes)
   ```

## Переменные окружения

Полный шаблон — в [`backend/.env.example`](backend/.env.example).

| Переменная | Назначение | Пример / значение по умолчанию |
|---|---|---|
| `DATABASE_URL` | Строка подключения к PostgreSQL (для Supabase — pooler, порт 6543) | `postgresql://postgres.<ref>:<pwd>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1` |
| `DIRECT_URL` | Прямое подключение для миграций (Supabase session pooler, порт 5432) | `postgresql://postgres.<ref>:<pwd>@aws-0-<region>.pooler.supabase.com:5432/postgres` |
| `SUPABASE_URL` | URL проекта Supabase | `https://<ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Секретный ключ Supabase для загрузки в Storage | — |
| `SUPABASE_BUCKET` | Имя публичного bucket для изображений | `product-images` |
| `JWT_SECRET` | Секрет для подписи JWT | длинная случайная строка |
| `REDIS_URL` | Строка подключения к Redis (в облаке `rediss://` с TLS) | `redis://localhost:6379` |
| `POSTGRES_USER` | Пользователь локального Postgres (Docker Compose) | `postgres` |
| `POSTGRES_PASSWORD` | Пароль локального Postgres (Docker Compose) | `postgres` |
| `POSTGRES_DB` | Имя локальной БД (Docker Compose) | `pet_goods` |
| `PORT` | Порт сервера | `3000` |
| `HOST` | Адрес, на котором слушает сервер | `0.0.0.0` |
| `NODE_ENV` | Окружение | `development` / `production` |
| `LOG_LEVEL` | Уровень логирования | `info` |
| `CORS_ORIGINS` | Разрешённые источники через запятую (только origin, без пути) | `http://localhost:3001,http://127.0.0.1:3001` |
| `PUBLIC_URL` | Публичный адрес API для блока servers в Swagger (локально можно оставить пустым) | `https://e-commercepetgoodswebsite.onrender.com` |

Фронтенд (`frontend/.env.development`, `frontend/.env.production`):

| Переменная | Назначение |
|---|---|
| `REACT_APP_API_URL` | Адрес API (в разработке `http://localhost:3000`, в продакшене — адрес на Render) |
| `PORT` | Порт dev-сервера фронтенда (`3001`) |

## Запуск фронтенда

```bash
cd frontend
npm ci
npm start
```

Публикация на GitHub Pages: `npm run deploy` (собирает проект и обновляет ветку `gh-pages`).

## Эндпоинты API

Подробные схемы запросов и ответов — в [Swagger UI](https://e-commercepetgoodswebsite.onrender.com/docs).

| Метод | Путь | Доступ | Описание |
|---|---|---|---|
| GET | `/health` | публичный | Проверка состояния |
| POST | `/api/auth/register` | публичный | Регистрация (роль CUSTOMER) |
| POST | `/api/auth/login` | публичный | Логин, выдача JWT |
| GET | `/api/products` | публичный | Каталог: `page`, `limit`, `search`, `min_price`, `max_price`, `min_rating`, `sort_by` (`price` / `title`), `order` (`asc` / `desc`) |
| GET | `/api/products/:id` | публичный | Товар по ID |
| POST | `/api/products` | ADMIN | Создание (JSON или multipart с загрузкой файлов) |
| PATCH | `/api/products/:id` | ADMIN | Изменение |
| DELETE | `/api/products/:id` | ADMIN | Удаление |
| GET | `/api/cart` | авторизованный | Корзина пользователя |
| POST | `/api/cart/items` | авторизованный | Добавить товар |
| PATCH | `/api/cart/items/:id` | авторизованный | Изменить количество |
| DELETE | `/api/cart/items/:id` | авторизованный | Удалить позицию |
| POST | `/api/cart/apply-promo` | авторизованный | Применить промокод |

## Тестовые данные

| Что | Значение |
|---|---|
| Администратор | `admin@petgoods.com` / `Admin123!` |
| Промокод | `SAVE10` (скидка 10 %) |
| Покупатель | создаётся через регистрацию |

Учётные данные администратора предназначены только для демонстрации учебного проекта.

## Деплой

- **База данных**: Supabase (PostgreSQL). Миграции на продовой БД: `npx prisma migrate deploy` (используется `DIRECT_URL`).
- **Медиа**: Supabase Storage, публичный bucket `product-images`; изображения товаров перенесены в Storage скриптом `backend/scripts/migrate-images-to-storage.ts`.
- **Redis**: Upstash (строка вида `rediss://default:<token>@<host>.upstash.io:6379`).
- **Бэкенд**: Render, Web Service с окружением Docker.
  - Dockerfile Path: `backend/Dockerfile`, Docker Build Context Directory: `backend`;
  - Health Check Path: `/health`;
  - переменные окружения из таблицы выше (в том числе `PORT=3000`, `NODE_ENV=production`, `CORS_ORIGINS`, `PUBLIC_URL`);
  - деплой запускается автоматически при обновлении ветки `main`.
- **Фронтенд**: GitHub Pages (ветка `gh-pages`).

Koyeb из списка допустимых платформ не использован: на данный момент только платный вариант.

## Стек

| Область | Технологии |
|---|---|
| Backend | Node.js (LTS), Fastify 5, TypeScript (ESM), Zod |
| БД | PostgreSQL 15+ (Supabase), Prisma ORM 6 |
| Кэш | Redis (локально — контейнер, в облаке — Upstash) |
| Авторизация | JWT (`@fastify/jwt`), bcrypt, RBAC (CUSTOMER / ADMIN) |
| Медиа | Supabase Storage (публичный bucket `product-images`) |
| Документация | Swagger UI (`@fastify/swagger`) |
| Контейнеризация | Docker (multi-stage), Docker Compose |
| Хостинг | Render (бэкенд, деплой из Dockerfile), GitHub Pages (фронтенд) |
| Frontend | React 19, React Router, Create React App |