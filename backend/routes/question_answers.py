import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from .upvotes import upvotes_collection

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
    answer_dict["comments"] = []
    
    new_answer = answers_collection.insert_one(answer_dict)
    
    upvotes_collection.insert_one({"item_id": str(new_answer.inserted_id), "user_ids": [], "votes": 0})
    
    if not new_answer:
        raise HTTPException(status_code=500, detail="Server error in created a new answer for the question")
    
    return {"id": str(new_answer.inserted_id)}
    
class Answers(BaseModel):
    ids: List[str]
    
@answers_router.post("/sorted_answers")
def get_sorted_answers(answers_data: Answers):
    answers_array = answers_data.model_dump()
    
    votes_list = upvotes_collection.find({"item_id": {"$in":answers_array}})
    
    sorted_votes_list = []
    
    sorted_answers = []
    
    for votes in votes_list:
        sorted_votes_list.append(votes)
        
    # Selection Sort
    for i in range(0, len(sorted_votes_list)):
        
        max = sorted_votes_list[i]
        max_index = i
        for j in range(i, len(sorted_votes_list)):
            current = sorted_votes_list[j]
            
            if(current["votes"] > max["votes"]):
                max = current
                max_index = j
        
        temp = sorted_votes_list[i]
        sorted_votes_list[i] = max
        sorted_votes_list[max_index] = temp
        answer = answers_collection.find_one({"_id": ObjectId(max["item_id"])})
        sorted_answers.append(answer)
    
    return sorted_answers
