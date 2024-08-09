# from flask import Flask, request, jsonify
# import pandas as pd
# import pickle
# import getpass
# import os
# from langchain.chains.combine_documents import create_stuff_documents_chain
# from langchain_core.prompts import ChatPromptTemplate
# if "GOOGLE_API_KEY" not in os.environ:
#     os.environ["GOOGLE_API_KEY"] = "AIzaSyBt3ibPpnmRHdr3cc6VFP5hWd-3dprAqBQ"
# from langchain_google_genai import ChatGoogleGenerativeAI
# llm = ChatGoogleGenerativeAI(model="gemini-pro")
# from langchain.chains import create_retrieval_chain
# logi = pickle.load(open("finalized_model (1).sav", 'rb'))
# class predict:
#   def prediction(array):
#     data = array
#     series_data = pd.Series(data, index=['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'])
#     df = pd.DataFrame([series_data])
#     predictions = logi.predict(df)
#     probabilities = logi.predict_proba(df)[:, 1]
#     percentage = probabilities * 100
#     prediction_result =  percentage[0]
#
#     return prediction_result
#   def report(array):
#      data = array
#      prompt = ChatPromptTemplate.from_template("""you are a nurse explaining to patients who dont understand medical terms Answer the following question based only on the provided context:
#
#           <context>
#           {context}
#           </context>
#           I'm a patient who recently had a medical test. Here are my results:
#           -Age :{d0}
#           -sex: {d1}
#           - Chest pain type: {d2}
#           - Resting blood pressure: {d3} mmHg
#           - Serum cholesterol: {d4} mg/dl
#           - Fasting blood sugar: {d5}
#           - Resting ECG results: {d6}
#           - Maximum heart rate: {d7}
#           - Exercise induced angina: {d8}
#           - Oldpeak: {d9} mm
#           - Slope of peak exercise ST segment: {d10}
#           - Number of major vessels colored by flouroscopy: {d11}
#           - Thallium: {d12}
#
#           Could you provide a report with these sections(ONLY BASED ON THE CONTEXT GIVEN):
#           1. Medical Data,NOTE FOR LLM :this section should all the parameters given patient.they are 13 in total
#           2. Summary,NOTE FOR LMM:generate this section in simple sentences that can by understood by the not medically trained
#           3. Conditions Found
#           4. Recommended Diagnosticss(not actual medical diagnostics recommended by doctors)
#           5. Risk Keywords,NOTE FOR LLM:Use only the risk keywords provided in the context under risk keywords:,please do not generate keywords on ur own.
#
#           The following conditions are to be followed:
#           1.Please limit each section to five bullet points, except for the summary and medical data.
#           2.Use only the risk keywords provided in the context under risk keywords:,please do not generate keywords on ur own.
#           3.Please do not use the symbols * and ** for highlighting.
#           4.all the section title must be in uppercase letters,all points must by marked with - and in small case.
#           5.display this at the start:"DISCLIAMER: "THIS REPORT IS NOT APPROVED BY TRAINED MEDICAL PROFESSIONALS."
#           6.display this at the end : "NOTE: "AI-GENERATED REPORT BASED ON MEDICAL DATA GIVEN BY THE DEVELOPERS."
#           7.Each generated line should not contain more than 18 words per line.
#
#               {input} """)
#      document_chain = create_stuff_documents_chain(llm, prompt)
#      with open("my_faiss_index.pkl", "rb") as f:
#           db1 = pickle.load(f)
#           retriever = db1.as_retriever()
#      retrieval_chain = create_retrieval_chain(retriever, document_chain)
#      response = retrieval_chain.invoke({'input': "start generating",'d1':data[1],'d2':data[2],'d3':data[3],'d4':data[4],'d5':data[5],'d6':data[6],'d7':data[7],'d8':data[8],'d9':data[9],'d11':data[11],'d12':data[12],'d0':data[0],'d10':data[10]})
#      return "abcd"
#
#
#
#
import random
import  pyautogui as pg
import time

words = ('bathu bachha','Hello','hi')
time.sleep(8)

for i in range(100):
    a = random.choice(words)
    pg.write(a)
    pg.press("enter")