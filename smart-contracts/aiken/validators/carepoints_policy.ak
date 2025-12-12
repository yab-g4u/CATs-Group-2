use aiken/collection/list
use cardano/assets.{PolicyId}
use cardano/transaction.{Transaction}

// CarePoints minting policy (template)
// Replace `OWNER_PUBKEY_HASH` with the hex PubKeyHash allowed to mint
// This policy allows minting only when the transaction is signed by the owner

pub type Mint_Cpoint_Redeemer {
  quantity: Int,
}

validator carepoints_policy {
  mint(redeemer: Mint_Cpoint_Redeemer, _policy_id: PolicyId, tx: Transaction) {
    //owner pubkey hash (replace with real value)
    let owner = #"08ee30a2e0e28b3eaf109642374971c5aa4675f5a0ff71dc8d5988ae"

    let mint_quantity = redeemer.quantity

    let signed_ok = list.has(tx.extra_signatories, owner)
    let max_supply = 100000

    let valid_quantity =
      if mint_quantity > 0 {
        // Minting: must be exactly 1 for NFTs
        mint_quantity >= 1 && mint_quantity <= max_supply
      } else if mint_quantity < 0 {
        // Burning: can burn tokens (e.g., for cleanup or mistakes)
        // For NFTs, we'd typically burn exactly -1 token at a time
        mint_quantity <= -1 && mint_quantity >= -max_supply
      } else {
        // Quantity of 0 makes no sense - reject
        False
      }
    signed_ok && valid_quantity
  }

  else(_) {
    fail
  }
}
