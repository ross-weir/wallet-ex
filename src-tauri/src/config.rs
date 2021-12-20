// this should probably be on the frontend, then we just use the backend for reading JSON files
pub struct AppConfig {
  /// The currently operation network
  /// testnet vs mainnet
  /// Probably most relevant when running in node/spv mode
  network: String,
  /// Light client vs full node vs SPV
  operating_mode: String,
  /// Is the user experienced with crypto?
  /// Enables extra options and advanced features such as mnemonic passphrases, etc
  power_user: bool,
  // explorer api endpoint
  // node location
}
