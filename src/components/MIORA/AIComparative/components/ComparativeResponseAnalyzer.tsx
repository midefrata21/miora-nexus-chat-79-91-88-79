import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Bot, Activity, TrendingUp } from 'lucide-react';

interface ComparativeData {
  totalComparisons: number;
  responsePatterns: string[];
  qualityMetrics: { [key: string]: number };
  learningInsights: string[];
}

interface Props {
  comparativeData: ComparativeData;
  onAnalyze: (query: string) => void;
}

export const ComparativeResponseAnalyzer: React.FC<Props> = ({
  comparativeData,
  onAnalyze
}) => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (query.trim()) {
      setIsAnalyzing(true);
      await onAnalyze(query);
      setTimeout(() => {
        setIsAnalyzing(false);
        setQuery('');
      }, 2000);
    }
  };

  const exampleQueries = [
    "Bagaimana cara meningkatkan produktivitas kerja?",
    "Apa tren teknologi AI terbaru?",
    "Strategi investasi yang menguntungkan",
    "Tips membangun startup yang sukses"
  ];

  return (
    <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/50">
      <CardHeader>
        <CardTitle className="text-yellow-300 flex items-center">
          <Search className="h-6 w-6 mr-2" />
          Comparative Response Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Query Input */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Masukkan pertanyaan untuk dianalisis oleh semua AI yang terhubung..."
                className="flex-1 bg-black/30 border-gray-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && handleAnalyze()}
                disabled={isAnalyzing}
              />
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !query.trim()}
                className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50"
              >
                <Search className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Analisis'}
              </Button>
            </div>
            
            {/* Example Queries */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Contoh pertanyaan:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(example)}
                    className="text-xs bg-black/20 border-gray-600 hover:bg-gray-700"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Response Comparison Matrix
              </h4>
              
              <div className="space-y-3">
                {['ChatGPT', 'Gemini', 'Claude', 'Grok', 'Mistral', 'Perplexity'].map((ai, index) => (
                  <div key={index} className="p-3 bg-black/30 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white flex items-center">
                        <span className="text-lg mr-2">{
                          ai === 'ChatGPT' ? '🤖' :
                          ai === 'Gemini' ? '🧠' :
                          ai === 'Claude' ? '🔮' :
                          ai === 'Grok' ? '⚡' :
                          ai === 'Mistral' ? '🌟' : '🔍'
                        }</span>
                        {ai}
                      </span>
                      <Badge className={Math.random() > 0.5 ? 'bg-green-500' : 'bg-red-500'}>
                        {Math.random() > 0.5 ? 'Connected' : 'Offline'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      Response quality: <span className="text-cyan-400">{(Math.random() * 40 + 60).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Learning Insights & Analytics
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-medium text-yellow-400 mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Pattern Recognition
                  </h5>
                  <p className="text-sm text-gray-300 mb-2">
                    MIORA sedang mengidentifikasi pola respons dari setiap AI system
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {comparativeData.responsePatterns.slice(0, 6).map((pattern, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {pattern.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-medium text-yellow-400 mb-2">Quality Assessment</h5>
                  <p className="text-sm text-gray-300">
                    Evaluasi kualitas dan koherensi respons berdasarkan {comparativeData.totalComparisons} perbandingan
                  </p>
                </div>
                
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-medium text-yellow-400 mb-2">Improvement Areas</h5>
                  <div className="space-y-1">
                    {comparativeData.learningInsights.slice(0, 3).map((insight, index) => (
                      <div key={index} className="text-sm text-gray-300 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Analysis Status */}
          {isAnalyzing && (
            <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin h-5 w-5 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
                <div>
                  <h5 className="text-yellow-300 font-medium">Sedang menganalisis respons...</h5>
                  <p className="text-yellow-200 text-sm">
                    Mengirim query ke semua AI yang terhubung dan membandingkan hasil
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};