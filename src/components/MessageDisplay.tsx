
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  text: string;
  sender: 'user' | 'miora';
}

interface MessageDisplayProps {
  messages: Message[];
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {messages.map((message, index) => (
        <Card key={index} className={`${
          message.sender === 'user' 
            ? 'bg-blue-900/30 border-blue-500/30 ml-8' 
            : 'bg-purple-900/30 border-purple-500/30 mr-8'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                message.sender === 'user' ? 'bg-blue-400' : 'bg-purple-400'
              }`}></div>
              <div>
                <div className="text-xs text-gray-400 mb-1">
                  {message.sender === 'user' ? 'You' : 'MIORA'}
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {message.text}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessageDisplay;
