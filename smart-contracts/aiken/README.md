# DINA - Aiken Smart Contracts for Referral Integrity System

This directory contains Aiken smart contracts for the **DINA (Digital Referral Integrity System)** on Cardano, ensuring medical referrals are authentic and tamper-proof.

## Project Structure

```
aiken/
├── aiken.toml              # Project configuration
├── plutus.json             # Compiled Plutus scripts
├── validators/             # Smart contract validators
│   ├── anchor_validator.ak # Core DINA validator for referral proofs
│   ├── carepoints_policy.ak # Minting policy for CarePoints rewards
│   ├── referral.ak         # Placeholder/advanced referral logic
│   ├── hello_world.ak      # Basic example (not used in DINA)
│   └── hash.py             # Hash utility (Python)
├── tests/                  # Test files
│   ├── hello_world_test.ak
│   └── referral_test.ak
├── scripts/                # Off-chain scripts and demo
│   ├── demo.py             # Mock CLI for referrals
│   ├── index.html          # Browser demo with Lucid
│   └── verify.py           # Mock verification
├── data/                   # Mock data stores
├── env/                    # Environment configs
└── build/                  # Compiled outputs
```

## Prerequisites

1. **Install Aiken**: https://aiken-lang.org/

   ```powershell
   cargo install aiken
   ```

2. **Install Cardano CLI** (optional, for advanced deployment):

   - Download from: https://github.com/IntersectMBO/cardano-node/releases

3. **Set up Testnet**: Use Preprod testnet. Get ADA from faucet: https://docs.cardano.org/cardano-testnet/tools/faucet

## Quick Start

### 1. Verify Installation

```powershell
cd smart-contracts/aiken
aiken --version
```

### 2. Build Contracts

```powershell
aiken build
```

### 3. Run Tests

```powershell
aiken check
aiken test
```

## Contracts Overview

### Anchor Validator (DINA Core)

**File**: `validators/anchor_validator.ak`

Enforces DINA referral integrity:

- **Datum**: `issuer_id`, `patient_id`, `record_hash` (referral hash)
- **Validation**:
  - Issuer signature required
  - Referral hash present and valid
  - Timestamp ≤ transaction time
- **Purpose**: Stores referral proofs on-chain immutably, without sensitive data.

### CarePoints Policy (Added Feature)

**File**: `validators/carepoints_policy.ak`

Minting policy for CarePoints rewards:

- Sig-based policy (wallet owner can mint)
- Used for rewarding doctors per referral/work.

### Referral Validator (Placeholder)

**File**: `validators/referral.ak`

Advanced referral logic (not integrated in demo).

## Demo Workflow (No Full Deployment Needed)

Instead of manual deployment, use the browser demo for testing:

1. **Run Demo**: Open `scripts/index.html` in browser with Eternl wallet.
2. **Connect Wallet**: Preprod network.
3. **Anchor Referral**: Stores mock referral proof on-chain, earns CP, generates QR.
4. **Verify**: Enter tx hash to retrieve proof from blockchain.
5. **Check Explorer**: View tx on https://preprod.cardanoscan.io/

This proves DINA concept with real testnet transactions.

## Deployment Guide (For Production)

### Step 1: Compile Contract

```powershell
aiken build
```

### Step 2: Export Blueprint

```powershell
aiken blueprint convert -m validators/anchor_validator > anchor_blueprint.json
```

### Step 3: Get Script Address (Using Lucid or cardano-cli)

- Use Lucid in code: `lucid.utils.validatorToAddress(validator)`
- Or cardano-cli with CBOR.

### Step 4: Submit Transactions

- Use Lucid (as in demo) for easy submission.
- Or cardano-cli for advanced cases.

## Backend Integration

The backend (Django) should:

1. **Generate Referral**:

   ```python
   referral = {"patient_id": "...", "doctor_id": "...", "details": "..."}
   ```

2. **Compute Hash**:

   ```python
   import hashlib
   hash_obj = hashlib.sha256(json.dumps(referral, sort_keys=True).encode())
   referral_hash = hash_obj.digest()
   ```

3. **Submit to Cardano**:

   - Use Lucid or Blockfrost API to create tx with metadata: `{674: {referral_hash, issuer_id, timestamp}}`
   - Return tx hash.

4. **API Endpoints**:
   - `POST /refer`: Submit referral, return tx hash.
   - `GET /verify/{tx_hash}`: Verify via Blockfrost.

## Development Workflow

1. Edit validators in `validators/`
2. Write tests in `tests/`
3. `aiken check` → `aiken test` → `aiken build`
4. Test with demo script
5. Deploy for production

## Resources

- [Aiken Docs](https://aiken-lang.org/)
- [Cardano Testnet](https://docs.cardano.org/cardano-testnet/)
- [Lucid Docs](https://lucid.spacebudz.io/) (for off-chain)

## Troubleshooting

- **Build Errors**: Check `aiken.toml`, run `aiken check`
- **Demo Issues**: Ensure Eternl wallet, Preprod network
- **Tx Failures**: Check Blockfrost API key in `env/blockfrost.env`
