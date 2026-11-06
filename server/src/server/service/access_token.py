from datetime import UTC, datetime, timedelta

import jwt

from server.core.settings import get_settings

settings = get_settings()

ACCESS_TOKEN_EXPIRE_MINUTES = settings.secrets.access_token_expire_minutes
SECRET_KEY = settings.secrets.secret_key
ALGORITHM = settings.secrets.algorithm


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
