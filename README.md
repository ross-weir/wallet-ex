# Wallet X

Ergo desktop wallet with a WIP README

## Seeding database with test data

In `data/db-seed.json` there is some test data that can be used to seed the database.

It is up to the backend (tuari) for example to determine how to load the data. It's been done this way instead of using an external script because the app needs to initialize the database schema first so the data will need to be loaded after that stage.

The entities in the seed data have all been derived using the following mnemonic:

```
change me do not use me change me do not use me
```

Run the app like so:

```
./src-tauri/target/release/wallet-x.exe --seed_db ./data/db-seed.json
```

_Note to self: this could also be used for a import/export feature?_
