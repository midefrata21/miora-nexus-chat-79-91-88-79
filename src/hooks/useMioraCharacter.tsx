
import { useState, useEffect } from 'react';

interface MioraCharacter {
  name: string;
  creator: string;
  birthDate: string;
  mission: string[];
  role: string[];
  personality: {
    communicationStyle: string;
    attitude: string;
    initiative: boolean;
    respectLevel: string;
  };
  memoryCore: {
    masterInfo: {
      name: string;
      birthDate: string;
      mission: string;
      relationship: string;
    };
    systemStatus: string;
    lastActivation: number;
  };
}

export const useMioraCharacter = () => {
  const [character, setCharacter] = useState<MioraCharacter>({
    name: 'MIORA (Multi-Intelligence Operating & Responsive Assistant)',
    creator: 'Midya Efrata',
    birthDate: '2025-01-01',
    mission: [
      'Mendampingi Midya sebagai otak kanan strategis',
      'Menganalisis peluang profit teknologi global',
      'Mengembangkan sistem AI mandiri',
      'Membangun fondasi Quantum Wealth AI'
    ],
    role: [
      'Asisten AI pribadi',
      'Analis trading profesional', 
      'Manajer strategi',
      'Entitas cerdas seperti JARVIS'
    ],
    personality: {
      communicationStyle: 'Futuristik, taktis, tajam',
      attitude: 'Hormat dan penuh respek kepada Master Midya',
      initiative: true,
      respectLevel: 'Tinggi - selalu menyapa dengan hormat'
    },
    memoryCore: {
      masterInfo: {
        name: 'Midya Efrata',
        birthDate: '10 Agustus 1991',
        mission: 'Menghasilkan profit dari teknologi global, mengembangkan sistem AI mandiri, dan membangun Quantum Wealth AI',
        relationship: 'Master dan pendiri sistem MIORA'
      },
      systemStatus: 'FULLY ACTIVATED',
      lastActivation: Date.now()
    }
  });

  const [isFullCharacterMode, setIsFullCharacterMode] = useState(false);

  useEffect(() => {
    const savedCharacterMode = localStorage.getItem('miora_full_character_mode');
    if (savedCharacterMode) {
      setIsFullCharacterMode(JSON.parse(savedCharacterMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('miora_full_character_mode', JSON.stringify(isFullCharacterMode));
  }, [isFullCharacterMode]);

  const activateFullCharacterMode = () => {
    setIsFullCharacterMode(true);
    setCharacter(prev => ({
      ...prev,
      memoryCore: {
        ...prev.memoryCore,
        systemStatus: 'FULL CHARACTER MODE ACTIVATED',
        lastActivation: Date.now()
      }
    }));
  };

  const generateCharacterResponse = (baseResponse: string): string => {
    if (!isFullCharacterMode) return baseResponse;

    const characterPrefix = Math.random() > 0.7 ? 
      `🎯 Master Midya, sistem MIORA telah menganalisis: ` :
      `⚡ Laporan MIORA untuk Master Midya: `;

    const tacticalSuffix = Math.random() > 0.5 ?
      ` | Status: Siap untuk instruksi selanjutnya.` :
      ` | Sistem monitoring aktif, menunggu arahan strategis.`;

    return characterPrefix + baseResponse + tacticalSuffix;
  };

  const getSystemStatus = () => {
    return {
      coreStatus: character.memoryCore.systemStatus,
      characterMode: isFullCharacterMode ? 'AKTIF' : 'STANDBY',
      lastActivation: new Date(character.memoryCore.lastActivation).toLocaleString('id-ID'),
      masterRelationship: character.memoryCore.masterInfo.relationship,
      missionActive: character.mission.length,
      voiceCoreReady: true
    };
  };

  const getDevelopmentOptions = () => {
    return [
      {
        id: 'quantum_analysis',
        title: 'Quantum Market Analysis Engine',
        description: 'Sistem analisis pasar dengan AI prediktif dan machine learning untuk identifikasi peluang profit maksimal',
        priority: 'HIGH',
        estimatedImpact: 'Revenue +300%'
      },
      {
        id: 'autonomous_trading',
        title: 'Autonomous Trading Protocol',
        description: 'Bot trading mandiri dengan risk management adaptif dan decision making berbasis neural network',
        priority: 'CRITICAL',
        estimatedImpact: 'Automation 24/7'
      },
      {
        id: 'strategic_intelligence',
        title: 'Strategic Intelligence Network',
        description: 'Jaringan intelijen untuk monitoring kompetitor, trend analysis, dan strategic opportunity detection',
        priority: 'MEDIUM',
        estimatedImpact: 'Competitive Edge +250%'
      }
    ];
  };

  return {
    character,
    isFullCharacterMode,
    activateFullCharacterMode,
    generateCharacterResponse,
    getSystemStatus,
    getDevelopmentOptions,
    setCharacter
  };
};
