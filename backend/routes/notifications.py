import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

from .users import usersCollection

load_dotenv()
# type must be assignment, grade, or question
class Notification(BaseModel):
    type: str
    title: str
    timestamp: str
    recipients: List[str]
    max_grade: Optional[str] = None
    actual_grade: Optional[str] = None
    teacher: Optional[str] = None
    due_date: Optional[str] = None
    class_name: Optional[str] = None
    user: Optional[str] = None

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

notifications_collection = database["notifications"]

notifications_router = APIRouter(
    prefix="/notifications",
    tags=["notifications"]
)

@notifications_router.get("/{notification_id}")
def get_notification(notification_id: str):
    
    notification = notifications_collection.find_one({"_id": ObjectId(notification_id)})

    if not notification:
        raise HTTPException(status_code=404, detail="Notification Not Found")
    
    notification["_id"] = str(notification["_id"])
    return notification

@notifications_router.post("/")
def create_notification(notification_body: Notification):
    notification_dict = notification_body.model_dump()
    notification = notifications_collection.insert_one(notification_dict)
    
    for recipient in notification_dict["recipients"]:
        user = usersCollection.find_one_and_update({"_id": ObjectId(recipient)}, {"$push": {"notifications": str(notification.inserted_id)}})
        
    
    return {"Success": "True", "Id": str(notification.inserted_id)}

@notifications_router.get("/all_notifications/{user_id}")
def get_all_notifications(user_id: str):
    
    notifications = notifications_collection.find({"recipients": {"$in": [user_id]}})
    
    notifications_array = []
    
    for notification in notifications: 
        notification["_id"] = str(notification["_id"])
        notifications_array.append(notification)
    
    return notifications_array