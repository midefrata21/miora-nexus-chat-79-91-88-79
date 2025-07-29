import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Heart, 
  Target, 
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield
} from 'lucide-react';

interface TradingPsychologyProps {
  currentLevel: number;
  onLevelUp: (level: number) => void;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
}

export const TradingPsychology: React.FC<TradingPsychologyProps> = ({
  currentLevel,
  onLevelUp,
  completedLessons,
  onLessonComplete
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const psychologyLevels = {
    1: {
      title: "Trading Emotions & Biases",
      concepts: [
        {
          id: "fear-greed",
          name: "Fear & Greed Cycle",
          emotion: "primary",
          description: "Dua emosi utama yang mengontrol market dan trader psychology",
          symptoms: ["FOMO saat harga naik", "Panic selling saat crash", "Holding losers too long"],
          solutions: ["Stick to trading plan", "Set alerts instead of watching charts", "Use position sizing"],
          example: "Bitcoin ATH: Greed dominates → Buy high. Crash: Fear dominates → Sell low"
        },
        {
          id: "confirmation-bias",
          name: "Confirmation Bias",
          emotion: "cognitive",
          description: "Kecenderungan mencari informasi yang mendukung posisi kita",
          symptoms: ["Ignoring negative news", "Cherry picking analysis", "Overconfidence in trades"],
          solutions: ["Seek contrary opinions", "Use devil's advocate approach", "Regular strategy review"],
          example: "Long BTC → Only read bullish news, ignore bearish technicals"
        }
      ]
    },
    2: {
      title: "Discipline & Patience",
      concepts: [
        {
          id: "overtrading",
          name: "Overtrading",
          emotion: "behavioral",
          description: "Trading terlalu sering karena addiction atau revenge trading",
          symptoms: ["Trading every signal", "Ignoring risk management", "Revenge after losses"],
          solutions: ["Set daily trade limits", "Take mandatory breaks", "Focus on quality over quantity"],
          example: "After 3 losses → Increase position size to recover = Overtrading"
        },
        {
          id: "patience",
          name: "Patience & Waiting",
          emotion: "discipline",
          description: "Kemampuan menunggu setup terbaik tanpa FOMO",
          symptoms: ["Entering poor setups", "Exiting winners too early", "Can't wait for confirmations"],
          solutions: ["Create setup checklist", "Use alerts for levels", "Practice meditation"],
          example: "Wait for RSI oversold + support bounce vs entering any dip"
        }
      ]
    },
    3: {
      title: "Advanced Psychology",
      concepts: [
        {
          id: "loss-aversion",
          name: "Loss Aversion",
          emotion: "cognitive",
          description: "Tendency to feel losses 2x stronger than equivalent gains",
          symptoms: ["Holding losers", "Taking profits too early", "Avoiding necessary losses"],
          solutions: ["Pre-plan exit points", "Focus on RR ratio", "View losses as business cost"],
          example: "$100 loss feels worse than $100 gain feels good"
        },
        {
          id: "sunk-cost-fallacy",
          name: "Sunk Cost Fallacy",
          emotion: "cognitive",
          description: "Continuing bad trades because of money already invested",
          symptoms: ["Adding to losers", "Refusing to take stop loss", "Averaging down"],
          solutions: ["Treat each decision independently", "Set hard stop losses", "Review what went wrong"],
          example: "Down 20% → 'I can't sell now' → Down 50%"
        }
      ]
    },
    4: {
      title: "Master Trader Mindset",
      concepts: [
        {
          id: "probabilistic-thinking",
          name: "Probabilistic Thinking",
          emotion: "advanced",
          description: "Understanding trading as probability game, not certainty",
          symptoms: ["Expecting 100% win rate", "Getting angry at losses", "Not planning for failures"],
          solutions: ["Think in probabilities", "Accept uncertainty", "Focus on process over outcome"],
          example: "70% win rate strategy still has 30% losses - that's normal"
        },
        {
          id: "emotional-detachment",
          name: "Emotional Detachment",
          emotion: "mastery",
          description: "Trading without emotional attachment to money or outcomes",
          symptoms: ["Stress during trades", "Sleepless nights", "Mood swings with P&L"],
          solutions: ["Proper position sizing", "View money as numbers", "Separate identity from results"],
          example: "Professional traders treat $10k loss same as $100 loss emotionally"
        }
      ]
    }
  };

  const emotionColors = {
    primary: 'bg-red-500/20 text-red-400 border-red-500/50',
    cognitive: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    behavioral: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    discipline: 'bg-green-500/20 text-green-400 border-green-500/50',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    mastery: 'bg-gradient-to-r from-purple-500/20 to-gold-500/20 text-amber-400 border-amber-500/50'
  };

  const getLevelData = (level: number) => {
    return psychologyLevels[level as keyof typeof psychologyLevels] || { title: "Master Psychology", concepts: [] };
  };

  const handleConceptComplete = (conceptId: string) => {
    const lessonId = `psychology-${conceptId}`;
    if (!completedLessons.includes(lessonId)) {
      onLessonComplete(lessonId);
    }
  };

  // Psychology assessment
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});

  const psychologyQuestions = [
    {
      id: "fomo",
      question: "How often do you enter trades due to FOMO?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      id: "stop-loss",
      question: "Do you always stick to your predetermined stop loss?",
      answers: ["Always", "Usually", "Sometimes", "Rarely", "Never"]
    },
    {
      id: "profit-taking",
      question: "Do you take profits according to plan?",
      answers: ["Always", "Usually", "Sometimes", "Rarely", "Never"]
    },
    {
      id: "revenge-trading",
      question: "How often do you revenge trade after losses?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    }
  ];

  const calculatePsychologyScore = () => {
    const scores = Object.values(assessmentAnswers);
    if (scores.length === 0) return 0;
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round((average / 5) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Psychology Assessment */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Trading Psychology Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {psychologyQuestions.map((question) => (
              <div key={question.id} className="space-y-2">
                <p className="text-gray-300 text-sm font-medium">{question.question}</p>
                <div className="flex flex-wrap gap-2">
                  {question.answers.map((answer, index) => (
                    <Button
                      key={index}
                      variant={assessmentAnswers[question.id] === index + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAssessmentAnswers(prev => ({...prev, [question.id]: index + 1}))}
                      className={`${
                        assessmentAnswers[question.id] === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300'
                      }`}
                    >
                      {answer}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            
            {Object.keys(assessmentAnswers).length === psychologyQuestions.length && (
              <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-300 font-medium">Psychology Score:</span>
                  <span className="text-2xl font-bold text-blue-400">{calculatePsychologyScore()}%</span>
                </div>
                <Progress value={calculatePsychologyScore()} className="h-3" />
                <p className="text-blue-200 text-sm mt-2">
                  {calculatePsychologyScore() >= 80 ? "Excellent psychological control!" :
                   calculatePsychologyScore() >= 60 ? "Good, but room for improvement" :
                   "Focus on psychological training needed"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Level Selection */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map((level) => {
          const levelData = getLevelData(level);
          const hasContent = levelData.concepts.length > 0;
          const isActive = currentLevel === level;
          
          return (
            <Button
              key={level}
              variant={isActive ? "default" : "outline"}
              size="sm"
              disabled={false} // All levels are now accessible
              onClick={() => onLevelUp(level)}
              className={`${
                isActive 
                  ? 'bg-cyan-600 text-white' 
                  : hasContent 
                    ? 'bg-gray-700 border-gray-600 text-gray-300' 
                    : 'bg-gray-800 border-gray-700 text-gray-500'
              }`}
            >
              <Brain className="w-4 h-4 mr-1" />
              Level {level}
            </Button>
          );
        })}
      </div>

      {/* Current Level Content */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          {getLevelData(currentLevel).title}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {getLevelData(currentLevel).concepts.map((concept) => {
            const isCompleted = completedLessons.includes(`psychology-${concept.id}`);
            
            return (
              <Card 
                key={concept.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedEmotion === concept.id
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-cyan-400/20'
                    : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                } ${isCompleted ? 'ring-2 ring-green-500/50' : ''}`}
                onClick={() => setSelectedEmotion(concept.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-cyan-300 flex items-center gap-2">
                        {concept.name}
                        {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </CardTitle>
                      <Badge className={`text-xs ${emotionColors[concept.emotion as keyof typeof emotionColors]} mt-2`}>
                        {concept.emotion}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-300 text-sm">{concept.description}</p>
                  
                  <div>
                    <h4 className="text-red-300 font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Warning Signs:
                    </h4>
                    <ul className="space-y-1">
                      {concept.symptoms.map((symptom, index) => (
                        <li key={index} className="text-red-200 text-sm flex items-start gap-2">
                          <TrendingDown className="w-3 h-3 mt-1 text-red-400" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-green-300 font-medium text-sm mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Solutions:
                    </h4>
                    <ul className="space-y-1">
                      {concept.solutions.map((solution, index) => (
                        <li key={index} className="text-green-200 text-sm flex items-start gap-2">
                          <TrendingUp className="w-3 h-3 mt-1 text-green-400" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                    <h4 className="text-blue-300 font-medium text-sm mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Real Example:
                    </h4>
                    <p className="text-blue-200 text-sm">{concept.example}</p>
                  </div>
                  
                  {!isCompleted && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConceptComplete(concept.id);
                      }}
                      className="w-full bg-green-600 hover:bg-green-500 mt-4"
                    >
                      Mark as Mastered
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Mental Health Tips */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Trading Mental Health Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Take regular breaks from charts
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Exercise daily to reduce stress
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Maintain work-life balance
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Practice meditation or mindfulness
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Keep a trading journal
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Connect with other traders
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Seek help when overwhelmed
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Celebrate small wins
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};