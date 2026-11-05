
from typing import Literal
from pydantic import BaseModel


class RegisterRequestDisposition(BaseModel):
    request_id: str
    status: str = Literal["pending", "approved", "rejected"]