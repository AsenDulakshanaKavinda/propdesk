from fastapi import APIRouter, Depends, HTTPException

from server.auth_service.schemas import RegisterRequest, LoginRequest
from server.core.dependencies import get_auth_repo
from server.store.auth_repo import AuthRepository


auth_route = APIRouter()


@auth_route.post("/register-request")
async def send_register_request(
    payload: RegisterRequest, 
    auth_repo: AuthRepository = Depends(get_auth_repo)
):
    """ send a register request """
    try:
        new_request = await auth_repo.create_register_request(payload)
        return {
            "message": "Registration request submitted successfully",
            "request_id": new_request.request_id
        }
    except ValueError as e:
        # handles duplicate email or uniqueness constraint errors from repository
        raise HTTPException(status_code=400, detail=str(e))
        
    except RuntimeError as e:
        # handles general database/SQLAlchemy errors
        raise HTTPException(status_code=500, detail=f"A database error occurred while processing your request. {str(e)}")
    





@auth_route.post("/login")
async def login(payload: LoginRequest):
    ...


@auth_route.get("/refresh")
async def get_refresh_token():
    ...
