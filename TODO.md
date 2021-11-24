Software:

backend
- Tauri

frontend
- React
- TypeScript
- esbuild
- use explorer API to get total blocks so we can calculate % sync'd, use node api for as much as possible though

- - Localization with react-i18next
  - ui with https://react.geist-ui.dev/


Functionality

Configuration:
Config on the settings view of the gui
- saved to ini file
- loaded on startup
- - Operating mode: Full, SPV
  - ?

Wallet:
- restore
- create
- delete
- lock/unlock

Node wallet API only supports 1 wallet currently, might need to do the creation without the API

Assets:
- show balance
- show tokens
- ability to hide balance

Transactions:
- Send erg
- recv erg

Currency converter:
- Show erg converted to USD (or any other currency)

Nice to have:
- Export transactions
- Tour on first use (https://github.com/elrumordelaluz/reactour)
- Notifications for new transactions etc

Database

Will we need persistence? What would it be used for?
- Attaching memos to transactions
- Caching transactions etc, probably faster to retrieve from database vs node->blockchain - Looks like this is what yoroi does, it has a option in settings that allows the wallet to resync


Ideas

Transaction descriptions:
- r4 would contain some kind of flag and registers containing desc text
- r5..r9 contain description text
- OR use a input box that has desc so it is mutable?

Auth:
- Can we use fingerprinting to auth transactions?
