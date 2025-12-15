from pydantic import BaseModel, EmailStr
from typing import Optional


class SignupSchema(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    national_id: Optional[str] = None
    email: Optional[EmailStr] = None
    password: str
    role: Optional[str] = "patient"


class LoginSchema(BaseModel):
    email: Optional[EmailStr] = None
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


class OTPRequestSchema(BaseModel):
    phone: Optional[str] = None
    national_id: Optional[str] = None


class OTPVerifySchema(BaseModel):
    phone: Optional[str] = None
    national_id: Optional[str] = None
    code: str



class UserProfileUpdateSchema(BaseModel):
    language: Optional[str] = None
    elder_mode: Optional[bool] = None
    emergency_contact: Optional[str] = None



class BaseResponse(BaseModel):
    success: bool
    message: str
