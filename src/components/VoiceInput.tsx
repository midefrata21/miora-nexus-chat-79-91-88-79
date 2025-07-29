
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
  isListening: boolean;
  onVoiceInput: (text: string) => void;
  disabled?: boolean;
  onToggle?: () => void; // Add onToggle as optional prop
}

const VoiceInput: React.FC<VoiceInputProps> = ({ 
  isListening, 
  onVoiceInput, 
  disabled = false,
  onToggle
}) => {
  const handleClick = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <Button
        onClick={handleClick}
        disabled={disabled}
        variant={isListening ? "destructive" : "outline"}
        size="sm"
        className="flex items-center gap-2"
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4" />
            {disabled ? 'Processing...' : 'Listening...'}
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            Start Voice Input
          </>
        )}
      </Button>
    </div>
  );
};

export default VoiceInput;
