
import React, { useState, useEffect } from 'react';

export interface LearningPattern {
  situasi: string;
  pola_baru: string;
  alasan: string;
  rekomendasi: string;
  timestamp: number;
  efektivitas?: number;
  konteks: string[];
}

export interface StrategicProfile {
  patterns: LearningPattern[];
  blindSpots: string[];
  successStrategies: Record<string, number>;
  reflectionHistory: Array<{
    observasi: string;
    konteks: string;
    asosiasi: string[];
    evaluasi: string;
    rekomendasi: string;
    refleksi: string;
    timestamp: number;
  }>;
}

const StrategicReflection = () => {
  const [strategicProfile, setStrategicProfile] = useState<StrategicProfile>({
    patterns: [],
    blindSpots: [],
    successStrategies: {},
    reflectionHistory: []
  });

  // Analisis strategis mendalam
  const analyzeStrategically = (
    userMessage: string,
    context: any,
    previousResults?: any
  ) => {
    const observasi = extractObservation(userMessage);
    const konteks = analyzeContext(userMessage, context);
    const asosiasi = buildAssociations(userMessage, strategicProfile.patterns);
    const evaluasi = evaluateImplications(userMessage, konteks, asosiasi);
    const rekomendasi = generateStrategicRecommendation(evaluasi, konteks);
    const refleksi = performSelfReflection(observasi, evaluasi, rekomendasi);

    // Simpan refleksi
    const newReflection = {
      observasi,
      konteks,
      asosiasi,
      evaluasi,
      rekomendasi,
      refleksi,
      timestamp: Date.now()
    };

    setStrategicProfile(prev => ({
      ...prev,
      reflectionHistory: [...prev.reflectionHistory.slice(-20), newReflection]
    }));

    return {
      strategicInsight: rekomendasi,
      deeperQuestions: generateProbeQuestions(konteks, evaluasi),
      alternativeThinking: suggestAlternativePerspectives(evaluasi),
      patternLearned: extractNewPattern(observasi, evaluasi, rekomendasi)
    };
  };

  // Ekstrak observasi dari pesan user
  const extractObservation = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('loss') || lowerMessage.includes('rugi')) {
      return 'User mengalami kerugian trading';
    } else if (lowerMessage.includes('profit') || lowerMessage.includes('untung')) {
      return 'User mendapat keuntungan';
    } else if (lowerMessage.includes('entry') || lowerMessage.includes('masuk')) {
      return 'User membahas timing masuk market';
    } else if (lowerMessage.includes('strategy') || lowerMessage.includes('strategi')) {
      return 'User membahas strategi trading';
    } else if (lowerMessage.includes('analisis') || lowerMessage.includes('analyze')) {
      return 'User ingin melakukan analisis';
    } else {
      return 'User berbagi informasi atau bertanya';
    }
  };

  // Analisis konteks mendalam
  const analyzeContext = (message: string, context: any): string => {
    const urgency = message.includes('urgent') || message.includes('cepat') ? 'tinggi' : 'normal';
    const emotion = context.detectedEmotion || 'neutral';
    const timeContext = new Date().getHours() < 12 ? 'pagi' : 
                       new Date().getHours() < 18 ? 'siang' : 'malam';
    
    return `${emotion}_${urgency}_${timeContext}`;
  };

  // Bangun asosiasi dengan pola sebelumnya
  const buildAssociations = (message: string, patterns: LearningPattern[]): string[] => {
    const associations: string[] = [];
    const messageLower = message.toLowerCase();
    
    patterns.forEach(pattern => {
      if (pattern.situasi.toLowerCase().includes(messageLower.substring(0, 10)) ||
          messageLower.includes(pattern.situasi.toLowerCase().substring(0, 10))) {
        associations.push(`Pola serupa: ${pattern.pola_baru} (efektivitas: ${pattern.efektivitas || 'belum diukur'})`);
      }
    });
    
    return associations;
  };

  // Evaluasi implikasi mendalam
  const evaluateImplications = (message: string, konteks: string, asosiasi: string[]): string => {
    const hasRisk = message.toLowerCase().includes('loss') || message.toLowerCase().includes('risk');
    const hasOpportunity = message.toLowerCase().includes('profit') || message.toLowerCase().includes('chance');
    const hasUrgency = konteks.includes('tinggi');
    
    let evaluation = '';
    
    if (hasRisk && hasUrgency) {
      evaluation = 'Situasi berisiko tinggi dengan urgensi - perlu kehati-hatian ekstra';
    } else if (hasOpportunity && asosiasi.length > 0) {
      evaluation = 'Peluang teridentifikasi dengan precedent yang ada - layak dipertimbangkan';
    } else if (asosiasi.length === 0) {
      evaluation = 'Situasi baru tanpa pola sebelumnya - perlu eksplorasi hati-hati';
    } else {
      evaluation = 'Situasi standar dengan pola yang dapat diandalkan';
    }
    
    return evaluation;
  };

  // Generate rekomendasi strategis
  const generateStrategicRecommendation = (evaluasi: string, konteks: string): string => {
    if (evaluasi.includes('berisiko tinggi')) {
      return 'Tunda keputusan, lakukan analisis risk-reward lebih mendalam, dan pertimbangkan position sizing yang lebih kecil';
    } else if (evaluasi.includes('peluang teridentifikasi')) {
      return 'Manfaatkan peluang dengan menggunakan pola yang sudah terbukti, tapi tetap monitor untuk adjustment';
    } else if (evaluasi.includes('situasi baru')) {
      return 'Mulai dengan exposure minimal untuk pembelajaran, dokumentasikan hasilnya untuk pattern building';
    } else {
      return 'Lanjutkan dengan strategi yang sudah established, sambil tetap waspada terhadap perubahan kondisi';
    }
  };

  // Refleksi diri
  const performSelfReflection = (observasi: string, evaluasi: string, rekomendasi: string): string => {
    return `Dari observasi "${observasi}", saya mengevaluasi bahwa ${evaluasi.toLowerCase()}. ` +
           `Rekomendasi saya adalah ${rekomendasi.toLowerCase()}. ` +
           `Saya perlu memantau efektivitas pendekatan ini untuk pembelajaran di masa depan.`;
  };

  // Generate pertanyaan untuk menggali lebih dalam
  const generateProbeQuestions = (konteks: string, evaluasi: string): string[] => {
    const questions = [];
    
    if (evaluasi.includes('berisiko')) {
      questions.push('Apa yang membuat Anda yakin dengan keputusan ini meski ada risiko?');
      questions.push('Sudahkah Anda mempertimbangkan skenario worst-case?');
    }
    
    if (konteks.includes('tinggi')) {
      questions.push('Mengapa timing ini terasa mendesak bagi Anda?');
      questions.push('Apa konsekuensi jika menunda keputusan ini?');
    }
    
    questions.push('Apa tujuan jangka panjang di balik keputusan ini?');
    
    return questions;
  };

  // Sarankan perspektif alternatif
  const suggestAlternativePerspectives = (evaluasi: string): string[] => {
    const alternatives = [];
    
    if (evaluasi.includes('berisiko')) {
      alternatives.push('Pertimbangkan pendekatan defensive dengan target profit yang lebih realistis');
      alternatives.push('Gunakan hedging strategy untuk mengurangi exposure');
    }
    
    alternatives.push('Analisis dari sudut pandang institusional investor');
    alternatives.push('Pertimbangkan dampak makroekonomi terhadap keputusan ini');
    
    return alternatives;
  };

  // Ekstrak pola baru untuk pembelajaran
  const extractNewPattern = (observasi: string, evaluasi: string, rekomendasi: string): LearningPattern => {
    return {
      situasi: observasi,
      pola_baru: rekomendasi,
      alasan: evaluasi,
      rekomendasi: 'Monitor dan adjust berdasarkan hasil',
      timestamp: Date.now(),
      konteks: [evaluasi.split(' ')[0]]
    };
  };

  // Update efektivitas pola berdasarkan feedback
  const updatePatternEffectiveness = (patternId: number, effectiveness: number) => {
    setStrategicProfile(prev => ({
      ...prev,
      patterns: prev.patterns.map((pattern, index) => 
        index === patternId 
          ? { ...pattern, efektivitas: effectiveness }
          : pattern
      )
    }));
  };

  // Pembelajaran mandiri dari hasil
  const learnFromResults = (situation: string, action: string, result: 'success' | 'failure', details: string) => {
    const newPattern: LearningPattern = {
      situasi: situation,
      pola_baru: result === 'success' ? action : `Hindari: ${action}`,
      alasan: details,
      rekomendasi: result === 'success' ? 'Ulangi pola ini dalam situasi serupa' : 'Cari alternatif pendekatan',
      timestamp: Date.now(),
      efektivitas: result === 'success' ? 8 : 2,
      konteks: [situation.split(' ')[0]]
    };

    setStrategicProfile(prev => ({
      ...prev,
      patterns: [...prev.patterns.slice(-50), newPattern],
      successStrategies: {
        ...prev.successStrategies,
        [action]: (prev.successStrategies[action] || 0) + (result === 'success' ? 1 : -1)
      }
    }));
  };

  return {
    strategicProfile,
    analyzeStrategically,
    updatePatternEffectiveness,
    learnFromResults,
    setStrategicProfile
  };
};

export default StrategicReflection;
