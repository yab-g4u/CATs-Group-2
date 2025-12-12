from django.db import models


class AccessLog(models.Model):
    doctor = models.ForeignKey(
        "doctors.DoctorProfile",
        related_name="access_logs",
        on_delete=models.SET_NULL,
        null=True,
    )
    patient = models.ForeignKey(
        "patients.PatientProfile",
        related_name="access_logs",
        on_delete=models.CASCADE,
    )
    time = models.DateTimeField(auto_now_add=True)
    cardano_hash = models.CharField(max_length=128, blank=True)


