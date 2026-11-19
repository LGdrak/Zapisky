from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from mysql.mysql import Base, engine
from sqlalchemy.orm import Session
from mysql.model import User
from mysql.schema import InputValUser, OutputValUser
import mysql.mysql
from datetime import datetime

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBasic()

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    is_username = secrets.compare_digest(credentials.username.encode(), b"admin")
    is_password = secrets.compare_digest(credentials.password.encode(), b"password")
    if not (is_username and is_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@app.get("/sql")
def sql_test(db:Session = Depends(mysql.mysql.get_db)):
    return {
        "message": "DB creation successful"
    }

@app.post("/sql/insert")
def insert(user: InputValUser, db:Session = Depends(mysql.mysql.get_db)):
    new_user: User = User(name = user.name, id = datetime.utcnow().timestamp())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "message": "Inserted successfully"
    }

@app.get("/sql/get")
def get(user: InputValUser, db: Session = Depends(mysql.mysql.get_db)):
    return db.query(User).first()


@app.get("/")
def read_root():
    print("Receiving request for hello world!")
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/create_account")
def create_account(email: str, username: str, password: str):
    if not search_for_user(email):
        write_to_db({"username": username, "password": password})
    else:
        raise HTTPException(status_code=409, detail="Email already in use.")

@app.get("/users")
def read_users():
    return users 
