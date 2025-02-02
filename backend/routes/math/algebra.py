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
    
    return {"mathjax": "$$" + str(LHS)+ "=" +str(RHS)+ "$$", "answer": "$$" + "x="+str(solved[0]) + "$$"}

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
    EquationMatrix = Matrix(((c1, c2, c3), (c4, c5, c6)))
    
    solved = solve_linear_system(EquationMatrix, x, y)
    return {"mathjax": "$$\\begin{align*}" + str(c1)+"x + " + str(c2)+"y = "+str(c3)+"\\newline"+str(c4)+"x + "+str(c5)+"y = "+str(c6)+"\\end{align*}$$", "answer": "$$" + "x="+str(solved[x]) +"$$" + "\n" "$$" + "y="+str(solved[y]) + "$$"}
         
def generate_trinomial_quadratic():
    x = Symbol("x")
    
    a = random.randint(1, 10)    
    c = random.randint(1, 10)
    # To guarentee no imaginary solutions the descriminant:
    # b^2 - 4ac >= 0
    # b >= 2sqrt(ac)
    # Gets a random number large enough to always have b^2 - 4ac be positive
    b = math.ceil(math.sqrt(4 * abs(a) * abs(c)) + random.randint(0, 10))
    
    solved = solve(a * x**2 + b * x + c)
    print(solved)
    print(("$$x\\in" + str(solved)+"$$").replace("[", "\\{").replace("]", "\\}").replace("(", "{").replace(")","}"))
    
    return {"mathjax": "$$"+str(simplify(a * x**2 + b*x + c)).replace("**", "^").replace("*", "")+"=0$$", "answer": ("$$x\\in" + str(solved)+"$$").replace("[", "\\{").replace("]", "\\}").replace("(", "{").replace(")","}").replace("sqrt","\\sqrt")}

def generate_factored_quadratic():
    x = Symbol("x")
    
    c1 = random.randint(1, 10)
    c2 = random.randint(1, 10)
    c3 = random.randint(1, 5)
    c4 = random.randint(1, 5)
    
    equation = (c3 * x + c1) * (c4 * x + c2)
    
    factored = factor(simplify(equation))
    
    solved = solve(equation)
    
    return {"mathjax": "$$"+str(factored).replace("*", "")+"=0$$", "answer": ("$$x\\in" + str(solved)+"$$").replace("[", "\\{").replace("]", "\\}")}
    
def generate_differnce_of_two_squares():
    x = Symbol("x")
    
    c1 = random.randint(0, 10)
    c2 = random.randint(0, 20)
    
    equation = (c1 * c1 * x**2) - (c2 * c2)
    
    solved = solve(equation, x)
    
    return {"mathjax": "$$" + str(equation).replace("**", "^").replace("*", "") + "=0$$", "answer": ("$$x\\in" + str(solved)+"$$").replace("[", "\\{").replace("]", "\\}")}
    
def generate_absolute_value_equation():
    x = Symbol("x")
    
    c1 = random.randint(-10, 10)
    c2 = random.randint(-10, 10)
    c3 = random.randint(1, 10)
    
    # |c1x + c2| = c3
    # c1x + c2 = c3 or c1x + c2 = -c3
    equation1 = Eq(c1 * x + c2, c3)
    equation2 = Eq(c1 * x + c2, -c3)
    
    solution1 = solve(equation1)
    solution2 = solve(equation2)
    
    
    str1 = str(solution1).replace("]", "")
    str2 = str(solution2).replace("[", "")
    str3 = (str1 + ", " +str2).replace("[", "\\{").replace("]", "\\}")
    
    return {"mathjax": "$$|{}x + {}| = {}$$".format(c1, c2, c3), "answer": "$$x\\in"+str3+"$$"}
    
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

    equation = log(c1 * x + c2, b) + log(c3 * x, b)
    
    solved = solve(equation, x)
    
    return {"mathjax": "$$\\log_"+str(b)+"{("+str(c1)+"x"+"+"+str(c2)+")}"+"+\\log_"+str(b)+"{("+str(c3)+"x"+")}=0$$", "answer":"$$x="+ str(solved).replace("[", "").replace("]", "").replace("(", "{").replace(")", "}").replace("sqrt", "\\sqrt") + "$$"}

def generate_exponential_equation():
    x = Symbol("x", real=True)
    
    b = random.randint(2, 6)
    
    c1 = random.randint(1, 5)
    c2 = random.randint(1, 5)
    c3 = random.randint(1, 5)
    c4 = random.randint(1, 5)
    
    equation = Eq(b ** (c1 * x + c2), b ** (c3 * x + c4))
    
    solved = solve(equation, x)
    
    return {"mathjax": "$$"+str(b)+"^{"+str(c1)+"x+"+str(c2)+"}+"+str(b)+"^{"+str(c3)+"x"+"}=0$$", "answer": ("$$x\\in\\{"+str(solved)+"\\}$$").replace("[", "{").replace("]", "}")}
    
    