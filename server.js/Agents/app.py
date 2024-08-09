from flask import Flask, request, jsonify
import json
import asyncio
import nest_asyncio
from flask_cors import CORS
from uagents.query import query
from uagents import Model
from uagents.resolver import UAgentsResolver

nest_asyncio.apply()


resolver = UAgentsResolver()
app = Flask(__name__)
CORS(app)
gemini_address = 'agent1qwg20ukwk97t989h6kc8a3sev0lvaltxakmvvn3sqz9jdjw4wsuxqa45e8l'

class Message(Model):
   message:str
class Response(Model):
    message:str

@app.route('/')
def home():
    return "Welcome"

# Define the /query route
@app.route('/diet/query', methods=['POST'])
async def query_get():
    try:
        info = request.get_json()
        user_message = info.get('message')
        print(user_message)
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        risk = user_message.get('risk')
        height = user_message.get('height')
        weight = user_message.get('weight')
        veg = user_message.get('veg')
        foodpref = user_message.get('food')
        message = f"Give a diet plan for controlling {risk} considering my weight {weight}, include only {veg} items and {foodpref} items"
        print(message)
    
        response_message=await query(destination=gemini_address,message=Message(message=message),timeout=15)
        
        
        try:
            response_message = await query(destination=gemini_address, message=Message(message=message), timeout=30)
            response_message = response_message.model_dump if isinstance(response_message, Model) else response_message
            print(response_message)
            return jsonify(response_message)
        except Exception as e:
            print(f"Error querying agent: {str(e)}")
            return jsonify({"error": "Failed to get response from agent"}), 500 
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
