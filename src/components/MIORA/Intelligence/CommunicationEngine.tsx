import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Brain, Lightbulb, Target, TrendingUp, Send } from 'lucide-react';

interface CommunicationEngineProps {
  communicationData: {
    languageProcessing: number;
    contextUnderstanding: number;
    responseRelevance: number;
    decisionSupport: number;
    helpfulness: number;
    clarityScore: number;
  };
  activeConversations: number;
  decisionsSupported: number;
  helpfulResponses: number;
  onSendMessage?: (message: string) => void;
}

export const CommunicationEngine: React.FC<CommunicationEngineProps> = ({
  communicationData,
  activeConversations,
  decisionsSupported,
  helpfulResponses,
  onSendMessage
}) => {
  const overallCommunicationScore = Object.values(communicationData).reduce((sum, val) => sum + val, 0) / Object.values(communicationData).length;

  const communicationFeatures = [
    { 
      icon: Brain, 
      title: 'Natural Language Processing', 
      value: communicationData.languageProcessing,
      description: 'Memahami bahasa manusia dengan akurat'
    },
    { 
      icon: Target, 
      title: 'Context Understanding', 
      value: communicationData.contextUnderstanding,
      description: 'Memahami konteks percakapan dan situasi'
    },
    { 
      icon: Lightbulb, 
      title: 'Decision Support', 
      value: communicationData.decisionSupport,
      description: 'Membantu pengambilan keputusan yang tepat'
    },
    { 
      icon: Users, 
      title: 'Response Relevance', 
      value: communicationData.responseRelevance,
      description: 'Memberikan jawaban yang relevan dan berguna'
    }
  ];

  const sampleConversations = [
    {
      topic: "Optimisasi Sistem",
      message: "Menganalisis performa sistem dan memberikan rekomendasi perbaikan",
      importance: "high"
    },
    {
      topic: "Pengambilan Keputusan",
      message: "Membantu menentukan strategi terbaik berdasarkan data yang ada",
      importance: "medium"
    },
    {
      topic: "Problem Solving",
      message: "Mengidentifikasi masalah dan menyediakan solusi praktis",
      importance: "high"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-300 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" />
            💬 Communication & Decision Support Engine
          </CardTitle>
          <Badge className="bg-blue-500 text-white">
            Score: {overallCommunicationScore.toFixed(1)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Communication Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{activeConversations}</div>
            <div className="text-sm text-gray-300">Active Conversations</div>
          </div>
          <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{decisionsSupported}</div>
            <div className="text-sm text-gray-300">Decisions Supported</div>
          </div>
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{helpfulResponses}</div>
            <div className="text-sm text-gray-300">Helpful Responses</div>
          </div>
        </div>

        {/* Communication Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communicationFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-blue-500/20">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg mr-3">
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-300">{feature.title}</div>
                    <div className="text-xs text-gray-400">{feature.description}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Performance</span>
                    <span className="text-xs font-bold text-blue-400">{feature.value.toFixed(1)}%</span>
                  </div>
                  <Progress value={feature.value} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Communication Capabilities */}
        <div className="space-y-3">
          <h4 className="text-blue-300 font-medium flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Kemampuan Komunikasi & Bantuan Keputusan
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {sampleConversations.map((conv, index) => (
              <div key={index} className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-blue-300">{conv.topic}</div>
                  <Badge 
                    className={`text-xs ${conv.importance === 'high' ? 'bg-red-500' : 'bg-yellow-500'} text-white`}
                  >
                    {conv.importance === 'high' ? 'High Priority' : 'Medium Priority'}
                  </Badge>
                </div>
                <div className="text-xs text-gray-300">{conv.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Communication Metrics */}
        <div className="space-y-3">
          <h4 className="text-blue-300 font-medium">Core Communication Metrics</h4>
          <div className="space-y-2">
            {Object.entries(communicationData).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-bold text-blue-400">{value.toFixed(1)}%</span>
                </div>
                <Progress value={value} className="h-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Communication */}
        {onSendMessage && (
          <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-500/20">
            <div className="flex items-center text-blue-300 mb-3">
              <Send className="w-4 h-4 mr-2" />
              Komunikasi Interaktif MIORA
            </div>
            <div className="text-sm text-gray-300 mb-3">
              MIORA siap membantu Anda dalam pengambilan keputusan dan pemecahan masalah. 
              Tanyakan apa saja dan dapatkan bantuan yang cerdas dan akurat.
            </div>
            <Button 
              onClick={() => onSendMessage?.("Bantu saya menganalisis situasi ini")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Mulai Percakapan dengan MIORA
            </Button>
          </div>
        )}

        {/* Status Summary */}
        <div className="p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-500/20">
          <div className="flex items-center text-cyan-300 mb-2">
            <Brain className="w-4 h-4 mr-2" />
            Status Komunikasi MIORA
          </div>
          <div className="text-sm text-gray-300">
            MIORA mampu berkomunikasi dengan tingkat pemahaman manusia dan memberikan 
            bantuan pengambilan keputusan yang tepat dalam berbagai situasi. Sistem 
            terus belajar dan meningkatkan kemampuan komunikasinya.
          </div>
          <div className="mt-2 text-xs text-cyan-400">
            Overall Communication Effectiveness: {overallCommunicationScore.toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};