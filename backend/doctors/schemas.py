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
