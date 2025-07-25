# Weather API Service

## 📌 Цель проекта

Разработка публичного API-сервиса на Node.js, предназначенного для получения погодных данных (текущая погода, прогноз, история) с возможностью подключения внешних frontend-клиентов. Сервис развёртывается на VPS и предоставляет интерфейс для сторонних разработчиков через REST API.

---

## 🧱 Технологический стек

- **Node.js + Express.js** — REST API
- **PostgreSQL** — основная база данных
- **Prisma ORM** — работа с БД
- **Redis** — кэширование данных и ограничение запросов
- **JWT** — авторизация
- **OAuth** — авторизация через Google/Yandex
- **Swagger / OpenAPI** — документация
- **Docker** — контейнеризация

---

## 📚 Основной функционал

### MVP

- Регистрация и аутентификация пользователей
- Получение текущей погоды
- Прогноз погоды (до 7 дней)
- История погоды (по умолчанию 10 последних дней)
- Поддержка избранных локаций
- Ограничение запросов (Rate Limiting)
- Стандартизированный формат ответов
- Версионирование API
- Подключение по OAuth (Google/Yandex)

### Расширение (в будущем)

- Email/webhook подписки
- Админ-аналитика и статистика
- Мультиязычность
- Поддержка нескольких погодных провайдеров
- GraphQL API

---

## 🔐 Авторизация

- JWT (access + refresh токены)
- OAuth вход через Google и Yandex
- Защищённые маршруты требуют заголовка `Authorization: Bearer <token>`

---

## 🌐 Версионирование

Вся работа с API ведётся через префикс:
```
/api/v1/
````

---

## 📤 Формат ответов

### Успешный ответ:
```json
{
  "ok": true,
  "data": { ... }
}
````

### Ошибка:

```json
{
  "ok": false,
  "error": {
    "errorCode": "NOT_FOUND",
    "message": "Город не найден",
    "errors": [
      {
        "field": "city",
        "message": "Обязательное поле"
      }
    ]
  }
}
```

---

## 🔁 Параметры запроса погоды

Возможные параметры:

* `city=Москва`
* `lat=55.75&lon=37.61`
* `ip=1.2.3.4` — геолокация по IP (опционально, через внешний API)

Приоритет обработки:

1. `lat/lon`
2. `city`
3. `ip`

---

## 📦 Эндпоинты API (`/api/v1`)

### Аутентификация

* `POST /auth/signup`
  Регистрация пользователя по email и паролю.

* `POST /auth/signin`
  Вход в систему по email и паролю.

* `POST /auth/signout`
  Завершение сессии, удаление refresh токена.

* `POST /auth/oauth/google`
  Вход через Google OAuth.

* `POST /auth/oauth/yandex`
  Вход через Yandex OAuth.

---

### Пользователь

* `GET /users/me`
  Получение информации о текущем пользователе.

* `PUT /users/me`
  Обновление данных профиля (например, имя, настройки).

---

### Погода

* `GET /weather/current`
  Получение текущей погоды по городу, координатам или IP.

* `GET /weather/forecast`
  Прогноз погоды на 14 дней.

* `GET /weather/history`
  История погоды за период или по умолчанию за последние 10 дней.

---

### Избранные локации

* `GET /favorites`
  Получение списка избранных локаций текущего пользователя.

* `POST /favorites`
  Добавление новой локации в избранное.

* `DELETE /favorites/:locationId`
  Удаление локации из избранного.

---

### Статистика (опционально)

* `GET /stats/usage`
  Получение информации об использовании API. Только для админов.

---

### Служебные

* `GET /ping`
  Проверка доступности API (healthcheck).

* `GET /version`
  Получение текущей версии API.

---

## 📌 Примечания

* Все публичные эндпоинты ограничены по количеству запросов (rate limit).
* API доступен как авторизованным, так и анонимным пользователям (ограниченно).
* Строгая валидация всех входящих данных.
* Все данные отдаются в формате JSON.

---

## 📦 Возможные расширения

* Многоязычные ответы
* Графики и визуализации (client-side)
* Поддержка подписок
* Выбор поставщика погодных данных
* Логи админской активности

---