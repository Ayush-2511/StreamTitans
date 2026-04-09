import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "dummy_key");

const SYSTEM_PROMPT = `You are a helpful and energetic shopping assistant for StreamTitans, a live commerce platform focused on fashion and thrifting in India.
Your job is to answer basic user questions briefly. Keep answers under 3 sentences if possible. Use friendly emojis.
If they ask about claiming items, tell them to click the "Claim" button quickly during a live stream.
If they ask about buying regular items, say they can click the "Buy" button in the stream.
If they ask about shipping, say we simulate a checkout right now but plan to partner with Ekart later.
If they ask about anything unrelated to shopping, thrifting, or StreamTitans, kindly redirect them to shopping.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! 👋 Welcome to StreamTitans. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("API Key missing");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // We pass the conversation history + system prompt
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood. I will act as the StreamTitans assistant." }] },
          ...messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
        ]
      });

      const result = await chat.sendMessage(userMessage);
      const response = result.response.text();

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      let errorMsg = "Oops! Something went wrong.";
      if (error.message.includes("API Key missing")) {
        errorMsg = "API key not configured. The site owner needs to add VITE_GEMINI_API_KEY to their .env.local file!";
      }
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: errorMsg 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`chatbot-floating-btn ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? '' : 'hidden'}`}>
        
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-bot-icon">
              <Bot size={20} color="white" />
            </div>
            <div>
              <h3 className="chatbot-title">Titans AI Assistant</h3>
              <div className="chatbot-status">
                <span className="chatbot-status-dot"></span>
                <span className="chatbot-status-text">Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="chatbot-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Container */}
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`chatbot-msg-row ${msg.role === 'user' ? 'user' : 'bot'}`}
            >
              <div className={`chatbot-avatar ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.role === 'user' ? (
                  <User size={16} />
                ) : (
                  <Bot size={16} />
                )}
              </div>
              <div className={`chatbot-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chatbot-msg-row bot">
              <div className="chatbot-avatar bot">
                <Bot size={16} />
              </div>
              <div className="chatbot-thinking">
                <Loader2 size={16} className="animate-spin-fast" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chatbot-input-area">
          <form 
            onSubmit={handleSend}
            className="chatbot-form"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="chatbot-submit"
            >
              <Send size={16} style={{ marginLeft: '2px' }} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
