import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

load_dotenv()

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

question_collection = database["questions"]

questions_router = APIRouter(
    prefix="/questions",
    tags=["questions"]
)

class Question(BaseModel):
    title: str
    text: str
    tags: List[str]
    user_asking: str
    ask_date: str

# Create new question
@questions_router.post("/")
def create_new_question(question_data: Question):
    
    question_dict = question_data.model_dump()
    question_dict["views"] = 0
    question_dict["votes"] = 0
    question_dict["answers"] = 0
    question_dict["comments"] = []
    
    for i in range(0, len(question_dict["tags"])):
        question_dict["tags"][i] = question_dict["tags"][i].lower()
    
    new_question = question_collection.insert_one(question_dict)
    
    if not new_question:
        raise HTTPException(status_code=500, detail="Could not create new question")

    return {"id": str(new_question.inserted_id)}    

# Get all questions
@questions_router.get("/all_questions")
def get_all_questions():
    questions = question_collection.find({})
    
    questions_array = []
    
    for question in questions:
        question["_id"] = str(question["_id"])
        questions_array.append(question)
        
    return questions_array

# Get Question by Id
@questions_router.get("/{question_id}")
def get_question_by_id(question_id: str):
    
    question = question_collection.find_one({"_id": ObjectId(question_id)})
    
    if not question:
        raise HTTPException(status_code=404, detail="No Question found with that Id")
    
    question["_id"] = str(question["_id"])
    return question