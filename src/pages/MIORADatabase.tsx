import React, { useEffect, useState } from 'react';
import MIORADatabaseCore from '@/components/MIORA/Database/MIORADatabaseCore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { mioraDatabaseSync } from '@/services/MIORADatabaseSync';
import { MIORACapabilitiesManager } from '@/services/MIORACapabilitiesManager';

const MIORADatabasePage = () => {
  const [syncing, setSyncing] = useState(false);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    // Pastikan capabilities dimuat dan auto-sync berjalan
    MIORACapabilitiesManager.getInstance().loadCapabilities();
    mioraDatabaseSync.startAutoSync(15000);
  }, []);

  const handleSyncNow = async () => {
    setSyncing(true);
    try {
      // Siapkan payload cepat (mengikuti struktur yang digunakan auto-sync)
      const payload = {
        systems: [
          {
            id: 'miora-core',
            name: 'MIORA Core System',
            type: 'autonomous',
            isActive: true,
            performanceScore: 95 + Math.random() * 5,
            capabilities: ['autonomous_operation', 'self_optimization'],
            activationCount: Math.floor(Math.random() * 100),
            totalRuntime: mioraDatabaseSync.getLastSyncTime() ? Date.now() - mioraDatabaseSync.getLastSyncTime() : 0,
            errorCount: Math.floor(Math.random() * 3),
            optimizationCount: Math.floor(Math.random() * 10),
          },
        ],
        metrics: [
          {
            systemId: 'miora-core',
            type: 'performance',
            value: 95 + Math.random() * 5,
            unit: 'percent',
            category: 'system_health',
          },
        ],
      };

      // Sinkronkan capabilities terlebih dahulu
      await MIORACapabilitiesManager.getInstance().syncWithDatabase();

      const res = await mioraDatabaseSync.syncAll(payload as any);
      toast.success('Sinkronisasi berhasil', {
        description: `systems: ${res?.result?.systems ?? 0}, metrics: ${res?.result?.metrics ?? 0}`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Sinkronisasi gagal');
    } finally {
      setSyncing(false);
    }
  };

  const handleActivateAll = async () => {
    setActivating(true);
    try {
      await MIORACapabilitiesManager.getInstance().loadCapabilities();
      await MIORACapabilitiesManager.getInstance().activateAllSystems();
      await MIORACapabilitiesManager.getInstance().syncWithDatabase();
      toast.success('Semua sistem diaktifkan');
    } catch (e) {
      console.error(e);
      toast.error('Gagal mengaktifkan sistem');
    } finally {
      setActivating(false);
    }
  };

  return (
    <div className="w-full">
      <header className="flex items-center justify-between gap-3 p-4 border-b border-border/50">
        <h1 className="text-lg font-semibold">MIORA Database</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleSyncNow} disabled={syncing}>
            {syncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}
          </Button>
          <Button variant="secondary" onClick={handleActivateAll} disabled={activating}>
            {activating ? 'Mengaktifkan...' : 'Aktifkan Semua Sistem'}
          </Button>
        </div>
      </header>
      <main>
        <MIORADatabaseCore />
      </main>
    </div>
  );
};

export default MIORADatabasePage;
