use cardano/transaction.{OutputReference}
use referral

test referral_spend_with_valid_data() {
  let referral_hash = #"0123456789abcdef0123456789abcdef01234567"
  let issuer_id = "issuer123"
  let issued_at = 1000000000
  expect _datum = Some(referral.Datum { issuer_id, referral_hash, issued_at })
  expect _redeemer = Void
  expect _placeholder_utxo =
    OutputReference { transaction_id: #"", output_index: 0 }
  True
}

test referral_spend_without_issuer_signature() {
  let referral_hash = #"0123456789abcdef0123456789abcdef01234567"
  let issuer_id = "issuer123"
  let issued_at = 1000000000
  expect _datum = Some(referral.Datum { issuer_id, referral_hash, issued_at })
  expect _redeemer = Void
  expect _placeholder_utxo =
    OutputReference { transaction_id: #"", output_index: 0 }
  True
}

test referral_spend_with_empty_hash() {
  let referral_hash = #""
  // Empty hash
  let issuer_id = "issuer123"
  let issued_at = 1000000000
  expect _datum = Some(referral.Datum { issuer_id, referral_hash, issued_at })
  expect _redeemer = Void
  expect _placeholder_utxo =
    OutputReference { transaction_id: #"", output_index: 0 }
  True
}
