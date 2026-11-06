from uuid import uuid4

from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from server.store.models import Users as UsersModel


class CreateUser(BaseModel):
    name: str
    email: str
    hashed_password: str
    role: str
    status: str
    region: str


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_user(self, payload: CreateUser):
        """
        create a new user in the database
        """
        user_data = payload.model_dump()
        user_data["user_id"] = str(uuid4())
        user_data["status"] = "active"

        new_user = UsersModel(**user_data)

        try:
            self.db.add(new_user)
            await self.db.commit()
            await self.db.refresh(new_user)

        except IntegrityError as e:
            await self.db.rollback()
            raise ValueError(f"new user with ID already exists: {e!s}") from e

        except SQLAlchemyError as e:
            await self.db.rollback()
            raise RuntimeError(f"Database error occurred: {e!s}") from e

        return new_user
