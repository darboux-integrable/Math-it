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

tag_collection = database["tags"]

tags_router = APIRouter(
    prefix="/tags",
    tags=["tags"]
)

class Tag(BaseModel):
    name: str
    
@tags_router.post("/")
def create_tag(tag_data: Tag):
    
    tag_dict = tag_data.model_dump()
    tag_dict["times_used"] = 0
    
    new_tag = tag_collection.insert_one(tag_dict)
    
    if not new_tag:
        raise HTTPException(status_code=500, detail="Server error in creating a new tag")
    
    return {"id": str(new_tag.inserted_id)}

@tags_router.get("/all_tags")
def get_all_tags():
    tags = tag_collection.find({})
    
    tags_array = []
    
    for tag in tags:
        tag["_id"] = str(tag["_id"])
        tags_array.append(tag)
        
    return tags_array
