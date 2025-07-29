import { useState, useCallback } from 'react';

export interface InfrastructureNode {
  id: string;
  name: string;
  type: 'brain' | 'scaling' | 'loadbalancer' | 'cdn' | 'database' | 'cache' | 'logs';
  region: string;
  status: 'active' | 'scaling' | 'maintenance' | 'error';
  load: number;
  capacity: number;
  responseTime: number;
  connections: number;
  lastUpdate: number;
}

export const useInfrastructureNodes = () => {
  const [infrastructureNodes, setInfrastructureNodes] = useState<InfrastructureNode[]>([
    {
      id: 'miora_critical_brain',
      name: 'MIORA Critical Brain Node',
      type: 'brain',
      region: 'Priority Zone Alpha',
      status: 'active',
      load: 45,
      capacity: 1000,
      responseTime: 23,
      connections: 847,
      lastUpdate: Date.now()
    },
    {
      id: 'auto_scaling_controller',
      name: 'Auto Scaling Controller',
      type: 'scaling',
      region: 'Global Multi-Zone',
      status: 'active',
      load: 32,
      capacity: 800,
      responseTime: 18,
      connections: 1247,
      lastUpdate: Date.now()
    },
    {
      id: 'smart_load_balancer',
      name: 'Smart Load Balancer AI',
      type: 'loadbalancer',
      region: 'Distributed Network',
      status: 'active',
      load: 38,
      capacity: 750,
      responseTime: 15,
      connections: 2834,
      lastUpdate: Date.now()
    },
    {
      id: 'edge_cdn_global',
      name: 'Edge CDN Distribution',
      type: 'cdn',
      region: 'Global Edge Points',
      status: 'active',
      load: 67,
      capacity: 900,
      responseTime: 12,
      connections: 5670,
      lastUpdate: Date.now()
    },
    {
      id: 'user_data_secure',
      name: 'User Data Secure Storage',
      type: 'database',
      region: 'Encrypted Vault Network',
      status: 'active',
      load: 28,
      capacity: 650,
      responseTime: 34,
      connections: 456,
      lastUpdate: Date.now()
    },
    {
      id: 'cache_high_speed',
      name: 'High-Speed Cache Cluster',
      type: 'cache',
      region: 'Memory Grid Network',
      status: 'active',
      load: 52,
      capacity: 700,
      responseTime: 8,
      connections: 1834,
      lastUpdate: Date.now()
    },
    {
      id: 'logs_segregation',
      name: 'Logs Segregation Cluster',
      type: 'logs',
      region: 'Cold Storage Network',
      status: 'active',
      load: 24,
      capacity: 600,
      responseTime: 45,
      connections: 234,
      lastUpdate: Date.now()
    }
  ]);

  const toggleModule = useCallback((moduleId: string) => {
    setInfrastructureNodes(prev => prev.map(node => 
      node.id === moduleId 
        ? { ...node, status: node.status === 'active' ? 'maintenance' : 'active' }
        : node
    ));
  }, []);

  const activateAllNodes = useCallback(() => {
    setInfrastructureNodes(prev => prev.map(node => ({
      ...node,
      status: 'active' as const,
      load: Math.max(node.load, 30)
    })));
  }, []);

  const updateNodeMetrics = useCallback(() => {
    setInfrastructureNodes(prev => prev.map(node => ({
      ...node,
      load: Math.max(10, Math.min(95, node.load + (Math.random() - 0.5) * 15)),
      responseTime: Math.max(5, Math.min(100, node.responseTime + (Math.random() - 0.5) * 10)),
      connections: Math.max(100, Math.min(8000, node.connections + (Math.random() - 0.5) * 500)),
      lastUpdate: Date.now()
    })));
  }, []);

  return {
    infrastructureNodes,
    setInfrastructureNodes,
    toggleModule,
    activateAllNodes,
    updateNodeMetrics
  };
};