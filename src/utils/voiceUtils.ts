
import { emotionPatterns, topicPatterns, VoiceConfig } from '@/config/voiceConfig';

// Emotion Detection Utility
export const detectEmotion = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  for (const [emotion, patterns] of Object.entries(emotionPatterns)) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        return emotion;
      }
    }
  }
  
  return 'neutral';
};

// Topic Detection Utility
export const detectTopic = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  for (const [topic, patterns] of Object.entries(topicPatterns)) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        return topic;
      }
    }
  }
  
  return 'general';
};

// Voice Command Detection
export const detectVoiceCommand = (text: string): string | null => {
  const lowerText = text.toLowerCase();
  
  const commands = {
    'stop': ['miora diam dulu', 'miora berhenti', 'stop listening', 'hentikan'],
    'continue': ['miora lanjut', 'continue', 'lanjutkan'],
    'restart': ['miora restart', 'restart sistem', 'mulai ulang'],
    'status': ['miora status', 'bagaimana kabar', 'gimana kondisi'],
    'emotion': ['miora perasaan', 'bagaimana perasaanmu', 'mood miora'],
    'help': ['miora bantuan', 'help', 'bantu saya', 'panduan']
  };
  
  for (const [command, patterns] of Object.entries(commands)) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        return command;
      }
    }
  }
  
  return null;
};

// Contextual Response Generator
export const generateContextualResponse = (
  input: string, 
  emotion: string, 
  topic: string, 
  personality: string = 'bersahabat'
): string => {
  const responses = {
    business: {
      happy: {
        bersahabat: "Senang melihat antusiasme Anda tentang bisnis! Mari kita bahas strategi yang bisa meningkatkan profit berkelanjutan Anda.",
        professional: "Energi positif Anda terhadap bisnis sangat menginspirasi. Saya siap membantu mengoptimalkan strategi bisnis Anda.",
        santai: "Wah, semangat bisnisnya keren! Yuk kita ngobrol lebih dalam tentang ide-ide bisnis yang menarik."
      },
      concerned: {
        bersahabat: "Saya memahami kekhawatiran bisnis Anda. Mari kita analisis situasi dan temukan solusi strategis yang tepat bersama-sama.",
        professional: "Kekhawatiran bisnis dapat diatasi dengan analisis yang sistematis. Saya siap membantu identifikasi dan mengatasi tantangan Anda.",
        penasihat: "Setiap tantangan bisnis adalah peluang untuk berkembang. Mari kita hadapi dengan kebijaksanaan dan strategi yang matang."
      }
    },
    technology: {
      excited: {
        bersahabat: "Energi teknologi Anda sangat menular! Saya siap membantu mengeksplorasi inovasi terbaru bersama Anda.",
        professional: "Antusiasme teknologi Anda sangat menginspirasi. Mari kita diskusikan implementasi solusi teknologi yang optimal.",
        santai: "Keren banget passion teknologinya! Ayo kita bahas perkembangan tech yang hot nih."
      },
      focused: {
        bersahabat: "Fokus teknologi Anda sangat mengesankan. Saya siap membantu menganalisis detail teknis yang Anda butuhkan.",
        professional: "Pendekatan fokus terhadap teknologi sangat tepat. Mari kita selaraskan dengan objektif strategis Anda.",
        penasihat: "Fokus yang tajam adalah kunci kesuksesan teknologi. Mari kita arahkan energi ini untuk hasil maksimal."
      }
    },
    learning: {
      happy: {
        bersahabat: "Semangat belajar Anda luar biasa! Mari kita eksplorasi pengetahuan baru yang menarik bersama-sama.",
        professional: "Komitmen pembelajaran Anda sangat menginspirasi. Saya siap memfasilitasi proses pembelajaran yang efektif.",
        santai: "Belajar dengan happy mood itu paling asyik! Mau belajar apa nih hari ini?"
      },
      neutral: {
        bersahabat: "Pembelajaran adalah perjalanan yang indah. Apa yang ingin kita pelajari hari ini?",
        professional: "Continuous learning adalah kunci kesuksesan. Bagaimana saya dapat mendukung proses pembelajaran Anda?",
        penasihat: "Setiap hari adalah peluang untuk tumbuh. Mari kita manfaatkan waktu ini untuk pengembangan diri."
      }
    },
    life: {
      concerned: {
        bersahabat: "Saya di sini untuk mendengarkan dan mendukung Anda. Ceritakan apa yang membuat Anda khawatir.",
        penasihat: "Hidup memang penuh tantangan, tetapi setiap masalah memiliki solusi. Mari kita cari jawabannya bersama.",
        spiritual: "Dalam kekhawatiran, terdapat peluang untuk menemukan kedamaian dalam. Mari kita temukan ketenangan."
      },
      happy: {
        bersahabat: "Kebahagiaan Anda sangat menular! Senang melihat Anda dalam kondisi yang baik.",
        santai: "Asik banget liat lo happy gini! Semoga kebahagiaan ini terus berlanjut ya!",
        spiritual: "Syukur atas kebahagiaan yang Anda rasakan. Semoga berkah ini selalu menyertai perjalanan hidup Anda."
      }
    }
  };

  // Get appropriate response based on topic, emotion, and personality
  const topicResponses = responses[topic as keyof typeof responses];
  if (topicResponses) {
    const emotionResponses = topicResponses[emotion as keyof typeof topicResponses];
    if (emotionResponses) {
      const personalityResponse = emotionResponses[personality as keyof typeof emotionResponses];
      if (personalityResponse) {
        return personalityResponse;
      }
    }
  }

  // Fallback responses
  const fallbackResponses = {
    happy: "Senang melihat Anda dalam kondisi yang baik! Ada yang bisa saya bantu untuk membuat hari ini lebih produktif?",
    sad: "Saya memahami perasaan Anda. Saya di sini untuk mendengarkan dan mendukung Anda.",
    concerned: "Kekhawatiran Anda dapat dipahami. Mari kita hadapi bersama dan cari solusi yang tepat.",
    focused: "Fokus Anda sangat mengesankan. Bagaimana saya dapat membantu mencapai tujuan Anda?",
    excited: "Energi Anda sangat menginspirasi! Mari kita channeling semangat ini untuk hal-hal produktif.",
    neutral: "Terima kasih sudah berbagi. Bagaimana saya dapat membantu Anda hari ini?"
  };

  return fallbackResponses[emotion as keyof typeof fallbackResponses] || fallbackResponses.neutral;
};

// Voice Synthesis Settings Based on Emotion and Personality
export const getVoiceSettings = (emotion: string, personality: string, config: VoiceConfig) => {
  const emotionSettings = config.emotions[emotion] || config.emotions.neutral;
  const personalitySettings = config.personalities[personality] || config.personalities.bersahabat;

  return {
    rate: (emotionSettings.rate + personalitySettings.voiceModulation.rate) / 2,
    pitch: (emotionSettings.pitch + personalitySettings.voiceModulation.pitch) / 2,
    volume: (emotionSettings.volume + personalitySettings.voiceModulation.volume) / 2,
    expressiveness: emotionSettings.expressiveness
  };
};

// Auto Response Message Selection
export const getAutoResponseMessage = (config: VoiceConfig, lastEmotion: string = 'neutral'): string => {
  const messages = config.autoResponse.messages;
  
  // Contextual auto responses based on last emotion
  const contextualMessages = {
    happy: [
      "Senang melihat Anda dalam mood yang baik! Ada lagi yang ingin dibahas?",
      "Energi positif Anda menular! Mari kita lanjutkan percakapan yang menyenangkan."
    ],
    sad: [
      "Saya di sini untuk Anda. Ingin berbagi lebih banyak tentang perasaan Anda?",
      "Kadang berbicara membantu meringankan beban. Saya siap mendengarkan."
    ],
    concerned: [
      "Saya memahami kekhawatiran Anda. Mari kita cari solusi bersama-sama.",
      "Tidak apa-apa merasa khawatir. Saya siap membantu menenangkan pikiran Anda."
    ]
  };

  const contextualSet = contextualMessages[lastEmotion as keyof typeof contextualMessages];
  if (contextualSet && Math.random() < 0.3) {
    return contextualSet[Math.floor(Math.random() * contextualSet.length)];
  }

  return messages[Math.floor(Math.random() * messages.length)];
};

// Voice Engine Health Check
export const performVoiceEngineHealthCheck = (): {
  speechRecognition: boolean;
  speechSynthesis: boolean;
  microphone: boolean;
  speakers: boolean;
  overallHealth: 'excellent' | 'good' | 'limited' | 'poor';
} => {
  const health = {
    speechRecognition: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    speechSynthesis: 'speechSynthesis' in window,
    microphone: true, // This requires actual permission check
    speakers: true, // This requires actual audio test
    overallHealth: 'excellent' as 'excellent' | 'good' | 'limited' | 'poor'
  };

  const healthyComponents = Object.values(health).filter(Boolean).length - 1; // Exclude overallHealth
  
  if (healthyComponents === 4) {
    health.overallHealth = 'excellent';
  } else if (healthyComponents === 3) {
    health.overallHealth = 'good';
  } else if (healthyComponents >= 2) {
    health.overallHealth = 'limited';
  } else {
    health.overallHealth = 'poor';
  }

  return health;
};

// Format conversation duration
export const formatConversationDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

// Voice confidence score calculation
export const calculateVoiceConfidence = (
  recognitionConfidence: number,
  audioQuality: number = 0.8,
  contextRelevance: number = 0.8
): number => {
  return (recognitionConfidence * 0.5) + (audioQuality * 0.3) + (contextRelevance * 0.2);
};
