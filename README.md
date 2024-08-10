# AI-Health-Agent

# HealthCare Project

## Project Overview

The HealthCare Project is a comprehensive web application designed to assist users in managing and monitoring their health through various AI-powered features. It includes functionalities such as health risk prediction, personalized diet plans, health condition diagnosis, and a health assistant chat feature.

## Features

1. **Login and Sign Up**

   - Secure login and sign-up system for user account creation and access to personalized features.

2. **User Dashboard**

   - Accessible upon successful login.
   - User icon at the top left corner reveals a drop-down box with the following features:
     ![alt text](image.png)

   a. **Check Heart Health**

   - Form for inputting health details (age, cholesterol levels, etc.).
   - Random Forest ML model analyzes data to predict heart-related risks.
   - Provides risk prediction, heart condition summary, and potential issue diagnosis.
     ![alt text](image-1.png)

   b. **Fetch Diet Plan**

   - Form for requesting personalized diet plans based on weight, dietary preferences, and regional food choices.
   - UAgent integrated with Gemini generates tailored diet plans.

   ![alt text](image-2.png)

   ![alt text](image-3.png)

   c. **Health Condition Diagnosis**

   - Chat interface for describing health issues.
   - LLM-powered system simulates a patient-doctor conversation for diagnosis.

   ![alt text](image-4.png)

   d. **Health Assistant Chat**

   - Chat box for general health advice and assistance, powered by an LLM.

   ![alt text](image-5.png)

## Steps to Run the Project

Run the following steps in three separate terminals:

1. **Frontend**
   ```bash
   cd experiment
   npm start
   ```
