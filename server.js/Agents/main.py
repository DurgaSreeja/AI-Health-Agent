from flask import Flask, request, jsonify
from flask_cors import CORS
from uagents import Model
from uagents.query import query
import asyncio

app = Flask(__name__)
CORS(app)

gemini_address = 'agent1qwg20ukwk97t989h6kc8a3sev0lvaltxakmvvn3sqz9jdjw4wsuxqa45e8l'

class Message(Model):
    message: str

class Response(Model):
    message: str

@app.route('/')
def home():
    return "Welcome to the Gemini Agent Interface"

@app.route('/query', methods=['POST'])
def query_gemini():
    try:
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        response = loop.run_until_complete(query_agent(user_message))
        loop.close()

        if response:
            if isinstance(response, str):
                return jsonify({"response": response})
            elif hasattr(response, 'status') and response.status == 'failed':
                return jsonify({"error": f"Message delivery failed: {response.detail}"}), 500
            else:
                return jsonify({"response": str(response)})
        else:
            return jsonify({"error": "Failed to get response from agent"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

async def query_agent(message):
    try:
        response = await query(
            destination=gemini_address,
            message=Message(message=message),
            timeout=30
        )
        return response
    except Exception as e:
        print(f"Error querying agent: {str(e)}")
        return str(e)
    
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)