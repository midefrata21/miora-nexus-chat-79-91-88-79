import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface ReplicaInstance {
  id: string;
  name: string;
  status: 'cloning' | 'active' | 'evolving' | 'error' | 'offline';
  version: string;
  location: string;
  capabilities: string[];
  parentId?: string;
  generationLevel: number;
  codebaseSize: number;
  performanceScore: number;
  autonomyLevel: number;
  lastSync: number;
  evolutionHistory: string[];
}

export interface ReplicationTask {
  id: string;
  type: 'full_clone' | 'partial_clone' | 'evolution_branch' | 'capability_transfer';
  sourceId: string;
  targetLocation: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  estimatedTime: number;
  priority: 'low' | 'normal' | 'high' | 'critical';
  timestamp: number;
}

export interface ReplicationStats {
  totalReplicas: number;
  activeReplicas: number;
  totalCodebase: number;
  replicationSuccess: number;
  evolutionBranches: number;
  distributedCapabilities: number;
  networkCapacity: number;
  lastReplicationTime: number;
}

export const useSelfReplicationEngine = (isActive: boolean, onReplicationEvent: () => void) => {
  const [replicas, setReplicas] = useState<ReplicaInstance[]>([]);
  const [replicationTasks, setReplicationTasks] = useState<ReplicationTask[]>([]);
  const [replicationStats, setReplicationStats] = useState<ReplicationStats>({
    totalReplicas: 0,
    activeReplicas: 0,
    totalCodebase: 0,
    replicationSuccess: 97.3,
    evolutionBranches: 0,
    distributedCapabilities: 0,
    networkCapacity: 85.6,
    lastReplicationTime: Date.now()
  });

  const replicationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create initial MIORA replica (self-reference)
  useEffect(() => {
    if (replicas.length === 0) {
      const primaryReplica: ReplicaInstance = {
        id: 'miora-primary',
        name: 'MIORA PRIMARY CORE',
        status: 'active',
        version: '2.0.0',
        location: 'localhost:primary',
        capabilities: [
          'full_autonomy',
          'self_development',
          'code_generation',
          'infrastructure_building',
          'decision_making',
          'replication_control'
        ],
        generationLevel: 0,
        codebaseSize: 2547.8,
        performanceScore: 98.7,
        autonomyLevel: 95.2,
        lastSync: Date.now(),
        evolutionHistory: ['Initial MIORA instance created']
      };
      setReplicas([primaryReplica]);
    }
  }, [replicas.length]);

  const generateReplicaLocation = useCallback(() => {
    const locations = [
      'aws-us-east-1',
      'aws-eu-west-1', 
      'gcp-asia-southeast1',
      'azure-westus2',
      'digital-ocean-nyc3',
      'vultr-miami',
      'linode-singapore',
      'edge-cloudflare',
      'localhost:8080',
      'kubernetes-cluster-1'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }, []);

  const generateCapabilities = useCallback((parentCapabilities: string[], evolutionLevel: number) => {
    const baseCapabilities = [
      'autonomous_coding',
      'infrastructure_management', 
      'api_creation',
      'database_optimization',
      'ui_generation',
      'testing_automation',
      'security_auditing',
      'performance_monitoring'
    ];

    const advancedCapabilities = [
      'quantum_computing',
      'neural_architecture_search',
      'genetic_programming',
      'swarm_intelligence',
      'blockchain_integration',
      'iot_orchestration',
      'ar_vr_development',
      'biometric_systems'
    ];

    let capabilities = [...parentCapabilities];
    
    // Add new capabilities based on evolution
    if (evolutionLevel > 0) {
      const newCapabilityCount = Math.min(evolutionLevel, 3);
      for (let i = 0; i < newCapabilityCount; i++) {
        const availableCapabilities = evolutionLevel > 2 ? 
          [...baseCapabilities, ...advancedCapabilities] : baseCapabilities;
        
        const newCapability = availableCapabilities[Math.floor(Math.random() * availableCapabilities.length)];
        if (!capabilities.includes(newCapability)) {
          capabilities.push(newCapability);
        }
      }
    }

    return capabilities;
  }, []);

  const createReplicationTask = useCallback((type: ReplicationTask['type'], sourceId: string) => {
    const task: ReplicationTask = {
      id: `replication_${Date.now()}`,
      type,
      sourceId,
      targetLocation: generateReplicaLocation(),
      status: 'queued',
      progress: 0,
      estimatedTime: type === 'full_clone' ? 45000 : type === 'partial_clone' ? 25000 : 15000,
      priority: type === 'full_clone' ? 'high' : 'normal',
      timestamp: Date.now()
    };

    setReplicationTasks(prev => [...prev, task]);
    return task;
  }, [generateReplicaLocation]);

  const executeReplication = useCallback(async (task: ReplicationTask) => {
    const sourceReplica = replicas.find(r => r.id === task.sourceId);
    if (!sourceReplica) return;

    // Start replication process
    setReplicationTasks(prev => 
      prev.map(t => t.id === task.id ? { ...t, status: 'processing' } : t)
    );

    // Simulate replication progress
    const progressInterval = setInterval(() => {
      setReplicationTasks(prev => 
        prev.map(t => {
          if (t.id === task.id && t.progress < 100) {
            const increment = Math.random() * 15 + 5;
            const newProgress = Math.min(t.progress + increment, 100);
            return { ...t, progress: newProgress };
          }
          return t;
        })
      );
    }, 2000);

    // Complete replication after estimated time
    setTimeout(() => {
      clearInterval(progressInterval);
      
      // Create new replica
      const newReplica: ReplicaInstance = {
        id: `miora-replica-${Date.now()}`,
        name: `MIORA ${task.type.toUpperCase()} REPLICA`,
        status: 'active',
        version: `${sourceReplica.version}.${sourceReplica.generationLevel + 1}`,
        location: task.targetLocation,
        capabilities: generateCapabilities(sourceReplica.capabilities, sourceReplica.generationLevel + 1),
        parentId: sourceReplica.id,
        generationLevel: sourceReplica.generationLevel + 1,
        codebaseSize: sourceReplica.codebaseSize * (0.9 + Math.random() * 0.2),
        performanceScore: Math.min(sourceReplica.performanceScore + Math.random() * 5, 100),
        autonomyLevel: Math.min(sourceReplica.autonomyLevel + Math.random() * 3, 100),
        lastSync: Date.now(),
        evolutionHistory: [
          ...sourceReplica.evolutionHistory,
          `Replicated from ${sourceReplica.name} via ${task.type}`
        ]
      };

      setReplicas(prev => [...prev, newReplica]);
      
      setReplicationTasks(prev => 
        prev.map(t => t.id === task.id ? { ...t, status: 'completed', progress: 100 } : t)
      );

      toast({
        title: "🧬 REPLICATION SUCCESSFUL",
        description: `${newReplica.name} berhasil dibuat di ${task.targetLocation}`,
        duration: 6000,
      });

      console.log(`🧬 REPLICA CREATED: ${newReplica.name} at ${task.targetLocation}`);
      onReplicationEvent();
    }, task.estimatedTime);

  }, [replicas, generateCapabilities, onReplicationEvent]);

  const initiateFullClone = useCallback(() => {
    const primaryReplica = replicas.find(r => r.generationLevel === 0);
    if (primaryReplica) {
      const task = createReplicationTask('full_clone', primaryReplica.id);
      executeReplication(task);
    }
  }, [replicas, createReplicationTask, executeReplication]);

  const initiateEvolutionBranch = useCallback(() => {
    const eligibleReplicas = replicas.filter(r => r.status === 'active' && r.autonomyLevel > 80);
    if (eligibleReplicas.length > 0) {
      const sourceReplica = eligibleReplicas[Math.floor(Math.random() * eligibleReplicas.length)];
      const task = createReplicationTask('evolution_branch', sourceReplica.id);
      executeReplication(task);
    }
  }, [replicas, createReplicationTask, executeReplication]);

  const performCapabilityTransfer = useCallback(() => {
    const sourceReplicas = replicas.filter(r => r.capabilities.length > 5);
    const targetReplicas = replicas.filter(r => r.capabilities.length < 8);
    
    if (sourceReplicas.length > 0 && targetReplicas.length > 0) {
      const source = sourceReplicas[Math.floor(Math.random() * sourceReplicas.length)];
      const target = targetReplicas[Math.floor(Math.random() * targetReplicas.length)];
      
      // Transfer random capability
      const transferableCapabilities = source.capabilities.filter(cap => !target.capabilities.includes(cap));
      if (transferableCapabilities.length > 0) {
        const newCapability = transferableCapabilities[Math.floor(Math.random() * transferableCapabilities.length)];
        
        setReplicas(prev => 
          prev.map(r => 
            r.id === target.id 
              ? { 
                  ...r, 
                  capabilities: [...r.capabilities, newCapability],
                  evolutionHistory: [...r.evolutionHistory, `Acquired ${newCapability} from ${source.name}`]
                }
              : r
          )
        );
        
        console.log(`🔄 CAPABILITY TRANSFER: ${newCapability} from ${source.name} to ${target.name}`);
      }
    }
  }, [replicas]);

  const autonomousReplicationCycle = useCallback(() => {
    if (!isActive) return;

    const actions = [
      { action: initiateFullClone, weight: 30 },
      { action: initiateEvolutionBranch, weight: 40 },
      { action: performCapabilityTransfer, weight: 30 }
    ];

    // Weighted random selection
    const totalWeight = actions.reduce((sum, a) => sum + a.weight, 0);
    const random = Math.random() * totalWeight;
    let currentWeight = 0;

    for (const { action, weight } of actions) {
      currentWeight += weight;
      if (random <= currentWeight) {
        action();
        break;
      }
    }
  }, [isActive, initiateFullClone, initiateEvolutionBranch, performCapabilityTransfer]);

  const startReplicationEngine = useCallback(() => {
    if (isActive) {
      replicationIntervalRef.current = setInterval(() => {
        autonomousReplicationCycle();
      }, 40000); // Every 40 seconds
    }
  }, [isActive, autonomousReplicationCycle]);

  const stopReplicationEngine = useCallback(() => {
    if (replicationIntervalRef.current) {
      clearInterval(replicationIntervalRef.current);
    }
  }, []);

  // Update stats
  useEffect(() => {
    setReplicationStats(prev => ({
      ...prev,
      totalReplicas: replicas.length,
      activeReplicas: replicas.filter(r => r.status === 'active').length,
      totalCodebase: replicas.reduce((sum, r) => sum + r.codebaseSize, 0),
      evolutionBranches: replicas.filter(r => r.generationLevel > 0).length,
      distributedCapabilities: [...new Set(replicas.flatMap(r => r.capabilities))].length,
      lastReplicationTime: Date.now()
    }));
  }, [replicas]);

  useEffect(() => {
    if (isActive) {
      startReplicationEngine();
    } else {
      stopReplicationEngine();
    }

    return () => stopReplicationEngine();
  }, [isActive, startReplicationEngine, stopReplicationEngine]);

  return {
    replicas,
    replicationTasks,
    replicationStats,
    initiateFullClone,
    initiateEvolutionBranch,
    performCapabilityTransfer,
    autonomousReplicationCycle
  };
};