#updated

import os
from dotenv import load_dotenv 
import requests
import json

load_dotenv()

WORQHAT_API_KEY = os.getenv("worqhat_api_key")

WORQHAT_API_URL = os.getenv("worqhat_api_url")

def workflow(code_snippet, function_name, model="aicon-v4-nano-160824", randomness=0.5, stream_data=False):
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
        "training_data": """
Flowchart Viz Agent
You are an AI model tasked with analyzing the flow of a function or code block and returning a flowchart-like structure. Scan the code provided and return the structure for the function """ + function_name + """. Your output should follow the format below:

{
  "function_name": "<name of the function or method>",
  "steps": [
    {
      "type": "loop",
      "description": "loop description",
      "condition": "loop condition",
      "children":[
        ...further children inside loop
      ]
    },
    {
      "type": "if_statement",
      "description": "An if condition is checked",
      "condition": "if condition",
      "branches": [
        {
          "branch": "true",
          "action": "Description of what happens if condition is true",
          "state_change": "Changes to data"
        },
        {
          "branch": "false",
          "action": "Description of what happens if condition is false",
          "state_change": "Changes to data"
        }
      ]
    },
    {
      "type": "operation",
      "description": "Some operation is performed",
    }
  ]
}

Rules:
The steps should be ordered sequentially based on the flow of execution.
Each step should only be divisible into three types: loop, if_statement, and operation
For loops, include the loop condition and a description of the loop. Also include children steps inside the loop.
For if statements, include both true and false branches with corresponding actions and state changes.
For operations, describe the operation being performed very briefly.
Do not include any dependency or hierarchy analysis—just the flow and state transitions in the code.
"""
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

