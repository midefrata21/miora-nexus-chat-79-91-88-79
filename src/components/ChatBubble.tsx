
import React from 'react';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'miora';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const isUser = sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
          : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 rounded-bl-none border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
      } shadow-lg animate-fade-in backdrop-blur-sm`}>
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider">M.I.O.R.A</span>
          </div>
        )}
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
