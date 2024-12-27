import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
import json
import base64

load_dotenv()

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

announcements_collection = database["announcements"]

announcements_router = APIRouter(
    prefix="/announcements",
    tags=["announcements"]
)

class Announcement(BaseModel):
    title: str
    text: str
    post_date: str
    classroom_id: str

# Get Announcement by classroom_id
@announcements_router.get("/")
def get_announcements_by_classroom_id(classroom_id: str):
    
    announcements = announcements_collection.find({"classroom_id": classroom_id})
    
    announcements_array = []
    
    for announcement in announcements:
        announcement["_id"] = str(announcement["_id"])
        announcements_array.append(announcement)
        
    return announcements_array

# Create New Announcement
@announcements_router.post("/")
def create_announcement(body: Announcement):
    announcement_dict = body.model_dump()
    
    new_announcement = announcements_collection.insert_one(announcement_dict)
    
    if not new_announcement:
        raise HTTPException(status_code=500, detail="Error in creating new announcement")
    
    return {"id": str(new_announcement.inserted_id)}
