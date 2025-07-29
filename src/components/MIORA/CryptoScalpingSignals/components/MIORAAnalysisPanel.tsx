import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Activity,
  DollarSign,
  Clock,
  Zap,
  Eye
} from 'lucide-react';
import { MIORAScalpingAnalysis, MIORADepthLevel } from '../types/enhanced';

interface MIORAAnalysisPanelProps {
  analysis: MIORAScalpingAnalysis;
  onExecuteSignal?: () => void;
}

const MIORAAnalysisPanel: React.FC<MIORAAnalysisPanelProps> = ({ 
  analysis, 
  onExecuteSignal 
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 80) return 'bg-yellow-500';
    if (confidence >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRecommendationColor = (rec: string) => {
    if (rec.includes('STRONG_BUY')) return 'bg-green-600 text-white';
    if (rec.includes('BUY')) return 'bg-green-500 text-white';
    if (rec.includes('HOLD')) return 'bg-yellow-500 text-black';
    if (rec.includes('SELL')) return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-orange-400';
      case 'EXTREME': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Analysis */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  MIORA Analysis - {analysis.pair}
                  <Badge className={getRecommendationColor(analysis.overallRecommendation)}>
                    {analysis.overallRecommendation}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  5-Level Deep Analysis • Generated {new Date(analysis.timestamp).toLocaleTimeString()}
                </CardDescription>
              </div>
            </div>
            {onExecuteSignal && (
              <Button 
                onClick={onExecuteSignal}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={analysis.overallConfidence < 70}
              >
                <Zap className="w-4 h-4 mr-2" />
                Execute Signal
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {analysis.overallConfidence.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-400">Overall Confidence</p>
              <Progress 
                value={analysis.overallConfidence} 
                className="mt-2"
              />
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getRiskColor(analysis.riskLevel)}`}>
                {analysis.riskLevel}
              </div>
              <p className="text-sm text-gray-400">Risk Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                +{analysis.profitPotential.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-400">Profit Potential</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                -{analysis.maxDrawdown.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-400">Max Drawdown</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Levels */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            5-Level Depth Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.levels.map((level, index) => (
              <div key={level.level} className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      Level {level.level}
                    </Badge>
                    <h3 className="text-white font-semibold">{level.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getConfidenceColor(level.confidence)}`} />
                    <span className="text-white font-bold">{level.confidence.toFixed(1)}%</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{level.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Indicators Used:</h4>
                    <div className="flex flex-wrap gap-1">
                      {level.indicators.map((indicator, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {indicator}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Action Points:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {level.actionPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-gray-700/50 rounded">
                  <p className="text-white font-medium text-sm">{level.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Report */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Detailed Report & Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Executive Summary</TabsTrigger>
              <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              <TabsTrigger value="action">Action Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {analysis.detailedReport.executiveSummary}
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Price Action</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">{analysis.detailedReport.technicalAnalysis.priceAction}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Volume Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">{analysis.detailedReport.technicalAnalysis.volumeAnalysis}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Support & Resistance Levels</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {analysis.detailedReport.technicalAnalysis.supportResistance.key_levels.map((level, idx) => (
                    <Badge key={idx} variant="outline" className="justify-center">
                      ${level.toFixed(level > 1000 ? 0 : 6)}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk/Reward Ratio:</span>
                    <span className="text-white font-bold">1:{analysis.detailedReport.riskAssessment.riskRewardRatio.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volatility:</span>
                    <span className="text-white">{analysis.detailedReport.riskAssessment.volatility.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Position Sizing:</span>
                    <span className="text-white">{analysis.detailedReport.riskAssessment.positionSizing}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Risk Factors:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Market Risk: {analysis.detailedReport.riskAssessment.marketRisk}</li>
                    <li>• Technical Risk: {analysis.detailedReport.riskAssessment.technicalRisk}</li>
                    <li>• Liquidity Risk: {analysis.detailedReport.riskAssessment.liquidityRisk}</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="action" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-900/20 border-green-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 text-sm flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Immediate Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {analysis.detailedReport.actionPlan.immediate.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-900/20 border-yellow-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Short Term
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {analysis.detailedReport.actionPlan.shortTerm.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Activity className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-red-900/20 border-red-700">
                <CardHeader>
                  <CardTitle className="text-red-400 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Contingency Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {analysis.detailedReport.actionPlan.contingency.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Shield className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Exit Strategy */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Exit Strategy & Profit Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.detailedReport.exitStrategy.profitTargets.map((target, idx) => (
              <Card key={idx} className="bg-green-900/20 border-green-700">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">
                      TP{target.level}
                    </div>
                    <div className="text-xl font-bold text-white">
                      ${target.price.toFixed(target.price > 1000 ? 0 : 6)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {target.percentage}% of position
                    </div>
                    <p className="text-xs text-gray-300 mt-2">
                      {target.reasoning}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-red-900/20 border-red-700">
              <CardHeader>
                <CardTitle className="text-red-400 text-sm">Stop Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-white">
                  ${analysis.detailedReport.exitStrategy.stopLoss.price.toFixed(analysis.detailedReport.exitStrategy.stopLoss.price > 1000 ? 0 : 6)}
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  {analysis.detailedReport.exitStrategy.stopLoss.reasoning}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-900/20 border-blue-700">
              <CardHeader>
                <CardTitle className="text-blue-400 text-sm">Trailing Stop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-white">
                  {analysis.detailedReport.exitStrategy.trailingStop.enabled ? 
                    `${analysis.detailedReport.exitStrategy.trailingStop.percentage}%` : 
                    'Disabled'
                  }
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  {analysis.detailedReport.exitStrategy.trailingStop.reasoning}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAAnalysisPanel;