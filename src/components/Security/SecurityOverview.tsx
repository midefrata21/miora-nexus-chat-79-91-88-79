import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { SecurityState } from '@/hooks/useSecurityCenter';

interface SecurityOverviewProps {
  securityState: SecurityState;
}

export const SecurityOverview: React.FC<SecurityOverviewProps> = ({ securityState }) => {
  const getOverallSecurityScore = () => {
    const systems = [
      securityState.threatDetection.isActive,
      securityState.accessControl.isEnabled,
      securityState.monitoring.isActive,
      securityState.alerts.isEnabled,
      securityState.encryption.isEnabled,
      securityState.biometric.isEnabled
    ];
    
    return Math.round((systems.filter(Boolean).length / systems.length) * 100);
  };

  const securityScore = getOverallSecurityScore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gray-800/50 border-blue-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-300 text-sm font-medium flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Security Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">{securityScore}%</div>
          <Progress value={securityScore} className="h-2 mb-2" />
          <Badge className={`${securityScore >= 80 ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}`}>
            {securityScore >= 80 ? 'Excellent' : 'Needs Attention'}
          </Badge>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-red-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-300 text-sm font-medium flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Threats Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">
            {securityState.threatDetection.threatsDetected}
          </div>
          <Badge className={`${
            securityState.threatDetection.status === 'secure' 
              ? 'bg-green-600/20 text-green-300' 
              : securityState.threatDetection.status === 'warning' 
                ? 'bg-yellow-600/20 text-yellow-300' 
                : 'bg-red-600/20 text-red-300'
          }`}>
            {securityState.threatDetection.status.toUpperCase()}
          </Badge>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-orange-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-orange-300 text-sm font-medium flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">
            {securityState.accessControl.activeUsers}
          </div>
          <div className="text-sm text-gray-400">
            Failed attempts: {securityState.accessControl.failedAttempts}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-purple-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-purple-300 text-sm font-medium flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            System Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">
            {securityState.monitoring.logsCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            Suspicious: {securityState.monitoring.suspiciousActivity}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};