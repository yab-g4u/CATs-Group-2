import random
from datetime import timedelta
from django.utils import timezone
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from ninja import Router, Form, File
from ninja.files import UploadedFile
from ninja_jwt.tokens import RefreshToken
from .utils import send_otp_email
from .auth import AuthBearer
from .models import OTPCode
from .schemas import ( OTPVerifySchema,
    SignupSchema, LoginSchema,
    BaseResponse, AuthSuccessResponse,
    UserProfileUpdateSchema, TokenSchema
)

User = get_user_model()
router = Router(tags=["Authentication & Profiles"])



def generate_otp_code():
    return str(random.randint(100000, 999999))


def get_identifier(data):
    return data.phone or data.national_id or data.email


def issue_tokens(user):
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token
    return str(access), str(refresh)

@router.post("/signup/", response={200: dict, 400: dict})
def signup(
    request,
    payload: SignupSchema = Form(...),
    profile_picture: UploadedFile = File(None),
):
    # 1. Check existing user
    if User.objects.filter(username=payload.email).exists():
        return 400, {"error": "User with this email already exists"}

    # 2. Create user
    user = User.objects.create(
        username=payload.email,  # username = email
        email=payload.email,
        full_name=payload.full_name,
        phone=payload.phone,
        national_id=payload.national_id,
        role="patient",
    )

    # 3. Save profile picture
    if profile_picture:
        file_ext = profile_picture.name.split('.')[-1]
        file_path = f"profile_pictures/{user.username}.{file_ext}"
        default_storage.save(file_path, ContentFile(profile_picture.read()))
        user.profile_picture = file_path
        user.save()

    # 4. ALWAYS issue OTP
    otp = generate_otp_code()
    expires = timezone.now() + timedelta(minutes=15)

    OTPCode.objects.create(
        phone=user.phone,
        national_id=user.national_id,
        email=user.email,
        code=otp,
        expires_at=expires,
    )

    # 5. SEND OTP EMAIL
    if user.email:
        send_otp_email(user.email, otp)

    print("DEBUG SIGNUP OTP:", otp)

    return {"message": "Signup successful. OTP sent for verification."}


@router.post("/login/", response={200: dict, 401: dict})
def login(request, payload: LoginSchema):

    # Lookup by phone OR national_id OR email/username
    user = None

    if payload.phone:
        user = User.objects.filter(phone=payload.phone).first()

    elif payload.national_id:
        user = User.objects.filter(national_id=payload.national_id).first()

    else:
        # fallback: login using email or username
        user = User.objects.filter(username=payload.phone).first()

    # User not found
    if not user:
        return 401, {"error": "User not found"}

    # Password check
    if not user.check_password(payload.password):
        return 401, {"error": "Invalid password"}
    
    """
    otp = generate_otp_code()
    expires = timezone.now() + timedelta(minutes=15)

    OTPCode.objects.create(
        phone=user.phone,
        national_id=user.national_id,
        email=user.email,
        code=otp,
        expires_at=expires,
    )

    if user.email:
        send_otp_email(user.email, otp)

    print("DEBUG LOGIN OTP:", otp)

    return {"message": "OTP sent for login verification."}
    """

    # TEMPORARY (OTP disabled)
    return {"message": "Login request OK (OTP disabled)"}


@router.post("/auth/otp/verify", response=AuthSuccessResponse)
def otp_verify(request, data: OTPVerifySchema):

    identifier = get_identifier(data)
    if not identifier:
        return AuthSuccessResponse(success=False, message="Identifier missing")

    otp_qs = OTPCode.objects.filter(code=data.code, used=False)

    if data.phone:
        otp_qs = otp_qs.filter(phone=data.phone)
    elif data.national_id:
        otp_qs = otp_qs.filter(national_id=data.national_id)
    else:
        otp_qs = otp_qs.filter(email=data.email)

    otp = otp_qs.order_by("-created_at").first()

    if not otp or not otp.is_valid():
        return AuthSuccessResponse(success=False, message="Invalid/Expired OTP")

    # Mark OTP as used
    otp.used = True
    otp.save()

    # Get user
    user = User.objects.filter(
        phone=otp.phone,
        national_id=otp.national_id,
        email=otp.email,
    ).first()

    if not user:
        return AuthSuccessResponse(success=False, message="User not found")

    # Issue cookies
    access, refresh = issue_tokens(user)

    response = JsonResponse({
        "success": True,
        "message": "OTP Verified",
        "access": access,
        "refresh": refresh,
    })

    response.set_cookie(
        "access_token", access,
        httponly=False, secure=False, samesite="None", max_age=3600
    )
    response.set_cookie(
        "refresh_token", refresh,
        httponly=False, secure=False, samesite="None",
        max_age=7 * 24 * 3600
    )

    return response


@router.post("/logout/", auth=AuthBearer(), response={200: dict})
def logout(request, token_data: TokenSchema):
    try:
        token = RefreshToken(token_data.refresh_token)
        token.blacklist()
    except Exception:
        return {"error": "Invalid refresh token"}

    return {"message": "Logged out successfully"}


@router.post("/refresh-token/", response={200: dict, 401: dict})
async def refresh_token(request):
    body = await request.json()
    refresh_token = body.get("refresh")

    if not refresh_token:
        return 401, {"error": "Refresh token missing"}

    try:
        token = RefreshToken(refresh_token)
        user = User.objects.get(id=token["user_id"])
        new_access = str(token.access_token)

        return {"message": "Token refreshed", "access": new_access, "refresh": refresh_token}

    except Exception as e:
        return 401, {"error": "Invalid refresh token", "detail": str(e)}



@router.get("/profile/", auth=AuthBearer(), response=dict)
def get_profile(request):
    user = request.auth

    return {
        "id": user.id,
        "full_name": user.full_name,
        "phone": user.phone,
        "national_id": user.national_id,
        "email": user.email,
        "role": user.role,
        "language": user.language,
        "elder_mode": user.elder_mode,
    }


@router.put("/profile/update/", auth=AuthBearer(), response=BaseResponse)
def update_profile(request, data: UserProfileUpdateSchema):

    user = request.auth

    if data.language is not None:
        user.language = data.language
    if data.elder_mode is not None:
        user.elder_mode = data.elder_mode

    user.save()
    return BaseResponse(success=True, message="Profile updated successfully")
