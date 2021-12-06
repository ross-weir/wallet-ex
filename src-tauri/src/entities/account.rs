use super::wallet::Wallet;
use crate::schema::accounts;
use serde::Serialize;

#[derive(Queryable, Identifiable, Serialize, Associations)]
#[belongs_to(Wallet)]
#[serde(rename_all = "camelCase")]
pub struct Account {
  id: i32,
  name: String,
  coin_type: i32,
  /// Index of the hardened path used to derive this account:
  /// m/44'/429'/{derive_idx}'/0/0
  derive_idx: i32,
  wallet_id: i32,
}
