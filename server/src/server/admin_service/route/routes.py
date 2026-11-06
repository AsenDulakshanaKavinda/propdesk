from fastapi import APIRouter, Depends, HTTPException

from server.admin_service.schema.schemas import RegisterRequestDisposition
from server.core.dependencies import get_admin_repo, get_user_repo
from server.store.admin_repo import AdminRepository, RegisterRequestsNotFoundError
from server.store.user_repo import CreateUser, UserRepository

admin_route = APIRouter()


@admin_route.post("/register-request/all-register-request")
async def get_all_register_request(
    admin_repo: AdminRepository = Depends(get_admin_repo),
):
    """Fetch all the register requests."""
    try:
        requests = await admin_repo.get_all_register_request()
        return {"count": len(requests), "requests": requests}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))


@admin_route.get("/register-request/{request_id}")
async def get_register_request(
    request_id: str, admin_repo: AdminRepository = Depends(get_admin_repo)
):
    """Get a registration request by ID."""
    try:
        request = await admin_repo.get_register_request_by_id(request_id)
        return {"message": "fetch request by id successfully", "request": request}

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

        if payload.status == "approve":
            # 2. create new user data
            user_data = CreateUser(
                name=updated_request.name,
                email=updated_request.email,
                hashed_password=updated_request.hashed_password,
                role="user",
                status=payload.status,
                region=updated_request.region,
            )

            new_user = await user_repo.create_user(user_data)

        return {
            "message": "Registration request updated successfully",
            "request": updated_request,
        }
    except RegisterRequestsNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
