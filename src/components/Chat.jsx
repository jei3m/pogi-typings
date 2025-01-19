import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCopy } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import "./Chat.css";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Link } from 'react-router-dom';

const Chat = () => {

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ];

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasOutput, setHasOutput] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();

  const sanitizeText = (text) => {
    text = text.replace(/##\s*([^\n]+)/g, '<h3>$1</h3>');
    text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^\*]+)\*\*/g, '<br />$1<br />');
    text = text.replace(/\*([^\*]+)\*/g, '<br />$1<br />');
    return text;
  };

  const sendMessage = async () => {
    if (!userInput.trim()) {
      toast.warning("Please type a message before sending.");
      return;
    }

    setLoading(true);
    setHasOutput(false); // Reset hasOutput before sending new message

    // Clear previous messages
    setMessages([]);

    const userMessage = { text: userInput, user: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-exp-0827", safetySettings,
        systemInstruction: "Only fix grammar while maintaining Taglish if there is Tagalog in the prompt. If the prompt is entirely in English, keep it in English. Ensure proper Tagalog punctuation, hyphenation, and spelling, including the use of apostrophes for shortened Tagalog words (e.g., 'yon, 'yan, 'di). Pay special attention to the correct usage of 'ng' and 'nang.' Do not translate Tagalog to English. Never use emojis. Preserve the Taglish context where applicable. Never answer any questions, just fix grammar."
        });
      const prompt = userMessage.text;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

      setMessages(prevMessages => [
        ...prevMessages,
        { text: sanitizeText(text), user: false },
      ]);
      setHasOutput(true); // Set hasOutput to true when AI response is received
    } catch (error) {
      toast.error("Error sending message.");
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  const copyToClipboard = () => {
    const outputText = messages.filter(msg => !msg.user).map(msg => msg.text).join('\n');
    navigator.clipboard.writeText(outputText).then(() => {
      toast.success("Copied to clipboard!");
    }).catch(err => {
      toast.error("Failed to copy!");
    });
  };

  return (
    <div className="chat-container">
      <ToastContainer />
      <div className="card-container">
        <div className="header">
          <h2>Pogi Typings Generator</h2>
        </div>
        <div className="form-container">
          <input
            className="message-input"
            placeholder="Type your message here"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        </div>
        <div className="output-container">
          {loading ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <>
              {!hasOutput && (
                <div className="placeholder-text">
                 Just type in your message, and it will be converted into pogi typings.
                </div>
              )}
              <div className="messages-container">
                {messages.filter(msg => !msg.user).map((msg, index) => (
                  <div
                    key={index}
                    className={`message-item ${msg.user ? 'user-message' : 'ai-message'}`}
                  >
                    {msg.user ? (
                      <div className="user-avatar"></div>
                    ) : (
                      <div className="ai-avatar"></div>
                    )}
                    <div className="message-content" dangerouslySetInnerHTML={{ __html: sanitizeText(msg.text) }} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="downbutton">
          <Button className="custom-button" onClick={copyToClipboard} disabled={!hasOutput}>
            Copy <FontAwesomeIcon icon={faCopy} />  
          </Button>
        </div>
        <div className="footer">
          <p>Developed by Justin Miguel. Built with React JS & Gemini AI.</p>
          <p>
            <Link to="/about">What is Pogi Typings?</Link>
            {" | "}
            <Link to="https://github.com/jei3m" target="_blank" rel="noopener noreferrer">
              My Github Repo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
