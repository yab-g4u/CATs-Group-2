from pydantic import BaseModel
from typing import Optional


class PatientProfileModel(BaseModel):
    id: int
    health_id: str
    emergency_contact: Optional[str] = None


class VisitModel(BaseModel):
    id: int
    summary: str
    diagnosis: Optional[str] = None
    cardano_hash: Optional[str] = None


class MedicationModel(BaseModel):
    id: int
    drug_name: str
    dosage: str
    duration: Optional[str] = None
    verified: bool


class LabResultModel(BaseModel):
    id: int
    summary: Optional[str] = None
    date: str
