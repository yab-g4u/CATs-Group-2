"""Demo CLI for creating patients, adding records, hashing, and submitting to a mock chain.

Usage examples:
  python scripts/demo.py create-patient --name "Alice"
  python scripts/demo.py add-record --patient P12345 --diagnosis "Malaria" --treatment "ACT"
"""
import os
import json
import uuid
import hashlib
import argparse
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "data")
PATIENTS = os.path.join(DATA_DIR, "patient.json")
RECORDS = os.path.join(DATA_DIR, "records.json")
MOCK_CHAIN = os.path.join(DATA_DIR, "mock_chain.json")

try:
    import qrcode
except Exception:
    qrcode = None


def ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)
    for p, default in [(PATIENTS, []), (RECORDS, []), (MOCK_CHAIN, [])]:
        if not os.path.exists(p):
            with open(p, "w", encoding="utf-8") as f:
                json.dump(default, f, indent=2)


def read_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def create_patient(name: str) -> dict:
    patients = read_json(PATIENTS)
    pid = "P" + uuid.uuid4().hex[:8]
    p = {"patient_id": pid, "name": name}
    patients.append(p)
    write_json(PATIENTS, patients)
    return p


def add_record(patient_id: str, diagnosis: str, treatment: str, date: str = None) -> dict:
    if date is None:
        date = datetime.utcnow().date().isoformat()
    record = {
        "patient_id": patient_id,
        "diagnosis": diagnosis,
        "treatment": treatment,
        "date": date,
    }
    record_string = json.dumps(record, sort_keys=True)
    record_hash = hashlib.sha256(record_string.encode()).hexdigest()
    record_entry = {"record": record, "record_hash": record_hash}
    records = read_json(RECORDS)
    records.append(record_entry)
    write_json(RECORDS, records)
    tx = submit_to_mock_chain(record_hash)
    return {"record": record_entry, "tx": tx}


def submit_to_mock_chain(record_hash: str) -> dict:
    chain = read_json(MOCK_CHAIN)
    tx_hash = "mock_tx_" + uuid.uuid4().hex[:8]
    ts = int(datetime.utcnow().timestamp())
    wallet = "mock_wallet_" + uuid.uuid4().hex[:8]
    entry = {"tx_hash": tx_hash, "timestamp": ts,
             "wallet": wallet, "record_hash": record_hash}
    chain.append(entry)
    write_json(MOCK_CHAIN, chain)
    # generate QR image if qrcode available
    qr_path = None
    if qrcode:
        img = qrcode.make(tx_hash)
        qr_fn = f"qr_{tx_hash}.png"
        qr_path = os.path.join(DATA_DIR, qr_fn)
        img.save(qr_path)
    return {"tx_hash": tx_hash, "timestamp": ts, "wallet": wallet, "qr_path": qr_path}


def main():
    ensure_data_dir()
    parser = argparse.ArgumentParser(description="Demo CLI")
    sub = parser.add_subparsers(dest="cmd")

    p1 = sub.add_parser("create-patient")
    p1.add_argument("--name", required=True)

    p2 = sub.add_parser("add-record")
    p2.add_argument("--patient", required=True)
    p2.add_argument("--diagnosis", required=True)
    p2.add_argument("--treatment", required=True)
    p2.add_argument("--date", required=False)

    args = parser.parse_args()
    if args.cmd == "create-patient":
        p = create_patient(args.name)
        print("Created patient:", json.dumps(p, indent=2))
    elif args.cmd == "add-record":
        res = add_record(args.patient, args.diagnosis,
                         args.treatment, args.date)
        print("Record added and submitted (mock):")
        print(json.dumps(res, indent=2))
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
