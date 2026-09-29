CREATE TABLE IF NOT EXISTS orders (
 id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, owner_hash TEXT NOT NULL,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL, status TEXT NOT NULL,
 kind TEXT NOT NULL, day TEXT NOT NULL, time TEXT NOT NULL, payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS orders_day ON orders(day,time);
CREATE INDEX IF NOT EXISTS orders_owner ON orders(owner_hash,created_at);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
