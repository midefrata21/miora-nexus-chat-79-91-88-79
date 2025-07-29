
import { useCallback } from 'react';

export interface DiscourseContext {
  intent: 'question' | 'opinion' | 'statement' | 'request' | 'greeting' | 'casual';
  topic: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'curious' | 'excited';
  complexity: 'simple' | 'moderate' | 'complex';
  requiresFollowUp: boolean;
  conversationFlow: 'opening' | 'continuing' | 'closing' | 'topic_switch';
}

export const useDiscourseAnalyzer = () => {
  const analyzeDiscourse = useCallback((input: string, previousContext?: string): DiscourseContext => {
    const lowerInput = input.toLowerCase();
    
    // Intent detection
    let intent: DiscourseContext['intent'] = 'statement';
    if (lowerInput.includes('?') || lowerInput.startsWith('apakah') || lowerInput.startsWith('bagaimana') || lowerInput.startsWith('mengapa')) {
      intent = 'question';
    } else if (lowerInput.includes('menurutku') || lowerInput.includes('menurut saya') || lowerInput.includes('rasanya')) {
      intent = 'opinion';
    } else if (lowerInput.startsWith('tolong') || lowerInput.startsWith('bisa') || lowerInput.includes('bantu')) {
      intent = 'request';
    } else if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('selamat')) {
      intent = 'greeting';
    } else if (lowerInput.includes('ya') || lowerInput.includes('oke') || lowerInput.includes('baik') || lowerInput.includes('setuju')) {
      intent = 'casual';
    }

    // Topic extraction
    const topics = {
      business: ['bisnis', 'usaha', 'profit', 'strategi', 'investasi'],
      technology: ['teknologi', 'AI', 'sistem', 'digital', 'coding'],
      learning: ['belajar', 'skill', 'pengetahuan', 'latihan', 'development'],
      personal: ['perasaan', 'hidup', 'keluarga', 'hubungan', 'karir'],
      general: ['bagaimana', 'mengapa', 'kapan', 'dimana']
    };

    let topic = 'general';
    for (const [topicKey, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        topic = topicKey;
        break;
      }
    }

    // Sentiment analysis
    let sentiment: DiscourseContext['sentiment'] = 'neutral';
    const positiveWords = ['bagus', 'senang', 'suka', 'keren', 'mantap', 'hebat'];
    const negativeWords = ['buruk', 'sedih', 'susah', 'sulit', 'bingung', 'frustasi'];
    const curiousWords = ['penasaran', 'ingin tahu', 'bagaimana', 'mengapa'];
    const excitedWords = ['wow', 'amazing', 'luar biasa', 'excited', 'semangat'];

    if (positiveWords.some(word => lowerInput.includes(word))) sentiment = 'positive';
    else if (negativeWords.some(word => lowerInput.includes(word))) sentiment = 'negative';
    else if (curiousWords.some(word => lowerInput.includes(word))) sentiment = 'curious';
    else if (excitedWords.some(word => lowerInput.includes(word))) sentiment = 'excited';

    // Complexity assessment
    const complexity: DiscourseContext['complexity'] = 
      input.length > 100 ? 'complex' :
      input.length > 30 ? 'moderate' : 'simple';

    // Follow-up requirement
    const requiresFollowUp = intent === 'question' || 
                           sentiment === 'curious' || 
                           lowerInput.includes('gimana') ||
                           lowerInput.includes('bagaimana menurutmu');

    // Conversation flow
    let conversationFlow: DiscourseContext['conversationFlow'] = 'continuing';
    if (intent === 'greeting' || !previousContext) conversationFlow = 'opening';
    else if (lowerInput.includes('terima kasih') || lowerInput.includes('sudah cukup')) conversationFlow = 'closing';
    else if (previousContext && !lowerInput.includes(previousContext.toLowerCase())) conversationFlow = 'topic_switch';

    return {
      intent,
      topic,
      sentiment,
      complexity,
      requiresFollowUp,
      conversationFlow
    };
  }, []);

  return { analyzeDiscourse };
};
