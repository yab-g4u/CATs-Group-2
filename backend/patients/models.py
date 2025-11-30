from django.db import models
import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

def qr_path(instance, filename):
    return f"qrcodes/{instance.id}.png"

class Patient(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=255)
    dob = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=32, blank=True, null=True)
    qr_code = models.ImageField(upload_to=qr_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def str(self):
        return f"{self.full_name} ({self.id})"


class Visit(models.Model):
    patient = models.ForeignKey(Patient, related_name='visits', on_delete=models.CASCADE)
    facility_name = models.CharField(max_length=255)  # clinic or hospital
    doctor = models.CharField(max_length=255)  # or FK to User
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Medication(models.Model):
    visit = models.ForeignKey(Visit, related_name='medications', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    dose = models.CharField(max_length=128, blank=True)
    instructions = models.TextField(blank=True)


class LabResult(models.Model):
    visit = models.ForeignKey(Visit, related_name='lab_results', on_delete=models.CASCADE)
    test_name = models.CharField(max_length=255)
    result_text = models.TextField(blank=True)
    file = models.FileField(upload_to='lab_results/', null=True, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)