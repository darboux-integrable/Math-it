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
from .users import usersCollection

load_dotenv()

class Classroom(BaseModel):
    teacher: str
    image: str
    teacher_id: str
    start_date: str
    end_date: str
    title: str
    period: Optional[str]

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
    
    
    classroom["image"] = base64.b64encode(classroom["image"]).decode('utf-8')
    classroom["_id"] = str(classroom["_id"])
    return classroom

# Searches for all classrooms that have a user listed as a student and returns this list.
# It also saves the image files for these classrooms to the temp folder in the frontend.
@classrooms_router.get("/all_classrooms/{user_id}")
def get_all_classrooms_by_user(user_id: str):
    classrooms = classroom_collection.find({"students": {"$in": [user_id]}})
    
    classrooms_array = []
    
    for classroom in classrooms: 
        classroom["image"] = base64.b64encode(classroom["image"]).decode('utf-8')
        classroom["_id"] = str(classroom["_id"])
        classrooms_array.append(classroom)
    
    return classrooms_array

# Get all classes taught by a certain teacher 
@classrooms_router.get("/taught_by/{teacher_id}")
def get_all_classrooms_by_user(teacher_id: str):
    classrooms = classroom_collection.find({"teacher_id": teacher_id})

    if not classrooms:
        raise HTTPException(status_code=404, detail="Classrooms not found")

    classrooms_array = []

    for classroom in classrooms:
        classroom["image"] = base64.b64encode(classroom["image"]).decode('utf-8')
        classroom["_id"] = str(classroom["_id"])
        classrooms_array.append(classroom)
        

    return  classrooms_array

# Create New Classroom
@classrooms_router.post("/")
def create_classroom(classroom_body: Classroom):    
    classroom_dict = classroom_body.model_dump()
    classroom_dict["students"] = []
    classroom_dict["announcements"] = []
    
    classroom_dict["passed"] = False
    
    image_data = classroom_dict['image'].split(',')[1] # Remove the data:image/png;base64, prefix
    image_bytes = base64.b64decode(image_data)

    classroom_dict["image"] = image_bytes

    classroom = classroom_collection.insert_one(classroom_dict)
    
    if not classroom:
         raise HTTPException(status_code=500, detail="Error in making new classroom") 

    return {"Id" : str(classroom.inserted_id)}

# Adds the classroom to the user and the user to the classrooms students. 
@classrooms_router.patch("/add_student")
def addClassroom(user_id: str, classroom_id: str):
    user = usersCollection.find_one_and_update({"_id": ObjectId(user_id)}, {"$push": {"classrooms": classroom_id}})
    
    classroom = classroom_collection.find_one_and_update({"_id": ObjectId(classroom_id)}, {"$push": {"students": user_id}})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    
    classroom["image"] = base64.b64encode(classroom["image"]).decode('utf-8')
    classroom["_id"] = str(classroom["_id"])
    return {"Working"}
