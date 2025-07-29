
import { useState, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'miora';
  timestamp?: number;
}

export const useLocalStorage = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('mioraConversations');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        setMessages([]);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mioraConversations', JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (message: Omit<Message, 'timestamp'>) => {
    const newMessage = {
      ...message,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('mioraConversations');
  };

  const getMessageHistory = () => {
    return messages;
  };

  return {
    messages,
    addMessage,
    clearMessages,
    getMessageHistory
  };
};
