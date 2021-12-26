table! {
    accounts (id) {
        id -> Integer,
        name -> Text,
        coin_type -> Integer,
        derive_idx -> Integer,
        created_at -> Nullable<Timestamp>,
        wallet_id -> Integer,
    }
}

table! {
    addresses (id) {
        id -> Integer,
        address -> Text,
        derive_idx -> Integer,
        account_id -> Integer,
        balance -> Nullable<Double>,
    }
}

table! {
    wallets (id) {
        id -> Integer,
        name -> Text,
        password -> Text,
        interface -> Text,
        hd_standard -> Text,
        created_at -> Nullable<Timestamp>,
    }
}

joinable!(accounts -> wallets (wallet_id));
joinable!(addresses -> accounts (account_id));

allow_tables_to_appear_in_same_query!(
    accounts,
    addresses,
    wallets,
);
