from django.contrib import admin
from .models import User
from doctors.models import DoctorProfile, Appointment, CarePointsTransaction
from patients.models import PatientProfile, Visit, Medication, LabResult

# Register User models
admin.site.register(User)

# Register Doctor models
admin.site.register(DoctorProfile)
admin.site.register(Appointment)
admin.site.register(CarePointsTransaction)

# Register Patient models
admin.site.register(PatientProfile)
admin.site.register(Visit)
admin.site.register(Medication)
admin.site.register(LabResult)