import os
from typing import List, Optional

import bcrypt
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient
from .tutor_questions import tutor_questions_collection

load_dotenv()

class User(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    account_type: str
    img: Optional[str] = None
    subjects: Optional[List[str]] = []
    tutor_questions: Optional[List[str]] = []
    classrooms: Optional[List[str]] = []
    assignments: Optional[List[object]] = []

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

usersCollection = database["users"]

user_router = APIRouter(
    prefix="/users",
    tags=["users"]
)

# Login a User 
@user_router.get("/")
def get_user(username: str, password: str):

    # usernames are unique so there can be at max one user with this username
    user = usersCollection.find_one({"username": username})

    # Make sure there exist a user under the username entered
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check to see if the password for the user is correct
    entered_password_bytes = password.encode("utf-8")

    if not bcrypt.checkpw(entered_password_bytes, user["password"]):
        raise HTTPException(status_code=401, detail="Password and Username Does not Match")

    # Turn id into a string instead of an ObjectID. 
    # It causes an error if left as an ObjectID
    user["_id"] = str(user["_id"]) 
    return user

# Get user from Id
@user_router.get("/{user_id}")
def get_user_from_id(user_id: str):
    user = usersCollection.find_one({"_id": ObjectId(user_id)})

    # If no user was found
    if not user:
        raise HTTPException(status_code=404, detail="No User was found with that ID")
    
    # convert _id to a string instead of ObjectID to stop an Error
    user["_id"] = str(user["_id"])
    return user

# Sign up a user
@user_router.post("/")
def create_new_user(user_body: User):
    user_dict = user_body.model_dump()
    username = user_dict["username"]
    user_dict["favorite_resources"] = []
    
    # Make sure does not already exist a user with the entered username
    possibleUser = usersCollection.find_one({"username": username})

    if possibleUser: 
        raise HTTPException(status_code=403, detail="There already exist a user with that username")

    # This code only executes if there is no user with the entered username
    password = user_dict["password"]
    passwordToBytes = password.encode("utf-8")

    # Create the salt and hash the password 
    salt = bcrypt.gensalt()
    hashedPassword = bcrypt.hashpw(passwordToBytes, salt)

    # Make the password the hashed password
    user_dict["password"] = hashedPassword

    new_user = usersCollection.insert_one(user_dict)
    
    # make inserted_id a string and not ObjectID to stop an Error
    return {"Success": "True", "user_id": str(new_user.inserted_id)}

class ResourceList(BaseModel):
    ids: List[str]

@user_router.post("/find_tutors")
def find_tutors_by_subject_list(subjects_data: ResourceList):
    subjects_array = subjects_data.model_dump()
    
    tutors_list = []
    
    for subject in subjects_array["ids"]:
        tutors = usersCollection.find({"subjects": subject})
        
        for tutor in tutors:
            tutor["_id"] = str(tutor["_id"])
            
            if not (tutor in tutors_list):
                tutors_list.append(tutor) 
            
    return tutors_list

@user_router.patch("/{id}/favorite_resources")
def update_users_favorite_resources(id: str, resources_list: ResourceList):
    
    new_list = resources_list.model_dump()
    
    usersCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set": {"favorite_resources": new_list["ids"]}})
    
    return {"success": True}

class TutorQuestion(BaseModel):
    tutors: List[str]
    question: str
    title: str
    asked_by: str
    

@user_router.patch("/add_tutor_question")
def add_question_to_tutor_accounts(tutors_data: TutorQuestion):
    tutors_dict = tutors_data.model_dump()
    
    question = tutor_questions_collection.insert_one({
        "tutors": tutors_dict["tutors"],
        "question": tutors_dict["question"],
        "answers": [],
        "title": tutors_dict["title"],
        "asked_by": tutors_dict["asked_by"]
    })
    
    for tutor_id in tutors_dict["tutors"]:
        if(tutor_id != tutors_dict["asked_by"]):
            usersCollection.find_one_and_update({"_id": ObjectId(tutor_id)}, {"$push": {"tutor_questions": str(question.inserted_id)}})
    
    
    return {"success": True}
    