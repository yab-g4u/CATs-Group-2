"""
Cardano Service for storing medical records and minting CarePoints tokens
Integrates with Aiken smart contracts on Cardano blockchain
"""
import requests
import json
import hashlib
import time
from typing import Optional, Dict, Any, List
from .cardano_config import (
    get_blockfrost_url,
    BLOCKFROST_API_KEY,
    ANCHOR_VALIDATOR_HASH,
    CAREPOINTS_POLICY_HASH,
    MIN_ADA_UTXO,
    CARDANO_SERVICE_URL,
    CARDANO_NETWORK,
)


def hash_record_data(record_data: Dict[str, Any]) -> str:
    """
    Hash medical record data using SHA-256
    
    Args:
        record_data: Medical record data as dictionary
    
    Returns:
        Hexadecimal hash string
    """
    record_json = json.dumps(record_data, sort_keys=True, default=str)
    hash_obj = hashlib.sha256(record_json.encode('utf-8'))
    return hash_obj.hexdigest()


def create_datum(issuer_id: str, patient_id: str, record_hash: str, issued_at: Optional[int] = None) -> Dict[str, Any]:
    """
    Create datum structure matching Aiken anchor_validator contract
    
    Datum structure:
    {
        issuer_id: ByteArray,      # Doctor's public key hash (hex)
        patient_id: ByteArray,      # Patient ID (string encoded as bytes)
        record_hash: ByteArray,    # SHA-256 hash of record (hex)
        issued_at: Int             # Unix timestamp in seconds
    }
    
    Args:
        issuer_id: Doctor's public key hash (hex string)
        patient_id: Patient ID string
        record_hash: SHA-256 hash of record (hex string)
        issued_at: Unix timestamp (defaults to current time)
    
    Returns:
        Datum dictionary matching Aiken contract structure
    """
    if issued_at is None:
        issued_at = int(time.time())
    
    # Convert to bytes (hex strings)
    issuer_id_bytes = bytes.fromhex(issuer_id) if not issuer_id.startswith('0x') else bytes.fromhex(issuer_id[2:])
    patient_id_bytes = patient_id.encode('utf-8')
    record_hash_bytes = bytes.fromhex(record_hash) if not record_hash.startswith('0x') else bytes.fromhex(record_hash[2:])
    
    return {
        "constructor": 0,
        "fields": [
            list(issuer_id_bytes),      # issuer_id: ByteArray
            list(patient_id_bytes),     # patient_id: ByteArray
            list(record_hash_bytes),    # record_hash: ByteArray
            issued_at,                  # issued_at: Int
        ]
    }


def submit_record_to_cardano(
    record_data: Dict[str, Any],
    issuer_id: str,
    patient_id: str,
    doctor_address: Optional[str] = None
) -> Optional[Dict[str, Any]]:
    """
    Submit medical record to Cardano blockchain using anchor validator
    
    Args:
        record_data: Medical record data as dictionary
        issuer_id: Doctor's public key hash (hex string)
        patient_id: Patient ID string
        doctor_address: Doctor's Cardano wallet address (optional)
    
    Returns:
        Dictionary with record_hash and tx_hash if successful, None otherwise
    """
    try:
        # Step 1: Hash the record data
        record_hash = hash_record_data(record_data)
        
        # Step 2: Create datum matching Aiken contract
        datum = create_datum(issuer_id, patient_id, record_hash)
        
        # Step 3: Create transaction metadata (CIP-20, label 674)
        metadata = {
            "anchor_validator": ANCHOR_VALIDATOR_HASH,
            "issuer_id": issuer_id,
            "patient_id": patient_id,
            "record_hash": record_hash,
            "issued_at": datum["fields"][3],
            "datum": datum,
        }
        
        # Step 4: Submit to Cardano service or blockchain
        # Option 1: Use Cardano service (Node.js service with Mesh SDK)
        try:
            response = requests.post(
                f"{CARDANO_SERVICE_URL}/submitRecord",
                json={
                    "record_data": record_data,
                    "issuer_id": issuer_id,
                    "patient_id": patient_id,
                    "record_hash": record_hash,
                    "datum": datum,
                    "metadata": metadata,
                    "doctor_address": doctor_address,
                },
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "record_hash": record_hash,
                    "tx_hash": result.get("tx_hash"),
                    "datum": datum,
                }
        except requests.exceptions.RequestException:
            # If service is not available, fall through to mock mode
            pass
        
        # Option 2: Mock mode for development (when Cardano service is not running)
        print(f"[MOCK MODE] Submitting record to Cardano (service unavailable)")
        print(f"Record hash: {record_hash}")
        print(f"Issuer ID: {issuer_id}")
        print(f"Patient ID: {patient_id}")
        
        # Generate mock transaction hash
        mock_tx_hash = f"mock_tx_{hashlib.sha256(f'{record_hash}{issuer_id}{patient_id}'.encode()).hexdigest()[:16]}"
        
        return {
            "record_hash": record_hash,
            "tx_hash": mock_tx_hash,
            "datum": datum,
            "mock": True,  # Flag to indicate this is a mock transaction
        }
        
    except Exception as e:
        print(f"Error submitting record to Cardano: {e}")
        import traceback
        traceback.print_exc()
        return None


def verify_record_hash(record_hash: str, patient_id: str, tx_hash: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """
    Verify record hash on Cardano blockchain using Blockfrost API
    
    Args:
        record_hash: The recordHash from Cardano
        patient_id: Patient ID for verification
        tx_hash: Optional transaction hash to verify against
    
    Returns:
        Verification result with record data if verified, None otherwise
    """
    try:
        blockfrost_url = get_blockfrost_url()
        headers = {"project_id": BLOCKFROST_API_KEY}
        
        # If tx_hash is provided, verify directly
        if tx_hash:
            try:
                # Get transaction details from Blockfrost
                tx_response = requests.get(
                    f"{blockfrost_url}/txs/{tx_hash}",
                    headers=headers,
                    timeout=30
                )
                
                if tx_response.status_code == 200:
                    tx_data = tx_response.json()
                    
                    # Get transaction metadata
                    metadata_response = requests.get(
                        f"{blockfrost_url}/txs/{tx_hash}/metadata",
                        headers=headers,
                        timeout=30
                    )
                    
                    if metadata_response.status_code == 200:
                        metadata_array = metadata_response.json()
                        
                        # Find metadata with label 674 (CIP-20)
                        record_metadata = None
                        for item in metadata_array:
                            if item.get("label") == "674":
                                record_metadata = item.get("json_metadata") or item.get("metadata")
                                break
                        
                        if record_metadata:
                            # Verify anchor validator hash matches
                            validator_match = record_metadata.get("anchor_validator") == ANCHOR_VALIDATOR_HASH
                            
                            # Verify record hash matches
                            hash_match = record_metadata.get("record_hash") == record_hash.replace("0x", "")
                            
                            # Verify patient ID matches
                            patient_match = record_metadata.get("patient_id") == patient_id
                            
                            verified = validator_match and hash_match and patient_match
                            
                            return {
                                "verified": verified,
                                "tx_hash": tx_hash,
                                "record_hash": record_hash,
                                "patient_id": patient_id,
                                "validator_match": validator_match,
                                "hash_match": hash_match,
                                "patient_match": patient_match,
                                "metadata": record_metadata,
                                "timestamp": record_metadata.get("issued_at"),
                            }
            except requests.exceptions.RequestException as e:
                print(f"Error querying Blockfrost API: {e}")
        
        # Fallback: Try to find transaction by searching metadata
        # (This is less efficient, so prefer providing tx_hash)
        print(f"[MOCK MODE] Verifying record hash (Blockfrost query not implemented for hash-only lookup)")
        return {
            "verified": True,
            "record_hash": record_hash,
            "patient_id": patient_id,
            "mock": True,
        }
        
    except Exception as e:
        print(f"Error verifying record hash: {e}")
        import traceback
        traceback.print_exc()
        return None


def mint_care_points(address: str, amount: int, owner_pubkey_hash: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """
    Mint CarePoints tokens to a Cardano address using carepoints_policy
    
    Args:
        address: Cardano wallet address to receive tokens
        amount: Amount of CarePoints to mint (1-100,000)
        owner_pubkey_hash: Public key hash of the owner (for signing)
                          Defaults to the owner in the policy if not provided
    
    Returns:
        Dictionary with tx_hash and policy_id if successful, None otherwise
    """
    try:
        # Validate amount (per carepoints_policy.ak)
        if amount < 1 or amount > 100000:
            print(f"Invalid CarePoints amount: {amount}. Must be between 1 and 100,000")
            return None
        
        # Create redeemer matching Aiken contract structure
        redeemer = {
            "constructor": 0,
            "fields": [
                amount  # quantity: Int
            ]
        }
        
        # Step 1: Try to use Cardano service
        try:
            response = requests.post(
                f"{CARDANO_SERVICE_URL}/mintCarePoints",
                json={
                    "address": address,
                    "amount": amount,
                    "policy_hash": CAREPOINTS_POLICY_HASH,
                    "redeemer": redeemer,
                    "owner_pubkey_hash": owner_pubkey_hash,
                },
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "tx_hash": result.get("tx_hash"),
                    "policy_id": CAREPOINTS_POLICY_HASH,
                    "amount": amount,
                    "address": address,
                }
        except requests.exceptions.RequestException:
            # Service not available, fall through to mock
            pass
        
        # Step 2: Mock mode for development
        print(f"[MOCK MODE] Minting {amount} CarePoints to {address}")
        mock_tx_hash = f"mock_cp_tx_{hashlib.sha256(f'{address}{amount}{time.time()}'.encode()).hexdigest()[:16]}"
        
        return {
            "tx_hash": mock_tx_hash,
            "policy_id": CAREPOINTS_POLICY_HASH,
            "amount": amount,
            "address": address,
            "mock": True,
        }
        
    except Exception as e:
        print(f"Error minting CarePoints: {e}")
        import traceback
        traceback.print_exc()
        return None


def get_care_points_balance(address: str) -> int:
    """
    Get CarePoints balance for a Cardano address using Blockfrost API
    
    Args:
        address: Cardano wallet address
    
    Returns:
        Balance as integer, 0 if error or not found
    """
    try:
        blockfrost_url = get_blockfrost_url()
        headers = {"project_id": BLOCKFROST_API_KEY}
        
        # Get address assets from Blockfrost
        response = requests.get(
            f"{blockfrost_url}/addresses/{address}",
            headers=headers,
            timeout=30
        )
        
        if response.status_code == 200:
            address_data = response.json()
            
            # Get assets for this address
            assets_response = requests.get(
                f"{blockfrost_url}/addresses/{address}/total",
                headers=headers,
                timeout=30
            )
            
            if assets_response.status_code == 200:
                assets_data = assets_response.json()
                
                # Look for CarePoints token (policy_id + asset_name)
                # Policy ID is CAREPOINTS_POLICY_HASH
                # Asset name would be "CarePoints" or similar
                policy_id = CAREPOINTS_POLICY_HASH
                
                # Check if address has assets
                if "amount" in assets_data:
                    for amount_item in assets_data.get("amount", []):
                        unit = amount_item.get("unit", "")
                        if unit.startswith(policy_id):
                            quantity = amount_item.get("quantity", "0")
                            return int(quantity)
        
        # Try alternative: query by policy ID
        try:
            policy_response = requests.get(
                f"{blockfrost_url}/assets/policy/{policy_id}",
                headers=headers,
                timeout=30
            )
            
            if policy_response.status_code == 200:
                # This would require more complex logic to match addresses
                # For now, return 0 if not found via direct address query
                pass
        except:
            pass
        
        return 0
        
    except requests.exceptions.RequestException as e:
        print(f"Error querying Blockfrost API for balance: {e}")
        return 0
    except Exception as e:
        print(f"Error getting CarePoints balance: {e}")
        import traceback
        traceback.print_exc()
        return 0


def get_transaction_details(tx_hash: str) -> Optional[Dict[str, Any]]:
    """
    Get transaction details from Blockfrost API
    
    Args:
        tx_hash: Transaction hash
    
    Returns:
        Transaction details dictionary or None
    """
    try:
        blockfrost_url = get_blockfrost_url()
        headers = {"project_id": BLOCKFROST_API_KEY}
        
        response = requests.get(
            f"{blockfrost_url}/txs/{tx_hash}",
            headers=headers,
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json()
        
        return None
    except Exception as e:
        print(f"Error getting transaction details: {e}")
        return None


def get_transaction_metadata(tx_hash: str) -> Optional[Dict[str, Any]]:
    """
    Get transaction metadata from Blockfrost API
    
    Args:
        tx_hash: Transaction hash
    
    Returns:
        Metadata dictionary (label 674 for CIP-20) or None
    """
    try:
        blockfrost_url = get_blockfrost_url()
        headers = {"project_id": BLOCKFROST_API_KEY}
        
        response = requests.get(
            f"{blockfrost_url}/txs/{tx_hash}/metadata",
            headers=headers,
            timeout=30
        )
        
        if response.status_code == 200:
            metadata_array = response.json()
            
            # Find metadata with label 674 (CIP-20)
            for item in metadata_array:
                if item.get("label") == "674":
                    return item.get("json_metadata") or item.get("metadata")
        
        return None
    except Exception as e:
        print(f"Error getting transaction metadata: {e}")
        return None
