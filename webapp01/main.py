from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.endpoint.sandbox01 import sandbox01


app = FastAPI()

app.include_router(sandbox01.router)

app.mount("/", StaticFiles(directory="static"), name="static")
