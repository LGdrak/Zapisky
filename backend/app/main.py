from fastapi import FastAPI, HTTPException

app = FastAPI()

users = {
    "kracmermi@gymla.cz": {"username": "Michal", "password": "lmao"}
}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/create_account")
def create_account(email: str, username: str, password: str):
    if email not in users.keys():
        users[email] = {"username": username, "password": password}
    else:
        raise HTTPException(status_code=409, detail="Email already in use.")

@app.get("/users")
def read_users():
    return users 

print("Hello World")