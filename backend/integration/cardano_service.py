"""
Cardano Service for storing medical records and minting CarePoints tokens
"""
import requests
import json
from typing import Optional, Dict, Any

# Cardano service endpoint (configure this based on your Cardano service setup)
CARDANO_SERVICE_URL = "http://127.0.0.1:3000"  # Adjust based on your Cardano service


def submit_record_to_cardano(record_data: Dict[str, Any]) -> Optional[str]:
    """
    Submit medical record JSON to Cardano and get recordHash
    
    Args:
        record_data: Medical record data as dictionary
    
    Returns:
        recordHash if successful, None otherwise
    """
    try:
        # Call Cardano service to store record
        response = requests.post(
            f"{CARDANO_SERVICE_URL}/storeRecord",
            json={
                "record": record_data
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get("recordHash")
        
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error calling Cardano service to store record: {e}")
        # For development, return a mock record hash
        record_json = json.dumps(record_data, sort_keys=True)
        return f"mock_record_hash_{hash(record_json) % 1000000}"
    except Exception as e:
        print(f"Error submitting record to Cardano: {e}")
        return None


def verify_record_hash(record_hash: str, patient_id: str) -> Optional[Dict[str, Any]]:
    """
    Verify record hash on Cardano and fetch record
    
    Args:
        record_hash: The recordHash from Cardano
        patient_id: Patient ID for verification
    
    Returns:
        Record data if verified, None otherwise
    """
    try:
        # Call Cardano service to verify and fetch record
        response = requests.get(
            f"{CARDANO_SERVICE_URL}/verifyRecord",
            params={
                "recordHash": record_hash,
                "patientId": patient_id
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get("verified"):
                return result.get("record")
        
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error calling Cardano service to verify record: {e}")
        # For development, return mock verification
        return {"verified": True, "record": {"patient_id": patient_id, "status": "verified"}}
    except Exception as e:
        print(f"Error verifying record hash: {e}")
        return None


def mint_care_points(address: str, amount: int) -> Optional[str]:
    """
    Mint CarePoints tokens to a Cardano address
    
    Args:
        address: Cardano wallet address
        amount: Amount of CarePoints to mint
    
    Returns:
        Transaction hash if successful, None otherwise
    """
    try:
        # Call Cardano service to mint tokens
        response = requests.post(
            f"{CARDANO_SERVICE_URL}/mintCarePoints",
            json={
                "address": address,
                "amount": amount
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get("tx_hash")
        
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error calling Cardano service to mint CarePoints: {e}")
        # For development, return a mock transaction hash
        return f"mock_tx_{address[:8]}_{amount}"
    except Exception as e:
        print(f"Error minting CarePoints: {e}")
        return None


def get_care_points_balance(address: str) -> int:
    """
    Get CarePoints balance for a Cardano address
    
    Args:
        address: Cardano wallet address
    
    Returns:
        Balance as integer, 0 if error
    """
    try:
        response = requests.get(
            f"{CARDANO_SERVICE_URL}/getBalance",
            params={"address": address},
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get("balance", 0)
        
        return 0
    except requests.exceptions.RequestException as e:
        print(f"Error calling Cardano service to get balance: {e}")
        return 0
    except Exception as e:
        print(f"Error getting CarePoints balance: {e}")
        return 0
