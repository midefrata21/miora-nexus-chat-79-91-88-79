import { supabase } from '@/integrations/supabase/client';

export interface MIORACapability {
  id: string;
  capability_id: string;
  name: string;
  category: string;
  description?: string;
  version: string;
  status: string;
  performance_level: number;
  auto_upgrade: boolean;
  upgrade_frequency_hours: number;
  last_upgrade?: string;
  next_upgrade?: string;
  dependencies?: string[];
  configuration: any;
  metrics: any;
  created_at?: string;
  updated_at?: string;
}

export class MIORACapabilitiesManager {
  private static instance: MIORACapabilitiesManager;
  private capabilities: Map<string, MIORACapability> = new Map();
  private upgradeTimers: Map<string, NodeJS.Timeout> = new Map();

  static getInstance(): MIORACapabilitiesManager {
    if (!MIORACapabilitiesManager.instance) {
      MIORACapabilitiesManager.instance = new MIORACapabilitiesManager();
    }
    return MIORACapabilitiesManager.instance;
  }

  async loadCapabilities(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('miora_capabilities')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error('❌ Error loading capabilities:', error);
        return;
      }

      data?.forEach(capability => {
        this.capabilities.set(capability.capability_id, capability);
        this.scheduleAutoUpgrade(capability);
      });

      console.log(`✅ Loaded ${data?.length || 0} MIORA capabilities`);
    } catch (error) {
      console.error('❌ Error in loadCapabilities:', error);
    }
  }

  private scheduleAutoUpgrade(capability: MIORACapability): void {
    if (!capability.auto_upgrade) return;

    // Clear existing timer
    const existingTimer = this.upgradeTimers.get(capability.capability_id);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Schedule next upgrade
    const upgradeIntervalMs = capability.upgrade_frequency_hours * 60 * 60 * 1000;
    const timer = setTimeout(() => {
      this.upgradeCapability(capability.capability_id);
    }, upgradeIntervalMs);

    this.upgradeTimers.set(capability.capability_id, timer);
  }

  async upgradeCapability(capabilityId: string): Promise<void> {
    try {
      const capability = this.capabilities.get(capabilityId);
      if (!capability) return;

      const currentVersion = parseFloat(capability.version) || 1.0;
      const newVersion = (currentVersion + 0.1).toFixed(1);
      const performanceIncrease = Math.random() * 0.5 + 0.1; // 0.1-0.6 increase
      const newPerformanceLevel = Math.min(10.0, capability.performance_level + performanceIncrease);

      // Update capability in database
      const { error } = await supabase
        .from('miora_capabilities')
        .update({
          version: newVersion,
          performance_level: newPerformanceLevel,
          last_upgrade: new Date().toISOString(),
          next_upgrade: new Date(Date.now() + capability.upgrade_frequency_hours * 60 * 60 * 1000).toISOString(),
          metrics: {
            ...capability.metrics,
            upgrades_count: (capability.metrics?.upgrades_count || 0) + 1,
            last_performance_increase: performanceIncrease
          }
        })
        .eq('capability_id', capabilityId);

      if (error) {
        console.error('❌ Error upgrading capability:', error);
        return;
      }

      // Log upgrade history
      await this.logUpgrade(capabilityId, capability.version, newVersion, {
        performance_increase: performanceIncrease,
        auto_generated: true
      });

      // Update local cache
      if (capability) {
        capability.version = newVersion;
        capability.performance_level = newPerformanceLevel;
        capability.last_upgrade = new Date().toISOString();
        this.capabilities.set(capabilityId, capability);
      }

      console.log(`🚀 Upgraded ${capability.name} from v${capability.version} to v${newVersion} (Performance: ${newPerformanceLevel.toFixed(2)})`);

      // Schedule next upgrade
      this.scheduleAutoUpgrade(capability);
    } catch (error) {
      console.error('❌ Error in upgradeCapability:', error);
    }
  }

  async logUpgrade(capabilityId: string, versionFrom: string, versionTo: string, improvements: any): Promise<void> {
    try {
      await supabase
        .from('miora_upgrade_history')
        .insert([{
          upgrade_id: `upgrade_${Date.now()}_${capabilityId}`,
          capability_id: capabilityId,
          upgrade_type: 'auto_performance',
          version_from: versionFrom,
          version_to: versionTo,
          status: 'completed',
          improvements: improvements,
          performance_impact: improvements.performance_increase,
          auto_generated: true,
          executed_at: new Date().toISOString()
        }]);
    } catch (error) {
      console.error('❌ Error logging upgrade:', error);
    }
  }

  async enhanceCapability(capabilityId: string, enhancements: any): Promise<void> {
    try {
      const capability = this.capabilities.get(capabilityId);
      if (!capability) return;

      const { error } = await supabase
        .from('miora_capabilities')
        .update({
          configuration: {
            ...capability.configuration,
            ...enhancements
          },
          metrics: {
            ...capability.metrics,
            enhancements_count: (capability.metrics?.enhancements_count || 0) + 1,
            last_enhancement: new Date().toISOString()
          }
        })
        .eq('capability_id', capabilityId);

      if (error) {
        console.error('❌ Error enhancing capability:', error);
        return;
      }

      console.log(`✨ Enhanced ${capability.name} with new configurations`);
    } catch (error) {
      console.error('❌ Error in enhanceCapability:', error);
    }
  }

  getCapability(capabilityId: string): MIORACapability | undefined {
    return this.capabilities.get(capabilityId);
  }

  getAllCapabilities(): MIORACapability[] {
    return Array.from(this.capabilities.values());
  }

  async activateAllSystems(): Promise<void> {
    console.log('🔄 Activating all MIORA systems...');
    
    const capabilities = this.getAllCapabilities();
    for (const capability of capabilities) {
      if (capability.status !== 'active') {
        await this.activateCapability(capability.capability_id);
      }
    }

    console.log('✅ All MIORA systems activated');
  }

  async activateCapability(capabilityId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('miora_capabilities')
        .update({ status: 'active' })
        .eq('capability_id', capabilityId);

      if (error) {
        console.error('❌ Error activating capability:', error);
        return;
      }

      const capability = this.capabilities.get(capabilityId);
      if (capability) {
        capability.status = 'active';
        this.capabilities.set(capabilityId, capability);
        this.scheduleAutoUpgrade(capability);
      }

      console.log(`✅ Activated capability: ${capability?.name}`);
    } catch (error) {
      console.error('❌ Error in activateCapability:', error);
    }
  }

  async syncWithDatabase(): Promise<void> {
    try {
      // Sync capabilities to database
      const capabilities = this.getAllCapabilities();
      
      for (const capability of capabilities) {
        await supabase
          .from('miora_capabilities')
          .upsert({
            capability_id: capability.capability_id,
            name: capability.name,
            category: capability.category,
            description: capability.description,
            version: capability.version,
            status: capability.status,
            performance_level: capability.performance_level,
            auto_upgrade: capability.auto_upgrade,
            upgrade_frequency_hours: capability.upgrade_frequency_hours,
            last_upgrade: capability.last_upgrade,
            next_upgrade: capability.next_upgrade,
            dependencies: capability.dependencies,
            configuration: capability.configuration,
            metrics: capability.metrics
          }, {
            onConflict: 'capability_id'
          });
      }

      console.log('🔄 Capabilities synced with database');
    } catch (error) {
      console.error('❌ Error syncing capabilities:', error);
    }
  }

  destroy(): void {
    // Clear all timers
    this.upgradeTimers.forEach(timer => clearTimeout(timer));
    this.upgradeTimers.clear();
    this.capabilities.clear();
  }
}