from ninja import Router
from users.auth import AuthBearer
from doctors.models import DoctorProfile
from patients.models import PatientProfile, Visit
from django.db.models import Count, Sum, Q
from typing import List, Optional

router = Router(tags=["Hospital Views"])


@router.get("/hospital/doctors/", response=List[dict], auth=AuthBearer())
def get_hospital_doctors(request):
    """
    Get all doctors in the hospital.
    For now, we'll get the hospital name from the logged-in user's role.
    In a real system, you'd have a HospitalProfile model.
    """
    user = request.user
    
    # Get hospital name from user (assuming hospital users have hospital name in full_name or a separate field)
    # For now, we'll filter doctors by checking if they exist
    # In production, you'd have a Hospital model and filter by that
    
    doctors = DoctorProfile.objects.all()
    
    # If user is a hospital admin, you might want to filter by hospital name
    # For now, return all doctors (you can add filtering logic here)
    
    result = []
    for doctor in doctors:
        # Count records created by this doctor
        records_count = PatientProfile.objects.filter(created_by_doctor=doctor).count()
        
        result.append({
            "id": doctor.id,
            "name": doctor.user.full_name or doctor.user.username,
            "email": doctor.user.email or "",
            "specialization": doctor.specialization or "General",
            "hospital": doctor.hospital,
            "care_points_balance": doctor.care_points_balance or 0,
            "records_created": records_count,
        })
    
    return result


@router.get("/hospital/patient-records/", response=List[dict], auth=AuthBearer())
def get_hospital_patient_records(request):
    """
    Get all patient records created by doctors in this hospital.
    """
    user = request.user
    
    # Get all doctors in the hospital (same logic as above)
    doctors = DoctorProfile.objects.all()
    doctor_ids = [d.id for d in doctors]
    
    # Get all patients created by these doctors
    patients = list(PatientProfile.objects.filter(created_by_doctor_id__in=doctor_ids).select_related('user', 'created_by_doctor__user'))
    patient_ids = [p.id for p in patients]
    
    # Get visits for these patients
    visits = Visit.objects.filter(patient_id__in=patient_ids).select_related('patient', 'doctor__user')
    
    result = []
    for visit in visits:
        result.append({
            "id": visit.id,
            "patient_id": visit.patient.id,
            "health_id": visit.patient.health_id,
            "patient_name": visit.patient.user.full_name or visit.patient.user.username,
            "created_by_doctor": visit.doctor.user.full_name if visit.doctor else "Unknown",
            "created_at": visit.created_at.isoformat(),
            "visit_summary": visit.summary,
            "diagnosis": visit.diagnosis,
            "cardano_hash": visit.cardano_hash,
        })
    
    # Also include patients without visits
    for patient in patients:
        if not visits.filter(patient=patient).exists():
            result.append({
                "id": patient.id,
                "patient_id": patient.id,
                "health_id": patient.health_id,
                "patient_name": patient.user.full_name or patient.user.username,
                "created_by_doctor": patient.created_by_doctor.user.full_name if patient.created_by_doctor else "Unknown",
                "created_at": "",  # Patient created date would be in user model
                "visit_summary": None,
                "diagnosis": None,
                "cardano_hash": None,
            })
    
    # Sort by created_at descending
    result.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    
    return result


@router.get("/hospital/stats/", response=dict, auth=AuthBearer())
def get_hospital_stats(request):
    """
    Get hospital statistics.
    """
    user = request.user
    
    # Get all doctors in the hospital
    doctors = DoctorProfile.objects.all()
    doctor_ids = [d.id for d in doctors]
    
    # Count patients created by these doctors
    total_patients = PatientProfile.objects.filter(created_by_doctor_id__in=doctor_ids).count()
    
    # Count visits
    patients = list(PatientProfile.objects.filter(created_by_doctor_id__in=doctor_ids))
    patient_ids = [p.id for p in patients]
    total_visits = Visit.objects.filter(patient_id__in=patient_ids).count()
    
    # Sum care points
    total_care_points = sum([d.care_points_balance or 0 for d in doctors])
    
    return {
        "total_doctors": doctors.count(),
        "total_patient_records": total_visits,
        "total_patients": total_patients,
        "total_care_points": total_care_points,
        "hospital_code": "HSP-001",  # This would come from a Hospital model in production
    }

