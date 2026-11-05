
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from server.store.models import RegisterRequests as RegisterRequestsModel
from server.admin_service.schemas import RegisterRequestDisposition

class RegisterRequestsNotFoundError(Exception):
    """ raise this error when there are not register request with given id """
    pass

class AdminRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_register_request(self) -> list[RegisterRequestsModel]:
        """ get all register requests """
        result = await self.db.execute(
            select(RegisterRequestsModel)
        )
        return list(result.scalars().all())

    async def get_register_request_by_id(self, id: str) -> RegisterRequestsModel:
        """ get a register request by id """
        result = await self.db.execute(
            select(RegisterRequestsModel).where(RegisterRequestsModel.request_id == id)
        )
        request = result.scalar_one_or_none()
        if request is None:
            raise RegisterRequestsNotFoundError(f"register request with id: {id} not found")
        return request


    async def disposition_register_request(self, payload: RegisterRequestDisposition):
        """ disposition a register request """
        await self.db.execute(
            update(RegisterRequestsModel)
            .where(RegisterRequestsModel.request_id == payload.request_id)
            .values(status = payload.status)
        )
        await self.db.commit()
        return await self.get_register_request_by_id(payload.request_id)
