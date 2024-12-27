from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import sympy
from .math.algebra import *

load_dotenv()

math_router = APIRouter(
    prefix="/math",
    tags=["math"]
)

# Get classroom by ID
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