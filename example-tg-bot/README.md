# Telegram Finance Bot

Telegram бот для учета личных финансов с использованием SQLite базы данных.

## Установка

### 1. Клонирование и установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Отредактируйте файл `.env`:

```env
TELEGRAM_TOKEN=your_telegram_bot_token_here
PORT=3000
```

### 3. Получение Telegram Bot Token

1. Найдите [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Скопируйте полученный токен в файл `.env`

## Запуск

```bash
npm start
```

После запуска:

- Бот будет доступен в Telegram
- Веб-интерфейс будет доступен по адресу: http://localhost:3000/

## SQL файлы для изучения

SQL файлы пронумерованы по возрастанию сложности:

1. **01_categories.sql** - Простой SELECT для получения категорий
2. **02_expenses.sql** - SELECT с ORDER BY для сортировки расходов
3. **03_total.sql** - Агрегатная функция SUM для подсчета общей суммы
4. **04_expenses_by_category.sql** - SELECT с ORDER BY по нескольким полям
5. **05_expenses_by_date.sql** - Использование функции DATE для группировки по дате
6. **06_total_by_category.sql** - GROUP BY для группировки и агрегации
7. **07_total_by_date.sql** - GROUP BY с функцией DATE
8. **08_add_expense.sql** - INSERT для добавления новых записей
