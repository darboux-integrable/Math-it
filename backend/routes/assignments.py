import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from datetime import datetime
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

load_dotenv()

class Assignment(BaseModel):
    title: str
    class_id: str
    period: str
    teacher: str
    due_date: datetime

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

assignments_collection = database["assignments"]
assignments_grades_collection = database["assignmentGrades"]

assignments_router = APIRouter(
    prefix="/assignments",
    tags=["assignments"]
)

@assignments_router.get("/{assignment_id}")
def get_assignment(assignment_id: int):

    assignment = assignments_collection.find_one({"_id": ObjectId(assignment_id)})

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    assignment["_id"] = str(assignment["_id"])
    return assignment

@assignments_router.post("/")
def create_assignment(assignment_body: Assignment):
    assignment_dict = assignment_body.model_dump()

    assignment_grades = assignments_grades_collection.insert_one({"grades": []})

    assignment_dict["grades_id"] = str(assignment_grades.inserted_id)

    assignment = assignments_collection.insert_one(assignment_dict)

    return {"Success": "True", "ID": str(assignment.inserted_id)}

@assignments_router.get("/not_passed/{classroom_id}")
def get_all_nonpassed_assignments(classroom_id: str):
    date_format="%Y-%m-%d"
    
    assignments = assignments_collection.find({"class_id": classroom_id})
    
    assignments_not_passed = []
    
    for assignment in assignments:
        date_obj = datetime.strptime(assignment["due_date"], date_format).date()
        today = datetime.now().date()
        
        if date_obj >= today:
            assignment["_id"] = str(assignment["_id"])
            assignments_not_passed.append(assignment)
    
    return assignments_not_passed 

@assignments_router.get("/all_assignments/users/{username}")
def get_all_assignments(username: str):
    
    assignments = assignments_collection.find({"recipients": {"$in": [username]}})
    
    assignments_array = []
    
    for assignment in assignments: 
        assignment["_id"] = str(assignment["_id"])
        assignments_array.append(assignment)
    
    return assignments_array
