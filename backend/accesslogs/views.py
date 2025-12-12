from ninja import Router
from users.auth import AuthBearer
from .models import AccessLog
from patients.models import PatientProfile
from .schemas import AccessLogCreateSchema, AccessLogSchema

router = Router(tags=["Access Logs"])

@router.post("/access/log/", response=AccessLogSchema, auth=AuthBearer())
def create_access_log(request, payload: AccessLogCreateSchema):
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        return {}

    try:
        patient = PatientProfile.objects.get(id=payload.patient_id)
    except PatientProfile.DoesNotExist:
        return {}

    log = AccessLog.objects.create(
        doctor=doctor_profile,
        patient=patient,
        cardano_hash=payload.cardano_hash or ""
    )

    return {
        "id": log.id,
        "doctor_id": log.doctor.id,
        "patient_id": log.patient.id,
        "time": log.time.isoformat(),
        "cardano_hash": log.cardano_hash or None
    }
