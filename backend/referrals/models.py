from django.db import models


class Referral(models.Model):
    STATUS_PENDING = "pending"
    STATUS_ACCEPTED = "accepted"
    STATUS_COMPLETED = "completed"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_ACCEPTED, "Accepted"),
        (STATUS_COMPLETED, "Completed"),
    ]

    from_doctor = models.ForeignKey(
        "doctors.DoctorProfile",
        related_name="outgoing_referrals",
        on_delete=models.SET_NULL,
        null=True,
    )
    patient = models.ForeignKey(
        "patients.PatientProfile",
        related_name="referrals",
        on_delete=models.CASCADE,
    )
    to_hospital = models.CharField(max_length=255)
    summary = models.TextField()
    status = models.CharField(
        max_length=32, choices=STATUS_CHOICES, default=STATUS_PENDING
    )
    cardano_hash = models.CharField(max_length=128, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class ClinicianThread(models.Model):
    referral = models.OneToOneField(
        Referral, related_name="thread", on_delete=models.CASCADE
    )
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class ThreadMessage(models.Model):
    TYPE_TEXT = "text"
    TYPE_VOICE = "voice"
    TYPE_IMAGE = "image"

    TYPE_CHOICES = [
        (TYPE_TEXT, "Text"),
        (TYPE_VOICE, "Voice"),
        (TYPE_IMAGE, "Image"),
    ]

    thread = models.ForeignKey(
        ClinicianThread, related_name="messages", on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        "doctors.DoctorProfile",
        related_name="sent_thread_messages",
        on_delete=models.SET_NULL,
        null=True,
    )
    text = models.TextField(blank=True)
    type = models.CharField(max_length=16, choices=TYPE_CHOICES, default=TYPE_TEXT)
    file = models.FileField(upload_to="thread_files/", null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
