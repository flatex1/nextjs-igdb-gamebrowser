# 🎮 GameDiscover

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

> Современное приложение для поиска и исследования видеоигр, построенное на Next.js и использующее IGDB API.

## ✨ Особенности

- **Каталог игр** - Просматривайте лучшие игры с рейтингом
- **Поиск** - Находите любимые игры по названию
- **Детальные страницы** - Подробная информация о каждой игре
- **Адаптивный дизайн** - Отлично выглядит на всех устройствах
- **Темная/светлая тема** - Автоматическое переключение на основе системных настроек
- **Серверные компоненты** - Оптимизированная производительность с React Server Components
- **App Router** - Использование новейшего роутера Next.js

## 🚀 Быстрый старт

```bash
# Клонируйте репозиторий
git clone https://github.com/username/gamediscover.git
cd gamediscover

# Установите зависимости
npm install

# Настройте переменные окружения
cp .env.example .env.local

# Запустите в режиме разработки
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## 🔑 Настройка API

Для работы приложения вам потребуются учетные данные IGDB API от Twitch:

1. Зарегистрируйтесь на [Twitch Developer Portal](https://dev.twitch.tv/)
2. Создайте новое приложение
3. Получите Client ID и Client Secret
4. Добавьте их в ваш `.env.local` файл

## 📋 Переменные окружения

Создайте файл `.env.local` в корневой директории проекта:

```
# IGDB API
IGDB_CLIENT_ID=ваш_client_id
IGDB_ACCESS_TOKEN=ваш_access_token
IGDB_PUBLIC_API_URL=https://api.igdb.com/v4
```

## 📦 Структура проекта

```
├── app/                       # App Router структура
│   ├── api/                   # API маршруты
│   │   └── igdb/             # Эндпоинты для IGDB API
│   ├── game/                  # Страницы отдельных игр
│   ├── error.tsx              # Обработка ошибок
│   ├── layout.tsx             # Корневой макет
│   ├── loading.tsx            # Индикаторы загрузки
│   ├── not-found.tsx          # Страница 404
│   └── page.tsx               # Главная страница
├── components/                # React компоненты
│   ├── ui/                    # UI компоненты
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── game-grid.tsx          # Сетка игр
│   └── header.tsx             # Шапка сайта
├── lib/                       # Утилиты и хелперы
│   └── igdb.ts                # API функции для IGDB
├── public/                    # Статические файлы
└── ...
```

## 🛠️ Команды

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск собранного приложения
npm start

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

## 📱 Скриншоты

### Главная страница
![Главная страница](https://i.imgur.com/gtfDpv0.png)

### Детальная страница игры
![Детальная страница](https://i.imgur.com/jAZ6m2c.png)

### Результаты поиска
![Поиск](https://i.imgur.com/bdjeZr2.png)

## 🔄 API интеграция

Приложение использует официальный IGDB API для получения данных об играх. Основные используемые эндпоинты:

- `/games` - Получение списка игр и поиск
- `/covers` - Получение обложек игр
- `/platforms` - Информация о платформах

API-запросы проксируются через Next.js API Routes для безопасного хранения ключей.

## 🧩 Основные функции

- **Поиск игр** — Полнотекстовый поиск по названию
- **Топ игр** — Отображение лучших игр по рейтингу
- **Пагинация** — Удобная навигация по результатам
- **Подробная информация** — Детали игры, включая рейтинг, дату выхода и платформы

## 🤝 Вклад в проект

1. Сделайте форк репозитория
2. Создайте ветку для вашей функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Добавлена новая функция'`)
4. Отправьте изменения в ваш форк (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для получения дополнительной информации.
