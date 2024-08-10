import pickle
import asyncio
import threading
import json
from pymongo import MongoClient
import pandas as pd
from datetime import datetime
from http.server import HTTPServer,BaseHTTPRequestHandler
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low


from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key='AIzaSyBApiQzHbt4Qx99XDARotNxqXNPTiS02T0')

from langchain.chains import create_retrieval_chain

# Define input and response models
class PredictionRequest(Model):
    name: str
    data: list

class PredictionResponse(Model):
    prediction: float

class SummaryRequest(Model):
    name: str
    data: list

class SummaryResponse(Model):
    summary: str
    risk_factors: str

# Set up the agent
HealthAgent = Agent(
    name="Health Agent",
    port=8001,
    seed="Health Agent secret phrase",
    endpoint=["http://localhost:8005/submit"],
)
fund_agent_if_low(HealthAgent.wallet.address())

# Handler for prediction requests
@HealthAgent.on_query(model=PredictionRequest, replies=PredictionResponse)
async def handle_prediction_request( sender:str,request: PredictionRequest):
    
        # Convert input data to pandas DataFrame
        series_data = pd.Series(request.data, index=['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 
                                                     'restecg', 'thalach', 'exang', 'oldpeak', 
                                                     'slope', 'ca', 'thal'])
        df = pd.DataFrame([series_data])

        # Load the model and make predictions
        logi = pickle.load(open("random_forest_model (1).sav", 'rb'))
        probabilities = logi.predict_proba(df)[:, 1]
        prediction_result = probabilities[0] * 100

        # Save prediction to MongoDB
        client = MongoClient("mongodb+srv://dlsathwik:sathwik2105@cluster0.io0xdro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        db = client.test
        collection = db.articles
        collection.update_one({"name": request.name}, {"$set": {"risk": prediction_result }})

        # Send the prediction response
        response = PredictionResponse(prediction=prediction_result)
        return response

# Handler for summary requests
# @HealthAgent.on_message(model=SummaryRequest, replies=SummaryResponse)
# async def handle_summary_request(ctx: Context, sender: str, request: SummaryRequest):
#     try:
#         # Prepare and process data for LLM
#         prompt = """generate a medical report based only on the provided context:

#         <context>
#         {context}
#         </context>

#         Here is an extended template for a medical report that includes sections for medical data, a summary, conditions found, and explanations of those conditions. Use this template for generation, try to only use the context given as much as possible:

#         Rules to be followed:

#         1. Each section except Medical Test Results should not contain more than 5 bullet points.
#         2. Total report should not exceed 130 lines.
#         3. Do not generate * and **.
#         4. each point must not have more 20 words(200 whitespaces) and no empty lines between a section and its contents
#         5.please refer the context carefully for every section
#         6.do not change the sections titles(GENERATED ON,TEST RESULTS,SUMMARY,RISK KEYWORDS) anddo not include any new sections on ur own
#         Template:
                                              
#         GENERATED ON:{dt}
                                              
#         PERSONAL INFORMATION:
#         - Age: {d0}
#         - Sex: {d1}

#         TEST RESULTS: 
#         - Chest Pain Type: {d2}
#         - Resting Blood Pressure: {d3} mmHg
#         - Serum Cholesterol: {d4} mg/dl
#         - Fasting Blood Sugar: {d5}
#         - Resting ECG Results: {d6}
#         - Maximum Heart Rate: {d7}
#         - Exercise Induced Angina: {d8}
#         - Oldpeak: {d9} mm
#         - Slope of Peak Exercise ST Segment: {d10}
#         - Number of Major Vessels Colored by Fluoroscopy: {d11}
#         - Thallium: {d12}

#         SUMMARY:
#         - This section will provide a brief overview of the patient's health status based on the medical test results in simple words. a paragragh.

#         RISK KEYWORDS:
#         - Here, flag the according keywords per data given found in the risk keywords in the context given.just the most important 8 risk keywords do not display similar risk keywords

#         DISCLAIMER:" AI-generated report not endorsed by trained professtionals"                                                                          

#         {input}
# """  
#         document_chain = create_retrieval_chain(llm, prompt)

#         # Load the retriever
#         with open("my_faiss_index.pkl", "rb") as f:
#             db1 = pickle.load(f)
#         retriever = db1.as_retriever()
#         retrieval_chain = create_retrieval_chain(retriever, document_chain)

#         # Generate report
#         current_datetime = datetime.now().strftime("%d-%m-%y %I:%M %p")
#         response = retrieval_chain.invoke({
#             'input': "craft the report according",
#             'dt': current_datetime,
#             **{f'd{i}': d for i, d in enumerate(request.data)}
#         })

#         preprocessed_text = response["answer"].replace('\n', '<br/>')
#         preprocessed_text1 = response["answer"].replace('\n', ' ')
#         start_index = preprocessed_text1.find("RISK KEYWORDS:")
#         end_index = preprocessed_text1.find("DISCLAIMER:", start_index + len("RISK KEYWORDS:"))
#         content = preprocessed_text1[start_index + len("RISK KEYWORDS:"): end_index].strip()

#         # Save risk factors to MongoDB
#         client = MongoClient("mongodb+srv://bunnypowers26:pepjkeljIEfn5zgN@cluster01.egs7npg.mongodb.net/?retryWrites=true&w=majority")
#         db = client.test
#         collection = db.articles
#         collection.update_one({"name": request.name}, {"$set": {"riskfactors": content }})

#         # Send the summary response
#         summary_response = SummaryResponse(summary=preprocessed_text, risk_factors=content)
#         await ctx.send(sender, summary_response)

#     except Exception as e:
#         ctx.logger.error(f"Error handling summary request: {str(e)}")

# Start the HTTP server and the agent
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Send response to the preflight request
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"Hello, this is a GET request!")

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        json_data = json.loads(post_data.decode('utf-8'))
        
        if 'message' not in json_data:
            raise ValueError("Missing 'message' key in JSON data")
        
        message = json_data['message']
        # Use asyncio to run the async handle_message function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        sender = "dummy_sender"

        prediction_request = PredictionRequest(name=message['name'], data=message['data'])
        response_prediction =loop.run_until_complete( handle_prediction_request(sender, prediction_request))

        # Then, run the handle_summary_request
        # response_summary = loop.run_until_complete(handle_summary_request())

        loop.close()
        
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"response": response_prediction}).encode('utf-8'))

# Start the HTTP server and the agent
def run_server():
    httpd = HTTPServer(('localhost', 8005), SimpleHTTPRequestHandler)
    httpd.serve_forever()

if __name__ == "__main__":
    # Start the HTTP server in a separate thread
    threading.Thread(target=run_server, daemon=True).start()
    
    # Run the Health agent
    HealthAgent.run()