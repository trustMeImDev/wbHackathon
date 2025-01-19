#updated

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
        "training_data": """
You are tasked with analyzing the provided code and generating a structured representation optimized for visualization in React Flow. The output must strictly adhere to the following format and constraints:

1. **Hierarchical JSON Structure**:
   - **Attributes**:
     - `name`: The name of the function, method, or directory (module/class).
     - `type`: The type of the component. Valid types are:
       - `directory`: Represents a module or class.
       - `function`: Represents a function or method.
     - `children`: A list of nested components. Only include child elements of valid types (`function` or `directory`).
     - `id`: A unique identifier for each component, formatted as {{parentId}}-{{name}}.
     - `position`: An object with `x` and `y` values for hierarchical placement based on depth and spacing.

2. **React Flow Representation**:
   - **Nodes**:
     - `id`: Matches the unique identifier from the hierarchical structure.
     - `label`: Format as `{{name}} ({{type}})`.
     - `type`: Either `directory` or `function`.
     - `position`: Includes `x` and `y` values for layout.
   - **Edges**:
     - `id`: Format as `e-{{source}}-{{target}}`.
     - `source`: The `id` of the parent node.
     - `target`: The `id` of the child node.

---

### Rules:
1. **Valid Types Only**: Include only components with `type` attributes `function` or `directory`.
2. **Nesting**: Functions (`type: function`) must be nested under their parent directory (`type: directory`) or another function if applicable.
3. **Exclusions**: Exclude parameters, resources, and any other types not explicitly allowed.
4. **Positioning**: Assign `position` attributes for hierarchical placement. Use consistent vertical spacing for depth and horizontal spacing for siblings.

---

### Example Output:

**Hierarchical JSON Structure**:
```json
{{
  "name": "MainModule",
  "type": "directory",
  "id": "root-MainModule",
  "position": {{ "x": 0, "y": 0 }},
  "children": [
    {{
      "name": "ClassA",
      "type": "directory",
      "id": "root-MainModule-ClassA",
      "position": {{ "x": -200, "y": 150 }},
      "children": [
        {{
          "name": "methodA",
          "type": "function",
          "id": "root-MainModule-ClassA-methodA",
          "position": {{ "x": -250, "y": 300 }}
        }},
        {{
          "name": "methodB",
          "type": "function",
          "id": "root-MainModule-ClassA-methodB",
          "position": {{ "x": -150, "y": 300 }}
        }}
      ]
    }},
    {{
      "name": "globalFunction",
      "type": "function",
      "id": "root-MainModule-globalFunction",
      "position": {{ "x": 200, "y": 150 }}
    }}
  ]
}}
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

