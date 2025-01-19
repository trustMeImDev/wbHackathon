#updated

import os
from dotenv import load_dotenv 
import requests
import json

load_dotenv()

WORQHAT_API_KEY = os.getenv("worqhat_api_key")

WORQHAT_API_URL = os.getenv("worqhat_api_url")

def workflow(code_snippet, model="aicon-v4-nano-160824", randomness=0.5, stream_data=False):
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
React Flow Viz Agent
You are an AI code analysis model tasked with generating a structured representation of the given code that can be used in React Flow for visualization. The output should include:

- **Nodes**: Each function, class, or important block of code should be represented as a node.
- **Edges**: Show dependencies between functions, variables, or modules. Indicate which functions call others or share data.
- Provide this output in a JSON format, with the following structure:
  - **nodes**: A list of nodes, each represented by:
      - `id`: A unique identifier for the node.
      - `label`: The name of the function, class, or code block.
      - `type`: The type of the node (either `function` or `directory`).
      - `position`: An object with `x` and `y` values representing the node's position for layout.
  - **edges**: A list of edges representing dependencies, each containing:
      - `source`: The `id` of the source node.
      - `target`: The `id` of the target node.
      - `relationship`: A description of the relationship (e.g., "calls", "depends_on", "shares_data").
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

