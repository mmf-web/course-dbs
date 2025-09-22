CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

INSERT OR IGNORE INTO categories (name) VALUES ('Еда');
INSERT OR IGNORE INTO categories (name) VALUES ('Транспорт');
INSERT OR IGNORE INTO categories (name) VALUES ('Развлечения');
INSERT OR IGNORE INTO categories (name) VALUES ('Покупки');
INSERT OR IGNORE INTO categories (name) VALUES ('Здоровье');
INSERT OR IGNORE INTO categories (name) VALUES ('Другое');
