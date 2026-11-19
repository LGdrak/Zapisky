from pydantic import BaseModel
import typing


class InputCreateUser(BaseModel):
    params: typing.TypedDict("params", {"username": str, "email": str, "password": str})


class InputLoginUser(BaseModel):
    auth: typing.TypedDict("auth", {"email": str, "password": str})
