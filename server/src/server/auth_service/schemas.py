from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, strip_whitespace=True)
    email: EmailStr = Field(...)
    region: str = Field(..., min_length=2, max_length=50, strip_whitespace=True)
    password: str = Field(..., min_length=8, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(..., min_length=8, max_length=128)