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

upvotes_collection = database["upvotes"]

upvotes_router = APIRouter(
    prefix="/upvotes",
    tags=["upvotes"]
)

@upvotes_router.get("/{item_id}")
def get_upvote_list(item_id: str):
    
    user_list = upvotes_collection.find_one({"item_id": item_id})
    
    if not user_list:
        raise HTTPException(status_code=404, detail="No Upvote List Found for this question")

    user_list["_id"] = str(user_list["_id"])
    return user_list

@upvotes_router.patch("/{item_id}")
def update_upvotes_list(item_id: str, user_id: str, votes):
    upvotes_collection.update_one({"item_id": item_id}, {"$push": {"user_ids": user_id}})
    upvotes_collection.update_one({"item_id": item_id}, {"$set": {"votes": votes}})
    
    upvotes = upvotes_collection.find_one({"item_id": item_id})
    
    if not upvotes:
        raise HTTPException(status_code=404, detail="No upvotes list found")

    upvotes["_id"] = str(upvotes["_id"])
    return {"success": True, "message": "user_ids successfully updated.", "upvotes": upvotes}
