from fastapi import FastAPI, HTTPException
import json

def write_to_db(data):
    with open("users.json", "a") as users_from_db:
        users_from_db.write(data)

def search_for_user(user_id):
    with open("users.json", "r") as users_from_db:
        data = json.load("users.json")
        if user_id in data.keys():
            return True
        return False

app = FastAPI()

@app.get("/")
def read_root():
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

print("Hello World")