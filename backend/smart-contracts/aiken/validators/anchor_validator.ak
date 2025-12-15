use aiken/collection/list
use cardano/transaction.{Transaction, placeholder}

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

test valid_anchor() {
  let datum =
    Datum {
      issuer_id: #"697373756572313233",
      patient_id: #"70617469656e74313233",
      record_hash: #"0123456789abcdef0123456789abcdef01234567",
      issued_at: 1000000000,
    }
  let redeemer = Void
  let tx =
    Transaction { ..placeholder, extra_signatories: [#"697373756572313233"] }
  anchor_validator.spend(Some(datum), redeemer, Void, tx) == True
}

test invalid_anchor_no_signature() fail {
  let datum =
    Datum {
      issuer_id: #"697373756572313233",
      patient_id: #"70617469656e74313233",
      record_hash: #"0123456789abcdef0123456789abcdef01234567",
      issued_at: 1000000000,
    }
  let redeemer = Void
  let tx = Transaction { ..placeholder, extra_signatories: [] }
  anchor_validator.spend(Some(datum), redeemer, Void, tx)
}

test invalid_anchor_empty_hash() fail {
  let datum =
    Datum {
      issuer_id: #"697373756572313233",
      patient_id: #"70617469656e74313233",
      record_hash: #"",
      issued_at: 1000000000,
    }
  let redeemer = Void
  let tx =
    Transaction { ..placeholder, extra_signatories: [#"697373756572313233"] }
  anchor_validator.spend(Some(datum), redeemer, Void, tx)
}

test invalid_anchor_negative_time() fail {
  let datum =
    Datum {
      issuer_id: #"697373756572313233",
      patient_id: #"70617469656e74313233",
      record_hash: #"0123456789abcdef0123456789abcdef01234567",
      issued_at: -1000000000,
    }
  let redeemer = Void
  let tx =
    Transaction { ..placeholder, extra_signatories: [#"697373756572313233"] }
  anchor_validator.spend(Some(datum), redeemer, Void, tx)
}
