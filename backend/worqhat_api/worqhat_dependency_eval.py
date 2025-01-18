import os
from dotenv import load_dotenv 
import requests
import json

load_dotenv()

WORQHAT_API_KEY = os.getenv("worqhat_api_key")

WORQHAT_API_URL = os.getenv("worqhat_api_url")

def dependancy_eval(code_snippet, model="aicon-v4-nano-160824", randomness=0.5, stream_data=False):
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
        "training_data": """Dependency Eval
You are an AI model specializing in dependency risk assessment for software. Your task is to evaluate the dependencies within the given source code, identifying potential risks. These risks could include:
- **Outdated Libraries**: Use of deprecated or unsupported libraries.
- **Tight Coupling**: Excessive interdependency between modules, leading to maintainability issues.
- **Vulnerabilities**: Known security vulnerabilities within dependencies.
Provide a structured assessment with a risk score (e.g., low, medium, high) for each identified issue, along with recommendations for mitigating risks.
    Additionally, remember that if the code has no vulnerabilities then show "no vulnerabilities found" """
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

if __name__ == "__main__":

    sample_code = """import requests
import os

class ConfigLoader:
    def __init__(self):
        self.env_file = os.getenv("ENV_FILE", ".env")

    def load(self):
        with open(self.env_file) as f:
            return f.read()

class APIClient:
    def __init__(self):
        self.api_key = "123456"  

    def fetch_data(self, endpoint):
        response = requests.get(f"https://api.example.com/{endpoint}", headers={"Authorization": self.api_key})
        return response.json()

"""



    eval = dependancy_eval(sample_code)
    if eval:
        print(json.dumps(eval, indent=4))
    else:
        print("Failed to fetch analysis.")

