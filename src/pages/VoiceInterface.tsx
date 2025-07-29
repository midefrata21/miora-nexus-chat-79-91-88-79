import React from 'react';
import { HorizontalCategoryMenu } from '@/components/Navigation/HorizontalCategoryMenu';
import MIORASimpleVoiceChat from '@/components/MIORA/VoiceInterface/MIORASimpleVoiceChat';

const VoiceInterface: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HorizontalCategoryMenu />
      <MIORASimpleVoiceChat />
    </div>
  );
};

export default VoiceInterface;