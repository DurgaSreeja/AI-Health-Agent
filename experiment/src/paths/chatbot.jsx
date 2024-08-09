import React, { useState, useEffect } from 'react';

const App1 = () => {
    const [userInput, setUserInput] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Scroll to the bottom of the chat window when chat is updated
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chat]);

    const sendMessage = async () => {
        try {
            const response = await fetch('/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botResponse = data.response;
            setChat([...chat, { user: userInput, bot: botResponse }]);
            setUserInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div id="chat-container" style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {chat.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold', color: '#333' }}>User: {message.user}</p>
                        <p style={{ margin: '0', color: '#555' }}>Bot: {message.bot}</p>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{ marginRight: '10px' }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default App1;
