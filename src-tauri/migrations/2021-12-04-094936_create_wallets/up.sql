CREATE TABLE wallets (
    -- need 'NOT NULL' otherwise diesel thinks its optional
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    interface TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
