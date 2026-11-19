from pydantic import BaseModel
from datetime import datetime


class InputValUser(BaseModel):
    id: str
    name: str
    password: str

class OutputValUser(InputValUser):
    id : str
    created_at : datetime
    class Config:
        from_attributes = True