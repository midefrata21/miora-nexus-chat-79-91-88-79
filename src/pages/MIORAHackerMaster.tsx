
import React, { useEffect } from 'react';
import MIORAHackerMasterCore from '@/components/MIORA/HackerMaster/MIORAHackerMasterCore';
import { useMIORAHackerMaster } from '@/components/MIORA/hooks/useMIORAHackerMaster';

const MIORAHackerMasterPage: React.FC = () => {
  const { activateHackerMode, isHackerActive } = useMIORAHackerMaster();
  
  // Auto-activate SUPREME HACKER MODE on component mount with maximum capabilities
  useEffect(() => {
    if (!isHackerActive) {
      // Enhanced activation with maximum capabilities
      activateHackerMode();
      
      // Auto-enable all advanced features
      setTimeout(() => {
        console.log('🔥 MIORA QUANTUM HACKER MASTER SUPREME - ALL SYSTEMS ACTIVATED 🔥');
        console.log('💀 ZERO-DAY EXPLOITS ENABLED 💀');
        console.log('⚡ QUANTUM BREACH ENGINE ONLINE ⚡');
        console.log('🧠 ULTIMATE PENETRATION TESTING READY 🧠');
      }, 1000);
    }
  }, [isHackerActive, activateHackerMode]);
  
  return <MIORAHackerMasterCore />;
};

export default MIORAHackerMasterPage;
