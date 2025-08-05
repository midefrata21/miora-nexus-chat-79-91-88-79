import React from 'react';
import { useAGIMaxAutonomous } from '@/hooks/useAGIMaxAutonomous';
import EnhancedSystemDashboard from '@/components/EnhancedSystemDashboard';
import AGIMaxControls from '@/components/AGIMaxControls';

const SimplifiedMainInterface: React.FC = () => {
  const { isSystemMonitorVisible, toggleSystemMonitor } = useAGIMaxAutonomous();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* AGI Max Controls */}
        <div className="flex justify-center">
          <div className="max-w-md">
            <AGIMaxControls />
          </div>
        </div>

        {/* Enhanced System Dashboard */}
        <EnhancedSystemDashboard 
          isSystemMonitorVisible={isSystemMonitorVisible}
          onToggleSystemMonitor={toggleSystemMonitor}
        />
      </div>
    </div>
  );
};

export default SimplifiedMainInterface;