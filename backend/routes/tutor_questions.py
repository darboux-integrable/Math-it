import os
from typing import List, Optional

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient

load_dotenv()

class TutorQuestion(BaseModel):
    tutors: List[str]
    question: str
    answers: List[object]
    title: str
    asked_by: str

cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

tutor_questions_collection = database["tutor_questions"]

tutor_questions_router = APIRouter(
    prefix="/tutor_questions",
    tags=["tutor_questions"]
)

@tutor_questions_router.get("/all_questions/{username}")
def get_all_questions_asked_by_user(username: str):
    
    questions = tutor_questions_collection.find({"asked_by": username})
    
    questions_array = []
    
    for question in questions:
        question["_id"] = str(question["_id"])
        questions_array.append(question)
        
    return questions_array

@tutor_questions_router.get("/{question_id}")
def get_question_by_id(question_id: str):
    question = tutor_questions_collection.find_one({"_id": ObjectId(question_id)})
    
    if not question:
        raise HTTPException(status_code=404, detail="No Question Found")
    
    question["_id"] = str(question["_id"])
    return question
    
    
class QuestionList(BaseModel):
    ids: List[str]
    
@tutor_questions_router.post("/received_questions")
def get_all_received_questions(data: QuestionList):
    
    data_dict = data.model_dump()
    
    ids_array = []
    
    for id in data_dict["ids"]:
        ids_array.append(ObjectId(id))
    
    questions = tutor_questions_collection.find({"_id": {"$in": ids_array}})
    
    questions_array = []
    
    for question in questions:
        question["_id"] = str(question["_id"])        
        questions_array.append(question)
        
    return questions_array
    
class NewAnswer(BaseModel):
    text: str
    answered_by: str

@tutor_questions_router.patch("/add_answer/{question_id}")
def add_new_answer_to_question(question_id: str, data: NewAnswer):
    answer_dict = data.model_dump()
    
    tutor_questions_collection.find_one_and_update(
        {"_id": ObjectId(question_id)},
        {"$push": {"answers": answer_dict}}
    )
    
    return {"success": True}