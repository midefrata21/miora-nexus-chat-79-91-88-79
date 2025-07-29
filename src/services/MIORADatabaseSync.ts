import { supabase } from '@/integrations/supabase/client';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';

export class MIORADatabaseSync {
  private syncInterval: NodeJS.Timeout | null = null;
  private lastSync: number = 0;
  private syncInProgress: boolean = false;

  constructor() {
    this.startAutoSync();
  }

  async syncAll(data: any) {
    console.log('🔄 MIORA Database Sync: Starting full synchronization...');
    
    try {
      const { data: response, error } = await supabase.functions.invoke('miora-database-sync', {
        body: {
          action: 'sync_all',
          data,
          timestamp: Date.now()
        }
      });

      if (error) throw error;
      
      console.log('✅ Full database sync completed:', response);
      this.lastSync = Date.now();
      return response;
      
    } catch (error) {
      console.error('❌ Database sync failed:', error);
      throw error;
    }
  }

  async syncSystems(systems: any[]) {
    try {
      const { data: response, error } = await supabase.functions.invoke('miora-database-sync', {
        body: {
          action: 'sync_systems',
          data: systems,
          timestamp: Date.now()
        }
      });

      if (error) throw error;
      return response;
      
    } catch (error) {
      console.error('❌ Systems sync failed:', error);
      throw error;
    }
  }

  async syncMetrics(metrics: any[]) {
    try {
      const { data: response, error } = await supabase.functions.invoke('miora-database-sync', {
        body: {
          action: 'sync_metrics',
          data: metrics,
          timestamp: Date.now()
        }
      });

      if (error) throw error;
      return response;
      
    } catch (error) {
      console.error('❌ Metrics sync failed:', error);
      throw error;
    }
  }

  async syncLogs(logs: any[]) {
    try {
      const { data: response, error } = await supabase.functions.invoke('miora-database-sync', {
        body: {
          action: 'sync_logs',
          data: logs,
          timestamp: Date.now()
        }
      });

      if (error) throw error;
      return response;
      
    } catch (error) {
      console.error('❌ Logs sync failed:', error);
      throw error;
    }
  }

  async performCleanup() {
    try {
      const { data: response, error } = await supabase.functions.invoke('miora-database-sync', {
        body: {
          action: 'cleanup',
          timestamp: Date.now()
        }
      });

      if (error) throw error;
      
      console.log('🧹 Database cleanup completed:', response);
      return response;
      
    } catch (error) {
      console.error('❌ Database cleanup failed:', error);
      throw error;
    }
  }

  async sendRealtimeUpdate(events: any[]) {
    try {
      const { data: response, error } = await supabase.functions.invoke('miora-realtime-sync', {
        body: events
      });

      if (error) throw error;
      return response;
      
    } catch (error) {
      console.error('❌ Realtime sync failed:', error);
      throw error;
    }
  }

  async triggerMaintenance(tasks?: any[]) {
    try {
      const { data: response, error } = await supabase.functions.invoke('miora-auto-maintenance', {
        body: {
          tasks: tasks || []
        }
      });

      if (error) throw error;
      
      console.log('🔧 Auto-maintenance completed:', response);
      return response;
      
    } catch (error) {
      console.error('❌ Auto-maintenance failed:', error);
      throw error;
    }
  }

  startAutoSync(intervalMs: number = 30000) {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    this.syncInterval = setInterval(async () => {
      if (this.syncInProgress) return;
      
      this.syncInProgress = true;
      
      try {
        // Automatically sync any pending data
        console.log('⚡ MIORA Auto-Sync: Running periodic sync...');
        
        // In a real implementation, you would gather actual system data here
        const mockData = {
          systems: [
            {
              id: 'miora-core',
              name: 'MIORA Core System',
              type: 'autonomous',
              isActive: true,
              performanceScore: 95 + Math.random() * 5,
              capabilities: ['autonomous_operation', 'self_optimization'],
              activationCount: Math.floor(Math.random() * 100),
              totalRuntime: Date.now() - this.lastSync,
              errorCount: Math.floor(Math.random() * 3),
              optimizationCount: Math.floor(Math.random() * 10)
            }
          ],
          metrics: [
            {
              systemId: 'miora-core',
              type: 'performance',
              value: 95 + Math.random() * 5,
              unit: 'percent',
              category: 'system_health'
            }
          ]
        };

        await this.syncAll(mockData);
        
      } catch (error) {
        console.error('❌ Auto-sync error:', error);
      } finally {
        this.syncInProgress = false;
      }
    }, intervalMs);

    console.log(`🔄 MIORA Auto-Sync started (interval: ${intervalMs}ms)`);
  }

  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('⏹️ MIORA Auto-Sync stopped');
    }
  }

  getLastSyncTime(): number {
    return this.lastSync;
  }

  isSyncInProgress(): boolean {
    return this.syncInProgress;
  }
}

// Global instance
export const mioraDatabaseSync = new MIORADatabaseSync();