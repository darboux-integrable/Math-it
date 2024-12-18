import os
from typing import List, Optional

import bcrypt
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient
import rasberry_pi

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
    
@user_router.patch("/{user_id}/profile_image")
def update_user_image(user_id: str, imageLocation: str):
    user = usersCollection.find_one({"_id": ObjectId(user_id)})

    # If the user has an old profile Image. 
    if user["img"] != None:
        rasberry_pi.remove_image_from_raspberry_pi(user["img"])

    newImageLocation = rasberry_pi.add_image_to_raspberry_pi(imageLocation) or "No Image"

    result = usersCollection.update_one({"_id": ObjectId(user_id)}, {"$set": {"img": newImageLocation}})

    if not result:
        raise HTTPException(status_code=501, detail="something went wrong on the server.")
    
    return {"Success": "True", "Message": "User Image Updated"}