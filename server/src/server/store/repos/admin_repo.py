from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from server.app.schemas import RegisterRequestDisposition
from server.store.models import RegisterRequests as RegisterRequestsModel


class RegisterRequestsNotFoundError(Exception):
    """raise this error when there are not register request with given id"""


class AdminRepository:
    def __init__(self, db: AsyncSession):
        self.db = db


    async def get_all_register_request(self) -> list[RegisterRequestsModel]:
        """get all register requests"""
        try:
            result = await self.db.execute(select(RegisterRequestsModel))
            return list(result.scalars().all())
        except SQLAlchemyError as e:
            raise RuntimeError(
                f"Database error occurred while fetching request: {e!s}"
            ) from e



    async def filter_all_register_request(
        self, status: str
    ) -> list[RegisterRequestsModel]:
        try:
            result = await self.db.execute(
                select(RegisterRequestsModel).where(
                    RegisterRequestsModel.status == status
                )
            )
            return list(result.scalars().all())

        except SQLAlchemyError as e:
            raise RuntimeError(
                f"Database error occurred while fetching request: {e!s}"
            ) from e



    async def get_register_request_by_id(self, id: str) -> RegisterRequestsModel:
        """get a register request by id"""
        try:
            result = await self.db.execute(
                select(RegisterRequestsModel).where(
                    RegisterRequestsModel.request_id == id
                )
            )
            request = result.scalar_one_or_none()
        except SQLAlchemyError as e:
            raise RuntimeError(
                f"Database error occurred while fetching request: {e!s}"
            ) from e

        if request is None:
            raise RegisterRequestsNotFoundError(
                f"register request with id: {id} not found"
            )

        return request

    async def disposition_register_request(self, payload: RegisterRequestDisposition):
        """disposition a register request"""
        try:
            await self.db.execute(
                update(RegisterRequestsModel)
                .where(RegisterRequestsModel.request_id == payload.request_id)
                .values(status=payload.status)
            )
            await self.db.commit()
        except IntegrityError as e:
            await self.db.rollback()
            raise ValueError(f"Invalid value or constraint violation: {e!s}") from e
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise RuntimeError(
                f"Database error occurred while updating request: {e!s}"
            ) from e

        # If the ID doesn't exist, this will naturally raise RegisterRequestsNotFoundError
        # via your get_register_request_by_id method, which handles the 404 cleanly.
        return await self.get_register_request_by_id(payload.request_id)
