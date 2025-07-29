
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Clock, Users, ChevronRight, Sparkles, Play, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  type: 'course' | 'skill' | 'project' | 'community';
  estimatedTime: string;
  difficulty: string;
  matchScore: number;
  isStarted?: boolean;
  progress?: number;
}

export const PersonalizedRecommendations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [startedRecommendations, setStartedRecommendations] = useState<Set<string>>(new Set());
  const [loadingStates, setLoadingStates] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const [recommendations] = useState<Recommendation[]>([
    {
      id: 'neural-optimization',
      title: 'Neural Network Optimization Techniques',
      description: 'Advanced methods for optimizing neural network performance and efficiency',
      reason: 'Based on your strong performance in AI Fundamentals and interest in system optimization',
      priority: 'high',
      type: 'course',
      estimatedTime: '4 hours',
      difficulty: 'Advanced',
      matchScore: 95
    },
    {
      id: 'voice-synthesis-project',
      title: 'Build a Custom Voice Synthesis Engine',
      description: 'Hands-on project to create your own text-to-speech system using MIORA',
      reason: 'Perfect next step after completing Voice Processing fundamentals',
      priority: 'high',
      type: 'project',
      estimatedTime: '6 hours',
      difficulty: 'Intermediate',
      matchScore: 92
    },
    {
      id: 'quantum-algorithms',
      title: 'Quantum Algorithm Foundations',
      description: 'Introduction to quantum computing algorithms and their AI applications',
      reason: 'Recommended for learners showing interest in cutting-edge AI research',
      priority: 'medium',
      type: 'course',
      estimatedTime: '8 hours',
      difficulty: 'Expert',
      matchScore: 88
    },
    {
      id: 'ai-community-challenge',
      title: 'Monthly AI Innovation Challenge',
      description: 'Collaborate with other learners on innovative AI solutions',
      reason: 'Great for applying your skills and networking with like-minded developers',
      priority: 'medium',
      type: 'community',
      estimatedTime: '2 weeks',
      difficulty: 'Various',
      matchScore: 85
    },
    {
      id: 'ethical-ai',
      title: 'AI Ethics & Responsible Development',
      description: 'Critical thinking about AI impact and responsible development practices',
      reason: 'Essential knowledge gap identified in your learning profile',
      priority: 'high',
      type: 'skill',
      estimatedTime: '3 hours',
      difficulty: 'Intermediate',
      matchScore: 90
    }
  ]);

  const handleStartLearning = async (recommendation: Recommendation) => {
    const { id, title, type } = recommendation;
    
    // Set loading state
    setLoadingStates(prev => new Set([...prev, id]));
    
    try {
      // Simulate API call or processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark as started
      setStartedRecommendations(prev => new Set([...prev, id]));
      
      // Show success toast
      toast({
        title: "Learning Started! 🚀",
        description: `Started "${title}" - ${type}. Your progress will be tracked automatically.`,
        duration: 4000,
      });
      
      // Simulate progress tracking
      console.log(`Started learning: ${title} (${type})`);
      console.log(`Estimated completion: ${recommendation.estimatedTime}`);
      console.log(`Difficulty level: ${recommendation.difficulty}`);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start learning. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Remove loading state
      setLoadingStates(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'project': return Star;
      case 'skill': return Sparkles;
      case 'community': return Users;
      default: return BookOpen;
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedCategory);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-300">
            <Star className="w-6 h-6 mr-2" />
            Personalized AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Rekomendasi pembelajaran yang dipersonalisasi berdasarkan progress, gaya belajar, dan tujuan karir Anda
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'course', 'project', 'skill', 'community'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-blue-600' : ''}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((rec) => {
          const IconComponent = getTypeIcon(rec.type);
          const isStarted = startedRecommendations.has(rec.id);
          const isLoading = loadingStates.has(rec.id);
          
          return (
            <Card 
              key={rec.id}
              className={`bg-gradient-to-r from-gray-800/50 to-blue-800/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group ${
                isStarted ? 'ring-2 ring-green-500/30' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {rec.title}
                      </h3>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        {rec.matchScore}% match
                      </div>
                      {isStarted && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Started
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-3">{rec.description}</p>
                    
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20 mb-4">
                      <p className="text-sm text-blue-300">
                        <strong>Why recommended:</strong> {rec.reason}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {rec.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {rec.difficulty}
                      </div>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 capitalize">
                        {rec.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    <Button 
                      size="sm" 
                      onClick={() => handleStartLearning(rec)}
                      disabled={isLoading}
                      className={`${
                        isStarted 
                          ? 'bg-green-600 hover:bg-green-500' 
                          : 'bg-blue-600 hover:bg-blue-500'
                      } transition-all duration-300`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Starting...
                        </>
                      ) : isStarted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Continue
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Learning
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
