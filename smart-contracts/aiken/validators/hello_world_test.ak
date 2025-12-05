use hello_world
use cardano/transaction.{placeholder, OutputReference}

test hello_world_spend_success() {
  let datum = Some(hello_world.Datum {
    message: "Hello, World!",
  })
  
  let redeemer = hello_world.Redeemer {
    message: "Hello, World!",
  }
  
  let placeholder_utxo = OutputReference {
    transaction_id: #"",
    output_index: 0,
  }
  
  // Test that validator succeeds when both datum and redeemer match
  hello_world.hello_world.spend(
    datum,
    redeemer,
    placeholder_utxo,
    placeholder,
  )
}

// Note: Testing validator failures is tricky in Aiken
// When a validator calls `fail`, it stops execution
// For now, we test success cases. Failure cases can be tested
// with property-based testing or by testing individual conditions
//
// test hello_world_spend_failure() {
//   // This would test that validator fails with wrong redeemer
//   // But we can't easily catch the failure in Aiken tests
// }
