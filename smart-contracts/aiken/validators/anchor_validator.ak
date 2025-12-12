use aiken/collection/list
use cardano/transaction.{Transaction}

pub type Datum {
  issuer_id: ByteArray,
  patient_id: ByteArray,
  record_hash: ByteArray,
  issued_at: Int,
}

pub type Redeemer =
  Void

validator anchor_validator {
  spend(
    datum_opt: Option<Datum>,
    _redeemer: Redeemer,
    _input,
    self: Transaction,
  ) {
    expect Some(datum) = datum_opt

    let signed_ok = list.has(self.extra_signatories, datum.issuer_id)
    let hash_ok = datum.record_hash != #""
    let time_ok = datum.issued_at >= 0

    signed_ok && hash_ok && time_ok
  }

  else(_) {
    fail
  }
}
