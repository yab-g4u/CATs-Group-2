# Getting Started with Aiken - Step by Step

This guide walks you through setting up and testing your Aiken smart contracts.

## Step 1: Install Aiken (0-2 Hours)

### Windows Installation

**Option A: Using Cargo (Recommended if you have Rust)**
```powershell
# Install Rust if you don't have it
# Download from: https://rustup.rs/

# Install Aiken
cargo install aiken
```

**Option B: Download Pre-built Binary**
1. Go to: https://github.com/aiken-lang/aiken/releases
2. Download the latest Windows release
3. Extract and add to PATH

**Verify Installation:**
```powershell
aiken --version
```

### Install Cardano CLI (for testnet)

1. Download from: https://github.com/IntersectMBO/cardano-node/releases
2. Extract and add to PATH
3. Verify:
```powershell
cardano-cli --version
```

## Step 2: Set Up Cardano Testnet

### Get Testnet ADA

1. **Pre-production Testnet** (recommended):
   - Faucet: https://docs.cardano.org/cardano-testnet/tools/faucet
   - Network Magic: `1`
   - Explorer: https://preprod.cardanoscan.io/

2. **Preview Testnet**:
   - Network Magic: `2`
   - Explorer: https://preview.cardanoscan.io/

### Create Test Wallet

```powershell
# Generate payment key pair
cardano-cli address key-gen 
  --verification-key-file payment.vkey 
  --signing-key-file payment.skey

# Generate address
cardano-cli address build \
  --payment-verification-key-file payment.vkey \
  --testnet-magic 1 \
  --out-file payment.addr

# Get your address
cat payment.addr
```

Use this address to request testnet ADA from the faucet.

## Step 3: Build Your Contracts

```powershell
cd smart-contracts/aiken

# Check for errors
aiken check

# Build contracts
aiken build

# Run tests (if tests are set up)
aiken test
```

## Step 4: Deploy Hello World Contract

### Compile to CBOR

```powershell
# Build the project
aiken build

# The compiled scripts are in the build directory
# You'll need to convert to CBOR format for cardano-cli
```

### Get Script Address

```powershell
# Export blueprint (if supported)
aiken blueprint convert -m validators/hello_world > hello_world.json

# Use cardano-cli to build address
# (You'll need the CBOR file - conversion steps depend on Aiken version)
```

## Step 5: Test the Referral Contract

### Manual Testing Steps

1. **Generate a referral packet** (use `backend_integration_example.py`):
   ```python
   packet = {
       "patient_id": "P-12345",
       "doctor_id": "D-67890",
       "facility": "General Hospital"
   }
   ```

2. **Hash the packet**:
   ```python
   import hashlib
   import json
   hash_bytes = hashlib.sha256(
       json.dumps(packet, sort_keys=True).encode()
   ).digest()
   ```

3. **Create datum**:
   ```python
   datum = {
       "referral_hash": hash_bytes.hex(),
       "issuer_id": "doctor_wallet_key".encode().hex(),
       "issued_at": int(time.time())
   }
   ```

4. **Build and submit transaction** (using cardano-cli or pycardano)

## Step 6: Backend Integration

See `backend_integration_example.py` for a complete example.

### API Endpoint Example (Django)

```python
# views.py
from django.http import JsonResponse
from .cardano_service import create_referral_transaction

def create_referral(request):
    if request.method == 'POST':
        data = request.json
        
        # Generate packet, hash, create datum, submit tx
        result = create_referral_transaction(
            patient_id=data['patient_id'],
            doctor_id=data['doctor_id'],
            facility=data['facility']
        )
        
        return JsonResponse({
            'txHash': result['tx_hash'],
            'referralHash': result['referral_hash'],
            'status': 'pending'
        })
```

## Common Issues

### "aiken: command not found"
- Ensure Aiken is in your PATH
- Try restarting your terminal
- On Windows, check if you need to add `.exe` extension

### Build Errors
- Run `aiken check` to see detailed error messages
- Ensure `aiken.toml` is correct
- Check that all dependencies are available

### Test Failures
- Review test syntax - Aiken testing framework may have specific requirements
- Check that test data matches validator expectations
- Ensure context is properly set up in tests

## Next Steps

1. ✅ Complete Step 1: Environment setup
2. ✅ Complete Step 2: Hello-world contract
3. ⏭️ Step 3: Referral contract (already created)
4. ⏭️ Step 4: Deploy to testnet
5. ⏭️ Step 5: Backend integration

## Resources

- [Aiken Documentation](https://aiken-lang.org/)
- [Aiken Standard Library](https://aiken-lang.org/stdlib/)
- [Cardano Testnet Guide](https://docs.cardano.org/cardano-testnet/)
- [Aiken Discord](https://discord.gg/aiken-lang)

