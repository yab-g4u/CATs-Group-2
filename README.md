
### A Patient-Centric Medical Record Backbone Powered by Cardano

Spine is a lightweight, patient-first medical record system that ensures critical health information follows the patient — not the hospital.  
It eliminates lost paper records, repeated tests, and fragmented care by anchoring medical record verification on the Cardano blockchain.

---

## 🧠 Problem

In many healthcare systems, especially in resource-constrained environments:

- Patient records are paper-based and easily lost
- Referrals between clinics and hospitals break continuity of care
- Doctors repeat expensive tests due to missing history
- Patients become “strangers” at every new hospital

Medical data is locked inside institutions instead of traveling with the patient.

---

## 💡 Solution

Spine creates a **digital backbone** for patient medical history.

- Doctors create patient records digitally
- Each record is hashed and anchored to the **Cardano testnet**
- A **QR code** is generated from the blockchain transaction
- Any authorized doctor can scan the QR and verify the record instantly
- Patients access their records using a simple ID — no signup required

The blockchain ensures **immutability, authenticity, and trust** without complicating the doctor’s workflow.

---

## 🔁 Core MVP Flow

Doctor signs up  
→ Doctor creates/selects patient  
→ Medical record is written  
→ Record hash uploaded to Cardano testnet  
→ Blockchain transaction ID generated  
→ QR code created  
→ QR scanned by another doctor  
→ Record authenticity verified from Cardano  

This create → store → verify → retrieve loop is fully functional in the MVP.

---

## 🔗 Why Cardano?

Cardano is used for:

- **Tamper-proof verification** of medical records
- Transparent and auditable transactions
- QR code testnet deployment
- Long-term scalability for public health infrastructure

Blockchain is used **only where trust matters**, keeping the system simple and usable.

---

## 🎯 Key Features

- Patient-centric medical records
- QR-based record verification
- No patient signup required
- Hospital-level record tracking
- Doctor incentive system (CarePoints)
- Cardano testnet integration

---

## 🧩 Project Structure

```

CATS-Group-2/
│
├── backend/          # API & business logic
├── frontend/         # Web & mobile interfaces
├── smart-contracts/  # Cardano / Aiken scripts
├── docs/             # Problem discovery & documentation
├── scripts/          # Utility & deployment scripts
├── config/           # Environment & configuration files
└── README.md

```

---

## 🧪 Current Status

✅ Functional MVP  
✅ Cardano testnet transaction demo  
✅ QR generation and verification loop  
✅ End-to-end record flow implemented  

---

## 🚀 Future Roadmap

- Expand CarePoints incentive system
- Patient mobile wallet integration
- Multi-hospital interoperability
- National-scale health data backbone

---

## 👥 Team

**Team Axiom**  
---
Cardano Engineer and Team Lead (Yeabsera Sisay)
Frontend / UX Lead(Yabets Maregn)
Backend Engineer( Zahir Ahmed)
Main Cardano Engineer(Dagim Tadesse)
Operations Lead(Nathenael Tegegn)
Built for the CATS Hackathon  
Focused on practical, regenerative healthcare solutions using Cardano

---

## 📄 License

This project is built for educational and hackathon purposes.
```


