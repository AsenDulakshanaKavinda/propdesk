

from fastapi import APIRouter, Depends, HTTPException


from server.app.schemas import CreateUser, RegisterRequestDisposition
from server.core.dependencies import get_admin_repo, get_user_repo
from server.store.repos.admin_repo import AdminRepository, RegisterRequestsNotFoundError
from server.store.repos.user_repo import UserRepository

admin_route = APIRouter()


@admin_route.get("/")
async def get_admin_root():
    return {"message": "welcome to admin route"}


@admin_route.get("/register-request/all-register-request")
async def get_all_register_request(
    admin_repo: AdminRepository = Depends(get_admin_repo),
):
    try:
        data = await admin_repo.get_all_register_request()
        return {"data": data}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))


@admin_route.get("/register-request/{request_id}")
async def get_register_request(
    request_id: str, admin_repo: AdminRepository = Depends(get_admin_repo)
):
    try:
        data = await admin_repo.get_register_request_by_id(request_id)
        return {"data": data}
    except RegisterRequestsNotFoundError as e:
        # Translates not found exception to HTTP 404
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError as e:
        # Translates database failures to HTTP 500
        raise HTTPException(status_code=500, detail=str(e))



@admin_route.patch("/register-request/disposition")
async def disposition_request(
    payload: RegisterRequestDisposition,
    admin_repo: AdminRepository = Depends(get_admin_repo),
    user_repo: UserRepository = Depends(get_user_repo),
):
    try:
        # 1. update the status of the register request
        updated_request = await admin_repo.disposition_register_request(payload)

        # 2. create a new user
        if payload.status == "rejected":
            return

        new_user = CreateUser(
            name=updated_request.name,
            email=updated_request.email,
            hashed_password=updated_request.hashed_password,
            role=payload.role,
            status="active",
            property=updated_request.property,
            unit=updated_request.unit,
            permission=payload.permission
        )

        user = await user_repo.create_user(new_user)
        return {"data": user}
    
    except RegisterRequestsNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
