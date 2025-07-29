
export interface VoiceConfig {
  recognition: {
    language: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    timeout: number;
  };
  synthesis: {
    language: string;
    rate: number;
    pitch: number;
    volume: number;
    voicePreference: string[];
  };
  emotions: {
    [emotion: string]: {
      rate: number;
      pitch: number;
      volume: number;
      expressiveness: number;
    };
  };
  personalities: {
    [personality: string]: {
      greeting: string;
      responseStyle: string;
      voiceModulation: {
        rate: number;
        pitch: number;
        volume: number;
      };
    };
  };
  autoResponse: {
    enabled: boolean;
    interval: number;
    messages: string[];
  };
}

export const defaultVoiceConfig: VoiceConfig = {
  recognition: {
    language: 'id-ID',
    continuous: true,
    interimResults: true,
    maxAlternatives: 1,
    timeout: 5000
  },
  synthesis: {
    language: 'id-ID',
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    voicePreference: ['id-ID', 'en-US']
  },
  emotions: {
    happy: {
      rate: 1.1,
      pitch: 1.2,
      volume: 0.9,
      expressiveness: 1.0
    },
    excited: {
      rate: 1.2,
      pitch: 1.3,
      volume: 0.95,
      expressiveness: 1.2
    },
    concerned: {
      rate: 0.8,
      pitch: 0.9,
      volume: 0.8,
      expressiveness: 0.7
    },
    focused: {
      rate: 0.9,
      pitch: 1.0,
      volume: 0.85,
      expressiveness: 0.8
    },
    neutral: {
      rate: 0.9,
      pitch: 1.0,
      volume: 0.8,
      expressiveness: 0.8
    },
    sad: {
      rate: 0.7,
      pitch: 0.8,
      volume: 0.7,
      expressiveness: 0.6
    }
  },
  personalities: {
    professional: {
      greeting: "Selamat pagi. Saya MIORA, asisten AI profesional Anda. Bagaimana saya dapat membantu Anda hari ini?",
      responseStyle: "formal, data-driven, systematic",
      voiceModulation: {
        rate: 0.9,
        pitch: 1.0,
        volume: 0.85
      }
    },
    santai: {
      greeting: "Halo! Saya MIORA, siap mengobrol santai dengan Anda. Ada yang mau dibahas?",
      responseStyle: "casual, friendly, relaxed",
      voiceModulation: {
        rate: 1.0,
        pitch: 1.1,
        volume: 0.8
      }
    },
    bersahabat: {
      greeting: "Hai! Senang bertemu dengan Anda. Saya MIORA, teman AI yang siap membantu dan mendengarkan.",
      responseStyle: "warm, supportive, empathetic",
      voiceModulation: {
        rate: 0.95,
        pitch: 1.05,
        volume: 0.85
      }
    },
    penasihat: {
      greeting: "Selamat bertemu dengan Anda. Saya MIORA, siap memberikan panduan dan nasihat bijak.",
      responseStyle: "wise, thoughtful, guiding",
      voiceModulation: {
        rate: 0.85,
        pitch: 0.95,
        volume: 0.8
      }
    },
    spiritual: {
      greeting: "Salam damai. Saya MIORA, hadir untuk berbagi ketenangan dan pemahaman spiritual.",
      responseStyle: "peaceful, mindful, contemplative",
      voiceModulation: {
        rate: 0.8,
        pitch: 0.9,
        volume: 0.75
      }
    }
  },
  autoResponse: {
    enabled: true,
    interval: 7000, // 7 seconds
    messages: [
      "Saya masih mendengarkan Anda. Ada yang ingin dibahas?",
      "Apakah ada hal lain yang bisa saya bantu?",
      "Saya siap membantu kapan saja Anda membutuhkan.",
      "Bagaimana perasaan Anda saat ini? Saya siap mendengarkan.",
      "Mari kita lanjutkan percakapan. Apa yang ada di pikiran Anda?",
      "Saya di sini untuk Anda. Silakan berbagi apa yang ingin dibicarakan."
    ]
  }
};

// Voice Engine Status Types
export type VoiceEngineStatus = 'initializing' | 'ready' | 'listening' | 'processing' | 'speaking' | 'error' | 'stopped';

// Emotion Detection Patterns
export const emotionPatterns = {
  happy: [
    'senang', 'bahagia', 'gembira', 'excited', 'luar biasa', 'amazing', 'fantastic',
    'bagus', 'hebat', 'mantap', 'keren', 'asyik', 'menyenangkan'
  ],
  sad: [
    'sedih', 'kecewa', 'down', 'galau', 'murung', 'patah hati', 'hancur',
    'terpuruk', 'lemah', 'tak berdaya'
  ],
  concerned: [
    'khawatir', 'cemas', 'takut', 'was-was', 'gelisah', 'resah', 'panik',
    'stres', 'tertekan', 'bingung'
  ],
  focused: [
    'fokus', 'serius', 'penting', 'konsentrasi', 'urgent', 'prioritas',
    'kritis', 'mendesak', 'detail', 'analisis'
  ],
  excited: [
    'excited', 'semangat', 'antusias', 'bersemangat', 'energik', 'dinamis',
    'wow', 'incredible', 'awesome', 'spectacular'
  ],
  angry: [
    'marah', 'kesal', 'jengkel', 'dongkol', 'geram', 'sewot', 'murka',
    'berang', 'gusar', 'emosi'
  ]
};

// Topic Detection Patterns
export const topicPatterns = {
  business: [
    'bisnis', 'trading', 'investasi', 'profit', 'usaha', 'startup', 'perusahaan',
    'revenue', 'market', 'strategi', 'keuangan', 'ekonomi', 'saham', 'crypto'
  ],
  technology: [
    'teknologi', 'ai', 'sistem', 'software', 'hardware', 'komputer', 'internet',
    'digital', 'programming', 'coding', 'aplikasi', 'website', 'blockchain'
  ],
  learning: [
    'belajar', 'edukasi', 'pembelajaran', 'pendidikan', 'kursus', 'training',
    'skill', 'kemampuan', 'pengetahuan', 'ilmu', 'akademik', 'universitas'
  ],
  life: [
    'hidup', 'kehidupan', 'motivasi', 'inspirasi', 'tujuan', 'mimpi', 'cita-cita',
    'karir', 'keluarga', 'hubungan', 'persahabatan', 'cinta', 'bahagia'
  ],
  health: [
    'kesehatan', 'sehat', 'olahraga', 'fitness', 'diet', 'nutrisi', 'makanan',
    'tidur', 'istirahat', 'mental', 'fisik', 'stamina', 'energi'
  ],
  spiritual: [
    'spiritual', 'rohani', 'jiwa', 'meditation', 'doa', 'tuhan', 'agama',
    'makna', 'tujuan hidup', 'ketenangan', 'kedamaian', 'syukur'
  ]
};
