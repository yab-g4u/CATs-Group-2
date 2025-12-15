from ninja import Router
from users.auth import AuthBearer
from .models import Referral
from patients.models import PatientProfile
from doctors.models import DoctorProfile, CarePointsTransaction
from integration.cardano_service import mint_care_points
from django.shortcuts import get_object_or_404
from .schemas import ReferralCreateSchema, ReferralResponseSchema, ReferralUpdateSchema
from typing import List

router = Router(tags=["Referrals"])

@router.post("/create/", response=ReferralResponseSchema, auth=AuthBearer())
def create_referral(request, payload: ReferralCreateSchema):
    """
    Create a new referral and award CarePoints to the doctor.
    """
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        # Should ideally handle this error better
        return 403, {"error": "Only doctors can create referrals"}

    patient = get_object_or_404(PatientProfile, id=payload.patient_id)

    referral = Referral.objects.create(
        from_doctor=doctor_profile,
        patient=patient,
        to_hospital=payload.to_hospital,
        summary=payload.summary,
        notes=payload.notes or "",
        status=Referral.STATUS_PENDING
    )

    # Award CarePoints for referral (Case Review/Referral)
    care_points_amount = 15  # Higher reward for referrals/reviews
    
    # Update local balance
    doctor_profile.care_points_balance += care_points_amount
    doctor_profile.save()
    
    # Record transaction
    tx = CarePointsTransaction.objects.create(
        doctor=doctor_profile,
        amount=care_points_amount,
        description=f"Referral created for {patient.health_id} to {payload.to_hospital}",
        transaction_type="referral",
    )
    
    # Mint on Cardano if address exists
    if doctor_profile.cardano_address:
        mint_result = mint_care_points(
            address=doctor_profile.cardano_address,
            amount=care_points_amount,
        )
        
        if mint_result:
            tx.cardano_tx_hash = mint_result.get("tx_hash")
            tx.save()

    return {
        "id": referral.id,
        "patient_name": patient.user.full_name or patient.user.username,
        "to_hospital": referral.to_hospital,
        "status": referral.status,
        "summary": referral.summary,
        "created_at": referral.created_at,
        "notes": referral.notes
    }

@router.get("/list/", response=List[ReferralResponseSchema], auth=AuthBearer())
def list_referrals(request):
    """
    List referrals created by the logged-in doctor.
    """
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        return []

    referrals = Referral.objects.filter(from_doctor=doctor_profile).select_related('patient', 'patient__user').order_by('-created_at')

    return [
        {
            "id": r.id,
            "patient_name": r.patient.user.full_name or r.patient.user.username,
            "to_hospital": r.to_hospital,
            "status": r.status,
            "summary": r.summary,
            "created_at": r.created_at,
            "notes": r.notes
        }
        for r in referrals
    ]

@router.put("/{referral_id}/status/", response=ReferralResponseSchema, auth=AuthBearer())
def update_referral_status(request, referral_id: int, payload: ReferralUpdateSchema):
    """
    Update referral status (e.g. accepted, rejected, completed).
    """
    doctor_profile = getattr(request.user, "doctor_profile", None)
    if not doctor_profile:
        return 403, {"error": "Unauthorized"}

    referral = get_object_or_404(Referral, id=referral_id, from_doctor=doctor_profile)
    
    referral.status = payload.status
    if payload.notes:
        referral.notes = (referral.notes or "") + "\n" + payload.notes
    referral.save()

    return {
        "id": referral.id,
        "patient_name": referral.patient.user.full_name or referral.patient.user.username,
        "to_hospital": referral.to_hospital,
        "status": referral.status,
        "summary": referral.summary,
        "created_at": referral.created_at,
        "notes": referral.notes
    }
