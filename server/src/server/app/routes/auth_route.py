from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError

from server.app.schemas.schema import LoginRequest, RegisterRequest
# from server.auth_service.rbac.rbac import require_role
from server.core.dependencies import CurrentUser, get_auth_repo, get_current_user
from server.service.access_token import create_access_token
from server.service.password import check_password
from server.store.repos.auth_repo import AuthRepository, UserNotFoundError

auth_route = APIRouter()

@auth_route.get("/")
async def get_auth_root():
    return {"message": "welcome to auth route"}




@auth_route.post("/create-register-request")
async def create_register_request(
    payload: RegisterRequest,
    auth_repo: AuthRepository = Depends(get_auth_repo),
):
    try:
        new_request = await auth_repo.create_register_request(payload)
        return { "data": new_request}
    except ValueError as e:
        # handles duplicate email or uniqueness constraint errors from repository
        raise HTTPException(status_code=400, detail=str(e))
    
    except RuntimeError as e:
        # handles general database/SQLAlchemy errors
        raise HTTPException(
            status_code=500,
            detail=f"A database error occurred while processing your request. {e!s}",
        )





@auth_route.post("/login")
async def login(
    payload: LoginRequest,
    auth_repo: AuthRepository = Depends(get_auth_repo)
):
    try:
        # 1. find user with given email
        user = await auth_repo.fetch_user_by_email(payload.email)

        # 2. validate the password
        is_password_valid = check_password(
            payload.password, user.hashed_password
        )
        if not is_password_valid:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # 3. create the access token and return the response
        access_token = create_access_token(data={"sub": user.email}, permissions=[user.permission], role=user.role, expires_delta=None)

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "user_id": user.user_id,
                "name": user.name,
                "email": user.email,
                "role": user.role,  # <--- Added role so frontend can read it
                "property": user.property,
                "unit": user.unit
            }
        }
    except UserNotFoundError as e:
            raise HTTPException(status_code=404, detail=str(e))
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))


@auth_route.get("/me")
async def get_current_user_profile(current_user: CurrentUser = Depends(get_current_user)):
    """ Standard authenticated route returning user profile details. """
    return {
        "user_id": current_user.user_id,
        "name": current_user.name,
        "email": current_user.email,
        "status": current_user.status,
        "role": current_user.role,
        "property": current_user.property,
        "unit": current_user.unit,
        "permissions": current_user.permissions,
    }


# @auth_route.get("/admin/dashboard")
# async def admin_dashboard(current_user: CurrentUser = Depends(require_role("admin"))):
#     """Admin-only protected route."""
 #    return {"message": f"Welcome to the admin dashboard, {current_user.name}"}
