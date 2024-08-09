const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./userSchema");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Authentication = require("./authenticate.js");
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = require("dotenv").config();
const secretKey = "hello world";
const { PythonShell } = require("python-shell");
const { spawn } = require("child_process");
const { exitCode } = require("process");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://dlsathwik:sathwik2105@cluster0.io0xdro.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, resp) => {
  resp.send("Hello world");
});

app.post("/register", async (req, resp) => {
  try {
    const data = req.body;
    const existingUser = await User.findOne({ name: data.name });

    if (existingUser) {
      console.log("User name already taken");
      return resp.status(409).send("User name already taken");
    }

    const user = new User({
      name: data.name,
      password: data.password,
    });
    await user.save();
    console.log("New user registered");
    resp.status(201).send("Registration successful");
  } catch (error) {
    console.error("Error during registration:", error.message);
    resp.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, resp) => {
  try {
    const data = req.body;
    const user = await User.findOne({ name: data.name });

    if (!user) {
      console.log("User not found");
      return resp.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      console.log("Invalid Credentials");
      return resp.status(401).send("Invalid Credentials");
    }

    const token = await user.generateAuthToken();
    console.log(token);

    resp.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 36000000),
      httpOnly: true,
    });

    console.log("Login successful");
    resp.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    resp.status(500).send("Internal Server Error");
  }
});
app.post("/genai", async (req, resp) => {
  console.log("ai api");

  const data = req.body;
  const { id } = data;
  console.log(id);
  const user = await User.findOne({ _id: id });
  const { name } = user;
  console.log();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const { age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal } =
    data;
  console.log(age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal);
  const prompt = `
  context:Age: Age is a significant risk factor for cardiovascular disease (CVD). The risk of developing CVD
  increases with age, but the rate at which it increases can vary depending on the individual's other
  risk factors. Here's how age correlates to heart disease risk for various ranges of ages:
  Under 50 Years Old: The risk of developing CVD is relatively low, especially if the individual leads a
  healthy lifestyle. However, certain risk factors such as obesity, smoking, and family history of heart
  disease can increase the risk.
  50-64 Years Old: The risk of CVD begins to rise gradually with age. Regular physical activity,
  maintaining a healthy weight, and managing blood pressure and cholesterol can help reduce this risk.
  65-74 Years Old: This is the age range where the risk of CVD starts to become more significant. Even
  if an individual leads a healthy lifestyle, the risk of CVD is higher in this age group compared to
  younger adults. Regular exercise, a balanced diet, and regular medical check-ups are crucial for
  managing the risk of CVD.
  Over 75 Years Old: The risk of CVD continues to rise rapidly with age. However, the risk can be
  reduced by managing existing risk factors and adopting a healthier lifestyle. Regular exercise, a
  balanced diet, and regular medical check-ups are essential.
  #
  Sex: 1 for male and 0 for female.
  #
  Chest Pain Type: This parameter has four possible values, each corresponding to a different type of
  chest pain:
  1: Typical Angina: Characterized by crushing or squeezing chest pain, often radiating to the left arm,
  jaw, or back. Suggests potential narrowing of coronary arteries and increased risk of heart attack.
  2: Atypical Angina: Has varied pain characteristics like sharp, stabbing, aching, or burning. May not
  radiate and doesn't always worsen with exertion. Can indicate heart-related issues or other
  conditions.
  3: Non-Anginal Pain: Characterized by sharp, stabbing, or burning pain unrelated to exertion. Could
  indicate problems with lungs, pleura, esophagus, or musculoskeletal system.
  4: Asymptomatic: No chest pain experienced. Doesn't rule out the possibility of heart disease.
  #
  Oldpeak: This parameter represents the ST depression induced by exercise relative to rest. It has two
  possible values:
  0: Indicates that the ST depression did not increase significantly after exercise.
  Greater than 0: Indicates that the ST depression increased significantly after exercise.
  #
  Slope of the Peak Exercise ST Segment: This parameter describes the shape of the ST segment of the
  heart's electrical activity during exercise. It has three possible values:
  1: Upsloping (May indicate ischemia, or reduced blood flow)
  2: Flat (Generally considered normal)
  3: Downsloping (Usually normal)
  #
  Resting Blood Pressure: This parameter measures the force of blood against the walls of your
  arteries when your heart is at rest.
  A reading of less than 120/80 mmHg is considered within the normal range, indicating that your
  blood pressure is neither too high nor too low.
  A reading of 120/80 mmHg or higher is considered high blood pressure, also known as hypertension.
  High blood pressure can lead to damage to your arteries and heart over time, increasing your risk of
  heart disease, stroke, and kidney failure.
  A reading of less than 90/60 mmHg is considered low blood pressure, also known as hypotension.
  While low blood pressure itself is not dangerous, it can be a sign of a serious underlying health
  problem, such as a heart valve disorder or kidney disease.
  #
  Serum Cholesterol: The optimal level is less than 100 mg/dl. Higher values, particularly LDL, increase
  plaque buildup and heart disease risk.
  #
  Fasting Blood Sugar: A value of 1 indicates blood sugar > 120 mg/dl (abnormal), suggesting a
  significant risk factor for heart disease. A value of 0 indicates blood sugar ≤ 120 mg/dl (normal).
  Resting Electrocardiographic Results: Values range from 0 (Normal) to 2 (Potential problems
  requiring further investigation). Higher values indicate more severe conditions.
  #
  Maximum Heart Rate Achieved: You can estimate your maximum heart rate based on your age.
  Subtract your age from 220. For example, for a 50-year-old person, the predicted maximum heart
  rate would be 220 - 50 = 170 beats per minute (bpm). The optimal range for this parameter is
  typically between 50% and 85% of the predicted maximum heart rate. Therefore, the optimal range
  for the Maximum Heart Rate Achieved would be:
  Lower limit: 50% of the predicted maximum heart rate (e.g., 85 bpm for a 170 bpm max heart rate)
  Upper limit: 85% of the predicted maximum heart rate (e.g., 148.5 bpm for a 170 bpm max heart
  rate)
  Values below the lower limit may indicate reduced fitness and increased risk, while values above the
  upper limit generally suggest better cardiovascular fitness.
  #
  Exercise-Induced Angina: A value of 1 indicates chest pain during exercise (present), which is a
  significant indicator of coronary artery disease and increased heart attack risk. A value of 0 indicates
  no chest pain during exercise (absent).
  #
  Number of Major Vessels (0-3) Colored by Fluoroscopy: Values range from 0 (No blockages) to 3
  (Increasing severity of blockages in major coronary arteries). Higher values indicate a higher
  likelihood of having a heart attack.
  #
  Thallium (Thal): Values range from 0 (Normal) to 2 (Potentially reversible defects that may improve
  with treatment). Values of 1 or 2 indicate a more serious heart condition. Specifically, a value of 1
  suggests a fixed defect, which means there's a structural abnormality in the heart wall that can't be
  repaired. A value of 2 suggests a reversible defect, which means there's a temporary issue that could
  potentially be resolved with treatment 4.
  age = ${age}
    gender = ${sex} 
    chest pain type (4 values)=${cp}
    resting blood pressure=${rbp}
    serum cholestoral in mg/dl=${sc}
    fasting blood sugar > 120 mg/dl=${fbs}
    resting electrocardiographic results (values 0,1,2)=${rer}
    maximum heart rate achieved=${mhr}
    exercise induced angina=${eia}
    oldpeak = ST depression induced by exercise relative to rest=${olds} 
    the slope of the peak exercise ST segment=${st}
    number of major vessels (0-3) colored by flourosopy=${mvs}
    thalassemia = ${thal}
    explain what the values for each parameter means to the patient not a general explaintion of the parametersthemselves in 13 points one point for each value.At end just generate 8 keysword such high pressure and so according to the data above the whole generated message should be less than 500 words
    `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  resp.status(201).json(text);
});

// Fix the middleware to set user information on req.rootuser
// app.post("/about", Authentication, async (req, res) => {
//   console.log("Hello world");
//   console.log(req.userId);

//   if (req.userId !== "false") {
//     try {
//       const data2 = await User.findOne({ _id: req.userId });
//       console.log(data2.name);
//       console.log('world');

//       // Send JSON response using res.json()
//       throw new Error("sometihng went wrong")

//       res.json({ data: data2 });
//     } catch (error) {

//       console.log('hello1');
//       console.log(error);

//       // Handle the error and send an appropriate response
//       // res.status(500).json({ error: 'Internal Server Error' });
//     }
//     finally{
//       console.log('false');
//       // Send a response when userId is "false"
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   } else {

//   }
// Change to req.user instead of req.rootuser
// });
app.post("/about", Authentication, async (req, resp) => {
  try {
    const data = req.userId;
    const user = await User.findOne({ _id: data });
    const { name, medicalHistory, risk, riskfactors } = user;
    if (!user) {
      console.log("User not found");
      return resp.status(404).send("User not found");
    }
    console.log("Login successful");
    console.log({ name, medicalHistory, data, risk });
    console.log(riskfactors);
    resp.status(200).json({ name, medicalHistory, data, risk, riskfactors });
    console.log("Hello546");
  } catch (error) {
    console.error("Error during login:", error.message);
    resp.status(500).send("Internal Server Error");
  }
});

app.post("/filldata", async (req, resp) => {
  try {
    const data = req.body;
    const existingUser = await User.findOne({ name: data.name });
    const { age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal } =
      data;
    if (existingUser) {
      existingUser.medicalHistory = {
        age: data.medicalHistory.age,
        sex: data.medicalHistory.sex,
        cp: data.medicalHistory.cp,
        rbp: data.medicalHistory.rbp,
        sc: data.medicalHistory.sc,
        fbs: data.medicalHistory.fbs,
        rer: data.medicalHistory.rer,
        mhr: data.medicalHistory.mhr,
        eia: data.medicalHistory.eia,
        olds: data.medicalHistory.olds,
        st: data.medicalHistory.st,
        mvs: data.medicalHistory.mvs,
        thal: data.medicalHistory.thal,
        // Add more fields as needed
      };
      await existingUser.save();
      console.log("User medical history updated");
      return resp.status(200).send("User medical history updated");
    }

    // User doesn't exist, create a new user
    const user = new User({
      name: data.name,
      password: data.password,
      medicalHistory: {
        bloodType: data.medicalHistory.bloodType,
        allergies: data.medicalHistory.allergies,

        // Add more fields as needed
      },
    });

    await user.save();
    console.log("New user registered");
    resp.status(201).send("Registration successful");
  } catch (error) {
    console.error("Error during registration:", error.message);
    resp.status(500).send("Internal Server Error");
  }
});

app.post("/logout", async (req, res) => {
  try {
    // Clear the 'jwtoken' cookie with path '/'
    res.clearCookie("jwtoken", { path: "/" });

    // Log a message indicating successful logout
    console.log("User logged out successfully");

    // Optionally, you might redirect the user to a login page or send a response
    res.status(200).json({ message: "Logout successfullly" });
  } catch (error) {
    // Handle errors, if any
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/prediction", async (req, resp) => {
  try {
    const data = req.body;
    const { age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal } =
      data;
    const array = [
      age,
      1,
      cp,
      rbp,
      sc,
      fbs,
      rer,
      mhr,
      eia,
      olds,
      st,
      mvs,
      thal,
    ];
    const existingUser = await User.findOne({ _id: data.id });
    console.log(array);
    const child = spawn("python", ["prediction.py", array]);
    child.stdout.on("data", async (data) => {
      console.log("Hello");
      let data1 = data.toString();
      console.log(data1);
      console.log(typeof data1);
      data1 = data1.slice(0, 4);
      existingUser.risk = data1;
      await existingUser.save();
      resp.json(data1);
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/prediction1", async (req, resp) => {
  try {
    console.log("dasf");
    const data = req.body;
    const { age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal } =
      data;
    const array = [
      age,
      sex,
      cp,
      rbp,
      sc,
      fbs,
      rer,
      mhr,
      eia,
      olds,
      st,
      mvs,
      thal,
    ];

    // Assuming your User model has a 'name' field, change the query accordingly
    const existingUser = await User.findOne({ name: "Hello" });

    console.log(existingUser);
    console.log(array);
    console.log("checkpoint");

    const child = spawn("python", ["prediction1.py", ...array]); // Spread the 'array'
    child.stdout.on("data", async (data) => {
      console.log("Hello");
      let data1 = data.toString();
      console.log(data1);
      console.log(typeof data1);
      resp.json(data1);
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ error: "Internal Server Error" }); // Return a meaningful error response
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
