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

answers_collection = database["answers"]

answers_router = APIRouter(
    prefix="/answers",
    tags=["answers"]
)

class Answer(BaseModel):
    text: str
    user: str
    question_id: str
    user_type: str
    answer_date: str
    

# Get all answers for a question with an ID
@answers_router.get("/question/{question_id}")
def get_all_answers_for_a_question(question_id: str):
    
    answers_array = []
    
    answers = answers_collection.find({"question_id": question_id})
    
    for answer in answers:
        answer["_id"] = str(answer["_id"])
        answers_array.append(answer)
        
    return answers_array

# Create new answer 
@answers_router.post("/")
def create_question_answer(answer_data: Answer):
    
    answer_dict = answer_data.model_dump()
    answer_dict["votes"] = 0
    answer_dict["comments"] = []
    
    new_answer = answers_collection.insert_one(answer_dict)
    
    if not new_answer:
        raise HTTPException(status_code=500, detail="Server error in created a new answer for the question")
    
    return {"id": str(new_answer.inserted_id)}
    