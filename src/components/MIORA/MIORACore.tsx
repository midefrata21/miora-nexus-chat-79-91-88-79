
import React from 'react';
import { useMIORACore } from './hooks/useMIORACore';
import { MIORAHeader } from './components/MIORAHeader';
import { MIORAControlPanel } from './components/MIORAControlPanel';
import { MIORAMetrics } from './components/MIORAMetrics';
import { MIORASystemHealth } from './components/MIORASystemHealth';
import { MIORALogs } from './components/MIORALogs';

export const MIORACore: React.FC = () => {
  const {
    state,
    metrics,
    logs,
    startMIORA,
    stopMIORA,
    emergencyStop
  } = useMIORACore();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-black min-h-screen">
      <MIORAHeader
        systemHealth={state.systemHealth}
        isRunning={state.isRunning}
        cycleCount={state.cycleCount}
        performanceScore={state.performanceScore}
      />

      <MIORAControlPanel
        isRunning={state.isRunning}
        onStart={startMIORA}
        onStop={stopMIORA}
        onEmergencyStop={emergencyStop}
      />

      <MIORAMetrics
        totalProfitLoss={state.totalProfitLoss}
        activeSignals={state.activeSignals}
        metrics={metrics}
      />

      <MIORASystemHealth
        systemHealth={state.systemHealth}
        metrics={metrics}
      />

      <MIORALogs logs={logs} />
    </div>
  );
};

export default MIORACore;
