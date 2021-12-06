table! {
    accounts (id) {
        id -> Integer,
        name -> Text,
        coin_type -> Integer,
        created_at -> Nullable<Timestamp>,
        wallet_id -> Integer,
    }
}

table! {
    wallets (id) {
        id -> Integer,
        name -> Text,
        interface -> Text,
        created_at -> Nullable<Timestamp>,
    }
}

joinable!(accounts -> wallets (wallet_id));

allow_tables_to_appear_in_same_query!(
    accounts,
    wallets,
);
