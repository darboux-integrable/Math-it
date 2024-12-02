import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from routes.users import user_router

load_dotenv()

app = FastAPI()

# The list of origins is all the URLs that can talk with the backend.
origins = [
    "http://localhost:3000"
]

# Stop CORS errors and allow frontend to talk with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"], # Allow all methods 
    allow_headers=["*"] # Allow all headers 
)

app.include_router(user_router)

@app.get("/")
def home():
    return {"Success": "True"}
 


# post = {
#     "name": "Adam Evans",
#     "password": "Ujthnje8"
# }

# collection.insert_one(post)
