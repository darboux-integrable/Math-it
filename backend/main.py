import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

from routes.users import user_router
from routes.assignments import assignments_router, assignments_student_details_collection, assignments_collection
from routes.notifications import notifications_router
from routes.classrooms import classrooms_router
from routes.math_router import math_router
from routes.announcements import announcements_router
from routes.discussions import discussions_router, discussions_collection, post_collection
from routes.user_comments import user_comments_router

load_dotenv()

app = FastAPI()

# The list of origins is all the URLs that can talk with the backend.
origins = [
    "http://localhost:3000"
]

# Stop CORS errors and allow frontend to talk with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials = True,
    allow_methods=["*"], # Allow all methods 
    allow_headers=["*"] # Allow all headers 
)

app.include_router(user_router)
app.include_router(notifications_router)
app.include_router(announcements_router)
app.include_router(assignments_router)
app.include_router(classrooms_router)
app.include_router(math_router)
app.include_router(discussions_router)
app.include_router(user_comments_router)

@app.get("/grades/{student_id}")
def get_grades_by_id(student_id: str, classroom_id: str):
    # O(A)
    assignment_details = assignments_student_details_collection.find({"students": {"$elemMatch": {"id": student_id}}})
    
    # O(P)
    posts = post_collection.find({"user_id": student_id})
    
    assignment_details_array = []
    post_array = []
    
    # O(P)
    for post in posts:
        post["_id"] = str(post["_id"])
        post_array.append(post)
        
    # O(A)
    assignment_ids = []
    for assignment_detail in assignment_details:
        assignment_detail["_id"] = str(assignment_detail["_id"])
        assignment_ids.append(str(assignment_detail["_id"]))
        assignment_details_array.append(assignment_detail)
    
    grades_array = []
    
    # O(A^2)
    assignments = assignments_collection.find({"student_details": {"$in": assignment_ids}})
    
    assignments_array = []
    
    # O(A)
    for assignment in assignments:
        if(assignment["class_id"] == classroom_id):
            assignment["_id"] = str(assignment["_id"])
            assignments_array.append(assignment)
    
    # O(AS)
    for i in range(0, len(assignments_array)):
        assignment_details = list(filter(lambda assignment_details: str(assignment_details["_id"]) == assignments_array[i]["student_details"], assignment_details_array))[0]
        
        # O(S)
        for student in assignment_details["students"]:
            if student["id"] == student_id:
                grades_array.append({
                        "title": assignments_array[i]["title"],
                        "points_earned": student["points_earned"],
                        "max_points": student["max_points"],
                        "type": "assignment",
                        "id": str(assignment_details["_id"])
                })
    
    discussion_ids = []
    
    # O(P)
    for post in post_array:
        discussion_ids.append(ObjectId(post["discussion_id"]))
        
    # O(D^2) cause len(discussion_ids) <= total_number_of_discussions
    discussions = discussions_collection.find({"_id": {"$in": discussion_ids}})
        
    discussions_array = []
    # O(D)
    for discussion in discussions:
        if(discussion["classroom_id"] == classroom_id):
            discussion["_id"] = str(discussion["_id"])
            discussions_array.append(discussion)
    
    # O(DP)
    for discussion in discussions_array:
        
        # O(P)
        post_for_discussion = list(filter(lambda post: post["discussion_id"] == str(discussion["_id"]), post_array))
        
        # O(P) cause len(post_for_discussion) <= len(posts)
        for post in post_for_discussion:
            grades_array.append(
                {
                    "title": discussion["title"],
                    "points_earned": post["points_earned"],
                    "max_points": post["max_points"],
                    "type": "discussion",
                    "id": str(post["_id"])
                }
            )
            
    return grades_array
 
