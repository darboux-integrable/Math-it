import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import pymongo # Possibly remove later
from datetime import datetime
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from .discussions import post_collection
from .question_answers import answers_collection
from .questions import question_collection

load_dotenv()
    
cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

user_comments_collection = database["user_comments"]

comments_list_collection = database["comments_list"]

user_comments_router = APIRouter(
    prefix="/user_comments",
    tags=["user_comments"]
)

class UserComment(BaseModel):
    text: str
    post_date_and_time: str
    user_name: Optional[str] = None
    name: Optional[str] = None
    votes: Optional[int] = None

# Create New User Comment for a classroom
@user_comments_router.post("/classroom_discussion/{post_id}")
def create_user_comment(user_comment: UserComment, post_id: str):

    user_comment_dict = user_comment.model_dump()
    
    new_comment = user_comments_collection.insert_one(user_comment_dict)
    
    post_collection.update_one({"_id": ObjectId(post_id)}, {"$push": {"replies": str(new_comment.inserted_id)}})
    
    
    return {"Success": "true", "id": str(new_comment.inserted_id)}


class CommentList(BaseModel): 
    comment_ids: List[str]
    
# Get a list of user comments
@user_comments_router.post("/get_all_comments")
def get_all_comments(comment_list: CommentList):
    comment_list_dict = comment_list.model_dump()
    
    comment_array = []
    
    for id in comment_list_dict["comment_ids"]:
        comment = user_comments_collection.find_one({"_id": ObjectId(id)})
        
        if not comment:
            raise HTTPException(status_code=404, detail="No comment found with that ID")

        comment["_id"] = str(comment["_id"])
        comment_array.append(comment)
        
    return comment_array

# Create a new comment for a question post in a forum
@user_comments_router.post("/forums/{question_id}")
def create_comment_on_forum(user_comment_data: UserComment, question_id: str):
    
    user_comment_dict = user_comment_data.model_dump()
    
    new_comment = user_comments_collection.insert_one(user_comment_dict)
    
    question_collection.find_one_and_update({"_id": ObjectId(question_id)}, {"$push": {"comments": str(new_comment.inserted_id)}})
    
    return {"success": True, "message": "New Comment Created"}

@user_comments_router.post("/answers/{answer_id}")
def create_comment_on_answer(user_comment_data: UserComment, answer_id: str):
    
    user_comment_dict = user_comment_data.model_dump()
    
    new_comment = user_comments_collection.insert_one(user_comment_dict)
    
    answers_collection.find_one_and_update({"_id": ObjectId(answer_id)}, {"$push": {"comments": str(new_comment.inserted_id)}})
    
    return {"success": True, "message": "New Comment Created"}

class CommentIdList(BaseModel):
    ids: List[str]
    
@user_comments_router.post("/all_comments")
def get_all_comments_by_ids(comments_data: CommentIdList):
    
    comments_dict = comments_data.model_dump()
    
    comment_ids = []
    for comment_id in comments_dict["ids"]:
        comment_ids.append(ObjectId(comment_id))
        
    comments = user_comments_collection.find({"_id": {"$in": comment_ids}})
    
    comments_array = []
    
    for comment in comments:
        comment["_id"] = str(comment["_id"])
        
        comments_array.append(comment)
    
    return comments_array

