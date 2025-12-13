# Cardano Blockchain Integration - D.I.N.A

This document describes the integration of the D.I.N.A (Digital Identity for Networked Africa) medical records system with the Cardano blockchain using Aiken smart contracts.

## Overview

The system uses:
- **Aiken Smart Contracts** ([aiken-lang.org](https://aiken-lang.org/)) for on-chain validation
- **Cardano Preprod Testnet** ([docs.cardano.org](https://docs.cardano.org/cardano-testnets/getting-started)) for testing
- **Mesh SDK** for wallet integration and transaction building
- **Blockfrost API** for blockchain data queries

## Smart Contracts

### Anchor Validator (`anchor_validator.ak`)

The core smart contract that validates medical records on-chain.

**Location**: `smart-contracts/aiken/validators/anchor_validator.ak`

**Datum Structure**:
```aiken
pub type Datum {
  issuer_id: ByteArray,      // Doctor's public key hash
  patient_id: ByteArray,      // Patient ID
  record_hash: ByteArray,     // SHA-256 hash of medical record
  issued_at: Int,             // Unix timestamp (seconds)
}
```

**Validator Hash**: `fce9a95619c8b7a555b29ab7e44ddcb31ca8c4c825ea38d5c8a5c8a2`

**Validation Rules**:
1. Transaction must be signed by the `issuer_id` (doctor)
2. `record_hash` must not be empty
3. `issued_at` must be >= 0

### CarePoints Policy (`carepoints_policy.ak`)

Minting policy for CarePoints reward tokens.

**Location**: `smart-contracts/aiken/validators/carepoints_policy.ak`

**Policy Hash**: `8e768f2d97bc947db13970473c04c285c18385889c70ae52516c3261`

**Minting Rules**:
- Only the owner (defined pubkey hash) can mint
- Quantity must be between 1 and 100,000
- Can also burn tokens (negative quantity)

## Integration Architecture

### Frontend Components

1. **`lib/cardano/config.ts`**
   - Testnet configuration (Preprod, magic number: 1)
   - Blockfrost API endpoints
   - Smart contract validator hashes

2. **`lib/cardano/wallet.ts`**
   - Wallet connection (Nami, Eternl, Lace)
   - Address and pubkey hash retrieval

3. **`lib/cardano/uploadRecord.ts`**
   - Uploads medical records to Cardano
   - Creates datum matching Aiken contract structure
   - Uses CIP-20 metadata (label 674) for storage

4. **`lib/cardano/getRecord.ts`**
   - Retrieves records from blockchain via Blockfrost
   - Verifies record integrity
   - Falls back to localStorage for MVP

### API Routes

1. **`/api/record/upload`**
   - Accepts: `{ patientId, recordData, walletName, issuerPubKeyHash }`
   - Returns: `{ txHash, recordHash, timestamp, walletAddress }`
   - Stores metadata matching Aiken contract datum structure

2. **`/api/record/get`**
   - Accepts: `{ txHash }`
   - Returns: Full record with verification status
   - Queries Blockfrost API for real blockchain data

3. **`/api/doctor/streak`**
   - Tracks consecutive upload days
   - Calculates CarePoints rewards (10 base + 2 per streak day)

## Workflow

### Doctor Upload Flow

1. Doctor connects wallet (Nami/Eternl/Lace)
2. Fills medical record form
3. System:
   - Hashes record data (SHA-256)
   - Gets doctor's pubkey hash (issuer_id)
   - Creates datum: `{ issuer_id, patient_id, record_hash, issued_at }`
   - Submits transaction with metadata (CIP-20, label 674)
4. Transaction includes:
   - Anchor validator hash reference
   - Full datum structure
   - Minimum ADA (2 ADA for UTXO)
5. Returns transaction hash and QR code

### Patient Access Flow

1. Patient enters Patient ID or scans QR code
2. System:
   - Extracts transaction hash from QR
   - Queries Blockfrost API for transaction
   - Retrieves metadata (label 674)
   - Verifies anchor validator hash matches
   - Verifies record hash integrity
3. Displays verified medical record

## Testnet Configuration

### Preprod Testnet

- **Magic Number**: 1
- **Blockfrost URL**: `https://cardano-preprod.blockfrost.io/api/v0`
- **Explorer**: https://preprod.cardanoscan.io/
- **Faucet**: https://docs.cardano.org/cardano-testnet/tools/faucet

### Getting Test ADA

1. Generate wallet keys:
   ```bash
   cardano-cli address key-gen \
     --verification-key-file payment.vkey \
     --signing-key-file payment.skey
   ```

2. Build address:
   ```bash
   cardano-cli address build \
     --payment-verification-key-file payment.vkey \
     --stake-verification-key-file stake.vkey \
     --out-file payment.addr \
     --testnet-magic 1
   ```

3. Request test ADA from faucet:
   - Visit: https://docs.cardano.org/cardano-testnet/tools/faucet
   - Or use API: `curl -X POST 'https://faucet.preprod.world.dev.cardano.org/send-money/YOURADDRESS?api_key=YOURAPIKEY'`

## Environment Variables

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_BLOCKFROST_API_KEY=your_blockfrost_api_key_here
```

Get API key from: https://blockfrost.io/

## Smart Contract Deployment

### Building Contracts

```bash
cd smart-contracts/aiken
aiken build
```

This generates `plutus.json` with compiled contract hashes.

### Verification

The validator hashes are hardcoded in `lib/cardano/config.ts`:
- Anchor Validator: `fce9a95619c8b7a555b29ab7e44ddcb31ca8c4c825ea38d5c8a5c8a2`
- CarePoints Policy: `8e768f2d97bc947db13970473c04c285c18385889c70ae52516c3261`

These match the compiled contracts in `plutus.json`.

## Testing

### MVP Mode (LocalStorage)

For development/demo, the system uses localStorage to simulate blockchain storage. This allows testing without:
- Real wallet connections
- Test ADA requirements
- Network latency

### Production Mode (Real Testnet)

To use real Cardano testnet:

1. Set `NEXT_PUBLIC_BLOCKFROST_API_KEY` in `.env.local`
2. Connect real wallet (Nami/Eternl/Lace) on Preprod network
3. Ensure wallet has test ADA (2+ ADA minimum)
4. Transactions will be submitted to real testnet

## Security Considerations

1. **Private Keys**: Never exposed, handled by wallet extensions
2. **Record Data**: Only hash stored on-chain, full data in metadata (for MVP)
3. **Verification**: Anchor validator ensures issuer signature required
4. **Hash Integrity**: SHA-256 hashing prevents tampering

## Resources

- [Aiken Documentation](https://aiken-lang.org/)
- [Cardano Testnet Guide](https://docs.cardano.org/cardano-testnets/getting-started)
- [Mesh SDK Documentation](https://meshjs.dev/)
- [Blockfrost API](https://blockfrost.io/)
- [CIP-20 Metadata Standard](https://cips.cardano.org/cips/cip20/)

## Troubleshooting

### Wallet Connection Issues

- Ensure wallet extension is installed
- Check wallet is on Preprod testnet (not Mainnet)
- Clear browser cache and retry

### Transaction Failures

- Verify wallet has sufficient ADA (2+ ADA minimum)
- Check Blockfrost API key is valid
- Ensure network is set to "Preprod" in wallet

### Record Verification Fails

- Verify anchor validator hash matches
- Check record hash computation matches
- Ensure transaction metadata includes all required fields

## Next Steps

1. **Full UTXO Locking**: Move from metadata-only to locking ADA in validator script address
2. **Real Minting**: Implement CarePoints token minting using policy
3. **Backend Integration**: Connect to Django backend for persistent storage
4. **Production Deployment**: Deploy to Cardano Mainnet after thorough testing

