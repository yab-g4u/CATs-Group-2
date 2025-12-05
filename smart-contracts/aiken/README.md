# Aiken Smart Contracts - Referral System

This directory contains Aiken smart contracts for the Cardano referral system.

## Project Structure

```
aiken/
├── aiken.toml          # Project configuration
├── validators/         # Smart contract validators
│   ├── hello_world.ak  # Basic hello world example
│   └── referral.ak     # Referral contract validator
└── tests/              # Test files
    ├── hello_world_test.ak
    └── referral_test.ak
```

## Prerequisites

1. **Install Aiken**: Follow instructions at https://aiken-lang.org/
   ```powershell
   # On Windows (using cargo)
   cargo install aiken
   
   # Or download from releases
   # https://github.com/aiken-lang/aiken/releases
   ```

2. **Install Cardano CLI** (for testnet interaction):
   - Download from: https://github.com/IntersectMBO/cardano-node/releases
   - Or use Nix: `nix-shell -p cardano-cli`

3. **Set up Cardano Testnet**:
   - Use pre-production testnet or preview testnet
   - Get testnet ADA from faucet: https://docs.cardano.org/cardano-testnet/tools/faucet

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

### 4. Compile to UPLC

```powershell
# Build and get the compiled script
aiken build

# The compiled scripts will be in the build directory
```

## Contracts Overview

### Hello World Validator

A simple validator that demonstrates basic Aiken syntax:
- Requires redeemer to be "Hello, World!"
- Requires datum to match "Hello, World!"

### Referral Validator

The main referral smart contract with the following features:

**Datum Structure:**
- `referral_hash`: SHA-256 hash of the referral packet (ByteArray)
- `issuer_id`: Identifier of the issuer (ByteArray)
- `issued_at`: POSIX timestamp when issued (Int)

**Validation Rules:**
1. ✅ Issuer must sign the transaction (`issuer_id` in `extra_signatories`)
2. ✅ Referral hash must be set (non-empty)
3. ✅ Timestamp must be valid (not too old, not in future)

## Deployment Guide

### Step 1: Compile Contract

```powershell
aiken build
```

This generates UPLC (Untyped Plutus Core) bytecode.

### Step 2: Get Script Address

```powershell
# Export the validator
aiken blueprint convert -m validators/referral > referral.json

# Use cardano-cli to get address (after converting to CBOR)
cardano-cli address build \
  --payment-script-file referral.cbor \
  --testnet-magic 1 \
  --out-file referral.addr
```

### Step 3: Lock Funds

Create a transaction that locks ADA to the script address with the referral datum.

### Step 4: Verify on Explorer

Check your transaction on:
- Preprod: https://preprod.cardanoscan.io/
- Preview: https://preview.cardanoscan.io/

## Backend Integration

See `backend_integration_example.py` for a complete Python example.

The backend should:

1. **Generate Referral Packet**:
   ```python
   referral_packet = {
       "patient_id": "...",
       "doctor_id": "...",
       "facility": "...",
       "timestamp": "..."
   }
   ```

2. **Hash Packet** (SHA-256):
   ```python
   import hashlib
   packet_json = json.dumps(referral_packet, sort_keys=True)
   referral_hash = hashlib.sha256(packet_json.encode()).digest()
   ```

3. **Build Cardano Transaction**:
   - Create datum with `referral_hash`, `issuer_id`, `issued_at`
   - Lock ADA to script address
   - Sign with issuer's private key

4. **Submit Transaction**:
   - Submit to Cardano testnet
   - Return transaction ID

5. **Expose API**:
   ```
   POST /refer
   → Returns: { "txHash": "...", "referralHash": "...", "status": "pending" }
   ```

**Note**: For production, use proper Cardano libraries like `pycardano` or interact with `cardano-cli` via subprocess.

## Development Workflow

1. **Edit contracts** in `validators/`
2. **Write tests** in `tests/`
3. **Check syntax**: `aiken check`
4. **Run tests**: `aiken test`
5. **Build**: `aiken build`
6. **Deploy**: Follow deployment guide above

## Resources

- [Aiken Documentation](https://aiken-lang.org/)
- [Aiken Standard Library](https://aiken-lang.org/stdlib/)
- [Cardano Testnet Guide](https://docs.cardano.org/cardano-testnet/)
- [Plutus Documentation](https://plutus.readthedocs.io/)

## Troubleshooting

### Aiken not found
- Ensure Aiken is in your PATH
- Try: `cargo install aiken` or download from releases

### Build errors
- Check `aiken.toml` configuration
- Ensure dependencies are correct
- Run `aiken check` for detailed errors

### Test failures
- Review test context setup
- Check that test data matches validator expectations

