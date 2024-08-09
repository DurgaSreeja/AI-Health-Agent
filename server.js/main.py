from flask import Flask, request, jsonify
from datetime import datetime
import pickle
import getpass
from pymongo import MongoClient
import pandas as pd
import os
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from flask_cors import CORS  

load_dotenv() 
from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-pro")
from langchain.chains import create_retrieval_chain

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/",methods=["GET","POST"])
def home():
    return "home"

@app.route("/predict/", methods=["POST"])
def predict():
    logi = pickle.load(open("random_forest_model (1).sav", 'rb'))
    info = request.get_json()
    name = info.get('name')
    data = info.get('data')
    series_data = pd.Series(data, index=['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'])
    df = pd.DataFrame([series_data])
    predictions = logi.predict(df)
    probabilities = logi.predict_proba(df)[:, 1]
    percentage = probabilities * 100
    prediction_result =  percentage[0]
    client = MongoClient("mongodb+srv://bunnypowers26:pepjkeljIEfn5zgN@cluster01.egs7npg.mongodb.net/?retryWrites=true&w=majority")
    db = client.test
    collection = db.articles
    print(name)
    collection.update_one({"name": name}, {"$set": {"risk":prediction_result }})
    return jsonify(prediction_result)

@app.route("/summary", methods=["GET", "POST"])
def summary():
    info = request.get_json()
    print(info,"world")
    data = info['data']
    name = info.get("name")
    print(name)
    prompt = ChatPromptTemplate.from_template("""generate a medical report based only on the provided context:

        <context>
        {context}
        </context>

        Here is an extended template for a medical report that includes sections for medical data, a summary, conditions found, and explanations of those conditions. Use this template for generation, try to only use the context given as much as possible:

        Rules to be followed:

        1. Each section except Medical Test Results should not contain more than 5 bullet points.
        2. Total report should not exceed 130 lines.
        3. Do not generate * and **.
        4. each point must not have more 20 words(200 whitespaces) and no empty lines between a section and its contents
        5.please refer the context carefully for every section
        6.do not change the sections titles(GENERATED ON,TEST RESULTS,SUMMARY,RISK KEYWORDS) anddo not include any new sections on ur own
        Template:
                                              
        GENERATED ON:{dt}
                                              
        PERSONAL INFORMATION:
        - Age: {d0}
        - Sex: {d1}

        TEST RESULTS: 
        - Chest Pain Type: {d2}
        - Resting Blood Pressure: {d3} mmHg
        - Serum Cholesterol: {d4} mg/dl
        - Fasting Blood Sugar: {d5}
        - Resting ECG Results: {d6}
        - Maximum Heart Rate: {d7}
        - Exercise Induced Angina: {d8}
        - Oldpeak: {d9} mm
        - Slope of Peak Exercise ST Segment: {d10}
        - Number of Major Vessels Colored by Fluoroscopy: {d11}
        - Thallium: {d12}

        SUMMARY:
        - This section will provide a brief overview of the patient's health status based on the medical test results in simple words. a paragragh.

        RISK KEYWORDS:
        - Here, flag the according keywords per data given found in the risk keywords in the context given.just the most important 8 risk keywords do not display similar risk keywords

        DISCLAIMER:" AI-generated report not endorsed by trained professtionals"                                                                          

        {input}
""")

    document_chain = create_stuff_documents_chain(llm, prompt)
    with open("my_faiss_index.pkl", "rb") as f:
        db1 = pickle.load(f)
    retriever = db1.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)
    current_datetime = datetime.now()
    formatted_datetime = current_datetime.strftime("%d-%m-%y %I:%M %p")
    response = retrieval_chain.invoke({'input': "craft the report according",'dt':formatted_datetime,'d1':data[1],'d2':data[2],'d3':data[3],'d4':data[4],'d5':data[5],'d6':data[6],'d7':data[7],'d8':data[8],'d9':data[9],'d11':data[11],'d12':data[12],'d0':data[0],'d10':data[10]})
    preprocessed_text = response["answer"].replace('\n', '<br/>')
    preprocessed_text1=response["answer"].replace('\n',' ')
    start_index = preprocessed_text1.find("RISK KEYWORDS:")
    end_index = preprocessed_text1.find("DISCLAIMER:", start_index + len("RISK KEYWORDS:"))
    content="p"
    content = preprocessed_text1[start_index + len("RISK KEYWORDS:"):end_index].strip()
    client = MongoClient("mongodb+srv://bunnypowers26:pepjkeljIEfn5zgN@cluster01.egs7npg.mongodb.net/?retryWrites=true&w=majority")
    db = client.test
    collection = db.articles
    collection.update_one({"name": name}, {"$set": {"riskfactors":content }})
    print(content)
    return jsonify(preprocessed_text,content)
@app.route('/diet',methods = ["POST","GET"])
def diet():
    info =  request.get_json()
    keywords = info['risks']
    peference = info['food']
    height1 = info['height']
    weight1 = info['weight']
    veg = info['veg']
    bmi = weight1/((height1*height1)/100)
    
    bmi = 50/((170*170)/100)
    prompt = ChatPromptTemplate.from_template("""generate personalized diet plan based on the following data based on context:
    <context>
    {context}
    </context>
        Rules to be followed while generating:
        1. Do not generate * and **.
        2.the section:Goals should not exceed limit of 560 characters
        3.the section: meal plans should not exceed limit of  500 characters
        4.the section:Grocery list should not exceed limit of  300 characters
        5. the section:meals and their ingridents should not limit of  exceed 300 characters
        Classification	BMI range - kg/m2
        Severe Thinness	< 16
        Moderate Thinness	16 - 17
        Mild Thinness	17 - 18.5
        Normal	18.5 - 25
        Overweight	25 - 30
        Obese Class I	30 - 35
        Obese Class II	35 - 40
        Obese Class III	> 40
        the diet plan to be generated by considering  the following data given:
        height:{h}
        weight:{w}
        BMI : {m} 
        risk keywords : {risk}(the risks keywords given by the user are  in the context)
        food peference: {type}(refers to region the users want their food from .refer to foos.csv for selection of meals)
        vegetarian: {og}(if yes only use vegetarian meals.refer to foos.csv for selection of meals)
        {input}                                      
 """)
    document_chain = create_stuff_documents_chain(llm, prompt)
    with open("my_faiss_index1.pkl", 'rb') as f:
        pkl = pickle.load(f)
    retriever = pkl.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)
    response = retrieval_chain.invoke({'input':"please generated the diet following the diet plan template given in context",'h':170,'w':50,'m':bmi,'risk':keywords,'type':peference,'og':veg})
    print(response["answer"])
    return jsonify(response['answer'])
   

if  __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", 8000)),debug=True)
    
