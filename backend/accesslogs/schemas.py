from pydantic import BaseModel
from typing import Optional

# Request payload for logging access
class AccessLogCreateSchema(BaseModel):
    patient_id: int
    cardano_hash: Optional[str] = None

# Response
class AccessLogSchema(BaseModel):
    id: int
    doctor_id: int
    patient_id: int
    time: str
    cardano_hash: Optional[str] = None


