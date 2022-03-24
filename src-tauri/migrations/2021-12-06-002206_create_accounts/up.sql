CREATE TABLE accounts (
    -- need 'NOT NULL' otherwise diesel thinks its optional
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    coin_type INTEGER NOT NULL,
    derive_idx INTEGER NOT NULL,
    wallet_id INTEGER NOT NULL,
    FOREIGN KEY (wallet_id)
    REFERENCES wallets (id)
        ON DELETE CASCADE
)
