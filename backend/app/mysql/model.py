from mysql.mysql import Base
from sqlalchemy import Column, String, DateTime, Boolean
from datetime import datetime

class User(Base):
    __tablename__ = "user"
    id = Column(String(50), primary_key = True)
    name = Column(String(50), nullable = False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)