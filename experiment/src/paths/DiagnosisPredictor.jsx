import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiagnosisPredictor.css";

const DiagnosisPredictor = () => {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    // Load the saved URL, but keep the popup visible
    const savedUrl = localStorage.getItem("apiUrl");
    if (savedUrl) {
      setApiUrl(savedUrl);
    }
  }, []);

  const extractAssistantResponse = (data) => {
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return "Error: Unable to parse JSON response";
      }
    }

    const fullResponse = data.response || "";
    const endIndex = fullResponse.indexOf("<|end|>");
    return endIndex !== -1
      ? fullResponse.slice(0, endIndex).trim()
      : fullResponse.trim();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("apiUrl", apiUrl);
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const inputData = {
      prompt: input,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/chat_d`,
        JSON.stringify(inputData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const assistantResponse = extractAssistantResponse(response.data);
      setPrediction(assistantResponse);
    } catch (error) {
      console.error("An error occurred:", error);
      setPrediction("An error occurred while fetching the prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Enter API URL</h2>
            <form onSubmit={handleUrlSubmit}>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="Enter API URL here"
                required
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
      <div className="diagnosis-predictor">
        <h1 className="title">Diagnosis Predictor</h1>
        <form onSubmit={handleSubmit} className="form">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter symptoms here..."
            rows="5"
            className="text-area"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !apiUrl}
            className="button"
          >
            {isLoading ? "Predicting..." : "Predict Diagnosis"}
          </button>
        </form>
        {prediction && (
          <div className="prediction-container">
            <h2 className="prediction-title">Prediction:</h2>
            <p className="prediction-text">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisPredictor;
