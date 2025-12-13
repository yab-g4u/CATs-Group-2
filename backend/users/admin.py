from django.contrib import admin
from .models import Doctor, Hospital, User

admin.site.register(Doctor)
admin.site.register(Hospital)
admin.site.register(User)