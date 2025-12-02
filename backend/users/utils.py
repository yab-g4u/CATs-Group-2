from django.core.mail import send_mail
from django.conf import settings


def send_otp_email(to_email: str, code: str):
    subject = "Your OTP Verification Code"
    message = f"Your verification code is: {code}\nThis code expires in 15 minutes."

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [to_email],
        fail_silently=False,
    )
