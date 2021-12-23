# Wallet X

Ergo desktop wallet with a WIP README

## Seeding database with test data

In `data/db-seed.json` there is some test data that can be used to seed the database.

The entities in the seed data have all been derived using the following mnemonic:

```
change me do not use me change me do not use me
```

Run the app like so:

```
./src-tauri/target/release/wallet-x.exe --seed_db ./data/db-seed.json
```
