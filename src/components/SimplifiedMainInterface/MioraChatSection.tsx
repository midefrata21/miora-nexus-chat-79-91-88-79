
import React from 'react';
import InteractiveChatInterface from '../InteractiveChatInterface';

interface Message {
  text: string;
  sender: 'user' | 'miora';
}

interface MioraChatSectionProps {
  messages: Message[];
  isThinking: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isLearning: boolean;
  modeConfig: any;
  currentStatus: string;
  brainActivity: number;
  onSubmit: (input: string) => Promise<void>;
  onVoiceToggle: () => void;
  onSpeakToggle?: () => void;
}

const MioraChatSection: React.FC<MioraChatSectionProps> = ({
  messages,
  isThinking,
  isListening,
  isSpeaking,
  isLearning,
  modeConfig,
  currentStatus,
  brainActivity,
  onSubmit,
  onVoiceToggle,
  onSpeakToggle
}) => {
  // Convert messages to the format expected by InteractiveChatInterface
  const formattedMessages = messages?.map(msg => ({
    role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
    content: msg.text,
    timestamp: Date.now(),
    type: 'text' as const
  })) || [];

  // Fix: Ensure currentStatus only uses valid values
  const safeCurrentStatus = currentStatus === 'infinity' ? 'aktif' : currentStatus;

  return (
    <InteractiveChatInterface
      messages={formattedMessages}
      isLoading={false}
      isThinking={isThinking}
      isListening={isListening}
      isSpeaking={isSpeaking}
      isLearning={isLearning}
      modeConfig={modeConfig}
      onSubmit={onSubmit}
      onVoiceToggle={onVoiceToggle}
      onSpeakToggle={onSpeakToggle}
      currentStatus={safeCurrentStatus}
      brainActivity={brainActivity}
    />
  );
};

export default MioraChatSection;
