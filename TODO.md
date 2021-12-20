frontend

- use explorer API to get total blocks so we can calculate % sync'd, use node api for as much as possible though
- react-app-rewired for changing configs

Separate uis for mobile/desktop? It's hard to find a good one that supports both, might as well just separate
Also no idea when mobile will be supported by tauri

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
- splash screen while node is starting/loading chain, show useful tips, maybe with https://www.npmjs.com/package/react-responsive-carousel or https://github.com/express-labs/pure-react-carousel
- Export transactions
- Tour on first use (https://github.com/elrumordelaluz/reactour)
- Notifications for new transactions etc


Error publishing:
https://medium.com/@vshab/create-react-app-and-sentry-cde1f15cbaa

Ideas

Transaction descriptions:
- r4 would contain some kind of flag and registers containing desc text
- r5..r9 contain description text
- OR use a input box that has desc so it is mutable?

Auth:
- Can we use fingerprinting to auth transactions?



Add react router




hover over "testnet" and "light mode" to get detailed info
Or maybe inline dropdown for changing current wallet: https://react.semantic-ui.com/modules/dropdown/#types-inline
with description: https://react.semantic-ui.com/modules/dropdown/#content-description
--------------------------------------------------------------------
wallet-x                       Testnet | light mode | {settings cog}
--------------------------------------------------------------------
My Wallet   -> pop out with a list of more wallets and ability to create/restore
__details__
----------
My Accounts +
acc1
acc2
acc3


frontend routes:

# the app is starting up
/loading

# first time use?
/welcome

# viewing/managing wallet
/wallet/{walletId}/account/{accountId}/send
/wallet/{walletId}/account/{accountId}/recv
/wallet/{walletId}/account/{accountId}/transactions


## Resources:

- https://github.com/ErgoWallet/ergowallet-desktop
