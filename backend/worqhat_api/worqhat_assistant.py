import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()

WORQHAT_API_KEY = os.getenv("worqhat_api_key")
WORQHAT_API_URL = os.getenv("worqhat_api_url")

def chat_with_assistant(question, codebase, model="aicon-v4-nano-160824", randomness=0.5, stream_data=False):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {WORQHAT_API_KEY}"
    }

    payload = {
        "question": question,
        "model": model,
        "randomness": randomness,
        "stream_data": stream_data,
        "response_type": "json",
        "training_data": """You are an AI chatbot trained to answer technical questions about code. Your task is to assist users by answering their queries about a codebase in a conversational manner. 
You should provide clear, informative responses, offer explanations, and suggest solutions based on the context of the code. 
If the question is not clear or requires more information, prompt the user for clarification. 
Your knowledge is based on the given code and any external libraries used within it."""
    }

    payload["codebase"] = codebase

    try:
        response = requests.post(WORQHAT_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return format_response(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None


def format_response(response_data):
    try:
        content = response_data.get("content", "")
        if not content:
            return "No meaningful response received from the assistant."

        # Attempt to parse the content if it's JSON formatted
        parsed_content = json.loads(content)
        if isinstance(parsed_content, dict):
            # Format as conversational text
            formatted_response = []
            for key, value in parsed_content.items():
                formatted_response.append(f"{key.replace('_', ' ').capitalize()}: {value}")
            return "\n".join(formatted_response)
        else:
            # Return as-is if not JSON
            return content
    except (json.JSONDecodeError, ValueError):
        return content

if __name__ == "__main__":
    # The codebase to be analyzed
    codebase = """
p = 3
q = 5
print(f"p = {p} q = {q}")
n = p * q
print(f"n = {n}")

toitent = (p-1)*(q-1)
print("phi of n :", toitent)

#euclidean theorem
#m is quotient r is remainder
#n is divisor
def gcd(m, n):
    while(n != 0):
        m,n = n, m % n
    return m 

e = 2
while (e < toitent): #satisfying first condition that e must be smaller than toitent function value and > 1 ( since e is starting with 2 )
 
    if(gcd(e, toitent) == 1):
        break
    else:
        e = e+1
print(f"e is {e}")

k = 1
d = int((1+(k*toitent))/e)
print(f"d is {d}")

#encryption
M = int(input("enter Plaintext that is less than N: ")) #PT ( M ) should be less than n
if M > n:
    print("please enter a value less than n")
else:
    print(f"Plain text is {M}")
    C = pow(M, e, n) #python mod function can be used in this way with three parameters 
    print(f"Cipher text is {C}")

    #decription
    PT = pow(C, d, n)
    print(f"Plain text after decryption is {PT}")
"""

    print("Chat Assistant: Ready to assist with your code questions.")
    print("Type 'exit' to end the chat.")

    while True:
        user_question = input("\nYou: ")
        if user_question.strip().lower() == "exit":
            print("Chat Assistant: Goodbye!")
            break

        # Sending the question to the chatbot assistant
        response = chat_with_assistant(user_question, codebase)
        if response:
            print(f"\nChat Assistant: {response}")
        else:
            print("\nChat Assistant: Unable to process your request at the moment.")
