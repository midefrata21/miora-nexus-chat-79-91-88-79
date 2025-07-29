import { useState, useCallback, useRef, useEffect } from 'react';

export interface Integration {
  id: string;
  name: string;
  type: 'api' | 'database' | 'service' | 'module' | 'external';
  status: 'connected' | 'connecting' | 'error' | 'optimizing';
  performance: number;
  lastSync: number;
  dataFlow: number; // MB/s
  dependencies: string[];
}

export const useSystemIntegration = (isActive: boolean, onIntegrationUpdate: () => void) => {
  const getInitialIntegrations = () => {
    const savedIntegrations = localStorage.getItem('miora-system-integrations');
    if (savedIntegrations) {
      try {
        return JSON.parse(savedIntegrations);
      } catch (error) {
        console.error('Failed to parse saved integrations:', error);
      }
    }
    return [];
  };

  const [activeIntegrations, setActiveIntegrations] = useState<Integration[]>(getInitialIntegrations);
  const integrationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateIntegration = useCallback((): Integration => {
    const integrationTypes = ['api', 'database', 'service', 'module', 'external'] as const;
    const statuses = ['connected', 'connecting', 'optimizing'] as const;
    
    const type = integrationTypes[Math.floor(Math.random() * integrationTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const integrationNames = {
      api: ['Payment Gateway API', 'Weather Service API', 'Social Media API', 'Email Service API'],
      database: ['User Database', 'Analytics DB', 'Cache Layer', 'Backup Storage'],
      service: ['Authentication Service', 'Notification Service', 'File Processing', 'ML Pipeline'],
      module: ['Trading Module', 'AI Core Module', 'Security Module', 'Monitoring Module'],
      external: ['AWS Services', 'Google Cloud', 'Third-party Analytics', 'CDN Provider']
    };

    const names = integrationNames[type];
    const name = names[Math.floor(Math.random() * names.length)];
    
    return {
      id: `integration_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      type,
      status,
      performance: Math.random() * 20 + 80, // 80-100% performance
      lastSync: Date.now(),
      dataFlow: Math.random() * 100 + 10, // 10-110 MB/s
      dependencies: [
        'core-system',
        type === 'database' ? 'data-layer' : 'api-layer',
        'security-module'
      ]
    };
  }, []);

  const createSystemIntegration = useCallback(() => {
    const newIntegration = generateIntegration();
    
    const updatedIntegrations = [...activeIntegrations, newIntegration];
    setActiveIntegrations(updatedIntegrations);
    
    localStorage.setItem('miora-system-integrations', JSON.stringify(updatedIntegrations));
    onIntegrationUpdate();

    console.log(`🔗 SYSTEM INTEGRATION: ${newIntegration.name} (${newIntegration.type})`);
    
    // Simulate integration optimization
    setTimeout(() => {
      const optimizedIntegrations = updatedIntegrations.map(integration => 
        integration.id === newIntegration.id 
          ? { ...integration, status: 'connected' as const, performance: Math.min(integration.performance + 5, 100) }
          : integration
      );
      setActiveIntegrations(optimizedIntegrations);
      localStorage.setItem('miora-system-integrations', JSON.stringify(optimizedIntegrations));
    }, Math.random() * 8000 + 3000); // 3-11 seconds
  }, [activeIntegrations, generateIntegration, onIntegrationUpdate]);

  const optimizeIntegrations = useCallback(() => {
    const optimizedIntegrations = activeIntegrations.map(integration => ({
      ...integration,
      performance: Math.min(integration.performance + Math.random() * 2, 100),
      lastSync: Date.now(),
      dataFlow: integration.dataFlow + (Math.random() - 0.5) * 10
    }));
    
    setActiveIntegrations(optimizedIntegrations);
    localStorage.setItem('miora-system-integrations', JSON.stringify(optimizedIntegrations));
  }, [activeIntegrations]);

  const startSystemIntegration = useCallback(() => {
    if (isActive) {
      integrationIntervalRef.current = setInterval(() => {
        if (Math.random() < 0.7) { // 70% chance to create new integration
          createSystemIntegration();
        } else { // 30% chance to optimize existing
          optimizeIntegrations();
        }
      }, 35000); // Every 35 seconds
    }
  }, [isActive, createSystemIntegration, optimizeIntegrations]);

  const stopSystemIntegration = useCallback(() => {
    if (integrationIntervalRef.current) {
      clearInterval(integrationIntervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      startSystemIntegration();
    } else {
      stopSystemIntegration();
    }

    return () => stopSystemIntegration();
  }, [isActive, startSystemIntegration, stopSystemIntegration]);

  return {
    activeIntegrations,
    createSystemIntegration,
    optimizeIntegrations
  };
};