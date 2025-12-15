from pydantic import BaseModel, EmailStr
from typing import Optional


class SignupSchema(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    national_id: Optional[str] = None
    email: Optional[EmailStr] = None
    role: str
    password: str


class LoginSchema(BaseModel):
    phone: Optional[str] = None
    national_id: Optional[str] = None
    password: str


class TokenSchema(BaseModel):
    refresh_token: str


class TokenResponseSchema(BaseModel):
    access: str
    refresh: Optional[str] = None


class AuthSuccessResponse(BaseModel):
    success: bool
    message: str
    access: Optional[str] = None
    refresh: Optional[str] = None


class UserProfileUpdateSchema(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    language: Optional[str] = None
    elder_mode: Optional[bool] = None
    emergency_contact: Optional[str] = None
    # Doctor Profile
    specialization: Optional[str] = None
    license_number: Optional[str] = None
    hospital: Optional[str] = None
    years_experience: Optional[int] = None
    address: Optional[str] = None
    bio: Optional[str] = None



class BaseResponse(BaseModel):
    success: bool
    message: str