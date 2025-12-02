from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    ROLE_PATIENT = "patient"
    ROLE_DOCTOR = "doctor"
    ROLE_HOSPITAL = "hospital"

    ROLE_CHOICES = [
        (ROLE_PATIENT, "Patient"),
        (ROLE_DOCTOR, "Doctor"),
        (ROLE_HOSPITAL, "Hospital"),
    ]

    full_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=32, blank=True, null=True, unique=True)
    national_id = models.CharField(max_length=64, blank=True, null=True, unique=True)
    email = models.EmailField(blank=True, null=True)
    role = models.CharField(max_length=16, choices=ROLE_CHOICES, default=ROLE_PATIENT)
    language = models.CharField(max_length=16, blank=True, default="en")
    elder_mode = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
        default="profile_pictures/default_profile.png"
    )

    def __str__(self):
        return self.full_name or self.username


class OTPCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    phone = models.CharField(max_length=32, blank=True, null=True)
    national_id = models.CharField(max_length=64, blank=True, null=True)

    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)

    def is_valid(self) -> bool:
        return (not self.used) and timezone.now() < self.expires_at

    def __str__(self):
        return f"OTP for {self.phone or self.national_id} - {self.code}"
