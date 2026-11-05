



from collections.abc import AsyncGenerator
from fastapi import Depends
from server.store.conn import get_db_session
from sqlalchemy.ext.asyncio import AsyncSession

from server.store.auth_repo import AuthRepository
from server.store.admin_repo import AdminRepository

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """ get a database session """
    async with get_db_session() as session:
        yield session

async def get_auth_repo(db: AsyncSession = Depends(get_db)) -> AuthRepository:
    """ get an auth repository """
    return AuthRepository(db)

async def get_admin_repo(db: AsyncSession = Depends(get_db)) -> AdminRepository:
    """ get an admin repository """
    return AdminRepository(db)







