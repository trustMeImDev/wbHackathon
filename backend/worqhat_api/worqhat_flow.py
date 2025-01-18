#WORK IN PROGRESS

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
        "training_data": """React Flow Viz Agent
You are an AI code analysis model tasked with generating a structured representation of the given code that can be used in React Flow for visualization. The output should include:
- **Nodes**: Each function, class, or important block of code should be represented as a node.
- **Edges**: Show dependencies between functions, variables, or modules. Indicate which functions call others or share data.
- Provide this output in a JSON or JavaScript object format, with keys for "nodes" (with IDs, labels, and types) and "edges" (with source, target, and relationship type)."""
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



    visual = workflow(sample_code)
    if visual:
        print(json.dumps(visual, indent=4))
    else:
        print("Failed to fetch analysis.")

