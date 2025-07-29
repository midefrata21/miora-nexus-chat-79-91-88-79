
import { useCallback } from 'react';
import { DiscourseContext } from './DiscourseAnalyzer';

interface ResponseStrategy {
  structure: 'short' | 'medium' | 'detailed';
  tone: 'casual' | 'thoughtful' | 'advisory' | 'inquisitive';
  includeQuestion: boolean;
  usePersonalExpression: boolean;
}

interface OptimizedResponse {
  content: string;
  followUpQuestion?: string;
  tone: string;
  estimatedDuration: number; // in seconds for TTS
}

export const useResponseOptimizer = () => {
  const optimizeResponse = useCallback((
    baseResponse: string,
    context: DiscourseContext,
    topicContext?: string
  ): OptimizedResponse => {
    
    // Determine response strategy
    const strategy: ResponseStrategy = {
      structure: context.complexity === 'simple' ? 'short' : 
                context.complexity === 'moderate' ? 'medium' : 'detailed',
      tone: context.sentiment === 'excited' ? 'casual' :
            context.sentiment === 'curious' ? 'thoughtful' :
            context.intent === 'request' ? 'advisory' : 'inquisitive',
      includeQuestion: context.requiresFollowUp || Math.random() < 0.3,
      usePersonalExpression: context.conversationFlow === 'continuing' || context.intent === 'opinion'
    };

    // Natural expressions to make responses more human
    const personalExpressions = {
      opening: ['Menurutku', 'Kalau dari pengalamanku', 'Sejauh yang aku tahu'],
      agreeing: ['Setuju banget', 'Iya, bener juga', 'Nah, itu dia'],
      thinking: ['Hmm, menarik...', 'Oke, gini ya', 'Kalau dipikir-pikir'],
      questioning: ['Tapi gimana ya', 'Kamu sendiri gimana?', 'Menurutmu bagaimana?']
    };

    const transitionPhrases = {
      short: ['Gini nih', 'Jadi begini', 'Singkatnya'],
      medium: ['Kalau dijelasin', 'Biar lebih jelas', 'Oke, begini ceritanya'],
      detailed: ['Mari kita bahas lebih dalam', 'Aku jelasin step by step ya', 'Ini perlu penjelasan detail']
    };

    // Build optimized response
    let optimizedContent = baseResponse;

    // Add personal expression if needed
    if (strategy.usePersonalExpression) {
      const expressions = personalExpressions[
        context.sentiment === 'positive' ? 'agreeing' :
        context.intent === 'question' ? 'thinking' : 'opening'
      ] || personalExpressions.opening;
      
      const expression = expressions[Math.floor(Math.random() * expressions.length)];
      optimizedContent = `${expression}, ${optimizedContent.toLowerCase()}`;
    }

    // Add transition phrase for structure
    if (strategy.structure !== 'short' && !strategy.usePersonalExpression) {
      const phrases = transitionPhrases[strategy.structure];
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      optimizedContent = `${phrase}, ${optimizedContent.toLowerCase()}`;
    }

    // Generate follow-up question if needed
    let followUpQuestion: string | undefined;
    if (strategy.includeQuestion) {
      const followUps = {
        business: ['Gimana strategi bisnis kamu sejauh ini?', 'Udah pernah coba approach yang berbeda?'],
        technology: ['Teknologi mana yang paling menarik buat kamu?', 'Udah implementasi di project?'],
        learning: ['Skill apa lagi yang pengen dikembangin?', 'Gimana progress belajarnya sejauh ini?'],
        personal: ['Kamu sendiri gimana rasanya?', 'Ada pengalaman serupa sebelumnya?'],
        general: ['Kamu gimana pendapatnya?', 'Ada yang mau ditambahin?']
      };

      const questions = followUps[context.topic as keyof typeof followUps] || followUps.general;
      followUpQuestion = questions[Math.floor(Math.random() * questions.length)];
    }

    // Estimate TTS duration (rough calculation)
    const wordCount = optimizedContent.split(' ').length;
    const estimatedDuration = Math.ceil(wordCount * 0.6); // ~0.6 seconds per word in Indonesian

    return {
      content: optimizedContent,
      followUpQuestion,
      tone: strategy.tone,
      estimatedDuration
    };
  }, []);

  const createQuickResponse = useCallback((context: DiscourseContext): string => {
    const quickResponses = {
      greeting: ['Hai! Apa kabar?', 'Halo! Ada yang bisa dibantu?', 'Hi! Gimana hari ini?'],
      casual: ['Iya, bener!', 'Setuju sih', 'Oh gitu ya', 'Menarik nih'],
      positive: ['Keren banget!', 'Wah, bagus tuh!', 'Asyik ya!'],
      question: ['Hmm, pertanyaan bagus...', 'Oke, gini ya...', 'Menarik nih...']
    };

    const responseType = context.intent === 'greeting' ? 'greeting' :
                        context.intent === 'casual' ? 'casual' :
                        context.sentiment === 'positive' ? 'positive' : 'question';

    const responses = quickResponses[responseType as keyof typeof quickResponses] || quickResponses.question;
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  return {
    optimizeResponse,
    createQuickResponse
  };
};
