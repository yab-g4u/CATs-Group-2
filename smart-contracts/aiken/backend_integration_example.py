"""
Backend Integration Example for Referral Smart Contract

This example shows how to integrate the Aiken referral smart contract
with a Python/Django backend.

Prerequisites:
- pycardano (Cardano Python library)
- cardano-cli installed
- Aiken contract compiled
"""

import hashlib
import json
from datetime import datetime
from typing import Dict, Any

# Example using pycardano (install: pip install pycardano)
# from pycardano import *

def generate_referral_packet(
    patient_id: str,
    doctor_id: str,
    facility: str,
    notes: str = ""
) -> Dict[str, Any]:
    """
    Generate a referral packet with all necessary information.
    
    Returns:
        Dictionary containing the referral packet data
    """
    return {
        "patient_id": patient_id,
        "doctor_id": doctor_id,
        "facility": facility,
        "notes": notes,
        "timestamp": datetime.utcnow().isoformat(),
    }


def hash_referral_packet(packet: Dict[str, Any]) -> bytes:
    """
    Hash the referral packet using SHA-256.
    
    Args:
        packet: The referral packet dictionary
        
    Returns:
        SHA-256 hash as bytes
    """
    # Sort keys for consistent hashing
    packet_json = json.dumps(packet, sort_keys=True)
    return hashlib.sha256(packet_json.encode()).digest()


def create_referral_datum(
    referral_hash: bytes,
    issuer_id: bytes,
    issued_at: int
) -> Dict[str, Any]:
    """
    Create the datum structure for the referral contract.
    
    Args:
        referral_hash: SHA-256 hash of the referral packet
        issuer_id: ByteArray identifier of the issuer
        issued_at: POSIX timestamp
        
    Returns:
        Datum structure matching the Aiken contract
    """
    return {
        "referral_hash": referral_hash.hex(),  # Convert to hex for JSON
        "issuer_id": issuer_id.hex(),
        "issued_at": issued_at,
    }


def build_cardano_transaction(
    script_address: str,
    datum: Dict[str, Any],
    amount_ada: float = 2.0,  # Minimum ADA to lock
    issuer_skey_path: str = "issuer.skey"
) -> Dict[str, Any]:
    """
    Build a Cardano transaction that locks funds to the script.
    
    This is a simplified example. In production, use pycardano or cardano-cli.
    
    Args:
        script_address: The script address from compiled contract
        datum: The datum to attach
        amount_ada: Amount of ADA to lock
        issuer_skey_path: Path to issuer's signing key
        
    Returns:
        Transaction details (simplified)
    """
    # Example transaction structure
    # In production, use proper Cardano transaction building
    return {
        "type": "lock",
        "script_address": script_address,
        "datum": datum,
        "amount": amount_ada,
        "signer": issuer_skey_path,
    }


# Example API endpoint handler (Django/Flask style)
def handle_referral_request(request_data: Dict[str, Any]) -> Dict[str, str]:
    """
    Handle POST /refer API endpoint.
    
    Args:
        request_data: Request body with patient_id, doctor_id, facility, etc.
        
    Returns:
        Dictionary with transaction hash
    """
    # 1. Generate referral packet
    packet = generate_referral_packet(
        patient_id=request_data["patient_id"],
        doctor_id=request_data["doctor_id"],
        facility=request_data["facility"],
        notes=request_data.get("notes", ""),
    )
    
    # 2. Hash the packet
    referral_hash = hash_referral_packet(packet)
    
    # 3. Get issuer ID (from authenticated user or config)
    issuer_id = request_data["issuer_id"].encode()  # Convert to bytes
    
    # 4. Get current timestamp
    issued_at = int(datetime.utcnow().timestamp())
    
    # 5. Create datum
    datum = create_referral_datum(referral_hash, issuer_id, issued_at)
    
    # 6. Build transaction (simplified - use actual Cardano libraries)
    # script_address = get_script_address()  # From deployed contract
    # tx = build_cardano_transaction(script_address, datum)
    
    # 7. Sign and submit transaction
    # tx_hash = submit_transaction(tx, issuer_skey_path)
    
    # For now, return a mock transaction hash
    # In production, replace with actual transaction submission
    mock_tx_hash = hashlib.sha256(
        json.dumps(datum, sort_keys=True).encode()
    ).hexdigest()
    
    return {
        "txHash": mock_tx_hash,
        "referralHash": referral_hash.hex(),
        "status": "pending",
    }


# Example usage
if __name__ == "__main__":
    # Example request
    request_data = {
        "patient_id": "P-12345",
        "doctor_id": "D-67890",
        "facility": "General Hospital",
        "notes": "Referral for specialist consultation",
        "issuer_id": "doctor_wallet_key",
    }
    
    result = handle_referral_request(request_data)
    print(f"Transaction Hash: {result['txHash']}")
    print(f"Referral Hash: {result['referralHash']}")

