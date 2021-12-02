Software:

backend
- Tauri
- diesel-rs for db/barel for migrations

frontend
- React
- TypeScript
- esbuild
- use explorer API to get total blocks so we can calculate % sync'd, use node api for as much as possible though
- react-app-rewired for changing configs

Separate uis for mobile/desktop? It's hard to find a good one that supports both, might as well just separate
Also no idea when mobile will be supported by tauri

- - Localization with react-i18next
  - ui with https://react.geist-ui.dev/
    - Has themes
  - ui https://orbit.kiwi/components also a good option, has a wizard component
    - No themes
    - Components seem to be a bit richer, input with tags, etc


React state management:
these look like really good samples
https://kentcdodds.com/blog/how-to-use-react-context-effectively
https://kentcdodds.com/blog/application-state-management-with-react

Free Illustrations:
https://undraw.co/illustrations - Maybe create my own illustration component, orbit only supports provided illustrations: https://github.com/kiwicom/orbit/blob/master/packages/orbit-components/src/primitives/IllustrationPrimitive/index.jsx

Functionality

Configuration:
Config on the settings view of the gui
- saved to ini file
- loaded on startup
- - Operating mode: Full, SPV, light mode
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

Data types:
// supports wallets with multiple accounts
Wallet: name, id, secret key (if not hw), account idx
Account: wallet_id, address idx


Nice to have:
- splash screen while node is starting/loading chain, show useful tips, maybe with https://www.npmjs.com/package/react-responsive-carousel or https://github.com/express-labs/pure-react-carousel
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
