from fastapi import APIRouter

from server.auth_service.schemas import RegisterRequest, LoginRequest

auth_route = APIRouter()


@auth_route.post("/register-request")
async def send_register_request(payload: RegisterRequest):
    ...


@auth_route.post("/login")
async def login(payload: LoginRequest):
    ...


@auth_route.get("/refresh")
async def get_refresh_token():
    ...
