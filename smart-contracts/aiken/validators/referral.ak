use aiken/collection/list
use aiken/interval.{Finite, Interval, IntervalBound}
use cardano/transaction.{OutputReference, Transaction, placeholder}
use cocktail.{valid_after}

pub type Datum {
  issuer_id: ByteArray,
  referral_hash: ByteArray,
  issued_at: Int,
  authorized_verifiers: List<ByteArray>,
}

// List of authorized doctor/hospital IDs

pub type Redeemer {
  Register
  Verify(ByteArray)
}

// verifier_id

// "register" or "verify"

validator referral_validator {
  spend(datum_opt: Option<Datum>, redeemer: Redeemer, _input, self: Transaction) {
    expect Some(Datum {
      issuer_id,
      referral_hash,
      issued_at,
      authorized_verifiers,
    }) = datum_opt
    when redeemer is {
      Register -> {
        // Register: Issuer must sign, hash valid, time not in future
        let signed_ok = list.has(self.extra_signatories, issuer_id)
        let hash_ok = referral_hash != #""
        //  let time_ok = issued_at <= self.validity_range
        let time_ok = valid_after(self.validity_range, issued_at)
        // issued_at <= tx start time
        signed_ok && hash_ok && time_ok
      }
      Verify(verifier_id) -> {
        // Verify: Verifier must be authorized and sign
        let verifier_authorized = list.has(authorized_verifiers, verifier_id)
        let signed_ok = list.has(self.extra_signatories, verifier_id)
        let hash_ok = referral_hash != #""
        verifier_authorized && signed_ok && hash_ok
      }
    }
    // let time_ok = issued_at >= 0
    // hash_ok && signed_ok && time_ok
  }

  else(_) {
    fail
  }
}

test valid_register() {
  let referral_hash = #"0123456789abcdef0123456789abcdef01234567"
  let issuer_id = #"697373756572313233"
  // "issuer123" in hex
  let issued_at = 1000000000
  let authorized_verifiers = [#"766572696669657231", #"766572696669657232"]
  // "verifier1", "verifier2" in hex
  let datum =
    Datum { issuer_id, referral_hash, issued_at, authorized_verifiers }
  let redeemer = Register
  let tx =
    Transaction {
      ..placeholder,
      validity_range: Interval {
        lower_bound: IntervalBound {
          bound_type: Finite(2000000000),
          is_inclusive: True,
        },
        upper_bound: IntervalBound {
          bound_type: Finite(3000000000),
          is_inclusive: False,
        },
      },
      // issued_at <= lower
      extra_signatories: [issuer_id],
    }
  // Issuer signs
  referral_validator.spend(
    Some(datum),
    redeemer,
    OutputReference { transaction_id: #"", output_index: 0 },
    tx,
  ) == True
}

test invalid_register_no_signature() fail {
  let referral_hash = #"0123456789abcdef0123456789abcdef01234567"
  let issuer_id = #"697373756572313233"
  let issued_at = 1000000000
  let authorized_verifiers = [#"766572696669657231"]
  let datum =
    Datum { issuer_id, referral_hash, issued_at, authorized_verifiers }
  let redeemer = Register
  let tx =
    Transaction {
      ..placeholder,
      validity_range: Interval {
        lower_bound: IntervalBound {
          bound_type: Finite(2000000000),
          is_inclusive: True,
        },
        upper_bound: IntervalBound {
          bound_type: Finite(3000000000),
          is_inclusive: False,
        },
      },
      extra_signatories: [],
    }
  // No signature
  referral_validator.spend(
    Some(datum),
    redeemer,
    OutputReference { transaction_id: #"", output_index: 0 },
    tx,
  )
}

test invalid_register_empty_hash() fail {
  let referral_hash = #""
  // Empty
  let issuer_id = #"697373756572313233"
  let issued_at = 1000000000
  let authorized_verifiers = [#"766572696669657231"]
  let datum =
    Datum { issuer_id, referral_hash, issued_at, authorized_verifiers }
  let redeemer = Register
  let tx =
    Transaction {
      ..placeholder,
      validity_range: Interval {
        lower_bound: IntervalBound {
          bound_type: Finite(2000000000),
          is_inclusive: True,
        },
        upper_bound: IntervalBound {
          bound_type: Finite(3000000000),
          is_inclusive: False,
        },
      },
      extra_signatories: [issuer_id],
    }
  referral_validator.spend(
    Some(datum),
    redeemer,
    OutputReference { transaction_id: #"", output_index: 0 },
    tx,
  )
}

test invalid_register_future_time() fail {
  let referral_hash = #"0123456789abcdef0123456789abcdef01234567"
  let issuer_id = #"697373756572313233"
  let issued_at = 3000000000
  // After tx time
  let authorized_verifiers = [#"766572696669657231"]
  let datum =
    Datum { issuer_id, referral_hash, issued_at, authorized_verifiers }
  let redeemer = Register
  let tx =
    Transaction {
      ..placeholder,
      validity_range: Interval {
        lower_bound: IntervalBound {
          bound_type: Finite(2000000000),
          is_inclusive: True,
        },
        upper_bound: IntervalBound {
          bound_type: Finite(3000000000),
          is_inclusive: False,
        },
      },
      extra_signatories: [issuer_id],
    }
  referral_validator.spend(
    Some(datum),
    redeemer,
    OutputReference { transaction_id: #"", output_index: 0 },
    tx,
  )
}

test valid_verify() {
  let referral_hash = #"0123456789abcdef0123456789abcdef01234567"
  let issuer_id = #"697373756572313233"
  let issued_at = 1000000000
  let authorized_verifiers = [#"766572696669657231", #"766572696669657232"]
  let datum =
    Datum { issuer_id, referral_hash, issued_at, authorized_verifiers }
  let redeemer = Verify(#"766572696669657231")
  let tx =
    Transaction {
      ..placeholder,
      validity_range: Interval {
        lower_bound: IntervalBound {
          bound_type: Finite(2000000000),
          is_inclusive: True,
        },
        upper_bound: IntervalBound {
          bound_type: Finite(3000000000),
          is_inclusive: False,
        },
      },
      extra_signatories: [#"766572696669657231"],
    }
  // Authorized verifier signs
  referral_validator.spend(
    Some(datum),
    redeemer,
    OutputReference { transaction_id: #"", output_index: 0 },
    tx,
  )
}

test invalid_verify_not_authorized() fail {
  let referral_hash = #"0123456789abcdef0123456789abcdef01234567"
  let issuer_id = #"697373756572313233"
  let issued_at = 1000000000
  let authorized_verifiers = [#"766572696669657231"]
  // Only verifier1 authorized
  let datum =
    Datum { issuer_id, referral_hash, issued_at, authorized_verifiers }
  let redeemer = Verify(#"766572696669657232")
  let tx =
    Transaction {
      ..placeholder,
      validity_range: Interval {
        lower_bound: IntervalBound {
          bound_type: Finite(2000000000),
          is_inclusive: True,
        },
        upper_bound: IntervalBound {
          bound_type: Finite(3000000000),
          is_inclusive: False,
        },
      },
      extra_signatories: [#"766572696669657232"],
    }
  // verifier2 signs but not authorized
  referral_validator.spend(
    Some(datum),
    redeemer,
    OutputReference { transaction_id: #"", output_index: 0 },
    tx,
  )
}
