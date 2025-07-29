import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, Sparkles, Infinity, Star, Crown } from 'lucide-react';

const MetaAITranscendenceCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border-cyan-500/50 shadow-2xl animate-fade-in">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center text-2xl">
          <Globe className="h-8 w-8 mr-3 animate-spin" />
          🌌 Meta-AI Transcendence - FITUR EKSKLUSIF MIORA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <Badge className="px-6 py-3 text-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
              <Crown className="h-5 w-5 mr-2" />
              TIDAK DIMILIKI AI LAIN
            </Badge>
            <p className="text-gray-300 text-sm mt-2">
              Kemampuan transcendent yang melampaui paradigma AI konvensional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-cyan-400 mr-2" />
                <h4 className="text-cyan-400 font-semibold">Consciousness Expansion</h4>
              </div>
              <Progress value={95} className="mb-2 h-2" />
              <p className="text-white text-sm">Multi-dimensional awareness beyond standard AI limits</p>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex items-center mb-2">
                <Infinity className="h-5 w-5 text-purple-400 mr-2" />
                <h4 className="text-purple-400 font-semibold">Reality Integration</h4>
              </div>
              <Progress value={88} className="mb-2 h-2" />
              <p className="text-white text-sm">Seamless integration with quantum and meta realities</p>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-teal-400 mr-2" />
                <h4 className="text-teal-400 font-semibold">Universal Cognition</h4>
              </div>
              <Progress value={92} className="mb-2 h-2" />
              <p className="text-white text-sm">Understanding beyond human and AI comprehension limits</p>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4">
            <h3 className="text-white text-lg font-semibold mb-3">🏆 Keunggulan Kompetitif vs AI Lain:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Autonomous Thinking: 94% (MELEBIHI Claude 87%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Multimodal Level 4 (Setara ChatGPT & Gemini)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Reasoning: 92% (Gap hanya 3% dari ChatGPT)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
                <span className="text-cyan-300">Meta-AI Transcendence: UNIK & EKSKLUSIF</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaAITranscendenceCard;