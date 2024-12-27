# File that has to make and solve all the algebra problems. 
# It contains functions to create and solve these problems in a dictionary formate. 
from sympy import *
from sympy.matrices import *
import random
import math

def generate_single_variable_equation():
    x = symbols("x")
    
    c1 = random.randint(-100, 100)
    c2 = random.randint(-100, 100)
    
    LHS = simplify(x + c1)
    RHS = c2
    
    solved = solve(LHS - RHS, x)
    
    return {"LHS": str(LHS), "RHS": RHS, "solution": str(solved)}

def generate_system_of_equations():
    
    x = Symbol("x")
    y = Symbol("y")
    
    c1 = random.randint(-10, 10)    
    c2 = random.randint(-10, 10)    
    c3 = random.randint(-10, 10)    
    c4 = random.randint(-10, 10)    
    c5 = random.randint(-10, 10)    
    c6 = random.randint(-10, 10)    
     
    #Augmented Matrix used to represent the system. 
    EquationMatrix = Matrix([[c1, c2, c3], [c4, c5, c6]])
    
    solved = solve_linear_system(EquationMatrix, x, y)
    return {"problem": "{}x {:+d}y = {} and {}x {:+d}y = {}".format(c1, c2, c3, c4, c5, c6), "answer": str(solved)}
         
def generate_trinomial_quadratic():
    x = Symbol("x")
    
    a = random.randint(-10, 10)    
    c = random.randint(-10, 10)
    # To guarentee no imaginary solutions the descriminant:
    # b^2 - 4ac >= 0
    # b >= 2sqrt(ac)
    # Gets a random number large enough to always have b^2 - 4ac be positive
    b = math.ceil(math.sqrt(4 * abs(a) * abs(c)) + random.randint(0, 10))
    
    solved = solve(a * x**2 + b*x + c, x)
    
    return {"problem": "{}x^2 {:+d}x {:+d} = 0".format(a,b,c), "answer": str(solved)}

def generate_factored_quadratic():
    x = Symbol("x")
    
    c1 = random.randint(-10, 10)
    c2 = random.randint(-10, 10)
    c3 = random.randint(-5, 5)
    c4 = random.randint(-5, 5)
    
    equation = simplify((c3 * x + c1) * (c4 * x + c2))
    
    solved = solve(equation, x)
    
    return {"problem": str(equation) + "= 0", "answer": str(solved)}
    
def generate_differnce_of_two_squares():
    x = Symbol("x")
    
    c1 = random.randint(0, 10)
    c2 = random.randint(0, 20)
    
    equation = (c1 * c1 * x**2) - (c2 * c2)
    
    solved = solve(equation, x)
    
    return {"problem": str(equation), "answer": str(solved)}
    
def generate_absolute_value_equation():
    x = Symbol("x")
    
    c1 = random.randint(-10, 10)
    c2 = random.randint(-10, 10)
    c3 = random.randint(-10, 10)
    
    # |c1x + c2| = c3
    # c1x + c2 = c3 or c1x + c2 = -c3
    equation1 = Eq(c1 * x + c2, c3)
    equation2 = Eq(c1 * x + c2, -c3)
    
    solution1 = solve(equation1)
    solution2 = solve(equation2)
        
    return {"problem": "|{}x + {}| = {}".format(c1, c2, c3), "answer": str(solution1) + " " + str(solution2)}
    
def generate_logarithm_equation():
    
    # x, y = symbols('x, y', positive=True)  # Define variables as positive numbers for log calculations

    # eq1 = log(x + 1, 2) + log(x, 2)

    # solution = solve(eq1, x)  # Solve for x and y
    x = Symbol("x")
    
    b = random.randint(2, 10)
    
    c1 = random.randint(1, 5)
    c2 = random.randint(1, 5)
    c3 = random.randint(1, 5)
    c4 = random.randint(1, 5)
    c5 = random.randint(1, 5)
    
    # # 20% chance to use the natural logarithm and an 80% chance to use the randomly generated base
    equation = log(c1 * x + c2, b) + log(c3 * x, b) if random.randint(1, 5) != 5 else log(c1 * x + c2) + log(c3 * x)
    
    solved = solve(equation, x)
    
    return {"problem": str(equation) + " = 0", "answer": str(solved)}

def generate_exponential_equation():
    x = Symbol("x", real=True)
    
    b = random.randint(2, 6)
    
    c1 = random.randint(1, 5)
    c2 = random.randint(1, 5)
    c3 = random.randint(1, 5)
    c4 = random.randint(1, 5)
    
    equation = Eq(b ** (c1 * x + c2), b ** (c3 * x + c4))
    
    solved = solve(equation, x)
    
    return {"problem": str(equation), "answer": str(solved)}
    
    