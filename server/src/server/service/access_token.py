from datetime import UTC, datetime, timedelta
import jwt
from server.core.settings import get_settings

settings = get_settings()

SECRET_KEY = settings.secrets.secret_key
ALGORITHM = settings.secrets.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.secrets.access_token_expire_minutes


def create_access_token(
    data: dict, 
    permissions: list[str], 
    role: str = "user", 
    expires_delta: timedelta | None = None
) -> str:
    """Generate a JWT token embedding both user roles and fine-grained permissions."""
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({
        "exp": expire,
        "role": role,
        "permissions": permissions
    })

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt