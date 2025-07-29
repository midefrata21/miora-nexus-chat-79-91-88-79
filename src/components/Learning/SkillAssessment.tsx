
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, CheckCircle, Clock, Trophy, Brain, Zap } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
  progress: number;
  isAssessed: boolean;
  assessmentDate?: Date;
  nextAssessment?: Date;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export const SkillAssessment: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const skills: Skill[] = [
    {
      id: 'neural-networks',
      name: 'Neural Networks',
      category: 'AI Fundamentals',
      level: 7,
      maxLevel: 10,
      progress: 85,
      isAssessed: true,
      assessmentDate: new Date('2024-01-15'),
      nextAssessment: new Date('2024-02-15')
    },
    {
      id: 'voice-processing',
      name: 'Voice Processing',
      category: 'Audio Technology',
      level: 6,
      maxLevel: 10,
      progress: 70,
      isAssessed: true,
      assessmentDate: new Date('2024-01-10'),
      nextAssessment: new Date('2024-02-10')
    },
    {
      id: 'system-architecture',
      name: 'System Architecture',
      category: 'Development',
      level: 8,
      maxLevel: 10,
      progress: 90,
      isAssessed: false
    },
    {
      id: 'quantum-computing',
      name: 'Quantum Computing',
      category: 'Advanced Research',
      level: 3,
      maxLevel: 10,
      progress: 25,
      isAssessed: false
    },
    {
      id: 'machine-learning',
      name: 'Machine Learning',
      category: 'AI Fundamentals',
      level: 8,
      maxLevel: 10,
      progress: 88,
      isAssessed: true,
      assessmentDate: new Date('2024-01-12'),
      nextAssessment: new Date('2024-02-12')
    }
  ];

  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: 'q1',
      question: 'What is the primary function of a neural network activation function?',
      options: [
        'To store network weights',
        'To introduce non-linearity into the network',
        'To calculate the loss function',
        'To normalize input data'
      ],
      correctAnswer: 1,
      difficulty: 'intermediate',
      category: 'neural-networks'
    },
    {
      id: 'q2',
      question: 'Which technique is most effective for preventing overfitting in deep neural networks?',
      options: [
        'Increasing learning rate',
        'Adding more layers',
        'Dropout regularization',
        'Reducing batch size'
      ],
      correctAnswer: 2,
      difficulty: 'advanced',
      category: 'neural-networks'
    }
  ];

  const getLevelColor = (level: number, maxLevel: number) => {
    const percentage = (level / maxLevel) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    if (percentage >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const startAssessment = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsAssessing(true);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment
      completeAssessment(newAnswers);
    }
  };

  const completeAssessment = (finalAnswers: number[]) => {
    // Calculate score
    let correctCount = 0;
    finalAnswers.forEach((answer, index) => {
      if (answer === assessmentQuestions[index].correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / assessmentQuestions.length) * 100;
    
    // Update skill level based on score
    // This would normally update the backend
    
    setTimeout(() => {
      setIsAssessing(false);
      setSelectedSkill(null);
    }, 2000);
  };

  if (isAssessing && selectedSkill) {
    const question = assessmentQuestions[currentQuestion];
    
    return (
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-300">
            <Target className="w-6 h-6 mr-2" />
            Skill Assessment: {selectedSkill.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </div>
            <Progress value={((currentQuestion + 1) / assessmentQuestions.length) * 100} className="h-2" />
          </div>

          <div className="bg-black/30 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto hover:bg-orange-600/20"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="text-sm">{option}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-300">
            <Target className="w-6 h-6 mr-2" />
            Skill Assessment & Certification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Evaluasi kemampuan Anda secara mendalam dan dapatkan sertifikasi untuk setiap skill yang dikuasai
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-gray-400">Skills Certified</div>
            </div>
            <div className="p-4 bg-black/20 rounded-lg text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">Advanced</div>
              <div className="text-sm text-gray-400">Overall Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <Card 
            key={skill.id}
            className="bg-gradient-to-r from-gray-800/50 to-orange-800/20 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-orange-300">{skill.name}</CardTitle>
                  <p className="text-sm text-gray-400">{skill.category}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getLevelColor(skill.level, skill.maxLevel)}`}>
                    {skill.level}/{skill.maxLevel}
                  </div>
                  <div className="text-xs text-gray-400">Level</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mastery Progress</span>
                  <span className="text-orange-300">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {skill.isAssessed ? (
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Assessed
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
                
                <Button
                  size="sm"
                  onClick={() => startAssessment(skill)}
                  className="bg-orange-600 hover:bg-orange-500"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {skill.isAssessed ? 'Re-assess' : 'Start Assessment'}
                </Button>
              </div>

              {skill.isAssessed && skill.nextAssessment && (
                <div className="text-xs text-gray-400">
                  Next assessment: {skill.nextAssessment.toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
