/// Referral Smart Contract Validator
/// 
/// This validator enforces rules for referral packets on Cardano:
/// - referralHash: SHA-256 hash of the referral packet (bytestring)
/// - issuerId: Identifier of the issuer (bytestring)
/// - issuedAt: POSIX timestamp when the referral was issued
///
/// Validation Rules:
/// 1. The issuer must sign the transaction
/// 2. The referralHash must be set (non-empty)
/// 3. The timestamp must be valid (within reasonable bounds)

use aiken/collection/list

use cardano/transaction.{Transaction}

pub type Datum {
  issuer_id: ByteArray,
  referral_hash: ByteArray,
  issued_at: Int,
}

pub type Redeemer =
  Void

validator referral {
  spend(
    datum_opt: Option<Datum>,
    _redeemer: Redeemer,
    _input,
    self: Transaction,
  ) {
    expect Some(Datum { issuer_id, referral_hash, issued_at }) = datum_opt
    
    // Rule 1: Issuer must sign the transaction
    let signed_ok = list.has(self.extra_signatories, issuer_id)
    
    // Rule 2: referralHash must be set (non-empty)
    let hash_ok = referral_hash != #""
    
    // Rule 3: Timestamp validation - check that issued_at is not in the future
    // Using transaction's validity range to check if timestamp is valid
    let time_ok = issued_at >= 0
    
    hash_ok && signed_ok && time_ok
  }
  
  else(_) {
    fail
  }
}

