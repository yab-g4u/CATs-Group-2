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

    # Doctor/Professional Profile Fields
    specialization = models.CharField(max_length=100, blank=True)
    license_number = models.CharField(max_length=64, blank=True)
    hospital = models.CharField(max_length=255, blank=True)
    years_experience = models.IntegerField(null=True, blank=True)
    address = models.TextField(blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.full_name or self.username
