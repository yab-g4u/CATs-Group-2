from ninja import Router, Form, File
from ninja.files import UploadedFile
from users.auth import AuthBearer
from .models import DoctorProfile, CarePointsTransaction
from patients.models import PatientProfile, Visit, Medication, LabResult
from patients.schemas import VisitModel, MedicationModel, LabResultModel, PatientProfileModel
from .schemas import (
    ScanPatientSchema, PatientSummarySchema, VisitCreateSchema, 
    MedicationCreateSchema, LabCreateSchema, CreatePatientSchema, CreatePatientResponse,
    DoctorProfileSchema, CarePointsResponse, VerifyCardanoHashSchema, QRDecodeSchema
)
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils import timezone
from users.models import User
from integration.cardano_service import (
    submit_record_to_cardano,
    mint_care_points,
    verify_record_hash,
    get_care_points_balance,
    hash_record_data,
)
from integration.ipfs_service import upload_to_ipfs
import qrcode
import io
import json
import secrets
import string
from typing import Optional
from datetime import date, timedelta

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
def upload_lab(
    request,
    patient_id: int = Form(...),
    file: UploadedFile = File(...),
    summary: Optional[str] = Form(None)
):
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


def calculate_care_points_reward(doctor_profile: DoctorProfile) -> int:
    """
    Calculate CarePoints reward based on streak
    Formula: 10 base + 2 per streak day
    """
    base_reward = 10
    streak_bonus = doctor_profile.current_streak * 2
    return base_reward + streak_bonus


def update_doctor_streak(doctor_profile: DoctorProfile):
    """
    Update doctor's streak based on last record date
    """
    today = timezone.now().date()
    last_date = doctor_profile.last_record_date
    
    if last_date is None:
        # First record
        doctor_profile.current_streak = 1
    elif last_date == today:
        # Already created a record today, no change
        pass
    elif last_date == today - timedelta(days=1):
        # Maintained streak
        doctor_profile.current_streak += 1
    else:
        # Streak broken, reset to 1
        doctor_profile.current_streak = 1
    
    doctor_profile.last_record_date = today
    doctor_profile.save()


@router.post("/create-patient/", response=CreatePatientResponse, auth=AuthBearer())
def create_patient(request, payload: CreatePatientSchema):
    """
    Create a new patient profile with QR code generation and Cardano integration.
    The health_id is generated automatically and used in the QR code.
    Submits record to Cardano and mints CarePoints for the doctor.
    """
    # Get or create doctor profile
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        # Create doctor profile if it doesn't exist
        doctor_profile = DoctorProfile.objects.create(
            user=request.user,
            hospital="Unknown Hospital",
            specialization="General",
        )
    
    # Generate unique health_id (PAT-XXXXXXXX format)
    def generate_health_id():
        while True:
            random_part = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(8))
            health_id = f"PAT-{random_part}"
            if not PatientProfile.objects.filter(health_id=health_id).exists():
                return health_id
    
    health_id = generate_health_id()
    
    # Create user for the patient
    temp_username = f"patient_{health_id.lower()}"
    temp_email = f"{temp_username}@temp.local"
    
    user = User.objects.create(
        username=temp_username,
        email=temp_email,
        full_name=payload.full_name,
        role=User.ROLE_PATIENT,
        phone=payload.emergency_contact or "",
    )
    
    # Prepare record data for Cardano
    record_data = {
        "patient_id": health_id,
        "full_name": payload.full_name,
        "age": payload.age,
        "date_of_birth": payload.date_of_birth,
        "gender": payload.gender,
        "condition": payload.condition,
        "notes": payload.notes,
        "created_at": timezone.now().isoformat(),
        "created_by_doctor": doctor_profile.user.full_name or doctor_profile.user.username,
    }
    
    # Upload to IPFS (optional, for decentralized storage)
    ipfs_hash = upload_to_ipfs(record_data, encrypt=False)
    
    # Submit to Cardano
    # Get issuer_id (doctor's pubkey hash) - for now use a placeholder
    # In production, this should come from the doctor's wallet
    issuer_id = "08ee30a2e0e28b3eaf109642374971c5aa4675f5a0ff71dc8d5988ae"  # Default from policy
    
    cardano_result = submit_record_to_cardano(
        record_data=record_data,
        issuer_id=issuer_id,
        patient_id=health_id,
        doctor_address=doctor_profile.cardano_address,
    )
    
    # Create patient profile
    patient_profile = PatientProfile.objects.create(
        user=user,
        health_id=health_id,
        emergency_contact=payload.emergency_contact or "",
        ipfs_hash=ipfs_hash,
        cardano_tx_hash=cardano_result.get("tx_hash") if cardano_result else None,
        cardano_record_hash=cardano_result.get("record_hash") if cardano_result else None,
        created_by_doctor=doctor_profile,
    )
    
    # Update doctor streak
    update_doctor_streak(doctor_profile)
    
    # Calculate and mint CarePoints
    care_points_amount = calculate_care_points_reward(doctor_profile)
    
    if doctor_profile.cardano_address:
        mint_result = mint_care_points(
            address=doctor_profile.cardano_address,
            amount=care_points_amount,
            owner_pubkey_hash=issuer_id,
        )
        
        if mint_result:
            # Update doctor's CarePoints balance
            doctor_profile.care_points_balance += care_points_amount
            doctor_profile.save()
            
            # Record transaction
            CarePointsTransaction.objects.create(
                doctor=doctor_profile,
                amount=care_points_amount,
                description=f"Patient record creation: {health_id}",
                transaction_type="patient_record",
                cardano_tx_hash=mint_result.get("tx_hash"),
            )
    
    # Generate QR code with record hash
    qr_data = {
        "patient_id": patient_profile.id,
        "health_id": health_id,
        "record_hash": cardano_result.get("record_hash") if cardano_result else None,
        "tx_hash": cardano_result.get("tx_hash") if cardano_result else None,
        "type": "patient_access"
    }
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(json.dumps(qr_data))
    qr.make(fit=True)
    
    # Create QR code image
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save QR code to patient profile
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    
    qr_filename = f"qrcodes/{patient_profile.id}.png"
    patient_profile.qr_code.save(
        qr_filename,
        ContentFile(buffer.read()),
        save=True
    )
    
    # Build QR code URL
    media_url = "/media/"
    qr_code_url = request.build_absolute_uri(f"{media_url}{patient_profile.qr_code.name}") if patient_profile.qr_code else None
    
    return {
        "patient_id": patient_profile.id,
        "health_id": health_id,
        "qr_code_url": qr_code_url
    }


@router.get("/patients/", response=list[dict], auth=AuthBearer())
def get_doctor_patients(request):
    """
    Get all patients created by the logged-in doctor
    """
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        return []
    
    patients = PatientProfile.objects.filter(created_by_doctor=doctor_profile).select_related('user')
    
    return [
        {
            "id": p.id,
            "health_id": p.health_id,
            "full_name": p.user.full_name or p.user.username,
            "created_at": p.user.date_joined.isoformat() if hasattr(p.user, 'date_joined') else None,
        }
        for p in patients
    ]


@router.get("/care-points/", response=CarePointsResponse, auth=AuthBearer())
def get_care_points_endpoint(request):
    """
    Get doctor's CarePoints balance and streak
    """
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        return {
            "balance": 0,
            "current_streak": 0,
            "last_record_date": None,
        }
    
    # Sync balance from Cardano if address is set
    if doctor_profile.cardano_address:
        try:
            blockchain_balance = get_care_points_balance(doctor_profile.cardano_address)
            if blockchain_balance > 0:
                doctor_profile.care_points_balance = blockchain_balance
                doctor_profile.save()
        except Exception as e:
            print(f"Error syncing CarePoints balance: {e}")
    
    return {
        "balance": doctor_profile.care_points_balance,
        "current_streak": doctor_profile.current_streak,
        "last_record_date": doctor_profile.last_record_date.isoformat() if doctor_profile.last_record_date else None,
    }


@router.post("/verify-cardano-hash/", response=dict, auth=AuthBearer())
def verify_cardano_hash_endpoint(request, payload: VerifyCardanoHashSchema):
    """
    Verify a Cardano record hash
    """
    result = verify_record_hash(
        record_hash=payload.record_hash,
        patient_id=payload.patient_id,
        tx_hash=payload.tx_hash,
    )
    
    if result:
        return {
            "verified": result.get("verified", False),
            "tx_hash": result.get("tx_hash"),
            "record_hash": result.get("record_hash"),
            "patient_id": result.get("patient_id"),
            "validator_match": result.get("validator_match"),
            "hash_match": result.get("hash_match"),
            "patient_match": result.get("patient_match"),
        }
    
    return {
        "verified": False,
        "error": "Verification failed or record not found"
    }


@router.get("/care-points/transactions/", response=list[dict], auth=AuthBearer())
def get_care_points_transactions(request):
    """
    Get CarePoints transaction history for the doctor
    """
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        return []
    
    transactions = CarePointsTransaction.objects.filter(doctor=doctor_profile).order_by("-created_at")
    
    return [
        {
            "id": t.id,
            "amount": t.amount,
            "description": t.description,
            "transaction_type": t.transaction_type,
            "cardano_tx_hash": t.cardano_tx_hash,
            "created_at": t.created_at.isoformat(),
        }
        for t in transactions
    ]


@router.post("/decode-qr/", response=dict, auth=AuthBearer())
def decode_qr_code(request, payload: QRDecodeSchema):
    """
    Decode QR code and fetch patient record from database/IPFS.
    Accepts: patient_id, health_id, record_hash, or tx_hash
    """
    from integration.ipfs_service import fetch_from_ipfs
    
    patient = None
    record_data = None
    
    # Try to find patient by different identifiers
    if payload.get("patient_id"):
        try:
            patient = PatientProfile.objects.get(id=payload["patient_id"])
        except PatientProfile.DoesNotExist:
            pass
    
    if not patient and payload.get("health_id"):
        try:
            patient = PatientProfile.objects.get(health_id=payload["health_id"])
        except PatientProfile.DoesNotExist:
            pass
    
    if not patient:
        return {
            "error": "Patient not found",
            "patient_id": None,
            "health_id": None,
        }
    
    # Fetch record data from IPFS if available
    if patient.ipfs_hash:
        try:
            record_data = fetch_from_ipfs(patient.ipfs_hash)
        except Exception as e:
            print(f"Error fetching from IPFS: {e}")
    
    # If no IPFS data, construct from database
    if not record_data:
        record_data = {
            "patient_id": patient.health_id,
            "full_name": patient.user.full_name or patient.user.username,
            "emergency_contact": patient.emergency_contact,
            "visits": [
                {
                    "summary": v.summary,
                    "diagnosis": v.diagnosis,
                    "created_at": v.created_at.isoformat() if v.created_at else None,
                }
                for v in patient.visits.all()[:10]  # Limit to recent visits
            ],
            "medications": [
                {
                    "drug_name": m.drug_name,
                    "dosage": m.dosage,
                    "duration": m.duration,
                }
                for m in patient.medications.all()[:10]
            ],
        }
    
    return {
        "patient_id": patient.id,
        "health_id": patient.health_id,
        "full_name": patient.user.full_name or patient.user.username,
        "record_data": record_data,
        "ipfs_hash": patient.ipfs_hash,
        "cardano_tx_hash": patient.cardano_tx_hash,
        "cardano_record_hash": patient.cardano_record_hash,
    }
