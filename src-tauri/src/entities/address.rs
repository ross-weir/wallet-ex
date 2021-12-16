use super::account::Account;
use crate::schema::addresses;
use serde::Serialize;

#[derive(Queryable, Identifiable, Serialize, Associations)]
#[belongs_to(Account)]
#[table_name(addresses)]
#[serde(rename_all = "camelCase")]
pub struct Address {
  id: i32,
  address: String,
  /// Index of the path used to derive this address:
  /// m/44'/429'/0'/0/{derive_idx}
  derive_idx: i32,
  balance: Option<u64>,
  account_id: i32,
}
