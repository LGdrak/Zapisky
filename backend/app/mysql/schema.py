from pydantic import BaseModel
from datetime import datetime


class InputValUser(BaseModel):
    name: str

class OutputValUser(InputValUser):
    id : str
    created_at : datetime
    class Config:
        from_attributes = True