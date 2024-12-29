from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import sympy
from typing import List
from pydantic import BaseModel
from .math.algebra import *

load_dotenv()

math_router = APIRouter(
    prefix="/math",
    tags=["math"]
)

class MathList(BaseModel):
    topic_ids: List[int]
    question_numbers: List[int]


@math_router.get("/system_2_linear_equations")
def two_equation_linear_system():
    return generate_system_of_equations()

@math_router.get("/quadratic_trinomial")
def quadratic_trinomial():
    return generate_trinomial_quadratic()

@math_router.get("/factored_quadratic")
def factored_quadratic():
    return generate_factored_quadratic()

@math_router.get("/difference_of_two_squares")
def difference_of_two_squares():
    return generate_differnce_of_two_squares()

@math_router.get("/absolute_value_equation")
def absolute_value_equation():
    return generate_absolute_value_equation()

@math_router.get("/logarithm_equation")
def logarithm_equation():
    return generate_logarithm_equation()

@math_router.get("/exponential_equation")
def exponential_equation():
    return generate_exponential_equation()

@math_router.post("/problem_set")
def create_problem_set(problem_set: MathList):
    problem_set_dict = problem_set.model_dump()
    
    problems_array = []
    
    problem_functions = [
                        {"id": 1, "function": generate_single_variable_equation},
                        {"id": 2, "function": generate_system_of_equations},
                        {"id": 3, "function": generate_factored_quadratic}, 
                        {"id": 4, "function": generate_trinomial_quadratic},
                        {"id": 5, "function": generate_differnce_of_two_squares},
                        {"id": 6, "function": generate_absolute_value_equation}
                        ]
    
    for i in range(0, len(problem_set_dict["topic_ids"])):
        id = problem_set_dict["topic_ids"][i]
        num_problems = problem_set_dict["question_numbers"][i]
        current_problem_function = generate_logarithm_equation
        
        for problem_function in problem_functions:
            if problem_function["id"] == id:
                current_problem_function = problem_function["function"]
                break
        
        for i in range(0, num_problems):
            new_problem = current_problem_function()
            problems_array.append(new_problem)
            
    return problems_array
            
                
        
        
        
        
