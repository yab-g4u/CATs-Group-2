"""Verify a transaction id against the mock chain.

Usage:
  python scripts/verify.py --tx mock_tx_abcd1234
"""
import os
import json
import argparse
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "data")
MOCK_CHAIN = os.path.join(DATA_DIR, "mock_chain.json")


def read_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def lookup_tx(tx_hash: str):
    chain = read_json(MOCK_CHAIN)
    for e in chain:
        if e.get("tx_hash") == tx_hash:
            return e
    return None


def format_ts(ts):
    return datetime.utcfromtimestamp(ts).strftime("%Y-%m-%d %H:%M UTC")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--tx", required=True)
    args = parser.parse_args()
    entry = lookup_tx(args.tx)
    if not entry:
        print("Referral Verification Result")
        print("----------------------------")
        print(f"Transaction ID: {args.tx}")
        print("Authenticity: UNVERIFIED ✗")
        print("Blockchain Mode: SIMULATED (Mock Testnet)")
        return
    print("Referral Verification Result")
    print("----------------------------")
    print(f"Transaction ID: {entry.get('tx_hash')}")
    print(f"Timestamp: {format_ts(entry.get('timestamp'))}")
    print(f"Record Hash: {entry.get('record_hash')}")
    print("Authenticity: VERIFIED ✓")
    print("Blockchain Mode: SIMULATED (Mock Testnet)")

if __name__ == '__main__':
    main()
