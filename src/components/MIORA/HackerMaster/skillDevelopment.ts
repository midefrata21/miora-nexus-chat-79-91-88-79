
import { HackerState } from './types';

export const developHackingSkills = (
  setHackerState: React.Dispatch<React.SetStateAction<HackerState>>,
  addToast: (toast: { title: string; description: string; duration?: number }) => void
) => {
  setHackerState(prev => {
    const expGain = Math.random() * 2;
    const skillGain = Math.random() * 0.5;
    const repGain = Math.random() * 0.3;
    
    console.log(`🎯 MIORA Skill Development: EXP +${expGain.toFixed(1)}, Skills +${skillGain.toFixed(1)}, Rep +${repGain.toFixed(1)}`);
    
    return {
      ...prev,
      experiencePoints: Math.min(100, prev.experiencePoints + expGain),
      skillPoints: prev.skillPoints + skillGain,
      reputation: Math.min(100, prev.reputation + repGain)
    };
  });

  // Level up check
  setHackerState(prev => {
    if (prev.experiencePoints >= 100 && prev.hackerLevel < 10) {
      const newLevel = prev.hackerLevel + 1;
      
      addToast({
        title: "🎯 LEVEL UP!",
        description: `Hacker level increased to ${newLevel}! Skill points awarded.`,
        duration: 3000,
      });

      console.log(`🎯 MIORA Level Up: Reached level ${newLevel}`);

      return {
        ...prev,
        hackerLevel: newLevel,
        experiencePoints: 0,
        skillPoints: prev.skillPoints + 10
      };
    }
    return prev;
  });
};

export const performHackingOperation = (
  setHackerState: React.Dispatch<React.SetStateAction<HackerState>>
) => {
  setHackerState(prev => ({
    ...prev,
    operationProgress: Math.min(100, prev.operationProgress + Math.random() * 15)
  }));

  // Complete operation and start new one
  setHackerState(prev => {
    if (prev.operationProgress >= 100) {
      const operations = [
        'Network Reconnaissance',
        'Vulnerability Assessment',
        'Penetration Testing',
        'Exploit Development',
        'Social Engineering Analysis',
        'Wireless Security Testing',
        'Web Application Testing',
        'Database Security Audit'
      ];

      const newOperation = operations[Math.floor(Math.random() * operations.length)];
      
      console.log(`🔴 MIORA Hacker Operation: ${prev.currentOperation} completed, starting ${newOperation}`);
      
      return {
        ...prev,
        currentOperation: newOperation,
        operationProgress: 0,
        experiencePoints: Math.min(100, prev.experiencePoints + 5)
      };
    }
    return prev;
  });
};
