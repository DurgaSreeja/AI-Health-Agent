from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import threading
from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from uagents import Model
import google.generativeai as genai
import asyncio

# Defining a model for messages
class Message(Model):
    message: str

class Response(Model):
    message: str

# Defining the user agent
Gemini_agent = Agent(
    name="Gemini Agent",
    port=8001,
    seed="Gemini Agent secret phrase",
    endpoint=["http://localhost:8001/submit"],
)

# Funding the user agent if its wallet balance is low
fund_agent_if_low(Gemini_agent.wallet.address())

# Configuring the API key for Google's generative AI service
genai.configure(api_key='your-gemini-api-key')  # Replace with your actual API key

# Initializing the generative model with a specific model name
model = genai.GenerativeModel('gemini-pro')

# Starting a new chat session
chat = model.start_chat(history=[])

print("Chat session has started. Type 'quit' to exit.")

# Event handler for agent startup
@Gemini_agent.on_event('startup')
async def address(ctx: Context):
    # Logging the agent's address
    ctx.logger.info(Gemini_agent.address)

# Function to handle incoming messages
async def handle_message(message):
    # Get user input
    user_message = message
    
    # Check if the user wants to quit the conversation
    if user_message.lower() == 'quit':
        return "Exiting chat session."
        
    # Send the message to the chat session and receive a streamed response
    response = chat.send_message(user_message, stream=True)
    
    # Initialize an empty string to accumulate the response text
    full_response_text = ""
    
    for chunk in response:
        full_response_text += chunk.text
    
    # Ensure the response is resolved
    response.resolve()
    
    # Construct the response message
    message = "Gemini: " + full_response_text
    return message

# Handler for query given by user
@Gemini_agent.on_query(model=Message, replies=Response)
async def handle_query_response(ctx: Context, sender: str, msg: Message):
    try:
        # Handling the incoming message
        message = await handle_message(msg.message)
        
        # Logging the response
        ctx.logger.info(f"Preparing to send response: {message}")
        
        # Sending the response back to the sender
        response = Response(message=str(message))
        ctx.logger.info(f"Sending response: {response}")
        await ctx.send(sender, response)
        ctx.logger.info("Response sent successfully")
    except Exception as e:
        ctx.logger.error(f"Error in handle_query_response: {str(e)}")

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Send response to the preflight request
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        message = json.loads(post_data.decode('utf-8'))['message']
        
        # Use asyncio to run the async handle_message function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        response = loop.run_until_complete(handle_message(message))
        loop.close()
        
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"response": response}).encode('utf-8'))

def run_server():
    httpd = HTTPServer(('localhost', 8001), SimpleHTTPRequestHandler)
    httpd.serve_forever()

if __name__ == "__main__":
    # Start the HTTP server in a separate thread
    threading.Thread(target=run_server, daemon=True).start()
    
    # Run the Gemini agent
    Gemini_agent.run()