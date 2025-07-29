import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  claude: AIMetrics;
  grok: AIMetrics;
  perplexity: AIMetrics;
}

interface ComparisonTableProps {
  data: ComparisonData;
  detailed?: boolean;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data, detailed = false }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSpeedLabel = (speed: number) => {
    if (speed >= 500) return 'Ultra';
    if (speed >= 300) return 'High';
    if (speed >= 150) return 'Medium';
    return 'Basic';
  };

  const getLevelBadge = (level: number) => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'];
    return (
      <Badge className={`${colors[Math.min(level - 1, 4)]} text-white`}>
        Level {level}
      </Badge>
    );
  };

  const aiModels = [
    { key: 'miora', data: data.miora, className: 'text-cyan-400' },
    { key: 'chatgpt', data: data.chatgpt, className: 'text-blue-400' },
    { key: 'gemini', data: data.gemini, className: 'text-purple-400' },
    { key: 'claude', data: data.claude, className: 'text-orange-400' },
    { key: 'grok', data: data.grok, className: 'text-green-400' },
    { key: 'perplexity', data: data.perplexity, className: 'text-pink-400' }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">
          🔍 Quantum AI Comparison Matrix {detailed && '(Detailed)'} - 6 Top AI Models
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-cyan-400">MIORA</TableHead>
                <TableHead className="text-blue-400">ChatGPT</TableHead>
                <TableHead className="text-purple-400">Gemini</TableHead>
                <TableHead className="text-orange-400">Claude</TableHead>
                <TableHead className="text-green-400">Grok</TableHead>
                <TableHead className="text-pink-400">Perplexity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-gray-300 font-medium">Model & Token Speed</TableCell>
                {aiModels.map((model) => (
                  <TableCell key={model.key} className="text-white">
                    <div>{getSpeedLabel(model.data.tokenSpeed)} / {model.data.tokenSpeed} tps</div>
                    {detailed && <div className="text-xs text-gray-400 mt-1">{model.data.modelArchitecture}</div>}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-300 font-medium">Reasoning & Logic</TableCell>
                {aiModels.map((model) => (
                  <TableCell key={model.key}>
                    <div className={`font-bold ${getScoreColor(model.data.reasoningPower)}`}>
                      {model.data.reasoningPower}%
                    </div>
                    {detailed && <Progress value={model.data.reasoningPower} className="mt-2 h-2" />}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-300 font-medium">Memory Adaptive</TableCell>
                {aiModels.map((model) => (
                  <TableCell key={model.key}>
                    <div className={`font-bold ${getScoreColor(model.data.memoryAdaptive)}`}>
                      {model.data.memoryAdaptive}%
                    </div>
                    {detailed && <Progress value={model.data.memoryAdaptive} className="mt-2 h-2" />}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-300 font-medium">Multimodal Capabilities</TableCell>
                {aiModels.map((model) => (
                  <TableCell key={model.key}>{getLevelBadge(model.data.multimodalLevel)}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-300 font-medium">Autonomy Thinking</TableCell>
                {aiModels.map((model) => (
                  <TableCell key={model.key}>
                    <div className={`font-bold ${getScoreColor(model.data.autonomyThinking)}`}>
                      {model.data.autonomyThinking}%
                    </div>
                    {detailed && <Progress value={model.data.autonomyThinking} className="mt-2 h-2" />}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-300 font-medium">Ecosystem Strength</TableCell>
                {aiModels.map((model) => (
                  <TableCell key={model.key}>
                    <Badge variant="outline" className={`${model.className} border-current`}>
                      {model.data.ecosystemStrength}%
                    </Badge>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="border-t-2 border-slate-600">
                <TableCell className="text-gray-300 font-bold text-lg">OVERALL SCORE</TableCell>
                {aiModels.map((model) => (
                  <TableCell key={model.key}>
                    <div className={`text-2xl font-bold ${getScoreColor(model.data.overallScore)}`}>
                      {model.data.overallScore}%
                    </div>
                    {model.key === 'miora' && (
                      <div className="text-xs text-cyan-300 mt-1">♻️ Auto-Evolving</div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {detailed && (
          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
            <h4 className="text-white font-semibold mb-3">🧬 Quantum Learning Matrix Status</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Mirror Learning:</span>
                <span className="text-green-400 ml-2">ACTIVE ∞</span>
              </div>
              <div>
                <span className="text-gray-400">Auto Evolution:</span>
                <span className="text-cyan-400 ml-2">ENABLED ⚡</span>
              </div>
              <div>
                <span className="text-gray-400">Gap Analysis:</span>
                <span className="text-purple-400 ml-2">REAL-TIME 📊</span>
              </div>
              <div>
                <span className="text-gray-400">Benchmark Target:</span>
                <span className="text-yellow-400 ml-2">GPT-4 Level 🎯</span>
              </div>
              <div>
                <span className="text-gray-400">Learning Mode:</span>
                <span className="text-pink-400 ml-2">ADAPTIVE ♻️</span>
              </div>
              <div>
                <span className="text-gray-400">Update Frequency:</span>
                <span className="text-orange-400 ml-2">DAILY 🔄</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonTable;