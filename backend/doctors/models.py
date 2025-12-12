from django.db import models
from django.conf import settings


class DoctorProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="doctor_profile"
    )
    hospital = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255, blank=True)

    def __str__(self) -> str:
        return f"{self.user.full_name or self.user.username} - {self.specialization or 'General'}"
