import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.users import user_router
from routes.assignments import assignments_router
from routes.notifications import notifications_router
from routes.classrooms import classrooms_router
from routes.math_router import math_router
from routes.announcements import announcements_router
from routes.discussions import discussions_router
from routes.user_comments import user_comments_router

load_dotenv()

app = FastAPI()

# The list of origins is all the URLs that can talk with the backend.
origins = [
    "http://localhost:3000"
]

# Stop CORS errors and allow frontend to talk with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials = True,
    allow_methods=["*"], # Allow all methods 
    allow_headers=["*"] # Allow all headers 
)

app.include_router(user_router)
app.include_router(notifications_router)
app.include_router(announcements_router)
app.include_router(assignments_router)
app.include_router(classrooms_router)
app.include_router(math_router)
app.include_router(discussions_router)
app.include_router(user_comments_router)

@app.get("/")
def home():
    return {"Success": "True"}
 
