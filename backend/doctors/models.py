from django.db import models
from django.conf import settings
from django.utils import timezone


class DoctorProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="doctor_profile"
    )
    hospital = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255, blank=True)
    cardano_address = models.CharField(
        max_length=255, 
        blank=True, 
        null=True,
        help_text="Cardano wallet address for receiving CarePoints"
    )
    care_points_balance = models.IntegerField(
        default=0,
        help_text="Total CarePoints earned (synced from Cardano)"
    )
    last_record_date = models.DateField(
        null=True, 
        blank=True,
        help_text="Last date a patient record was created (for streak tracking)"
    )
    current_streak = models.IntegerField(
        default=0,
        help_text="Current consecutive days streak"
    )

    def __str__(self) -> str:
        return f"{self.user.full_name or self.user.username} - {self.specialization or 'General'}"


class Appointment(models.Model):
    STATUS_PENDING = "pending"
    STATUS_CONFIRMED = "confirmed"
    STATUS_COMPLETED = "completed"
    STATUS_CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_CONFIRMED, "Confirmed"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    doctor = models.ForeignKey(
        DoctorProfile, 
        related_name="appointments", 
        on_delete=models.CASCADE
    )
    patient = models.ForeignKey(
        "patients.PatientProfile", 
        related_name="appointments", 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )
    patient_name = models.CharField(
        max_length=255, 
        blank=True,
        help_text="For cases where patient profile might not exist yet"
    )
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=32, 
        choices=STATUS_CHOICES, 
        default=STATUS_PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment for {self.patient_name or self.patient} with {self.doctor} on {self.appointment_date} at {self.appointment_time}"


class CarePointsTransaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ("patient_record", "Patient Record Creation"),
        ("referral_sent", "Referral Sent"),
        ("referral_accepted", "Referral Accepted"),
        ("other", "Other"),
    ]

    doctor = models.ForeignKey(
        DoctorProfile, 
        related_name="care_points_transactions", 
        on_delete=models.CASCADE
    )
    amount = models.IntegerField()
    description = models.TextField(blank=True)
    transaction_type = models.CharField(
        max_length=50, 
        choices=TRANSACTION_TYPE_CHOICES, 
        default="other"
    )
    cardano_tx_hash = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.doctor} - {self.amount} CP ({self.transaction_type}) on {self.created_at.date()}"
