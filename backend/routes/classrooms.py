import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
import base64
import rasberry_pi

load_dotenv()

class Classroom(BaseModel):
    teacher: str
    image: str
    start_date: str
    end_date: str
    passed: bool

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

classroom_collection = database["classrooms"]

classrooms_router = APIRouter(
    prefix="/classrooms",
    tags=["classrooms"]
)

# Get classroom by ID
@classrooms_router.get("/{classroom_id}")
def get_classroom(classroom_id: str):
    classroom = classroom_collection.find_one({"_id": ObjectId(classroom_id)})
    
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    
    rasberry_pi.retrieve_image_from_raspberry_pi(classroom["image"])
    
    classroom["_id"] = str(classroom["_id"])
    return classroom

# Searches for all classrooms that have a user listed as a student and returns this list.
# It also saves the image files for these classrooms to the temp folder in the frontend.
@classrooms_router.get("/all_classrooms/{user_id}")
def get_all_classrooms_by_user(user_id: str):
    classrooms = classroom_collection.find({"students": {"$in": [user_id]}})
    
    classrooms_array = []
    
    for classroom in classrooms: 
        rasberry_pi.retrieve_image_from_raspberry_pi(classroom["image"])
        
        classroom["_id"] = str(classroom["_id"])
        classrooms_array.append(classroom)
    
    return classrooms_array

# Create New Classroom
@classrooms_router.post("/")
def create_classroom(classroom_body: Classroom):    
    classroom_dict = classroom_body.model_dump()
    classroom_dict["students"] = []
    classroom_dict["assignments"] = []
    classroom_dict["announcements"] = []
                                                                    # Local Image Location
    classroom_dict["image"] = rasberry_pi.add_image_to_raspberry_pi(classroom_dict["image"])
    
    classroom = classroom_collection.insert_one(classroom_dict)
    
    if not classroom:
        raise HTTPException(status_code=500, detail="Error in making new classroom") 
    
    return {"Id" : str(classroom.inserted_id)}

