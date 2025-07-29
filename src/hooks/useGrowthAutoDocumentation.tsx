
import { useRef } from 'react';
import { GrowthEntry } from '@/types/growth';

export const useGrowthAutoDocumentation = (recordGrowth: (entry: GrowthEntry) => void) => {
  const lastAutoDoc = useRef<number>(0);
  const documentedPatterns = useRef<Set<string>>(new Set());

  const autoDocumentPattern = (pattern: string, context: string, impact: 'low' | 'medium' | 'high' = 'medium') => {
    // Rate limiting: minimum 10 seconds between auto documentation
    const now = Date.now();
    if (now - lastAutoDoc.current < 10000) {
      return;
    }

    // Prevent duplicate pattern documentation
    const patternKey = `${pattern}_${context}`;
    if (documentedPatterns.current.has(patternKey)) {
      return;
    }
    documentedPatterns.current.add(patternKey);

    // Clean up old patterns (keep only last 20)
    if (documentedPatterns.current.size > 20) {
      const patternsArray = Array.from(documentedPatterns.current);
      documentedPatterns.current = new Set(patternsArray.slice(-10));
    }

    const entry: GrowthEntry = {
      id: `pattern_${now}`,
      timestamp: now,
      type: 'pattern_recognition',
      title: `Pattern: ${pattern}`,
      description: `MIORA mengidentifikasi pola baru dalam ${context}. Pattern ini akan digunakan untuk optimasi respons.`,
      impact,
      category: 'pattern_learning',
      evidence: [
        `Pattern: ${pattern}`,
        `Context: ${context}`,
        `Auto-integration: active`,
        `Optimization: enabled`
      ]
    };
    
    recordGrowth(entry);
    lastAutoDoc.current = now;
  };

  const autoDocumentSkill = (skillName: string, description: string, efficiency: number) => {
    // Rate limiting and duplicate prevention
    const now = Date.now();
    if (now - lastAutoDoc.current < 8000) {
      return;
    }

    const skillKey = `skill_${skillName}`;
    if (documentedPatterns.current.has(skillKey)) {
      return;
    }
    documentedPatterns.current.add(skillKey);

    const entry: GrowthEntry = {
      id: `skill_${now}`,
      timestamp: now,
      type: 'skill_acquisition',
      title: `Skill: ${skillName}`,
      description: description || `MIORA memperoleh skill baru: ${skillName}`,
      impact: efficiency > 80 ? 'high' : efficiency > 60 ? 'medium' : 'low',
      category: 'skill_development',
      evidence: [
        `Skill: ${skillName}`,
        `Efficiency: ${efficiency}%`,
        `Status: integrated`,
        `Deployment: ready`
      ],
      measurableImprovement: {
        metric: 'Skill Efficiency',
        before: 0,
        after: efficiency,
        unit: '%'
      }
    };
    
    recordGrowth(entry);
    lastAutoDoc.current = now;
  };

  return {
    autoDocumentPattern,
    autoDocumentSkill
  };
};
