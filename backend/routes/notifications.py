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
    title: str
    timestamp: str
    text: str
    recipients: List[str]
    class_id: Optional[str] = None
    max_grade: Optional[str] = None
    actual_grade: Optional[str] = None

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

notifications_collection = database["notifications"]

notifications_router = APIRouter(
    prefix="/notifications",
    tags=["notifications"]
)

# Get Notification By Id. 
@notifications_router.get("/{notification_id}")
def get_notification(notification_id: str):
    
    notification = notifications_collection.find_one({"_id": ObjectId(notification_id)})

    if not notification:
        raise HTTPException(status_code=404, detail="Notification Not Found")
    
    notification["_id"] = str(notification["_id"])
    return notification

# Create Notification 
@notifications_router.post("/")
def create_notification(notification_body: Notification):
    notification_dict = notification_body.model_dump()
    notification = notifications_collection.insert_one(notification_dict)
    
    for recipient in notification_dict["recipients"]:
        user = usersCollection.find_one_and_update({"_id": ObjectId(recipient)}, {"$push": {"notifications": str(notification.inserted_id)}})
        
    
    return {"Success": "True", "Id": str(notification.inserted_id)}

# Get all Notifications for a user
@notifications_router.get("/all_notifications/{user_id}")
def get_all_notifications(user_id: str):
    
    notifications = notifications_collection.find({"recipients": {"$in": [user_id]}})
    
    notifications_array = []
    
    for notification in notifications: 
        notification["_id"] = str(notification["_id"])
        notifications_array.append(notification)
    
    return notifications_array

#Get all notifications for a class
@notifications_router.get("/class_notifications/{class_id}")
def get_all_notificatons_by_class(class_id: str):
    notifications = notifications_collection.find({"class_id": class_id})
    
    notifications_array = []
    
    for notification in notifications:
        notification["_id"] = str(notification["_id"])
        notifications_array.append(notification)
        
    return notifications_array
    