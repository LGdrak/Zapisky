from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

username = "root"
password = "sup3rPw#"
host = "localhost"
port = "3306"
db_name = "Zapisky"
DATABASE_URL = f"mysql+pymysql://{username}:{password}@{host}:{port}/{db_name}"

engine = create_engine(DATABASE_URL)

Local_session = sessionmaker(bind=engine, autoflush = False)

Base = declarative_base()

def get_db():
    db = Local_session()
    try:
        return db
    finally:
        db.close()
