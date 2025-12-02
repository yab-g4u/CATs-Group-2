from ninja import Router, Form, File
from users.auth import AuthBearer
from .models import DoctorProfile
from patients.models import PatientProfile, Visit, Medication, LabResult
from patients.schemas import VisitModel, MedicationModel, LabResultModel, PatientProfileModel
from .schemas import ScanPatientSchema, PatientSummarySchema, VisitCreateSchema, MedicationCreateSchema, LabCreateSchema
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from typing import Optional
from datetime import date

router = Router(tags=["Doctor Views"])


@router.post("/scan/", response=PatientSummarySchema, auth=AuthBearer())
def scan_patient(request, payload: ScanPatientSchema):
    try:
        patient = PatientProfile.objects.get(health_id=payload.health_id)
    except PatientProfile.DoesNotExist:
        return {}

    return {
        "id": patient.id,
        "full_name": patient.user.full_name,
        "health_id": patient.health_id,
        "emergency_contact": patient.emergency_contact,
        "visits_count": patient.visits.count(),
        "medications_count": patient.medications.count(),
        "lab_results_count": patient.lab_results.count()
    }


@router.post("/visit/", response=VisitModel, auth=AuthBearer())
def add_visit(request, payload: VisitCreateSchema):
    try:
        patient = PatientProfile.objects.get(id=payload.patient_id)
    except PatientProfile.DoesNotExist:
        return {}

    visit = Visit.objects.create(
        patient=patient,
        doctor=getattr(request.user, "doctor_profile"),
        summary=payload.summary,
        diagnosis=payload.diagnosis or "",
        cardano_hash=payload.cardano_hash or ""
    )
    return {
        "id": visit.id,
        "summary": visit.summary,
        "diagnosis": visit.diagnosis or None,
        "cardano_hash": visit.cardano_hash or None
    }


@router.post("/meds/", response=MedicationModel, auth=AuthBearer())
def add_medication(request, payload: MedicationCreateSchema):
    try:
        patient = PatientProfile.objects.get(id=payload.patient_id)
    except PatientProfile.DoesNotExist:
        return {}

    med = Medication.objects.create(
        patient=patient,
        doctor=getattr(request.user, "doctor_profile"),
        drug_name=payload.drug_name,
        dosage=payload.dosage,
        duration=payload.duration or "",
        verified=False
    )
    return {
        "id": med.id,
        "drug_name": med.drug_name,
        "dosage": med.dosage,
        "duration": med.duration or None,
        "verified": med.verified
    }


@router.post("/labs/", response=LabResultModel, auth=AuthBearer())
def upload_lab(request, patient_id: int = Form(...), file: File = File(...), summary: Optional[str] = Form(None)):
    try:
        patient = PatientProfile.objects.get(id=patient_id)
    except PatientProfile.DoesNotExist:
        return {}

    # Save file
    file_path = f"lab_results/{file.name}"
    default_storage.save(file_path, ContentFile(file.read()))

    lab = LabResult.objects.create(
        patient=patient,
        file=file_path,
        summary=summary or "",
        date=date.today()
    )
    return {
        "id": lab.id,
        "summary": lab.summary or None,
        "date": lab.date.isoformat()
    }
