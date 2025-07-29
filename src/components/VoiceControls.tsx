
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceControlsProps {
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  onVoiceInput: (transcript: string) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  setIsListening,
  onVoiceInput
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionClass();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'id-ID'; // Indonesian language
      
      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          onVoiceInput(transcript);
        }
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onVoiceInput, setIsListening]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Browser Anda tidak mendukung speech recognition. Silakan gunakan Chrome atau Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex justify-center space-x-6">
      {/* Microphone Button */}
      <Button
        onClick={toggleListening}
        size="lg"
        className={`rounded-full w-20 h-20 ${
          isListening 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.6)]' 
            : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-[0_0_30px_rgba(34,211,238,0.4)]'
        } border-2 border-white/20 transition-all duration-300 backdrop-blur-sm`}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </Button>

      {/* Speaker Button */}
      <Button
        onClick={toggleMute}
        size="lg"
        variant="outline"
        className={`rounded-full w-20 h-20 ${
          isMuted 
            ? 'bg-gray-800/50 border-gray-500/50 shadow-[0_0_20px_rgba(107,114,128,0.3)]' 
            : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
        } backdrop-blur-sm transition-all duration-300`}
      >
        {isMuted ? (
          <VolumeX className="w-8 h-8 text-gray-400" />
        ) : (
          <Volume2 className="w-8 h-8 text-green-400" />
        )}
      </Button>
    </div>
  );
};

export default VoiceControls;
