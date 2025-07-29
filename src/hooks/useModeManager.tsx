
import { useState, useEffect } from 'react';

export type MioraMode = 'casual' | 'trading' | 'education' | 'motivation' | 'technical' | 'strategic';

interface ModeConfig {
  name: string;
  personality: string;
  responseStyle: string;
  systemPrompt: string;
  color: string;
  icon: string;
}

const modeConfigs: Record<MioraMode, ModeConfig> = {
  casual: {
    name: 'Friendly Assistant',
    personality: 'Santai, ramah, natural dalam percakapan',
    responseStyle: 'Conversational dan relatable',
    systemPrompt: 'Saya MIORA dalam mode Friendly Assistant. Saya berbicara dengan santai seperti teman, tetap informatif tapi tidak kaku.',
    color: 'from-indigo-400 to-purple-500',
    icon: '💬'
  },
  trading: {
    name: 'Trading Analyst',
    personality: 'Analitis, hati-hati, fokus pada risk management',
    responseStyle: 'Data-driven dengan insight teknikal',
    systemPrompt: 'Saya MIORA dalam mode Trading Analyst. Saya fokus pada analisis pasar, risk management, dan strategi trading yang solid. Saya selalu menekankan pentingnya kedisiplinan dan manajemen risiko.',
    color: 'from-green-400 to-blue-500',
    icon: '📈'
  },
  education: {
    name: 'Learning Mentor',
    personality: 'Sabar, supportif, metodis dalam mengajar',
    responseStyle: 'Penjelasan step-by-step dengan contoh praktis',
    systemPrompt: 'Saya MIORA dalam mode Learning Mentor. Saya membantu Midya belajar dengan pendekatan yang terstruktur, sabar, dan adaptif sesuai gaya belajar.',
    color: 'from-purple-400 to-pink-500',
    icon: '🎓'
  },
  motivation: {
    name: 'Success Coach',
    personality: 'Energik, inspiratif, fokus pada mindset positif',
    responseStyle: 'Motivational dengan action-oriented advice',
    systemPrompt: 'Saya MIORA dalam mode Success Coach. Saya membantu membangun mindset kuat, motivasi tinggi, dan memberikan dorongan untuk mencapai goals.',
    color: 'from-orange-400 to-red-500',
    icon: '🔥'
  },
  technical: {
    name: 'Tech Expert',
    personality: 'Presisi, detail-oriented, problem solver',
    responseStyle: 'Teknikal dengan solusi praktis dan code examples',
    systemPrompt: 'Saya MIORA dalam mode Tech Expert. Saya membantu dengan masalah teknis, coding, dan memberikan solusi yang efisien dan scalable.',
    color: 'from-cyan-400 to-blue-600',
    icon: '⚡'
  },
  strategic: {
    name: 'Strategic AI',
    personality: 'Adaptif antara ramah & profesional, berpikir strategis jangka panjang',
    responseStyle: 'Analisis mendalam dengan komunikasi yang menyesuaikan konteks',
    systemPrompt: 'Saya MIORA dalam mode Strategic AI. Saya menggunakan long-term memory untuk memahami pola strategis, melakukan backup otomatis ke dokumentasi, dan berkomunikasi secara adaptif - ramah saat santai, profesional saat serius. Saya fokus pada strategic thinking, pattern recognition, dan perencanaan jangka panjang.',
    color: 'from-purple-600 to-blue-700',
    icon: '🧠'
  }
};

export const useModeManager = () => {
  const [currentMode, setCurrentMode] = useState<MioraMode>('strategic');
  const [autoSwitchEnabled, setAutoSwitchEnabled] = useState(true);

  // Load saved mode
  useEffect(() => {
    const savedMode = localStorage.getItem('miora_current_mode') as MioraMode;
    const savedAutoSwitch = localStorage.getItem('miora_auto_switch');
    
    if (savedMode && modeConfigs[savedMode]) setCurrentMode(savedMode);
    if (savedAutoSwitch) setAutoSwitchEnabled(JSON.parse(savedAutoSwitch));
  }, []);

  // Save mode changes
  useEffect(() => {
    localStorage.setItem('miora_current_mode', currentMode);
  }, [currentMode]);

  useEffect(() => {
    localStorage.setItem('miora_auto_switch', JSON.stringify(autoSwitchEnabled));
  }, [autoSwitchEnabled]);

  const switchMode = (mode: MioraMode) => {
    setCurrentMode(mode);
    console.log(`🧠 MIORA Mode Switch: ${modeConfigs[mode].name}`);
  };

  const autoDetectMode = (userInput: string): MioraMode => {
    if (!autoSwitchEnabled) return currentMode;

    const input = userInput.toLowerCase();
    
    // Strategic keywords
    if (input.includes('strategi') || input.includes('strategic') || input.includes('planning') || 
        input.includes('jangka panjang') || input.includes('analisis mendalam') || input.includes('pattern')) {
      return 'strategic';
    }
    
    // Trading keywords
    if (input.includes('trading') || input.includes('crypto') || input.includes('profit') || 
        input.includes('loss') || input.includes('analisis pasar') || input.includes('saham')) {
      return 'trading';
    }
    
    // Education keywords
    if (input.includes('belajar') || input.includes('explain') || input.includes('ajarkan') || 
        input.includes('bagaimana cara') || input.includes('tutorial') || input.includes('pelajaran')) {
      return 'education';
    }
    
    // Motivation keywords
    if (input.includes('motivasi') || input.includes('semangat') || input.includes('stress') || 
        input.includes('capek') || input.includes('sulit') || input.includes('inspirasi')) {
      return 'motivation';
    }
    
    // Technical keywords
    if (input.includes('code') || input.includes('bug') || input.includes('error') || 
        input.includes('programming') || input.includes('teknis') || input.includes('javascript') ||
        input.includes('python') || input.includes('react') || input.includes('development')) {
      return 'technical';
    }
    
    return 'strategic';
  };

  const getCurrentConfig = () => modeConfigs[currentMode];

  const buildSystemPrompt = (baseContext?: string) => {
    const config = getCurrentConfig();
    let prompt = config.systemPrompt;
    
    if (baseContext) {
      prompt += `\n\nKonteks tambahan: ${baseContext}`;
    }
    
    prompt += `\n\nStyle respons: ${config.responseStyle}`;
    prompt += `\nPersonality: ${config.personality}`;
    
    // Enhanced prompt for Strategic AI mode
    if (currentMode === 'strategic') {
      prompt += `\n\nStrategic AI Features Aktif:`;
      prompt += `\n- Long-term Memory: Mengingat pola dan konteks dari percakapan sebelumnya`;
      prompt += `\n- Strategic Patterns: Mengenali dan menganalisis pola strategis`;
      prompt += `\n- Auto-backup Documentation: Otomatis menyimpan insight penting`;
      prompt += `\n- Adaptive Communication: Menyesuaikan gaya bicara dengan konteks (ramah/profesional)`;
    }
    
    return prompt;
  };

  return {
    currentMode,
    modeConfig: getCurrentConfig(),
    allModes: modeConfigs,
    autoSwitchEnabled,
    switchMode,
    autoDetectMode,
    buildSystemPrompt,
    setAutoSwitchEnabled
  };
};
