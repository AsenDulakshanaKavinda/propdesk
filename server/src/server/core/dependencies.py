from collections.abc import AsyncGenerator

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from server.core.settings import get_settings
from server.store.repos.admin_repo import AdminRepository
from server.store.repos.auth_repo import AuthRepository, UserNotFoundError
from server.store.conn import get_db_session
from server.store.repos.user_repo import UserRepository

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


oauth2_schema = OAuth2PasswordBearer(tokenUrl="/auth/v1/login")

SECRET_KEY = settings.secrets.secret_key
ALGORITHM = settings.secrets.algorithm


class CurrentUser(BaseModel):
    user_id: str
    name: str
    email: str
    status: str
    role: str
    property: str | None = None
    unit: str | None = None
    permissions: str | None = None


async def get_current_user(
    token: str = Depends(oauth2_schema),
    auth_repo: AuthRepository = Depends(get_auth_repo),
) -> CurrentUser:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # 1. verify the token (signature + expiry)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:  # includes ExpiredSignatureError
        raise credentials_exception

    email: str | None = payload.get("sub")
    if email is None:
        raise credentials_exception

    # 2. load the user fresh from the DB
    try:
        user = await auth_repo.fetch_user_by_email(email)
    except UserNotFoundError:
        raise credentials_exception
    if user is None:
        raise credentials_exception

    # 3. block accounts that aren't approved / were disabled after the token was issued
    if user.status != "active":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is not active")

    return CurrentUser(
        user_id=str(user.user_id),   # str() in case it's a UUID or int
        name=user.name,
        email=user.email,
        status=user.status,
        role=user.role,
        property=user.property,
        unit=user.unit,
        permissions=user.permission,  # from DB, not the token
    )


# Reusable guards for protected routes
async def require_admin(current_user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user


def require_permission(permission: str):
    async def checker(current_user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
        if permission not in current_user.permission:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Missing permission: {permission}")
        return current_user
    return checker