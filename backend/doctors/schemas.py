from pydantic import BaseModel
from typing import Optional

# Payload for scanning QR / searching patient
class ScanPatientSchema(BaseModel):
    health_id: str

# Response with patient info + summary
class PatientSummarySchema(BaseModel):
    id: int
    full_name: Optional[str] = None
    health_id: str
    emergency_contact: Optional[str] = None
    visits_count: int
    medications_count: int
    lab_results_count: int

# Add Visit
class VisitCreateSchema(BaseModel):
    patient_id: int
    summary: str
    diagnosis: Optional[str] = None
    cardano_hash: Optional[str] = None

# Add Medication
class MedicationCreateSchema(BaseModel):
    patient_id: int
    drug_name: str
    dosage: str
    duration: Optional[str] = None

# Add Lab Result
class LabCreateSchema(BaseModel):
    patient_id: int
    summary: Optional[str] = None

# Create Patient
class CreatePatientSchema(BaseModel):
    full_name: str
    age: Optional[int] = None
    date_of_birth: Optional[str] = None
    gender: str
    condition: Optional[str] = None
    notes: Optional[str] = None
    emergency_contact: Optional[str] = None

# Create Patient Response
class CreatePatientResponse(BaseModel):
    patient_id: int
    health_id: str
    qr_code_url: Optional[str] = None

# Doctor Profile Schema
class DoctorProfileSchema(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    specialization: Optional[str] = None
    medical_license: Optional[str] = None
    hospital: Optional[str] = None
    cardano_address: Optional[str] = None

# CarePoints Response
class CarePointsResponse(BaseModel):
    balance: int
    current_streak: int
    last_record_date: Optional[str] = None

# Verify Cardano Hash Request
class VerifyCardanoHashSchema(BaseModel):
    record_hash: str
    patient_id: str
    tx_hash: Optional[str] = None

# QR Decode Request
class QRDecodeSchema(BaseModel):
    patient_id: Optional[int] = None
    health_id: Optional[str] = None
    record_hash: Optional[str] = None
    tx_hash: Optional[str] = None