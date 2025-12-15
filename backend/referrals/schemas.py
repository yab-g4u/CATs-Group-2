from ninja import Schema
from typing import Optional
from datetime import datetime

class ReferralCreateSchema(Schema):
    patient_id: int
    to_hospital: str
    summary: str
    notes: Optional[str] = None

class ReferralUpdateSchema(Schema):
    status: str
    notes: Optional[str] = None

class ReferralResponseSchema(Schema):
    id: int
    patient_name: str
    to_hospital: str
    status: str
    summary: str
    created_at: datetime
    notes: Optional[str] = None
