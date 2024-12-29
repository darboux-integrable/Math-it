import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from datetime import datetime
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from .users import usersCollection

load_dotenv()

class Assignment(BaseModel):
    title: str
    class_id: str
    period: str
    teacher: str
    due_date: str
    due_time: str
    total_points: str
    questions: List[str]
    student_ids: List[str]

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

assignments_collection = database["assignments"]
assignments_student_details_collection = database["assignmentsStudentDetails"]

assignments_router = APIRouter(
    prefix="/assignments",
    tags=["assignments"]
)

# Get Assignment by Id
@assignments_router.get("/{assignment_id}")
def get_assignment(assignment_id: int):

    assignment = assignments_collection.find_one({"_id": ObjectId(assignment_id)})

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    assignment["_id"] = str(assignment["_id"])
    return assignment

# Create a new Assignment 
@assignments_router.post("/")
def create_assignment(assignment_body: Assignment):
    assignment_dict = assignment_body.model_dump()

    students_array = []

    for student_id in assignment_dict["student_ids"]:
        student = usersCollection.find_one({"_id": ObjectId(student_id)})
        
        students_array.append({
            "id": student_id,
            "name": student["first_name"] + " " + student["last_name"],
            "answers": [],
            "points_earned": "-",
            "max_points": assignment_dict["total_points"],
            "completed": False
        })
        
    student_details = assignments_student_details_collection.insert_one({
        "questions": assignment_dict["questions"],
        "students": students_array
    })
    
    del assignment_dict["questions"]

    assignment_dict["student_details"] = str(student_details.inserted_id)

    assignment = assignments_collection.insert_one(assignment_dict)

    return {"Success": "True", "ID": str(assignment.inserted_id)}

# Get all the assignments that have not passed by the classroom. 
@assignments_router.get("/not_passed/classroom/{classroom_id}")
def get_all_nonpassed_assignments_by_class(classroom_id: str):
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

# Get all assignments that have not passed by the user. 
@assignments_router.get("/not_passed/user/{user_id}")
def get_all_nonpassed_assignments_by_student(user_id: str):
    date_format="%Y-%m-%d"
    
    assignments = assignments_collection.find({"student_ids": {"$in": [user_id]}})
    
    assignments_not_passed = []
    
    for assignment in assignments:
        date_obj = datetime.strptime(assignment["due_date"], date_format).date()
        today = datetime.now().date()
        
        if date_obj >= today:
            assignment["_id"] = str(assignment["_id"])
            assignments_not_passed.append(assignment)
    
    return assignments_not_passed

# Get all the assignments a user has. 
@assignments_router.get("/all_assignments/users/{username}")
def get_all_assignments(username: str):
    
    assignments = assignments_collection.find({"recipients": {"$in": [username]}})
    
    assignments_array = []
    
    for assignment in assignments: 
        assignment["_id"] = str(assignment["_id"])
        assignments_array.append(assignment)
    
    return assignments_array

# Get Assignment List of Students for Educators.
@assignments_router.get("/assignment_list/{classroom_id}")
def get_assignment_list_for_class(classroom_id: str):
    
    assignments = assignments_collection.find({"class_id": classroom_id})
    
    assignemnts_list = []
    
    for assignment in assignments:
        
        assignment_details = assignments_student_details_collection.find_one({"_id": ObjectId(assignment["student_details"])})
        
        if not assignment_details: 
            raise HTTPException(status_code=404, detail="Could not find the details for this assignment")
        
        assignment_details["_id"] = str(assignment_details["_id"])
        
        assignemnts_list.append({
            "title": assignment["title"],
            "details": assignment_details
        })
    
    return assignemnts_list
        
    