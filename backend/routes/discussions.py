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
    
cluster = MongoClient(os.getenv("DATABASE_URI"))

database = cluster["MathIt"]

discussions_collection = database["discussions"]
post_collection = database["posts"]

discussions_router = APIRouter(
    prefix="/discussions",
    tags=["discussions"]
)

class Discussion(BaseModel):
    title: str
    text: str
    due_date: str
    due_time: str
    max_points: int
    classroom_id: str
    
class Post(BaseModel):
    title: str
    text: str
    post_date: str
    post_time: str
    name: str

# Create new discussion
@discussions_router.post("/")
def create_discussion(discussion: Discussion):
    discussion_dict = discussion.model_dump()
    discussion_dict["posts"] = []
    
    new_discussion = discussions_collection.insert_one(discussion_dict)
    
    return {"Message": "New Discussion Created!", "id": str(new_discussion.inserted_id)}   

# Get a post from a discussion
@discussions_router.get("/posts/{post_id}")
def get_post_from_discussion_by_id(post_id: str):
    post = post_collection.find_one({"_id": ObjectId(post_id)})
    
    if not post:
        raise HTTPException(status_code=404, detail="No Post found with that Id")
    
    post["_id"] = str(post["_id"])
    
    return post

# Get all discussions in a classroom
@discussions_router.get("/get_all")
def get_all_discussions_in_classroom(classroom_id: str):
    discussions = discussions_collection.find({"classroom_id": classroom_id});
    
    # This means that they have not added any discussions yet
    if not discussions:
        return {"discussions": []}
    
    discussions_array = []
    
    for discussion in discussions:
        discussion["_id"] = str(discussion["_id"])
        discussions_array.append(discussion)
        
    return {"discussions": discussions_array}


# Get Discussion by Id 
@discussions_router.get("/{discussion_id}")
def get_discussion_by_id(discussion_id: str):
    discussion = discussions_collection.find_one({"_id": ObjectId(discussion_id)})
    
    if not discussion:
        raise HTTPException(status_code=404, detail="No Discussion Found with that Id")
    
    posts_array = []
    
    for i in range(0, len(discussion["posts"])):
        discussion["posts"][i] = ObjectId(discussion["posts"][i])
    
    posts = post_collection.find({"_id": {"$in": discussion["posts"]}})

    for post in posts:
        post["_id"] = str(post["_id"])
        posts_array.append(post)
    
    discussion["_id"] = str(discussion["_id"])
    discussion["posts"] = posts_array
    
    return discussion

# Create New post and add it to the discussion
@discussions_router.patch("/{discussion_id}/post")
def create_and_add_post(post: Post, discussion_id: str):
    post_dict = post.model_dump()
    post_dict["replies"] = []
    post_dict["discussion_id"] = discussion_id
    
    new_post = post_collection.insert_one(post_dict)
        
    if not new_post:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    discussions_collection.find_one_and_update({"_id": ObjectId(discussion_id)}, {"$push": {"posts": str(new_post.inserted_id)}})
    
    return {"message": "New post created", "id": str(new_post.inserted_id)}

