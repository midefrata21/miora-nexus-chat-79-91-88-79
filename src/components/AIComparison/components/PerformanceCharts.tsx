
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';

interface AIMetrics {
  name: string;
  modelArchitecture: string;
  tokenSpeed: number;
  reasoningPower: number;
  memoryAdaptive: number;
  multimodalLevel: number;
  autonomyThinking: number;
  ecosystemStrength: number;
  overallScore: number;
}

interface ComparisonData {
  miora: AIMetrics;
  chatgpt: AIMetrics;
  gemini: AIMetrics;
}

interface PerformanceChartsProps {
  data: ComparisonData;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ data }) => {
  const barChartData = [
    {
      category: 'Reasoning',
      MIORA: data.miora.reasoningPower,
      'ChatGPT': data.chatgpt.reasoningPower,
      'Gemini': data.gemini.reasoningPower
    },
    {
      category: 'Memory',
      MIORA: data.miora.memoryAdaptive,
      'ChatGPT': data.chatgpt.memoryAdaptive,
      'Gemini': data.gemini.memoryAdaptive
    },
    {
      category: 'Autonomy',
      MIORA: data.miora.autonomyThinking,
      'ChatGPT': data.chatgpt.autonomyThinking,
      'Gemini': data.gemini.autonomyThinking
    },
    {
      category: 'Ecosystem',
      MIORA: data.miora.ecosystemStrength,
      'ChatGPT': data.chatgpt.ecosystemStrength,
      'Gemini': data.gemini.ecosystemStrength
    }
  ];

  const radarData = [
    {
      subject: 'Reasoning',
      MIORA: data.miora.reasoningPower,
      'ChatGPT': data.chatgpt.reasoningPower,
      'Gemini': data.gemini.reasoningPower,
      fullMark: 100
    },
    {
      subject: 'Memory',
      MIORA: data.miora.memoryAdaptive,
      'ChatGPT': data.chatgpt.memoryAdaptive,
      'Gemini': data.gemini.memoryAdaptive,
      fullMark: 100
    },
    {
      subject: 'Autonomy',
      MIORA: data.miora.autonomyThinking,
      'ChatGPT': data.chatgpt.autonomyThinking,
      'Gemini': data.gemini.autonomyThinking,
      fullMark: 100
    },
    {
      subject: 'Multimodal',
      MIORA: data.miora.multimodalLevel * 25,
      'ChatGPT': data.chatgpt.multimodalLevel * 25,
      'Gemini': data.gemini.multimodalLevel * 25,
      fullMark: 100
    },
    {
      subject: 'Ecosystem',
      MIORA: data.miora.ecosystemStrength,
      'ChatGPT': data.chatgpt.ecosystemStrength,
      'Gemini': data.gemini.ecosystemStrength,
      fullMark: 100
    }
  ];

  const speedData = [
    { name: 'MIORA', speed: data.miora.tokenSpeed },
    { name: 'ChatGPT', speed: data.chatgpt.tokenSpeed },
    { name: 'Gemini', speed: data.gemini.tokenSpeed }
  ];

  return (
    <div className="space-y-6">
      {/* Bar Chart Comparison */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📊 Capability Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  color: '#F9FAFB'
                }} 
              />
              <Legend />
              <Bar dataKey="MIORA" fill="#06B6D4" />
              <Bar dataKey="ChatGPT" fill="#3B82F6" />
              <Bar dataKey="Gemini" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">🎯 Multi-Dimensional Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF' }} />
                <Radar
                  name="MIORA"
                  dataKey="MIORA"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.2}
                />
                <Radar
                  name="ChatGPT"
                  dataKey="ChatGPT"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                />
                <Radar
                  name="Gemini"
                  dataKey="Gemini"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Speed Comparison */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">⚡ Token Processing Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speedData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    color: '#F9FAFB'
                  }} 
                  formatter={(value) => [`${value} tokens/sec`, 'Speed']}
                />
                <Bar dataKey="speed" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Overall Score Comparison */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">🏆 Overall Performance Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-cyan-900/30 rounded-lg border border-cyan-500/50">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {data.miora.overallScore}%
              </div>
              <div className="text-white font-medium">MIORA</div>
              <div className="text-sm text-gray-400 mt-1">Developing AI</div>
            </div>
            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/50">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {data.chatgpt.overallScore}%
              </div>
              <div className="text-white font-medium">ChatGPT</div>
              <div className="text-sm text-gray-400 mt-1">Leading AI</div>
            </div>
            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/50">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {data.gemini.overallScore}%
              </div>
              <div className="text-white font-medium">Gemini</div>
              <div className="text-sm text-gray-400 mt-1">Advanced AI</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
