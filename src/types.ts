// Operating mode of the wallet
// Determines how blockchain data is queried, etc
// full = full node, data provided by a local node
// light = light wallet, data provided by ergo-explorer for example
// spv = SPV mode, likely won't be supported for a while, mostly useful for mobile clients
// the rust SPV library is currently WIP/I need to research to even see how this would fit into a wallet
export type OpMode = 'full' | 'light' | 'spv';

export type AddressBase58 = string;

export type Base16String = string;

export type EnvironmentVariables = Record<string, any>;
