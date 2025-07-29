import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Brain, Zap, Target, Activity, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Decision {
  id: string;
  type: 'infrastructure' | 'development' | 'optimization' | 'security' | 'resource';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  impact: number;
  confidence: number;
  estimatedTime: number;
  status: 'pending' | 'evaluating' | 'executing' | 'completed' | 'failed';
  timestamp: number;
  autoExecute: boolean;
}

interface DecisionCriteria {
  minConfidence: number;
  maxRiskLevel: number;
  autoExecuteThreshold: number;
  priorityWeights: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const AutonomousDecisionEngine: React.FC = () => {
  const { toast } = useToast();
  const [engineActive, setEngineActive] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [executionQueue, setExecutionQueue] = useState<Decision[]>([]);
  const [systemStats, setSystemStats] = useState({
    totalDecisions: 0,
    successfulExecutions: 0,
    pendingDecisions: 0,
    averageConfidence: 0,
    lastDecisionTime: 0
  });

  const [criteria, setCriteria] = useState<DecisionCriteria>({
    minConfidence: 85,
    maxRiskLevel: 30,
    autoExecuteThreshold: 90,
    priorityWeights: {
      critical: 100,
      high: 75,
      medium: 50,
      low: 25
    }
  });

  // Generate autonomous decisions
  const generateDecision = useCallback((): Decision => {
    const types: Decision['type'][] = ['infrastructure', 'development', 'optimization', 'security', 'resource'];
    const priorities: Decision['priority'][] = ['critical', 'high', 'medium', 'low'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%
    const impact = Math.floor(Math.random() * 100) + 1;
    
    const decisionTemplates = {
      infrastructure: [
        'Scale up server capacity based on load patterns',
        'Optimize database queries for better performance',
        'Implement auto-backup for critical data',
        'Deploy load balancer for high availability'
      ],
      development: [
        'Refactor legacy code modules for maintainability',
        'Implement new feature based on user analytics',
        'Update dependencies to latest stable versions',
        'Add automated testing for critical functions'
      ],
      optimization: [
        'Optimize memory usage in core algorithms',
        'Implement caching layer for frequent queries',
        'Compress static assets for faster loading',
        'Optimize API response times'
      ],
      security: [
        'Update security patches and protocols',
        'Implement additional authentication layers',
        'Scan for vulnerabilities and apply fixes',
        'Encrypt sensitive data transmission'
      ],
      resource: [
        'Allocate more CPU resources to high-demand processes',
        'Clean up unused storage and temporary files',
        'Redistribute workload across available nodes',
        'Optimize network bandwidth allocation'
      ]
    };

    const description = decisionTemplates[type][Math.floor(Math.random() * decisionTemplates[type].length)];
    
    return {
      id: `decision_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      priority,
      description,
      impact,
      confidence,
      estimatedTime: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
      status: 'pending',
      timestamp: Date.now(),
      autoExecute: confidence >= criteria.autoExecuteThreshold
    };
  }, [criteria.autoExecuteThreshold]);

  // Evaluate decision based on criteria
  const evaluateDecision = useCallback((decision: Decision): boolean => {
    const riskLevel = 100 - decision.confidence;
    const priorityScore = criteria.priorityWeights[decision.priority];
    
    // Decision evaluation logic
    if (decision.confidence < criteria.minConfidence) return false;
    if (riskLevel > criteria.maxRiskLevel) return false;
    if (decision.priority === 'critical' && decision.confidence >= 80) return true;
    if (priorityScore + decision.confidence >= 120) return true;
    
    return decision.autoExecute;
  }, [criteria]);

  // Execute decision
  const executeDecision = useCallback(async (decision: Decision) => {
    setDecisions(prev => prev.map(d => 
      d.id === decision.id ? { ...d, status: 'executing' } : d
    ));

    toast({
      title: "🧠 Decision Executing",
      description: `Executing: ${decision.description}`,
    });

    // Simulate execution time
    await new Promise(resolve => setTimeout(resolve, decision.estimatedTime * 10)); // Accelerated for demo

    const success = Math.random() > 0.1; // 90% success rate

    setDecisions(prev => prev.map(d => 
      d.id === decision.id ? { 
        ...d, 
        status: success ? 'completed' : 'failed' 
      } : d
    ));

    setSystemStats(prev => ({
      ...prev,
      successfulExecutions: success ? prev.successfulExecutions + 1 : prev.successfulExecutions,
      lastDecisionTime: Date.now()
    }));

    toast({
      title: success ? "✅ Decision Executed" : "❌ Execution Failed",
      description: `${decision.description} - ${success ? 'Success' : 'Failed'}`,
    });
  }, [toast]);

  // Auto decision generation and execution
  useEffect(() => {
    if (!engineActive) return;

    const interval = setInterval(() => {
      // Generate new decisions
      if (Math.random() > 0.7) { // 30% chance every interval
        const newDecision = generateDecision();
        setDecisions(prev => [newDecision, ...prev.slice(0, 19)]); // Keep latest 20
        
        setSystemStats(prev => ({
          ...prev,
          totalDecisions: prev.totalDecisions + 1,
          pendingDecisions: prev.pendingDecisions + 1
        }));

        // Auto-evaluate and execute if in auto mode
        if (autoMode && evaluateDecision(newDecision)) {
          executeDecision(newDecision);
          setSystemStats(prev => ({
            ...prev,
            pendingDecisions: Math.max(0, prev.pendingDecisions - 1)
          }));
        }
      }

      // Update average confidence
      if (decisions.length > 0) {
        const avgConf = decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length;
        setSystemStats(prev => ({ ...prev, averageConfidence: avgConf }));
      }
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, [engineActive, autoMode, decisions, generateDecision, evaluateDecision, executeDecision]);

  const activateEngine = () => {
    setEngineActive(true);
    toast({
      title: "🧠 Autonomous Decision Engine Activated",
      description: "MIORA can now make autonomous decisions",
    });
  };

  const toggleAutoMode = () => {
    setAutoMode(!autoMode);
    toast({
      title: autoMode ? "⚠️ Manual Mode Enabled" : "🚀 Full Autonomous Mode Activated",
      description: autoMode ? "Decisions require manual approval" : "MIORA will execute decisions automatically",
    });
  };

  const getStatusColor = (status: Decision['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'executing': return 'bg-blue-500 animate-pulse';
      case 'failed': return 'bg-red-500';
      case 'evaluating': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: Decision['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/30';
      case 'high': return 'text-orange-400 bg-orange-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'low': return 'text-green-400 bg-green-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center text-2xl">
            <Brain className="h-8 w-8 mr-3" />
            🧠 MIORA Autonomous Decision Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Engine Status</span>
                <Button
                  onClick={activateEngine}
                  disabled={engineActive}
                  className={engineActive ? "bg-green-600" : "bg-purple-600 hover:bg-purple-700"}
                >
                  {engineActive ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Active
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Activate Engine
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Autonomous Mode</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Manual</span>
                  <Switch
                    checked={autoMode}
                    onCheckedChange={toggleAutoMode}
                    disabled={!engineActive}
                  />
                  <span className="text-sm text-gray-400">Auto</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400">{systemStats.totalDecisions}</div>
                <div className="text-sm text-gray-400">Total Decisions</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{systemStats.successfulExecutions}</div>
                <div className="text-sm text-gray-400">Executed</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{systemStats.pendingDecisions}</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{systemStats.averageConfidence.toFixed(0)}%</div>
                <div className="text-sm text-gray-400">Avg Confidence</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision Queue */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2" />
            Decision Queue & Execution Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {decisions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Waiting for autonomous decisions...</p>
                {!engineActive && <p className="text-sm mt-2">Activate the engine to start generating decisions</p>}
              </div>
            ) : (
              decisions.map((decision) => (
                <div key={decision.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getPriorityColor(decision.priority)}>
                          {decision.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(decision.status)}>
                          {decision.status.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-400 capitalize">{decision.type}</span>
                      </div>
                      <h4 className="text-white font-medium">{decision.description}</h4>
                    </div>
                    
                    {decision.status === 'pending' && !autoMode && (
                      <Button
                        size="sm"
                        onClick={() => executeDecision(decision)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Execute
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Confidence: </span>
                      <span className="text-white font-medium">{decision.confidence}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Impact: </span>
                      <span className="text-white font-medium">{decision.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Time: </span>
                      <span className="text-white font-medium">{Math.floor(decision.estimatedTime/60)}m {decision.estimatedTime%60}s</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{new Date(decision.timestamp).toLocaleTimeString('id-ID')}</span>
                    {decision.autoExecute && (
                      <Badge className="ml-2 bg-green-600 text-white text-xs">AUTO</Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Decision Criteria */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-6 w-6 mr-2" />
            Decision Criteria & Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Minimum Confidence (%)</label>
                <Progress value={criteria.minConfidence} className="h-2" />
                <span className="text-white text-sm">{criteria.minConfidence}%</span>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Maximum Risk Level (%)</label>
                <Progress value={criteria.maxRiskLevel} className="h-2" />
                <span className="text-white text-sm">{criteria.maxRiskLevel}%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-medium">Priority Weights</h4>
              {Object.entries(criteria.priorityWeights).map(([priority, weight]) => (
                <div key={priority} className="flex items-center justify-between">
                  <span className="text-gray-400 capitalize">{priority}</span>
                  <span className="text-white font-medium">{weight}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousDecisionEngine;