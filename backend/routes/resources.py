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

resource_collection = database["resources"]

resources_router = APIRouter(
    prefix="/resources",
    tags=["resources"]
)

class FlashCard(BaseModel):
    title: str
    cards: List[object]
    tags: list[str]
    created_by: str

class FlashCardList(BaseModel):
    ids: List[str]
    
@resources_router.post("/flashcard")
def create_flashcard(flashcard_data: FlashCard):
    flashcard_array = flashcard_data.model_dump()
    
    resource_collection.insert_one(flashcard_array)
    
    return {"success": True}

@resources_router.post("/flashcard/list")
def get_flashcard_list(card_list: FlashCardList):
    list_data = card_list.model_dump()
    
    for i in range(len(list_data["ids"])):
        list_data["ids"][i] = ObjectId(list_data["ids"][i])
    
    cards = resource_collection.find({"_id": {"$in": list_data["ids"]}})
    
    cards_array = []
    
    for card in cards:
        card["_id"] = str(card["_id"])
        cards_array.append(card)
        
    return cards_array

@resources_router.get("/created_by/{username}")
def create_all_resources_created_by_user(username: str):
    resources = resource_collection.find({"created_by": username})
    
    resources_array = []
    
    for resource in resources:
        resource["_id"] = str(resource["_id"])
        resources_array.append(resource)
        
    return resources_array

@resources_router.get("/flashcard/filter_by_tag/{tag_name}")
def get_flashcards_by_tag(tag_name: str):
    cards = resource_collection.find({"tags": {"$in": [tag_name]}})
    
    cards_array = []
    
    for card in cards:
        card["_id"] = str(card["_id"])
        cards_array.append(card)
        
    return cards_array