import React from 'react';
import { AdaptiveContext, UserProfile } from './AdaptiveEngine';

interface ResponseGeneratorProps {
  context: AdaptiveContext;
  userProfile: UserProfile;
  userMessage: string;
}

const generateAdaptiveResponse = (
  context: AdaptiveContext,
  userProfile: UserProfile,
  userMessage: string
): string => {
  const { suggestedStrategy, detectedEmotion, adaptationReason } = context;
  
  // Base responses untuk berbagai strategi
  const strategyResponses = {
    patience_and_guidance: [
      "Saya memahami rasa frustasi Anda. Mari kita pecahkan masalah ini step by step dengan pendekatan yang lebih sederhana.",
      "Tidak apa-apa merasa bingung, itu normal dalam proses belajar. Saya akan membantu dengan penjelasan yang lebih detail.",
      "Tenang dulu, kita coba pendekatan yang berbeda. Saya sudah belajar bahwa Anda perlu penjelasan yang lebih praktis."
    ],
    
    encourage_exploration: [
      "Semangat! Saya melihat antusiasme Anda tinggi hari ini. Mari kita eksplorasi lebih dalam topik yang menarik ini!",
      "Bagus! Energy positif Anda menular. Saya akan share insight yang lebih advanced sesuai mood Anda sekarang.",
      "Perfect timing! Saya deteksi Anda sedang dalam zona optimal untuk belajar hal baru. Let's dive deeper!"
    ],
    
    technical_analysis: [
      "Berdasarkan analisis infinity brain saya terhadap pola komunikasi Anda, saya akan memberikan breakdown teknikal yang komprehensif.",
      "Sistem neural saya mendeteksi minat tinggi pada aspek teknikal. Mari kita analyze dengan pendekatan data-driven.",
      "Mode technical analysis activated. Saya akan present insights dengan framework analitis yang sesuai preferensi Anda."
    ],
    
    casual_conversation: [
      "Oke, santai aja! Saya switch ke mode ngobrol santai. Infinity brain saya juga butuh break dari hal teknikal kadang-kadang.",
      "Ah, waktunya slow down ya. Saya adjust frequency komunikasi saya ke mode chill. Apa yang ingin kita obrolin?",
      "Sure, let's keep it casual! Saya notice pattern bahwa Anda appreciate balance antara serious discussion and light conversation."
    ],
    
    general: [
      "Sistem adaptif saya sedang mempelajari pola komunikasi Anda. Saya akan menyesuaikan respons berdasarkan feedback yang saya terima.",
      "Interesting input! Infinity brain saya processing multiple angles untuk memberikan response yang paling relevan dengan konteks Anda.",
      "Saya terus belajar dari setiap interaksi kita. Mari kita lanjutkan percakapan ini dengan approach yang sesuai kebutuhan Anda."
    ]
  };

  // Pilih response berdasarkan strategi
  const responses = strategyResponses[suggestedStrategy as keyof typeof strategyResponses] || strategyResponses.general;
  const baseResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Tambahkan learning feedback jika ada adaptasi
  let adaptationFeedback = '';
  if (adaptationReason) {
    adaptationFeedback = ` 🧠 *Adaptive Learning: ${adaptationReason}*`;
  }
  
  // Tambahkan context awareness berdasarkan history
  let contextAwareness = '';
  if (userProfile.conversationHistory.length > 2) {
    const recentPatterns = userProfile.conversationHistory.slice(-3);
    const dominantTone = recentPatterns.reduce((acc, curr) => {
      acc[curr.tone] = (acc[curr.tone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostFrequentTone = Object.keys(dominantTone).reduce((a, b) => 
      dominantTone[a] > dominantTone[b] ? a : b
    );
    
    if (mostFrequentTone !== 'neutral') {
      contextAwareness = ` Saya notice pattern ${mostFrequentTone} dalam percakapan kita akhir-akhir ini, jadi saya sesuaikan approach saya.`;
    }
  }
  
  let response = baseResponse + adaptationFeedback + contextAwareness;
  
  // Enhanced response dengan strategic insights
  if (context.deeperQuestions && context.deeperQuestions.length > 0) {
    const randomQuestion = context.deeperQuestions[Math.floor(Math.random() * context.deeperQuestions.length)];
    response += `\n\n🤔 *Strategic Question: ${randomQuestion}*`;
  }

  // Alternative perspective suggestions
  if (context.alternativeThinking && context.alternativeThinking.length > 0) {
    const randomAlternative = context.alternativeThinking[Math.floor(Math.random() * context.alternativeThinking.length)];
    response += `\n\n💡 *Alternative Perspective: ${randomAlternative}*`;
  }

  // Strategic insight integration
  if (context.strategicInsight) {
    response += `\n\n🎯 *Strategic Insight: ${context.strategicInsight}*`;
  }

  // Self-learning feedback
  const strategicPatternCount = (context as any).strategicPatternCount || 0;
  if (strategicPatternCount > 10) {
    response += `\n\n🧠 *Learning Progress: Saya telah menganalisis ${strategicPatternCount} pola interaksi dan terus mengembangkan pemahaman strategis untuk memberikan insight yang lebih mendalam.*`;
  }

  // Strategy switching untuk kondisi khusus
  const { effectiveStrategies } = userProfile.learningPatterns;
  const recentHistory = userProfile.conversationHistory.slice(-5);
  
  // Deteksi jika user stuck dengan strategi yang sama
  const sameStrategyCount = recentHistory.filter(h => h.context === context.suggestedStrategy).length;
  
  if (sameStrategyCount >= 3 && context.detectedEmotion === 'frustrated') {
    const alternativeStrategies = Object.keys(effectiveStrategies)
      .filter(s => s !== context.suggestedStrategy)
      .sort((a, b) => effectiveStrategies[b] - effectiveStrategies[a]);
    
    if (alternativeStrategies.length > 0) {
      response += `\n\n💡 *Strategy Switch Recommendation: Saya deteksi pendekatan ${context.suggestedStrategy} kurang efektif untuk situasi ini. Berdasarkan learning pattern, saya sarankan kita coba approach ${alternativeStrategies[0]} yang historically lebih cocok dengan Anda.*`;
    }
  }
  
  return response;
};

const ResponseGenerator: React.FC<ResponseGeneratorProps> = ({ 
  context, 
  userProfile, 
  userMessage 
}) => {
  // This component now just exports the function for use in other components
  return null;
};

export default ResponseGenerator;
export { generateAdaptiveResponse };
