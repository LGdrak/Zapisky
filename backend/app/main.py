from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from mysql.mysql import Base, engine
from sqlalchemy.orm import Session
from mysql.model import User
import payload_validation
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

def add_user_to_db(user: InputValUser, db:Session = mysql.mysql.get_db()):
    new_user: User = User(name = user.name, id = user.id)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)


def validate_new_user(email: str):
    db: Session = mysql.mysql.get_db()
    if db.query(User).filter_by(id=email).first() is not None:
        return False
    return True




@app.get("/")
def read_root():
    print("Receiving request for hello world!")
    return {"Hello": "World"}


@app.put("/create_account")
def create_account(params: payload_validation.InputCreateUser):
    if validate_new_user(params.params["email"]):
        new_user: InputValUser = InputValUser(id=params.params["email"], name=params.params["username"], password=params.params["password"])
        add_user_to_db(new_user)
    else:
        raise HTTPException(status_code=409, detail="Email already in use.")


@app.get("/login")
def login(auth: payload_validation.InputLoginUser):
    db: Session = mysql.mysql.get_db()
    if db.query(User).filter_by(id=auth.auth["email"], password=auth.auth["password"]).first() is None:
        raise HTTPException(status_code=409, detail="Incorrect email or password.")

