import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { HorizontalCategoryMenu } from '@/components/Navigation/HorizontalCategoryMenu';
import { SecurityOverview } from '@/components/Security/SecurityOverview';
import { SecurityModules } from '@/components/Security/SecurityModules';
import { useSecurityCenter } from '@/hooks/useSecurityCenter';

const SecurityCenter: React.FC = () => {
  const {
    securityState,
    runThreatScan,
    toggleAccessControl,
    viewSecurityLogs,
    configureAlerts,
    rotateEncryptionKeys,
    setupBiometrics
  } = useSecurityCenter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-orange-900">
      <HorizontalCategoryMenu />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-12 h-12 text-red-400" />
              <h1 className="text-4xl font-bold text-white">Security Center</h1>
            </div>
            <p className="text-xl text-red-200">Advanced Security & Protection Systems</p>
            <div className="flex justify-center gap-2">
              <Badge className="bg-red-600/20 text-red-300 border-red-500/30">
                🛡️ Maximum Security Protocol
              </Badge>
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                🔄 Auto-Defense Active
              </Badge>
            </div>
          </div>

          {/* Security Overview */}
          <SecurityOverview securityState={securityState} />

          {/* Security Modules */}
          <SecurityModules 
            securityState={securityState}
            onThreatScan={runThreatScan}
            onToggleAccessControl={toggleAccessControl}
            onViewLogs={viewSecurityLogs}
            onConfigureAlerts={configureAlerts}
            onRotateKeys={rotateEncryptionKeys}
            onSetupBiometrics={setupBiometrics}
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;