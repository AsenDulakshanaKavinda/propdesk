from collections.abc import AsyncGenerator

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from server.core.settings import get_settings
from server.store.admin_repo import AdminRepository
from server.store.auth_repo import AuthRepository
from server.store.conn import get_db_session
from server.store.user_repo import UserRepository

settings = get_settings()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """get a database session"""
    async with get_db_session() as session:
        yield session


async def get_auth_repo(db: AsyncSession = Depends(get_db)) -> AuthRepository:
    """get an auth repository"""
    return AuthRepository(db)


async def get_admin_repo(db: AsyncSession = Depends(get_db)) -> AdminRepository:
    """get an admin repository"""
    return AdminRepository(db)


async def get_user_repo(db: AsyncSession = Depends(get_db)) -> UserRepository:
    """get an user repository"""
    return UserRepository(db)


oauth2_schema = OAuth2PasswordBearer(tokenUrl="/login")

SECRET_KEY = settings.secrets.secret_key
ALGORITHM = settings.secrets.algorithm


async def get_current_user(
    token: str = Depends(oauth2_schema),
    auth_repo: AuthRepository = Depends(get_auth_repo),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")

        if email in None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await auth_repo.fetch_user_by_email(email)
    if user is None:
        raise credentials_exception

    return user
