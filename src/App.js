import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Predefined responses for the chatbot
  const botResponses = {
    "hello": "Hi there! How can I assist you today?",
    "what is your name": "Harshith D M",
    "age": "22",
    "how are you": "I'm doing great, thank you for asking!",
    "bye": "Goodbye! Have a nice day!",
    // Add more responses here for a richer conversation
  };

  // Function to append messages to the chat
  const appendMessage = (message, sender) => {
    setMessages((prevMessages) => [...prevMessages, { message, sender }]);
  };

  // Generate bot response based on user input
  const generateBotResponse = (userMessage) => {
    userMessage = userMessage.toLowerCase().trim();

    if (botResponses.hasOwnProperty(userMessage)) { // Use hasOwnProperty for better property access check
      return botResponses[userMessage];
    } else {
      return botResponses["default"];
    }
  };

  // Send message function
  const sendMessage = () => {
    if (!userInput.trim()) return;

    // Display the user's message
    appendMessage(userInput, 'user');

    // Clear the input field
    setUserInput('');

    // Generate and display bot response
    const botMessage = generateBotResponse(userInput);
    appendMessage(botMessage, 'bot');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          id="user-input"
          className="user-input"
          type="text"
          placeholder="Ask me something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button className="send-btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;