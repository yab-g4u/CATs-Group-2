
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
    
    let signed_ok = list.has(self.extra_signatories, issuer_id)
    let hash_ok = referral_hash != #""
    let time_ok = issued_at >= 0
    
    hash_ok && signed_ok && time_ok
  }
  
  else(_) {
    fail
  }
}

