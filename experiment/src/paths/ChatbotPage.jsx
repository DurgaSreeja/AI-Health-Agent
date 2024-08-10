import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatbotPage.css";

const ChatbotPage = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    // Load the saved URL, but don't hide the popup
    const savedUrl = localStorage.getItem("chatbotApiUrl");
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

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("chatbotApiUrl", apiUrl);
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    const inputData = {
      prompt: userInput,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/chat_h`,
        JSON.stringify(inputData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const assistantResponse = extractAssistantResponse(response.data);
      setResponse(assistantResponse);
    } catch (error) {
      console.error("An error occurred:", error);
      setResponse("An error occurred while fetching the response.");
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
      <div className="chatbot-container">
        <h1 className="title">AI Health Assistant</h1>
        <form onSubmit={handleSubmit} className="form">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Describe your symptoms or ask a health question..."
            rows={4}
            className="text-area"
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim() || !apiUrl}
            className="button"
          >
            {isLoading ? "Processing..." : "Send Message"}
          </button>
        </form>
        {response && (
          <div className="response-container">
            <h2 className="response-title">Assistant's Response:</h2>
            <p className="response-text">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;
