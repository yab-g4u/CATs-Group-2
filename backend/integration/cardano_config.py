"""
Cardano Configuration
Configuration for Cardano blockchain integration
"""
import os
from django.conf import settings

# Cardano Network Configuration
CARDANO_NETWORK = os.getenv("CARDANO_NETWORK", "preprod")  # preprod, preview, mainnet

# Blockfrost API Configuration
BLOCKFROST_PREPROD_URL = "https://cardano-preprod.blockfrost.io/api/v0"
BLOCKFROST_PREVIEW_URL = "https://cardano-preview.blockfrost.io/api/v0"
BLOCKFROST_MAINNET_URL = "https://cardano-mainnet.blockfrost.io/api/v0"

BLOCKFROST_API_KEY = os.getenv(
    "BLOCKFROST_API_KEY",
    "preprodBLXYKdWSTsopaLm2VNtPFCxzQCEGntEk"  # Default testnet key
)

def get_blockfrost_url():
    """Get Blockfrost URL based on network"""
    if CARDANO_NETWORK == "mainnet":
        return BLOCKFROST_MAINNET_URL
    elif CARDANO_NETWORK == "preview":
        return BLOCKFROST_PREVIEW_URL
    else:  # preprod (default)
        return BLOCKFROST_PREPROD_URL

# Aiken Smart Contract Validator Hashes (from plutus.json)
ANCHOR_VALIDATOR_HASH = "fce9a95619c8b7a555b29ab7e44ddcb31ca8c4c825ea38d5c8a5c8a2"
CAREPOINTS_POLICY_HASH = "8e768f2d97bc947db13970473c04c285c18385889c70ae52516c3261"

# Minimum ADA for UTXO (2 ADA)
MIN_ADA_UTXO = 2_000_000  # 2 ADA in lovelace

# Cardano Service URL (for transaction submission)
# This can be a separate service or use pycardano directly
CARDANO_SERVICE_URL = os.getenv("CARDANO_SERVICE_URL", "http://127.0.0.1:3000")

# Payment key and address (for signing transactions)
# In production, these should be stored securely
PAYMENT_KEY_PATH = os.getenv("CARDANO_PAYMENT_KEY_PATH", "smart-contracts/payment.vkey")
PAYMENT_ADDRESS = os.getenv("CARDANO_PAYMENT_ADDRESS", "")




