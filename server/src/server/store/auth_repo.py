from uuid import uuid4

from server.auth_service.schemas import RegisterRequest
from server.service import create_hashed_password
from sqlalchemy.ext.asyncio import AsyncSession
from server.store.models import RegisterRequests as RegisterRequestsModel
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


class AuthRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_register_request(self, payload: RegisterRequest) -> RegisterRequestsModel:
        """ create a new user using payload """
        req_data = payload.model_dump()


        req_data["request_id"] = str(uuid4())
        req_data["hashed_password"] = create_hashed_password(payload.password)
        req_data.pop("password")

        new_request = RegisterRequestsModel(**req_data)

        try:
            self.db.add(new_request)
            await self.db.commit()
            await self.db.refresh(new_request)

        # handle unique constraint violations (eg - duplicate email)
        except IntegrityError as e:
            await self.db.rollback()
            raise ValueError(f"A registration request with this email or ID already exists: {str(e)}") from e
        # handle other general db errors
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise RuntimeError(f"Database error occurred: {str(e)}") from e

        return new_request
