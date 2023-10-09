import sys
import json
import re
from base64 import b64decode


def get_optimal_code(implementations) -> str:
    # find the first implementation that is python from the solutions
    for i in implementations:
        for j in i:
            if j["langSlug"] == "python3":
                return j["code"]


def test_solution(code: str, class_name: str, function_name: str, t_input: str):
    t_input = t_input.replace("\n", ", ")

    formatted_code = "from typing import *\n"
    formatted_code += "import heapq\n"
    formatted_code += f"{code}\n"
    formatted_code += f"sol = {class_name}()\n"
    formatted_code += f"result = sol.{function_name}({t_input})\n"
    formatted_code += f"t_output = {class_name}().{function_name}({t_input})\n"
    formatted_code += f"del Solution\n"

    compiled_code = compile(formatted_code, "", "exec")

    def tester():
        pass

    tester.__code__ = compiled_code
    tester()

    return t_output


usage = f"Usage: python3 {__file__.split('/')[-1]} problem userCode"

if len(sys.argv) != 3:
    print(
        f"Missing Arguments\n{usage}",
        file=sys.stderr,
    )
    sys.stderr.flush()

problem = json.loads(b64decode(sys.argv[1]))
try:
    user_code = b64decode(sys.argv[2]).decode("utf-8")
except IndexError:
    raise "Invalid submission!"

# get the optimal solution and test cases for the problem
optimal_code = get_optimal_code(problem["solution"]["implementations"])
test_cases = problem["testCases"]

# get the class name and function name to know what to run when testing the code
class_name = optimal_code.split("\n")[0].strip()
function_name = optimal_code.split("\n")[1].strip()

class_name = re.search(r"class (.*?):", class_name).group(1)
function_name = re.search(r"def (.*?)\(", function_name).group(1)

solution = {"outputs": [], "passedAllCases": True}

for t_case in test_cases:
    optimal_solution = test_solution(optimal_code, class_name, function_name, t_case)
    user_solution = test_solution(user_code, class_name, function_name, t_case)

    if optimal_solution != user_solution:
        solution["passedAllCases"] = False

    solution["outputs"].append(
        {
            "testCase": t_case.replace("\n", ", "),
            "expected": optimal_solution,
            "output": user_solution,
            "passed": optimal_solution == user_solution,
        }
    )


print(json.dumps(solution))
sys.stdout.flush()
