#WORK IN PROGRESS

import os
from dotenv import load_dotenv 
import requests
import json

load_dotenv()

WORQHAT_API_KEY = os.getenv("worqhat_api_key")

WORQHAT_API_URL = os.getenv("worqhat_api_url")

def analyze_code(code_snippet, model="aicon-v4-nano-160824", randomness=0.5, stream_data=False):
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
        "training_data": """You are tasked with analyzing the provided code and generating a structured representation in two parts:

    Hierarchical JSON Structure: This structure should represent the code components and their relationships. The output should include:
        name: The name of the function, method, or code component.
        type: The type of the component (e.g., "file", "directory", "parameter", "resource").
        children: A list of nested components or dependencies.
        dependencies: A list of components or resources this component relies on.
        For each function/method, include its parameters as "parameter" type.

    React Flow Viz Representation: This should be used for visualizing the code in a React Flow diagram:
        Nodes: Represent each function, class, or important block of code.
            Include:
                id: Unique identifier.
                label: The function/method name or description.
                type: Type of node (e.g., "function", "class", "resource").
        Edges: Represent dependencies between functions, variables, or modules.
            Include:
                source: ID of the source node.
                target: ID of the target node.
                relationship: Type of relationship (e.g., "calls", "depends_on", "shares_data").

    Formula/Syntax for Structure:

    A function is represented as a node with "type": "function" and parameters listed under "children" with "type": "parameter".
    A module or class is represented as a "directory", with functions or classes nested under "children".
    Dependencies (e.g., data, resources, other functions) should be listed under "dependencies" and represented as edges in the React Flow format.
    Include all relevant relationships, showing which components rely on others."""
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

    sample_code = """
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def update_quantity(self, quantity_sold):
        self.quantity -= quantity_sold

    def calculate_total_value(self):
        return self.price * self.quantity

class Inventory:
    def __init__(self):
        self.products = []

    def add_product(self, product):
        self.products.append(product)

    def calculate_inventory_value(self):
        total_value = 0
        for product in self.products:
            total_value += product.calculate_total_value()
        return total_value

    def get_product_by_name(self, name):
        for product in self.products:
            if product.name == name:
                return product
        return None

def main():
    inventory = Inventory()

    # Adding products to the inventory
    product1 = Product("Laptop", 1000, 10)
    product2 = Product("Smartphone", 500, 20)
    inventory.add_product(product1)
    inventory.add_product(product2)

    # Updating quantities and calculating values
    product1.update_quantity(2)  # 2 laptops sold
    product2.update_quantity(5)  # 5 smartphones sold

    # Printing inventory value
    print(f"Total Inventory Value: ${inventory.calculate_inventory_value()}")
"""



    result = analyze_code(sample_code)
    if result:
        print(json.dumps(result, indent=4))
    else:
        print("Failed to fetch analysis.")

