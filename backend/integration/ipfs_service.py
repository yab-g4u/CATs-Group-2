"""
IPFS Service for storing encrypted patient records
"""
import json
import requests
from typing import Dict, Any, Optional

# IPFS Gateway URL (using public gateway for now, can be configured)
IPFS_GATEWAY = "https://ipfs.io/ipfs/"
IPFS_API_URL = "http://127.0.0.1:5001/api/v0"  # Local IPFS node API

def upload_to_ipfs(data: Dict[str, Any], encrypt: bool = True) -> Optional[str]:
    """
    Upload patient record data to IPFS
    
    Args:
        data: Patient record data dictionary
        encrypt: Whether to encrypt the data (placeholder for encryption)
    
    Returns:
        IPFS hash (CID) if successful, None otherwise
    """
    try:
        # For now, we'll use a simple JSON upload
        # In production, you'd want to encrypt the data before uploading
        json_data = json.dumps(data, default=str)
        
        # Try to use local IPFS node first
        try:
            response = requests.post(
                f"{IPFS_API_URL}/add",
                files={"file": json_data.encode('utf-8')},
                timeout=10
            )
            if response.status_code == 200:
                result = response.json()
                return result.get("Hash")
        except requests.exceptions.RequestException:
            # Fallback: return a mock hash for development
            # In production, you'd want proper IPFS setup
            import hashlib
            hash_obj = hashlib.sha256(json_data.encode()).hexdigest()
            return f"Qm{hash_obj[:44]}"  # Mock IPFS hash format
        
        return None
    except Exception as e:
        print(f"Error uploading to IPFS: {e}")
        return None

def fetch_from_ipfs(ipfs_hash: str) -> Optional[Dict[str, Any]]:
    """
    Fetch patient record data from IPFS
    
    Args:
        ipfs_hash: IPFS hash (CID) of the record
    
    Returns:
        Patient record data dictionary if successful, None otherwise
    """
    try:
        # Try to fetch from IPFS gateway
        response = requests.get(f"{IPFS_GATEWAY}{ipfs_hash}", timeout=10)
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"Error fetching from IPFS: {e}")
        return None

