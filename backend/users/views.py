from django.utils import timezone
from django.contrib.auth import get_user_model
from ninja import Router, Form, File
from ninja.files import UploadedFile
from ninja_jwt.tokens import RefreshToken
from .auth import AuthBearer
from .schemas import (
    SignupSchema, LoginSchema,
    BaseResponse, AuthSuccessResponse,
    UserProfileUpdateSchema, TokenSchema
)
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

User = get_user_model()
router = Router(tags=["Authentication & Profiles"])


def issue_tokens(user):
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token
    return str(access), str(refresh)


@router.post("/signup/", response={200: AuthSuccessResponse, 400: dict})
def signup(
    request,
    payload: SignupSchema = Form(...),
    profile_picture: UploadedFile = File(None),
):
    # 1. Check existing user
    if payload.email and User.objects.filter(email=payload.email).exists():
        return 400, {"error": "User with this email already exists"}

    # 2. Prepare username (fallback to phone or random if needed, but email is preferred)
    username = payload.email
    if not username:
        username = payload.phone
    if not username:
        return 400, {"error": "Email or Phone is required"}

    # 3. Create user using create_user to hash password
    try:
        user = User.objects.create_user(
            username=username,
            email=payload.email,
            password=payload.password,
            full_name=payload.full_name,
            phone=payload.phone,
            national_id=payload.national_id,
            role=payload.role or "patient",
        )
    except Exception as e:
        # Handle duplicate username or other db errors
        if "unique constraint" in str(e).lower():
             return 400, {"error": "User already exists"}
        return 400, {"error": str(e)}

    # 4. Save profile picture
    if profile_picture:
        file_ext = profile_picture.name.split('.')[-1]
        file_path = f"profile_pictures/{user.username}.{file_ext}"
        default_storage.save(file_path, ContentFile(profile_picture.read()))
        user.profile_picture = file_path
        user.save()

    # 5. Issue tokens immediately (No OTP)
    access, refresh = issue_tokens(user)

    return 200, {
        "success": True,
        "message": "Signup successful",
        "access": access,
        "refresh": refresh
    }


@router.post("/login/", response={200: AuthSuccessResponse, 401: dict})
def login(request, payload: LoginSchema):

    # Lookup user
    user = None
    if payload.email:
        user = User.objects.filter(email=payload.email).first()
    elif payload.phone:
        user = User.objects.filter(phone=payload.phone).first()
    elif payload.national_id:
        user = User.objects.filter(national_id=payload.national_id).first()
    
    # User not found
    if not user:
        return 401, {"error": "Invalid credentials"}

    # Password check
    if not user.check_password(payload.password):
        return 401, {"error": "Invalid credentials"}
    
    # Issue tokens (No OTP)
    access, refresh = issue_tokens(user)
    
    return 200, {
        "success": True,
        "message": "Login successful",
        "access": access,
        "refresh": refresh
    }


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
    import json
    try:
        body = json.loads(request.body)
    except:
        body = {}
        
    refresh_token = body.get("refresh")

    if not refresh_token:
        return 401, {"error": "Refresh token missing"}

    try:
        token = RefreshToken(refresh_token)
        # Verify user exists
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
        # Doctor Profile
        "specialization": getattr(user, "specialization", ""),
        "license_number": getattr(user, "license_number", ""),
        "hospital": getattr(user, "hospital", ""),
        "years_experience": getattr(user, "years_experience", None),
        "address": getattr(user, "address", ""),
        "bio": getattr(user, "bio", ""),
    }


@router.put("/profile/update/", auth=AuthBearer(), response=BaseResponse)
def update_profile(request, data: UserProfileUpdateSchema):

    user = request.auth

    if data.full_name is not None:
        user.full_name = data.full_name
    if data.email is not None:
        user.email = data.email
    if data.phone is not None:
        user.phone = data.phone
    if data.language is not None:
        user.language = data.language
    if data.elder_mode is not None:
        user.elder_mode = data.elder_mode
    if data.emergency_contact is not None:
        user.emergency_contact = data.emergency_contact
    
    # Doctor Profile
    if data.specialization is not None:
        user.specialization = data.specialization
    if data.license_number is not None:
        user.license_number = data.license_number
    if data.hospital is not None:
        user.hospital = data.hospital
    if data.years_experience is not None:
        user.years_experience = data.years_experience
    if data.address is not None:
        user.address = data.address
    if data.bio is not None:
        user.bio = data.bio

    user.save()
    return BaseResponse(success=True, message="Profile updated successfully")
