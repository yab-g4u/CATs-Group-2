from django.db import models

import uuid
from django.db import models
from patients.models import Patient, Visit

class Referral(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_visit = models.ForeignKey(Visit, related_name='out_referrals', on_delete=models.CASCADE)
    to_facility = models.CharField(max_length=255)
    created_by = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    packet_generated = models.BooleanField(default=False)
    packet_file = models.FileField(upload_to='referral_packets/', null=True, blank=True)
    status = models.CharField(max_length=32, choices=[
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('completed', 'Completed'),
    ], default='pending')
    notes = models.TextField(blank=True)