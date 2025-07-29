
import React, { useMemo } from 'react';
import SystemHealthMonitor from '@/components/SystemHealthMonitor';
import SystemUpdateActivator from '@/components/SystemUpdateActivator';
import QuickAccessActions from './QuickAccessActions';
import { DashboardHeader } from './DashboardHeader';
import { QuickStatsGrid } from './QuickStatsGrid';
import { SystemModulesGrid } from './SystemModulesGrid';
import { DashboardFooter } from './DashboardFooter';
import { useSystemData } from '@/hooks/useSystemData';
import { Layout } from '@/components/Layout';
import { EnhancedErrorBoundary } from '@/components/ErrorBoundary/EnhancedErrorBoundary';

export const EnhancedMainDashboard = React.memo(() => {
  const { systemStatus, quickStats, systemModules } = useSystemData();

  // Memoize static components to prevent unnecessary re-renders
  const staticComponents = useMemo(() => ({
    quickAccessActions: <QuickAccessActions />,
    systemHealthMonitor: <SystemHealthMonitor />,
    systemUpdateActivator: <SystemUpdateActivator />
  }), []);

  return (
    <EnhancedErrorBoundary>
      <Layout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <DashboardHeader systemStatus={systemStatus} />

          {/* Quick Stats */}
          <QuickStatsGrid quickStats={quickStats} />

          {/* Quick Access Actions */}
          <EnhancedErrorBoundary fallback={<div className="p-4 text-muted-foreground">Quick Actions temporarily unavailable</div>}>
            {staticComponents.quickAccessActions}
          </EnhancedErrorBoundary>

          {/* System Health Monitor */}
          <EnhancedErrorBoundary fallback={<div className="p-4 text-muted-foreground">Health Monitor temporarily unavailable</div>}>
            {staticComponents.systemHealthMonitor}
          </EnhancedErrorBoundary>

          {/* System Modules Grid */}
          <EnhancedErrorBoundary fallback={<div className="p-4 text-muted-foreground">System Modules temporarily unavailable</div>}>
            <SystemModulesGrid systemModules={systemModules} />
          </EnhancedErrorBoundary>

          {/* System Update Activator */}
          <EnhancedErrorBoundary fallback={<div className="p-4 text-muted-foreground">Update System temporarily unavailable</div>}>
            {staticComponents.systemUpdateActivator}
          </EnhancedErrorBoundary>
          
          {/* Footer Info */}
          <DashboardFooter systemStatus={systemStatus} />
        </div>
      </Layout>
    </EnhancedErrorBoundary>
  );
});
