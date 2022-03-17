# Wallet X

[![.github/workflows/ci](https://github.com/ross-weir/wallet-x/actions/workflows/ci.yml/badge.svg)](https://github.com/ross-weir/wallet-x/actions/workflows/ci.yml)

Everything about this project is WIP, including this very readme

## Seeding database with test data

In `data/db-seed.json` there is some test data that can be used to seed the database.

The entities in the seed data have all been derived using the following mnemonic:

```
change me do not use me change me do not use me
```

The wallet passwords are `testing123`.

Run the app like so:

```
./src-tauri/target/release/wallet-x.exe --seed_db ./data/db-seed.json
```

## Design decisions

- Do as much on the frontend as possible to achieve the highest level of portability. Tauri is built around WebView so hopefully it might not be too hard to port to other devices that use WebView (like mobile).



## Make accounts
Make accounts the way of using different blockchains/coins, users probably won't have a need for more accounts
within a single blockchain and it will simplify the multiple blockchain setup. We get a blockchain client
per account, etc
