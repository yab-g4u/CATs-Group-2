from django.db import models
from django.conf import settings

def qr_path(instance, filename):
    return f"qrcodes/{instance.id}.png"


class PatientProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="patient_profile"
    )
    health_id = models.CharField(max_length=64, unique=True)
    qr_code = models.ImageField(upload_to=qr_path, null=True, blank=True)
    emergency_contact = models.CharField(max_length=255, blank=True, default="")

    def __str__(self):
        return f"{self.user.full_name or self.user.username} ({self.health_id})"


class Visit(models.Model):
    patient = models.ForeignKey(
        PatientProfile,
        related_name="visits",
        on_delete=models.CASCADE
    )
    doctor = models.ForeignKey(
        "doctors.DoctorProfile",
        related_name="visits",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    summary = models.TextField()
    diagnosis = models.TextField(blank=True)
    cardano_hash = models.CharField(max_length=128, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Visit {self.id} - {self.patient}"


class Medication(models.Model):
    patient = models.ForeignKey(
        PatientProfile,
        related_name="medications",
        on_delete=models.CASCADE
    )
    doctor = models.ForeignKey(
        "doctors.DoctorProfile",
        related_name="medications",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    drug_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=128)
    duration = models.CharField(max_length=128, blank=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.drug_name} for {self.patient}"

class LabResult(models.Model):
    patient = models.ForeignKey(
        PatientProfile,
        related_name="lab_results",
        on_delete=models.CASCADE
    )
    file = models.FileField(upload_to="lab_results/")
    summary = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"LabResult {self.id} for {self.patient}"
