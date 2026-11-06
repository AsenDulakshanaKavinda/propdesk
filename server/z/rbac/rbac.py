


from enum import Enum

from server.core.dependencies import CurrentUser, get_current_user

from enum import Enum
from pydantic import BaseModel

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"



from fastapi import Depends, HTTPException, status
from typing import List

def require_role(required_role: str):
    """Dependency factory ensuring the user possesses a specific role."""
    def role_dependency(current_user: CurrentUser = Depends(get_current_user)):
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied: insufficient role privileges"
            )
        return current_user
    return role_dependency


def require_permission(required_permission: str):
    """Dependency factory ensuring the user possesses a specific fine-grained permission."""
    def permission_dependency(current_user: CurrentUser = Depends(get_current_user)):
        if required_permission not in current_user.permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied: missing permission '{required_permission}'"
            )
        return current_user
    return permission_dependency

