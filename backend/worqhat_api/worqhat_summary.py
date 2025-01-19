import os
from dotenv import load_dotenv 
import requests
import json

load_dotenv()

WORQHAT_API_KEY = os.getenv("worqhat_api_key")

WORQHAT_API_URL = os.getenv("worqhat_api_url")

def get_code_summary(code_snippet, model="aicon-v4-nano-160824", randomness=0.5, stream_data=False):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {WORQHAT_API_KEY}"
    }

    payload = {
        "question": code_snippet,
        "model": model,
        "randomness": randomness,
        "stream_data": stream_data,
        "response_type": "json",
        "training_data": """You are a metrics extraction model designed to analyze source code. For the provided code file, you must return the following metrics in a structured JSON format:

    Lines of Code (LOC): Total number of lines of code, excluding blank lines.
    Number of Functions: Total count of defined functions in the code.
    Classes/Modules: List and count of all defined classes or modules, including methods within them (if applicable).
    Comments: Count of commented lines and the percentage of the total lines of code that are comments.

Additionally, provide a brief summary of the code:

    Functionality Overview: A concise description of the purpose or functionality of the code.
    Complexity: Mention any characteristics of the code that impact its complexity (e.g., highly nested functions, loops, recursion)."""
    }

    try:
        response = requests.post(WORQHAT_API_URL, headers=headers, json=payload)
        response.raise_for_status()  
        return process_response_data(response.json())  
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def process_response_data(response_data):
    try:
        # Extract the content string from the response
        content_string = response_data.get("content", "")
        
        if not content_string:
            raise ValueError("No content found in the response.")
        
        # Parse the content string into a valid JSON object
        parsed_data = json.loads(content_string)
        
        # Return the parsed, clean data
        return parsed_data
    except (json.JSONDecodeError, ValueError) as error:
        print(f"Error processing the response data: {error}")
        return None

# if __name__ == "__main__":

#     sample_code = """
# p = 3
# q = 5
# print(f"p = {p} q = {q}")
# n = p * q
# print(f"n = {n}")

# toitent = (p-1)*(q-1)
# print("phi of n :", toitent)

# #euclidean theorem
# #m is quotient r is remainder
# #n is divisor
# def gcd(m, n):
#     while(n != 0):
#         m,n = n, m % n
#     return m 

# e = 2
# while (e < toitent): #satisfying first condition that e must be smaller than toitent function value and > 1 ( since e is starting with 2 )
 
#     if(gcd(e, toitent) == 1):
#         break
#     else:
#         e = e+1
# print(f"e is {e}")

# k = 1
# d = int((1+(k*toitent))/e)
# print(f"d is {d}")

# #encryption
# M = int(input("enter Plaintext that is less than N: ")) #PT ( M ) should be less than n
# if M > n:
#     print("please enter a value less than n")
# else:
#     print(f"Plain text is {M}")
#     C = pow(M, e, n) #python mod function can be used in this way with three parameters 
#     print(f"Cipher text is {C}")

#     #decription
#     PT = pow(C, d, n)
#     print(f"Plain text after decryption is {PT}")
# """



#     summary = code_summary(sample_code)
#     if summary:
#         print(json.dumps(summary, indent=4))
#     else:
#         print("Failed to fetch analysis.")

