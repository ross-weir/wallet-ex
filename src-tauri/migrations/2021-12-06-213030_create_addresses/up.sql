CREATE TABLE addresses (
    -- need 'NOT NULL' otherwise diesel thinks its optional
    id INTEGER PRIMARY KEY NOT NULL,
    address TEXT NOT NULL,
    derive_idx INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    balance DECIMAL(18,9),
    FOREIGN KEY (account_id)
    REFERENCES accounts (id)
        ON DELETE CASCADE
)
