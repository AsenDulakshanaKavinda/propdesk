from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession


from server.app.schemas.schema import RegisterRequest
from server.service import create_hashed_password
from server.store.models import RegisterRequests as RegisterRequestsModel
from server.store.models import Users as UsersModel


class UserNotFoundError(Exception): ...


class AuthRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_register_request(
        self, payload: RegisterRequest
    ) -> RegisterRequestsModel:
        """create a new user using payload"""
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
            raise ValueError(
                f"A registration request with this email or ID already exists: {e!s}"
            ) from e
        # handle other general db errors
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise RuntimeError(f"Database error occurred: {e!s}") from e

        return new_request

    async def fetch_user_by_email(self, email: str) -> UsersModel:
        try:
            result = await self.db.execute(
                select(UsersModel).where(UsersModel.email == email)
            )
            user = result.scalar_one_or_none()
        except SQLAlchemyError as e:
            raise RuntimeError(
                f"Database error occurred while fetching request: {e!s}"
            ) from e

        if user is None:
            raise UserNotFoundError(f"user with email: {email} not found")

        return user
