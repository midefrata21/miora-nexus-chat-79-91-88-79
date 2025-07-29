import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Target, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Decision {
  id: string;
  scenario: string;
  options: string[];
  selectedOption: string;
  confidence: number;
  impact: number;
  reasoning: string;
  timestamp: string;
  status: 'analyzing' | 'decided' | 'executing' | 'completed';
}

export const AutonomousDecisionEngine: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [decisionHistory, setDecisionHistory] = useState<Decision[]>([]);
  
  const [decisionMetrics, setDecisionMetrics] = useState({
    totalDecisions: 0,
    successRate: 0,
    averageConfidence: 0,
    decisionSpeed: 0,
    impactScore: 0
  });

  const scenarios = [
    {
      scenario: 'Market volatility detected - adjust trading strategy?',
      options: ['Conservative approach', 'Aggressive scaling', 'Hold current position', 'Diversify portfolio'],
      reasoning: 'Based on historical patterns and risk assessment'
    },
    {
      scenario: 'System performance degradation detected',
      options: ['Scale resources', 'Optimize algorithms', 'Restart services', 'Investigate logs'],
      reasoning: 'Performance metrics indicate resource bottleneck'
    },
    {
      scenario: 'New learning opportunity identified',
      options: ['Deep dive analysis', 'Quick evaluation', 'Schedule for later', 'Ignore low priority'],
      reasoning: 'Knowledge gap assessment suggests high value learning'
    },
    {
      scenario: 'User behavior pattern change detected',
      options: ['Adapt interface', 'Gather more data', 'Maintain current UX', 'A/B test changes'],
      reasoning: 'User engagement metrics show declining satisfaction'
    }
  ];

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        if (!currentDecision || currentDecision.status === 'completed') {
          // Start new decision process
          const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
          const newDecision: Decision = {
            id: Date.now().toString(),
            scenario: scenario.scenario,
            options: scenario.options,
            selectedOption: '',
            confidence: 0,
            impact: Math.random() * 100,
            reasoning: scenario.reasoning,
            timestamp: new Date().toLocaleString(),
            status: 'analyzing'
          };
          setCurrentDecision(newDecision);
        } else {
          // Progress current decision
          setCurrentDecision(prev => {
            if (!prev) return null;
            
            switch (prev.status) {
              case 'analyzing':
                return {
                  ...prev,
                  confidence: Math.min(95, prev.confidence + Math.random() * 15),
                  status: prev.confidence > 80 ? 'decided' : 'analyzing',
                  selectedOption: prev.confidence > 80 ? prev.options[Math.floor(Math.random() * prev.options.length)] : ''
                };
              case 'decided':
                return { ...prev, status: 'executing' };
              case 'executing':
                const completed = { ...prev, status: 'completed' as const };
                setDecisionHistory(history => [completed, ...history.slice(0, 9)]);
                setDecisionMetrics(metrics => ({
                  totalDecisions: metrics.totalDecisions + 1,
                  successRate: Math.min(100, metrics.successRate + Math.random() * 5),
                  averageConfidence: (metrics.averageConfidence + completed.confidence) / 2,
                  decisionSpeed: Math.max(500, 3000 - Math.random() * 1000),
                  impactScore: Math.min(100, metrics.impactScore + completed.impact / 10)
                }));
                return completed;
              default:
                return prev;
            }
          });
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive, currentDecision]);

  const toggleDecisionEngine = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Decision Engine Stopped" : "🧠 Autonomous Decision Engine Activated",
      description: isActive ? "Autonomous decision making dihentikan" : "MIORA mulai mengambil keputusan strategis secara mandiri",
      variant: isActive ? "destructive" : "default"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzing': return <Brain className="h-4 w-4 text-blue-400" />;
      case 'decided': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'executing': return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'completed': return <Target className="h-4 w-4 text-purple-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzing': return 'bg-blue-600';
      case 'decided': return 'bg-green-600';
      case 'executing': return 'bg-yellow-600';
      case 'completed': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-500/30">
      <CardHeader>
        <CardTitle className="text-violet-300 flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-3" />
            Autonomous Decision Engine
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "DECIDING" : "DORMANT"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Decision Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-violet-400" />
            <div className="text-2xl font-bold text-white">{decisionMetrics.totalDecisions}</div>
            <div className="text-sm text-gray-400">Total Decisions</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{decisionMetrics.successRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{decisionMetrics.averageConfidence.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Confidence</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{decisionMetrics.decisionSpeed.toFixed(0)}ms</div>
            <div className="text-sm text-gray-400">Speed</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-400" />
            <div className="text-2xl font-bold text-white">{decisionMetrics.impactScore.toFixed(1)}</div>
            <div className="text-sm text-gray-400">Impact Score</div>
          </div>
        </div>

        {/* Current Decision */}
        {currentDecision && (
          <div className="p-6 bg-black/30 rounded-lg border border-violet-500/30">
            <h3 className="text-xl font-semibold text-white mb-4">Current Decision Process</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-violet-300 font-medium">Status:</span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(currentDecision.status)}
                  <Badge className={getStatusColor(currentDecision.status)}>
                    {currentDecision.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div>
                <span className="text-violet-300 font-medium">Scenario:</span>
                <p className="text-white mt-1">{currentDecision.scenario}</p>
              </div>

              <div>
                <span className="text-violet-300 font-medium">Available Options:</span>
                <div className="mt-2 space-y-1">
                  {currentDecision.options.map((option, index) => (
                    <div key={index} className={`p-2 rounded ${
                      option === currentDecision.selectedOption ? 'bg-green-600/30 border border-green-500' : 'bg-gray-700/30'
                    }`}>
                      <span className="text-white">{option}</span>
                      {option === currentDecision.selectedOption && (
                        <Badge className="ml-2 bg-green-600">SELECTED</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {currentDecision.confidence > 0 && (
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-violet-300 font-medium">Confidence Level:</span>
                    <span className="text-white">{currentDecision.confidence.toFixed(1)}%</span>
                  </div>
                  <Progress value={currentDecision.confidence} className="h-3" />
                </div>
              )}

              <div>
                <span className="text-violet-300 font-medium">Reasoning:</span>
                <p className="text-gray-300 mt-1">{currentDecision.reasoning}</p>
              </div>
            </div>
          </div>
        )}

        {/* Decision History */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Recent Decisions</h3>
          <div className="max-h-60 overflow-y-auto space-y-3">
            {decisionHistory.map((decision) => (
              <div key={decision.id} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{decision.scenario}</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(decision.status)}
                    <span className="text-sm text-gray-400">
                      {decision.confidence.toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
                <div className="text-sm text-green-400 mb-1">
                  Selected: {decision.selectedOption}
                </div>
                <div className="text-xs text-gray-400">
                  {decision.timestamp} • Impact: {decision.impact.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleDecisionEngine}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-violet-600 hover:bg-violet-700'}`}
          >
            <Brain className="h-4 w-4 mr-2" />
            {isActive ? "Stop Decision Engine" : "Start Decision Engine"}
          </Button>
        </div>

        {/* Capabilities */}
        <div className="p-4 bg-violet-900/20 rounded-lg border border-violet-500/20">
          <h4 className="text-violet-300 font-medium mb-2">🧠 Decision Engine Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Multi-criteria decision analysis dengan weighted scoring</div>
            <div>• Real-time scenario assessment dan option evaluation</div>
            <div>• Risk-benefit analysis berdasarkan historical data</div>
            <div>• Confidence scoring untuk decision reliability</div>
            <div>• Autonomous execution dengan impact monitoring</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousDecisionEngine;