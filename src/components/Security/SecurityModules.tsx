import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Key, 
  Fingerprint,
  Activity,
  RefreshCw,
  Settings,
  Search
} from 'lucide-react';
import { SecurityState } from '@/hooks/useSecurityCenter';

interface SecurityModulesProps {
  securityState: SecurityState;
  onThreatScan: () => void;
  onToggleAccessControl: () => void;
  onViewLogs: () => void;
  onConfigureAlerts: () => void;
  onRotateKeys: () => void;
  onSetupBiometrics: () => void;
}

export const SecurityModules: React.FC<SecurityModulesProps> = ({
  securityState,
  onThreatScan,
  onToggleAccessControl,
  onViewLogs,
  onConfigureAlerts,
  onRotateKeys,
  onSetupBiometrics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Threat Detection */}
      <Card className="bg-gray-800/50 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Threat Detection
            </div>
            <Badge className={`${securityState.threatDetection.isActive ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
              {securityState.threatDetection.isActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Status:</span>
              <span className={`font-medium ${
                securityState.threatDetection.status === 'secure' ? 'text-green-300' :
                securityState.threatDetection.status === 'warning' ? 'text-yellow-300' : 'text-red-300'
              }`}>
                {securityState.threatDetection.status.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Threats Found:</span>
              <span className="text-white font-medium">{securityState.threatDetection.threatsDetected}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Last Scan:</span>
              <span className="text-white">
                {securityState.threatDetection.lastScan ? 
                  securityState.threatDetection.lastScan.toLocaleTimeString() : 'Never'}
              </span>
            </div>
          </div>
          <Button 
            onClick={onThreatScan}
            className="w-full bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Run Security Scan
          </Button>
        </CardContent>
      </Card>

      {/* Access Control */}
      <Card className="bg-gray-800/50 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Access Control
            </div>
            <Badge className={`${securityState.accessControl.isEnabled ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'}`}>
              {securityState.accessControl.isEnabled ? 'ENABLED' : 'DISABLED'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Active Users:</span>
              <span className="text-white font-medium">{securityState.accessControl.activeUsers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Failed Attempts:</span>
              <span className="text-red-300 font-medium">{securityState.accessControl.failedAttempts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Lockout Status:</span>
              <span className={`font-medium ${securityState.accessControl.lockoutActive ? 'text-red-300' : 'text-green-300'}`}>
                {securityState.accessControl.lockoutActive ? 'ACTIVE' : 'CLEAR'}
              </span>
            </div>
          </div>
          <Button 
            onClick={onToggleAccessControl}
            className={`w-full flex items-center gap-2 ${
              securityState.accessControl.isEnabled 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Settings className="w-4 h-4" />
            {securityState.accessControl.isEnabled ? 'Disable' : 'Enable'} Access Control
          </Button>
        </CardContent>
      </Card>

      {/* Security Monitoring */}
      <Card className="bg-gray-800/50 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Security Monitoring
            </div>
            <Badge className={`${securityState.monitoring.isActive ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
              {securityState.monitoring.isActive ? 'MONITORING' : 'OFFLINE'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Logs:</span>
              <span className="text-white font-medium">{securityState.monitoring.logsCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Suspicious Events:</span>
              <span className="text-yellow-300 font-medium">{securityState.monitoring.suspiciousActivity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Last Activity:</span>
              <span className="text-white">
                {securityState.monitoring.lastActivity ? 
                  securityState.monitoring.lastActivity.toLocaleTimeString() : 'No activity'}
              </span>
            </div>
          </div>
          <Button 
            onClick={onViewLogs}
            className="w-full bg-yellow-600 hover:bg-yellow-700 flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            View Security Logs
          </Button>
        </CardContent>
      </Card>

      {/* Security Alerts */}
      <Card className="bg-gray-800/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Security Alerts
            </div>
            <Badge className={`${securityState.alerts.isEnabled ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
              {securityState.alerts.isEnabled ? 'ENABLED' : 'DISABLED'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Alerts:</span>
              <span className="text-white font-medium">{securityState.alerts.alertsCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Critical Alerts:</span>
              <span className="text-red-300 font-medium">{securityState.alerts.criticalAlerts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Last Alert:</span>
              <span className="text-white">
                {securityState.alerts.lastAlert ? 
                  securityState.alerts.lastAlert.toLocaleTimeString() : 'No alerts'}
              </span>
            </div>
          </div>
          <Button 
            onClick={onConfigureAlerts}
            className="w-full bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Configure Alerts
          </Button>
        </CardContent>
      </Card>

      {/* Encryption */}
      <Card className="bg-gray-800/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center justify-between">
            <div className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Encryption
            </div>
            <Badge className={`${securityState.encryption.isEnabled ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'}`}>
              {securityState.encryption.isEnabled ? 'ENABLED' : 'DISABLED'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Algorithm:</span>
              <span className="text-white font-medium">{securityState.encryption.encryptionStrength}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Key Rotation:</span>
              <span className={`font-medium ${securityState.encryption.keyRotationDue ? 'text-yellow-300' : 'text-green-300'}`}>
                {securityState.encryption.keyRotationDue ? 'DUE' : 'CURRENT'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Cert Expires:</span>
              <span className="text-white">
                {securityState.encryption.certificateExpiry ? 
                  securityState.encryption.certificateExpiry.toLocaleDateString() : 'Never'}
              </span>
            </div>
          </div>
          <Button 
            onClick={onRotateKeys}
            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Rotate Encryption Keys
          </Button>
        </CardContent>
      </Card>

      {/* Biometric Security */}
      <Card className="bg-gray-800/50 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center justify-between">
            <div className="flex items-center">
              <Fingerprint className="w-5 h-5 mr-2" />
              Biometric Security
            </div>
            <Badge className={`${securityState.biometric.isEnabled ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
              {securityState.biometric.isEnabled ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Enrolled Users:</span>
              <span className="text-white font-medium">{securityState.biometric.enrolledUsers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Success Rate:</span>
              <span className="text-green-300 font-medium">{securityState.biometric.authSuccessRate}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Last Auth:</span>
              <span className="text-white">
                {securityState.biometric.lastAuth ? 
                  securityState.biometric.lastAuth.toLocaleTimeString() : 'Never'}
              </span>
            </div>
          </div>
          <Button 
            onClick={onSetupBiometrics}
            className={`w-full flex items-center gap-2 ${
              securityState.biometric.isEnabled 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            {securityState.biometric.isEnabled ? 'Disable' : 'Setup'} Biometrics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};