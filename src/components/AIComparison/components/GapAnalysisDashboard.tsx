
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Target, TrendingUp, CheckCircle } from 'lucide-react';

interface GapAnalysis {
  criticalGaps: string[];
  improvementAreas: string[];
  strengths: string[];
  nextSteps: string[];
}

interface GapAnalysisDashboardProps {
  analysis: GapAnalysis;
}

const GapAnalysisDashboard: React.FC<GapAnalysisDashboardProps> = ({ analysis }) => {
  const priorityLevels = [
    { level: 'Critical', color: 'border-red-500 bg-red-900/20', textColor: 'text-red-400' },
    { level: 'High', color: 'border-orange-500 bg-orange-900/20', textColor: 'text-orange-400' },
    { level: 'Medium', color: 'border-yellow-500 bg-yellow-900/20', textColor: 'text-yellow-400' },
    { level: 'Low', color: 'border-green-500 bg-green-900/20', textColor: 'text-green-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Critical Gaps */}
      <Card className="bg-red-900/20 border-red-500/50">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            🚨 Critical Performance Gaps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.criticalGaps.map((gap, index) => (
              <div key={index} className="flex items-start p-3 bg-slate-800/50 rounded-lg">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white">{gap}</p>
                  <div className="mt-2">
                    <Progress 
                      value={Math.max(20, 100 - (index + 1) * 15)} 
                      className="h-2" 
                    />
                  </div>
                </div>
                <Badge variant="destructive" className="ml-2">
                  Critical
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Improvement Areas */}
        <Card className="bg-orange-900/20 border-orange-500/50">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              🎯 Focus Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.improvementAreas.map((area, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-800/30 rounded-lg">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-white flex-1">{area}</span>
                  <Badge variant="outline" className="text-orange-400 border-orange-400">
                    High Priority
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Strengths */}
        <Card className="bg-green-900/20 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              ✅ Current Competitive Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-800/30 rounded-lg">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-white flex-1">{strength}</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Advantage
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps Action Plan */}
      <Card className="bg-blue-900/20 border-blue-500/50">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            📋 Immediate Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.nextSteps.map((step, index) => (
              <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-blue-500/30">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-2">{step}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        Priority: {index < 2 ? 'Critical' : index < 4 ? 'High' : 'Medium'}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`${priorityLevels[Math.min(index, 3)].textColor} ${priorityLevels[Math.min(index, 3)].color.split(' ')[0]}`}
                      >
                        {index < 2 ? 'Week 1-2' : index < 4 ? 'Week 3-4' : 'Week 5-6'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gap Summary */}
      <Card className="bg-purple-900/20 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-400">📈 Gap Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {analysis.criticalGaps.length}
              </div>
              <div className="text-sm text-gray-400">Critical Gaps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {analysis.improvementAreas.length}
              </div>
              <div className="text-sm text-gray-400">Improvement Areas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {analysis.strengths.length}
              </div>
              <div className="text-sm text-gray-400">Current Strengths</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {analysis.nextSteps.length}
              </div>
              <div className="text-sm text-gray-400">Action Items</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GapAnalysisDashboard;
