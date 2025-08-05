import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  Crown, 
  Eye, 
  Layers,
  Network,
  Cpu,
  Settings,
  Activity
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "MIORA Core",
      description: "Access main MIORA AI system",
      url: "/miora",
      icon: Brain,
      category: "Core Systems",
      priority: "high"
    },
    {
      title: "Crypto Signals",
      description: "Real-time trading signals",
      url: "/crypto-scalping-signals",
      icon: TrendingUp,
      category: "Trading",
      priority: "high"
    },
    {
      title: "Hacker Master",
      description: "Advanced security operations",
      url: "/miora-hacker-master",
      icon: Shield,
      category: "Security",
      priority: "medium"
    },
    {
      title: "Quantum Infrastructure",
      description: "System infrastructure management",
      url: "/quantum-infrastructure",
      icon: Network,
      category: "Infrastructure",
      priority: "medium"
    },
    {
      title: "Prophecy System",
      description: "Future prediction and analysis",
      url: "/prophecy-system",
      icon: Eye,
      category: "Prediction",
      priority: "high"
    },
    {
      title: "Enhanced Core",
      description: "Autonomous core operations",
      url: "/enhanced-autonomous-core",
      icon: Cpu,
      category: "Core Systems",
      priority: "high"
    },
    {
      title: "Infinity System",
      description: "Unlimited system capabilities",
      url: "/miora-infinity-system",
      icon: Crown,
      category: "Advanced",
      priority: "medium"
    },
    {
      title: "System Status",
      description: "Real-time system monitoring",
      url: "/system-status",
      icon: Activity,
      category: "Monitoring",
      priority: "medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 hover:border-red-500/50';
      case 'medium': return 'border-yellow-500/30 hover:border-yellow-500/50';
      default: return 'border-green-500/30 hover:border-green-500/50';
    }
  };

  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, typeof quickActions>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Quick Actions Dashboard
          </h1>
          <p className="text-muted-foreground">
            Rapid access to all critical MIORA systems and operations
          </p>
        </div>

        {/* Quick Launch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.slice(0, 4).map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => navigate(action.url)}
              className={`h-20 flex flex-col space-y-2 ${getPriorityColor(action.priority)}`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{action.title}</span>
            </Button>
          ))}
        </div>

        {/* Categorized Actions */}
        {Object.entries(groupedActions).map(([category, actions]) => (
          <Card key={category} className="bg-gradient-to-br from-muted/50 to-background border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>{category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {actions.map((action, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getPriorityColor(action.priority)}`}
                    onClick={() => navigate(action.url)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <action.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Emergency Actions */}
        <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-400">
              <Target className="h-5 w-5" />
              <span>Emergency Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/miora-maximal-activation')}
                className="border-red-500/30 hover:bg-red-500/10 text-red-400"
              >
                <Shield className="h-4 w-4 mr-2" />
                Maximal Activation
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/miora-investigation')}
                className="border-orange-500/30 hover:bg-orange-500/10 text-orange-400"
              >
                <Eye className="h-4 w-4 mr-2" />
                Investigation Suite
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/miora-secret-features')}
                className="border-purple-500/30 hover:bg-purple-500/10 text-purple-400"
              >
                <Settings className="h-4 w-4 mr-2" />
                Secret Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickActions;