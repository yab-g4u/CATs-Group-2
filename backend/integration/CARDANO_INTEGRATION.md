# Cardano Integration Guide

This document describes the Cardano blockchain integration for the CATs medical records system.

## Overview

The backend integrates with Cardano blockchain to:
- Store medical record hashes on-chain using the Aiken anchor validator
- Mint CarePoints tokens as rewards for doctors
- Verify record authenticity using Blockfrost API

## Architecture

### Smart Contracts

The system uses Aiken smart contracts located in `smart-contracts/aiken/validators/`:

1. **Anchor Validator** (`anchor_validator.ak`)
   - Validator Hash: `fce9a95619c8b7a555b29ab7e44ddcb31ca8c4c825ea38d5c8a5c8a2`
   - Validates medical records with datum structure:
     ```python
     {
         "issuer_id": ByteArray,      # Doctor's public key hash
         "patient_id": ByteArray,      # Patient ID
         "record_hash": ByteArray,     # SHA-256 hash of record
         "issued_at": Int              # Unix timestamp
     }
     ```

2. **CarePoints Policy** (`carepoints_policy.ak`)
   - Policy Hash: `8e768f2d97bc947db13970473c04c285c18385889c70ae52516c3261`
   - Mints CarePoints tokens (1-100,000 per transaction)
   - Owner pubkey hash: `08ee30a2e0e28b3eaf109642374971c5aa4675f5a0ff71dc8d5988ae`

### Services

#### `cardano_config.py`
Configuration for Cardano network, Blockfrost API, and smart contract hashes.

#### `cardano_service.py`
Main service for Cardano operations:

- **`submit_record_to_cardano()`**: Submits medical records to Cardano
  - Hashes record data (SHA-256)
  - Creates datum matching Aiken contract structure
  - Submits transaction with CIP-20 metadata (label 674)
  - Returns `record_hash` and `tx_hash`

- **`verify_record_hash()`**: Verifies records on Cardano
  - Queries Blockfrost API for transaction details
  - Validates anchor validator hash
  - Verifies record hash and patient ID match
  - Returns verification result

- **`mint_care_points()`**: Mints CarePoints tokens
  - Creates redeemer matching Aiken contract
  - Mints tokens to doctor's Cardano address
  - Returns transaction hash

- **`get_care_points_balance()`**: Gets CarePoints balance
  - Queries Blockfrost API for token balance
  - Returns balance as integer

## Configuration

### Environment Variables

Add these to your `.env` file or Django settings:

```bash
# Cardano Network (preprod, preview, mainnet)
CARDANO_NETWORK=preprod

# Blockfrost API Key
BLOCKFROST_API_KEY=your_blockfrost_api_key_here

# Cardano Service URL (optional, for transaction submission)
CARDANO_SERVICE_URL=http://127.0.0.1:3000

# Payment Key Path (optional, for signing transactions)
CARDANO_PAYMENT_KEY_PATH=smart-contracts/payment.vkey

# Payment Address (optional)
CARDANO_PAYMENT_ADDRESS=your_cardano_address_here
```

### Blockfrost API

1. Sign up at [Blockfrost.io](https://blockfrost.io/)
2. Create a project for Preprod testnet
3. Copy your API key to `BLOCKFROST_API_KEY`

### Cardano Service (Optional)

For transaction submission, you can either:

1. **Use a Node.js service** (recommended for production):
   - Create a service using Mesh SDK or Lucid
   - Expose endpoints: `/submitRecord`, `/mintCarePoints`
   - Set `CARDANO_SERVICE_URL` to point to this service

2. **Use pycardano directly** (requires more setup):
   - Install `pycardano`: `pip install pycardano`
   - Implement transaction building in Python
   - Update `cardano_service.py` to use pycardano

## Workflow

### Creating a Patient Record

1. Doctor creates patient via `/doctor/create-patient/`
2. Backend:
   - Generates unique `health_id`
   - Creates patient profile
   - Prepares record data
   - Uploads to IPFS (optional)
   - Submits to Cardano via `submit_record_to_cardano()`
   - Updates patient with `cardano_tx_hash` and `cardano_record_hash`
   - Updates doctor streak
   - Calculates CarePoints reward (10 base + 2 per streak day)
   - Mints CarePoints to doctor's address
   - Generates QR code with record hash
3. Returns patient ID, health ID, and QR code URL

### Verifying a Record

1. Patient or doctor provides `record_hash` and `patient_id`
2. Backend calls `verify_record_hash()`
3. Service queries Blockfrost API for transaction
4. Validates:
   - Anchor validator hash matches
   - Record hash matches
   - Patient ID matches
5. Returns verification result

### Minting CarePoints

1. Doctor creates patient record
2. Backend calculates reward based on streak
3. Calls `mint_care_points()` with:
   - Doctor's Cardano address
   - Reward amount
   - Owner pubkey hash
4. Service creates transaction with CarePoints policy
5. Updates doctor's `care_points_balance` in database
6. Records transaction in `CarePointsTransaction` model

## Database Models

### DoctorProfile
- `cardano_address`: Doctor's Cardano wallet address
- `care_points_balance`: Total CarePoints earned
- `last_record_date`: Last date a record was created
- `current_streak`: Current consecutive days streak

### PatientProfile
- `ipfs_hash`: IPFS hash of record (optional)
- `cardano_tx_hash`: Cardano transaction hash
- `cardano_record_hash`: Hash of record stored on Cardano
- `created_by_doctor`: Doctor who created the patient

### CarePointsTransaction
- `doctor`: Foreign key to DoctorProfile
- `amount`: CarePoints amount
- `transaction_type`: Type of transaction
- `cardano_tx_hash`: Cardano transaction hash
- `created_at`: Transaction timestamp

## API Endpoints

### Doctor Endpoints

- `POST /doctor/create-patient/`: Create patient with Cardano integration
- `GET /doctor/care-points/`: Get CarePoints balance and streak
- `POST /doctor/verify-cardano-hash/`: Verify a Cardano record hash
- `GET /doctor/care-points/transactions/`: Get CarePoints transaction history

## Development Mode

When the Cardano service is not available, the system operates in **mock mode**:
- Returns mock transaction hashes
- Logs operations to console
- Allows development without Cardano node

To enable real Cardano integration:
1. Set up Blockfrost API key
2. Configure Cardano service or use pycardano
3. Set doctor's `cardano_address` in database

## Testing

### Testnet

The system is configured for **Preprod testnet** by default:
- Network: Preprod (magic number: 1)
- Blockfrost URL: `https://cardano-preprod.blockfrost.io/api/v0`
- Explorer: https://preprod.cardanoscan.io/

### Test Transactions

1. Get test ADA from [Cardano Testnet Faucet](https://docs.cardano.org/cardano-testnet/tools/faucet)
2. Create a test doctor profile with Cardano address
3. Create a patient record
4. Check transaction on Preprod explorer
5. Verify CarePoints balance

## Troubleshooting

### "Error calling Cardano service"
- Check if `CARDANO_SERVICE_URL` is correct
- Ensure Cardano service is running (if using external service)
- System will fall back to mock mode

### "Error querying Blockfrost API"
- Verify `BLOCKFROST_API_KEY` is set correctly
- Check API key has access to Preprod testnet
- Ensure network configuration matches

### "Invalid CarePoints amount"
- Amount must be between 1 and 100,000
- Check `calculate_care_points_reward()` function

### "Doctor profile not found"
- Ensure doctor has a `DoctorProfile` record
- System will auto-create if missing

## Production Considerations

1. **Security**:
   - Store payment keys securely (use environment variables)
   - Never commit keys to repository
   - Use hardware wallets for production

2. **Performance**:
   - Cache Blockfrost API responses
   - Use async operations for Cardano calls
   - Consider rate limiting

3. **Monitoring**:
   - Log all Cardano transactions
   - Monitor Blockfrost API usage
   - Track CarePoints minting

4. **Network**:
   - Switch to mainnet for production
   - Update validator hashes if contracts change
   - Test thoroughly on testnet first

## Resources

- [Aiken Documentation](https://aiken-lang.org/)
- [Blockfrost API Docs](https://docs.blockfrost.io/)
- [Cardano Testnet Guide](https://docs.cardano.org/cardano-testnet/)
- [Mesh SDK](https://mesh.martify.io/) (for frontend integration)
- [Lucid](https://lucid.spacebudz.io/) (alternative Cardano library)




