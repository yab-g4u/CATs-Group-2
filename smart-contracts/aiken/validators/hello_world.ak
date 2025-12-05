/// Hello World Validator - Basic Aiken smart contract example
/// This validator demonstrates basic validation logic

use cardano/transaction.{Transaction}

pub type Datum {
  message: ByteArray,
}

pub type Redeemer {
  message: ByteArray,
}

validator hello_world {
  /// The spend function is called when someone tries to spend from this script
  /// Parameters:
  ///   - datum: The data stored with the UTXO
  ///   - redeemer: The redeemer provided by the spender
  ///   - input: The transaction input
  ///   - self: The script context (contains extra_signatories, etc.)
  spend(
    datum_opt: Option<Datum>,
    redeemer: Redeemer,
    _input,
    _self: Transaction,
  ) {
    // Expect the datum to contain "Hello, World!"
    expect Some(Datum { message: datum_text }) = datum_opt
    
    // Check that the redeemer says "Hello, World!"
    let must_say_hello =
      redeemer.message == "Hello, World!"
    
    // Check that the datum matches
    let datum_matches =
      datum_text == "Hello, World!"
    
    // Both conditions must be true
    must_say_hello && datum_matches
  }
  
  else(_) {
    fail
  }
}

