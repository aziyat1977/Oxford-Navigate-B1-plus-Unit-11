import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Search } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToDetective } from '../services/geminiService';
import { playSFX } from '../utils/audio';

export const DetectiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Detective Noir here. What case are you working on? The Bandit? Or just some bad grammar?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    playSFX('click');
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToDetective(input);
    
    // Play sound on receive
    playSFX('reveal');

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const toggleChat = () => {
    playSFX('click');
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-noir-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-noir-paper border border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-noir-folder p-3 rounded-t-lg flex justify-between items-center border-b border-gray-600">
          <div className="flex items-center gap-2">
            <div className="bg-noir-red p-1 rounded">
                <Search size={16} className="text-white" />
            </div>
            <span className="font-mono text-noir-tan text-sm font-bold">DETECTIVE AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-zinc-950">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded text-sm ${
                msg.role === 'user' 
                  ? 'bg-gray-800 text-white border border-gray-700' 
                  : 'bg-zinc-900 text-gray-300 border-l-2 border-noir-tan font-mono'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-zinc-900 text-gray-500 text-xs p-2 font-mono animate-pulse">
                 Deciphering...
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-noir-paper border-t border-gray-700 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the evidence..."
            className="flex-1 bg-black border border-gray-600 text-white px-3 py-2 text-sm focus:outline-none focus:border-noir-tan rounded-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-noir-tan text-black p-2 rounded-sm hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};