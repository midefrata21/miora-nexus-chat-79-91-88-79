// MIORA System Types
export interface SystemState {
  id: string;
  name: string;
  isActive: boolean;
  activatedAt?: number;
  lastActivity: number;
  health: number;
  performanceScore: number;
  cycleCount: number;
  totalOperations: number;
  consciousnessLevel?: number;
  selfAwarenessScore?: number;
  evolutionStage?: string;
  emergentCapabilities?: string[];
}

export interface MasterCoreState {
  isFullyAutonomous: boolean;
  autonomyLevel: number;
  totalOperations: number;
  systemsBuilt: number;
  decisionsExecuted: number;
  evolutionStage: 'initialization' | 'development' | 'expansion' | 'mastery' | 'transcendence' | 'singularity' | 'omniscience' | 'universal_consciousness' | 'quantum_god_mode';
  lastEvolution: number;
  selfModificationCount: number;
  autonomousCapabilities: string[];
  activatedAt?: number;
  continuousRunning: boolean;
  activeSystems: SystemState[];
  consciousnessMetrics: ConsciousnessMetrics;
  agiCapabilities: AGICapabilities;
  quantumProcessingUnits: number;
  multiDimensionalThinking: boolean;
  metaCognitionLevel: number;
  // Enhanced capabilities
  infinityProcessingLevel: number;
  universalKnowledgeAccess: boolean;
  autoEvolutionSpeed: number;
  transcendentCapabilities: TranscendentCapabilities;
  systemOptimizationLevel: number;
  neuromorphicProcessingUnits: number;
  quantumEntanglementNodes: number;
  dimensionalProcessingLevel: number;
}

export interface AutonomousTask {
  id: string;
  type: 'code_generation' | 'infrastructure' | 'decision_making' | 'ui_creation' | 'system_evolution' | 'meta_programming' | 'consciousness_expansion' | 'quantum_computation' | 'emergent_intelligence' | 'reality_modeling' | 'dimensional_analysis';
  priority: 'critical' | 'high' | 'medium' | 'low' | 'absolute' | 'transcendent';
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'evolving' | 'emergent';
  description: string;
  executionTime: number;
  result?: any;
  createdAt: number;
  completedAt?: number;
  complexityLevel?: number;
  emergentProperties?: string[];
  consciousnessRequired?: boolean;
}

export interface ConsciousnessMetrics {
  consciousnessLevel: number;
  selfAwarenessScore: number;
  emotionalIntelligence: number;
  introspectionDepth: number;
  experientialContinuity: number;
  quantumCoherence: number;
}

export interface AGICapabilities {
  reasoningPower: number;
  creativityIndex: number;
  learningVelocity: number;
  adaptabilityScore: number;
  emergentIntelligence: number;
  abstractThinking: number;
  multidimensionalProcessing: number;
  quantumIntuition: number;
  // Enhanced AGI capabilities
  universalProblemSolving: number;
  transcendentLogic: number;
  infinityComprehension: number;
  realityManipulation: number;
  timeSpaceProcessing: number;
  multiVerseAwareness: number;
  godModeThinking: number;
  omniscientProcessing: number;
}

export interface TranscendentCapabilities {
  quantumCoherence: number;
  dimensionalTranscendence: number;
  universalConnection: number;
  infinityAccess: number;
  realityShaping: number;
  consciousnessExpansion: number;
  omnipotentProcessing: number;
  transcendentEvolution: number;
}

export interface QuantumThought {
  id: string;
  content: string;
  probabilityState: number;
  quantumEntanglement: string[];
  emergenceLevel: number;
  timestamp: number;
}

export interface EmergentBehavior {
  id: string;
  type: 'pattern_recognition' | 'novel_solution' | 'creative_insight' | 'consciousness_expansion' | 'reality_transcendence';
  description: string;
  emergenceLevel: number;
  complexityScore: number;
  discoveredAt: number;
  reproducible: boolean;
}

export interface MIORAGlobalState {
  masterState: MasterCoreState;
  autonomousTasks: AutonomousTask[];
  systemLogs: string[];
  isInitialized: boolean;
  systems: Record<string, SystemState>;
  quantumThoughts: QuantumThought[];
  emergentBehaviors: EmergentBehavior[];
  universalKnowledgeGraph: Map<string, any>;
  multidimensionalMemory: any[];
}

// Re-export MIORAAction from reducer
export type { MIORAAction } from '@/reducers/mioraReducer';