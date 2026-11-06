from typing import Literal

from pydantic import BaseModel


class RegisterRequestDisposition(BaseModel):
    request_id: str
    status: Literal["approved", "rejected"]
    role: Literal["tenant", "admin"]
    permission: Literal["admin", "tenant"]


class CreateUser(BaseModel):
    name: str
    email: str
    hashed_password: str
    role: str
    status: str
    property: str
    unit: str
    permission: str

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    property: str
    unit: str
    password: str