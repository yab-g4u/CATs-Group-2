/**
 * Cardano Testnet Configuration
 * Using Preprod testnet as per Cardano documentation
 * https://docs.cardano.org/cardano-testnets/getting-started
 */

// Preprod testnet magic number (1)
export const TESTNET_MAGIC = 1

// Blockfrost API endpoints for Preprod testnet
export const BLOCKFROST_PREPROD_URL = "https://cardano-preprod.blockfrost.io/api/v0"
// Note: In production, use environment variable for API key
export const BLOCKFROST_API_KEY = process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || "preprodBLXYKdWSTsopaLm2VNtPFCxzQCEGntEk"

// Aiken Smart Contract Validator Hash
// From plutus.json: anchor_validator.anchor_validator.spend
export const ANCHOR_VALIDATOR_HASH = "fce9a95619c8b7a555b29ab7e44ddcb31ca8c4c825ea38d5c8a5c8a2"

// CarePoints Minting Policy Hash
// From plutus.json: carepoints_policy.carepoints_policy.mint
export const CAREPOINTS_POLICY_HASH = "8e768f2d97bc947db13970473c04c285c18385889c70ae52516c3261"

// Network configuration
export const NETWORK = "Preprod" // or "Preview" (magic 2)

// Minimum ADA required for UTXO (2 ADA for metadata)
export const MIN_ADA_UTXO = 2_000_000n // 2 ADA in lovelace

