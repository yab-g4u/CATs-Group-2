from ninja import Router, Form
from users.auth import AuthBearer
from .models import PatientProfile, Visit, Medication, LabResult
from .schemas import PatientProfileModel, VisitModel, MedicationModel, LabResultModel

router = Router(tags=["Patient Views"])


@router.get("/patient/profile/", response=PatientProfileModel, auth=AuthBearer())
def get_patient_profile(request):
    profile = getattr(request.user, "patient_profile", None)
    if not profile:
        return {}
    return {
        "id": profile.id,
        "health_id": profile.health_id,
        "emergency_contact": profile.emergency_contact
    }


@router.patch("/patient/profile/", response=PatientProfileModel, auth=AuthBearer())
def update_patient_profile(request, emergency_contact: str = Form(...)):
    profile = getattr(request.user, "patient_profile", None)
    if not profile:
        return {}
    profile.emergency_contact = emergency_contact
    profile.save()
    return {
        "id": profile.id,
        "health_id": profile.health_id,
        "emergency_contact": profile.emergency_contact
    }



@router.get("/patient/qr-code/", response={200: dict}, auth=AuthBearer())
def get_patient_qr_code(request):
    profile = getattr(request.user, "patient_profile", None)
    if not profile or not profile.qr_code:
        return {"qr_code_url": None}
    qr_url = request.build_absolute_uri(profile.qr_code.url)
    return {"qr_code_url": qr_url}


@router.get("/patient/visits/", response=list[VisitModel], auth=AuthBearer())
def get_patient_visits(request):
    profile = getattr(request.user, "patient_profile", None)
    if not profile:
        return []
    return [
        {
            "id": v.id,
            "summary": v.summary,
            "diagnosis": v.diagnosis or None,
            "cardano_hash": v.cardano_hash or None
        } for v in profile.visits.all()
    ]


@router.get("/patient/medications/", response=list[MedicationModel], auth=AuthBearer())
def get_patient_medications(request):
    profile = getattr(request.user, "patient_profile", None)
    if not profile:
        return []
    return [
        {
            "id": m.id,
            "drug_name": m.drug_name,
            "dosage": m.dosage,
            "duration": m.duration or None,
            "verified": m.verified
        } for m in profile.medications.all()
    ]


@router.get("/patient/lab-results/", response=list[LabResultModel], auth=AuthBearer())
def get_patient_lab_results(request):
    profile = getattr(request.user, "patient_profile", None)
    if not profile:
        return []
    return [
        {
            "id": l.id,
            "summary": l.summary or None,
            "date": l.date.isoformat()
        } for l in profile.lab_results.all()
    ]
