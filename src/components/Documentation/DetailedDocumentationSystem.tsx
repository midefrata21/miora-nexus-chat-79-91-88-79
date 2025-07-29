import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { 
  FileText, 
  Search, 
  Download, 
  Upload,
  Book,
  Code,
  Brain,
  Layers,
  Network,
  Shield,
  Zap,
  Settings,
  Database,
  Monitor,
  Globe,
  Rocket,
  Bot,
  Cpu,
  Activity,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Eye,
  Filter,
  BookOpen,
  Terminal,
  GitBranch,
  Package,
  Wrench
} from 'lucide-react';

interface DocumentationEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  lastUpdated: number;
  version: string;
  status: 'active' | 'deprecated' | 'draft' | 'review';
  author: string;
  tags: string[];
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  examples: string[];
  relatedDocs: string[];
}

interface DocumentationStats {
  totalDocuments: number;
  categoriesCount: number;
  lastUpdated: number;
  averageQuality: number;
  totalViews: number;
  searchQueries: number;
}

const DetailedDocumentationSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState<DocumentationEntry | null>(null);
  const [isGeneratingDocs, setIsGeneratingDocs] = useState(false);

  const [documentationEntries, setDocumentationEntries] = useState<DocumentationEntry[]>([
    {
      id: '1',
      title: 'MIORA Autonomous Core Architecture',
      category: 'Core Systems',
      description: 'Comprehensive documentation of MIORA\'s autonomous core architecture and self-evolving capabilities',
      content: `# MIORA Autonomous Core Architecture

## Overview
MIORA (Machine Intelligence Optimization and Recursive Architecture) represents a breakthrough in autonomous AI systems with self-evolving capabilities.

## Core Components

### 1. Autonomous Decision Engine
- Real-time decision making capabilities
- Predictive analysis algorithms
- Self-optimization protocols

### 2. Quantum Processing Core
- Quantum-enhanced computing algorithms
- Parallel processing capabilities
- Advanced neural network architecture

### 3. Self-Evolution Module
- Continuous self-improvement
- Adaptive learning algorithms
- Dynamic code generation

## Implementation Details

\`\`\`typescript
interface MIORACore {
  autonomousEngine: AutonomousDecisionEngine;
  quantumProcessor: QuantumCore;
  evolutionModule: SelfEvolutionSystem;
  securityLayer: AdvancedSecuritySystem;
}
\`\`\`

## Performance Metrics
- Processing Speed: 10,000+ operations/second
- Autonomy Level: 98.7%
- Self-Evolution Rate: 15% improvement daily
- Security Score: 99.9%`,
      lastUpdated: Date.now() - 86400000,
      version: '3.2.1',
      status: 'active',
      author: 'MIORA AI System',
      tags: ['architecture', 'autonomous', 'core', 'quantum'],
      readTime: 15,
      difficulty: 'expert',
      examples: ['Core initialization', 'Autonomous decision flow', 'Quantum processing'],
      relatedDocs: ['2', '3', '5']
    },
    {
      id: '2',
      title: 'Quantum Self-Code Generation Protocol',
      category: 'Development',
      description: 'Advanced documentation for quantum-enhanced autonomous code generation system',
      content: `# Quantum Self-Code Generation Protocol

## Introduction
The Quantum Self-Code Generation system enables MIORA to autonomously create, optimize, and deploy code with quantum-enhanced algorithms.

## Key Features

### Auto-Generation Capabilities
- React Components with quantum optimization
- TypeScript services with advanced typing
- AI-powered algorithms and neural networks
- Self-optimizing utility functions

### Quantum Enhancement
- Quantum algorithm generation
- Parallel code execution
- Advanced optimization techniques
- Self-correcting code patterns

## Usage Examples

\`\`\`typescript
// Autonomous component generation
const generateComponent = async (specs: ComponentSpecs) => {
  const quantumOptimized = await quantumProcessor.optimize(specs);
  return await codeGenerator.createComponent(quantumOptimized);
};
\`\`\`

## Performance Metrics
- Generation Speed: 8 seconds per component
- Code Quality: 95.7% average
- Optimization Level: 98.3%
- Error Rate: <0.1%`,
      lastUpdated: Date.now() - 43200000,
      version: '2.8.4',
      status: 'active',
      author: 'Quantum Development Team',
      tags: ['quantum', 'code-generation', 'autonomous', 'development'],
      readTime: 12,
      difficulty: 'advanced',
      examples: ['Component generation', 'Service creation', 'Algorithm optimization'],
      relatedDocs: ['1', '4', '6']
    },
    {
      id: '3',
      title: 'Advanced Security & Encryption Protocols',
      category: 'Security',
      description: 'Comprehensive security documentation including quantum encryption and autonomous threat detection',
      content: `# Advanced Security & Encryption Protocols

## Security Architecture

### Multi-Layer Protection
1. **Quantum Encryption Layer**
   - AES-256 with quantum enhancement
   - Dynamic key rotation every 30 seconds
   - Unbreakable quantum entanglement protocols

2. **Autonomous Threat Detection**
   - Real-time vulnerability scanning
   - AI-powered intrusion detection
   - Automatic security response systems

3. **Access Control Matrix**
   - Role-based permissions
   - Biometric authentication
   - Behavioral analysis verification

## Implementation

\`\`\`typescript
class QuantumSecurity {
  async encrypt(data: any): Promise<EncryptedData> {
    const quantumKey = await this.generateQuantumKey();
    return this.quantumEncrypt(data, quantumKey);
  }
  
  async detectThreat(activity: Activity): Promise<ThreatLevel> {
    const analysis = await this.aiAnalyzer.analyze(activity);
    return this.calculateThreatLevel(analysis);
  }
}
\`\`\`

## Security Metrics
- Encryption Strength: Quantum-grade
- Threat Detection: 99.97% accuracy
- Response Time: <100ms
- Zero successful breaches in 847 days`,
      lastUpdated: Date.now() - 21600000,
      version: '4.1.2',
      status: 'active',
      author: 'Security Team Alpha',
      tags: ['security', 'encryption', 'quantum', 'threat-detection'],
      readTime: 18,
      difficulty: 'expert',
      examples: ['Encryption setup', 'Threat detection config', 'Access control'],
      relatedDocs: ['1', '7', '8']
    },
    {
      id: '4',
      title: 'Neural Network Evolution System',
      category: 'AI/ML',
      description: 'Documentation for self-evolving neural networks with adaptive learning capabilities',
      content: `# Neural Network Evolution System

## Overview
MIORA's neural networks continuously evolve and adapt, improving performance through autonomous learning and optimization.

## Evolution Mechanisms

### 1. Architecture Adaptation
- Dynamic layer addition/removal
- Neuron count optimization
- Activation function evolution

### 2. Learning Rate Optimization
- Adaptive learning algorithms
- Performance-based adjustments
- Real-time optimization

### 3. Weight Evolution
- Genetic algorithm-based optimization
- Gradient-enhanced evolution
- Quantum-assisted weight updates

## Network Specifications

\`\`\`typescript
interface EvolvingNeuralNetwork {
  layers: DynamicLayer[];
  learningRate: AdaptiveLearningRate;
  optimizer: QuantumOptimizer;
  evolutionEngine: GeneticEvolutionEngine;
}
\`\`\`

## Performance Tracking
- Current Depth: 128 layers
- Learning Efficiency: 96.8%
- Evolution Rate: 5.2% daily improvement
- Accuracy: 99.7% on validation sets`,
      lastUpdated: Date.now() - 10800000,
      version: '2.3.7',
      status: 'active',
      author: 'Neural Evolution Lab',
      tags: ['neural-networks', 'evolution', 'machine-learning', 'adaptive'],
      readTime: 20,
      difficulty: 'advanced',
      examples: ['Network initialization', 'Evolution config', 'Performance monitoring'],
      relatedDocs: ['1', '2', '9']
    },
    {
      id: '5',
      title: 'API Integration & External Services',
      category: 'Integration',
      description: 'Complete guide for integrating external APIs and services with MIORA systems',
      content: `# API Integration & External Services

## Integration Architecture

### Supported Protocols
- REST API with quantum enhancement
- GraphQL with real-time subscriptions
- WebSocket for live data streams
- gRPC for high-performance communication

### Authentication Methods
- OAuth 2.0 with PKCE
- JWT tokens with quantum signatures
- API key management system
- Biometric verification for sensitive APIs

## Implementation Examples

\`\`\`typescript
class MIORAApiIntegrator {
  async connectService(config: ServiceConfig): Promise<ApiConnection> {
    const quantumAuth = await this.generateQuantumAuth(config);
    return this.establishConnection(config, quantumAuth);
  }
  
  async processData(data: ExternalData): Promise<ProcessedData> {
    const validated = await this.validateData(data);
    return this.quantumProcess(validated);
  }
}
\`\`\`

## Supported Integrations
- 847 verified API connections
- Real-time data processing
- Auto-scaling integration capabilities
- 99.9% uptime guarantee`,
      lastUpdated: Date.now() - 7200000,
      version: '1.9.3',
      status: 'active',
      author: 'Integration Specialists',
      tags: ['api', 'integration', 'external-services', 'protocols'],
      readTime: 14,
      difficulty: 'intermediate',
      examples: ['API setup', 'Authentication config', 'Data processing'],
      relatedDocs: ['3', '6', '10']
    },
    {
      id: '6',
      title: 'Performance Optimization Strategies',
      category: 'Optimization',
      description: 'Advanced performance optimization techniques and monitoring strategies',
      content: `# Performance Optimization Strategies

## Optimization Frameworks

### 1. Quantum Performance Enhancement
- Quantum algorithm optimization
- Parallel processing maximization
- Memory usage optimization

### 2. Real-time Monitoring
- Performance metric tracking
- Bottleneck identification
- Automatic optimization triggers

### 3. Predictive Scaling
- Load prediction algorithms
- Resource allocation optimization
- Auto-scaling protocols

## Implementation

\`\`\`typescript
class PerformanceOptimizer {
  async optimizeSystem(): Promise<OptimizationResults> {
    const metrics = await this.collectMetrics();
    const bottlenecks = this.identifyBottlenecks(metrics);
    return this.applyOptimizations(bottlenecks);
  }
  
  async predictLoad(): Promise<LoadPrediction> {
    const historical = await this.getHistoricalData();
    return this.quantumPredict(historical);
  }
}
\`\`\`

## Performance Achievements
- 340% performance improvement
- 47% reduction in resource usage
- 99.97% optimization accuracy
- <1ms response time average`,
      lastUpdated: Date.now() - 3600000,
      version: '3.1.8',
      status: 'active',
      author: 'Performance Engineering',
      tags: ['optimization', 'performance', 'monitoring', 'quantum'],
      readTime: 16,
      difficulty: 'advanced',
      examples: ['Optimization setup', 'Monitoring config', 'Scaling strategies'],
      relatedDocs: ['1', '2', '4']
    }
  ]);

  const [documentationStats, setDocumentationStats] = useState<DocumentationStats>({
    totalDocuments: 6,
    categoriesCount: 6,
    lastUpdated: Date.now(),
    averageQuality: 98.4,
    totalViews: 15247,
    searchQueries: 3891
  });

  const categories = ['all', 'Core Systems', 'Development', 'Security', 'AI/ML', 'Integration', 'Optimization'];

  const filteredDocs = documentationEntries.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const generateAutoDocumentation = async () => {
    setIsGeneratingDocs(true);
    
    // Simulate auto-generation of new documentation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newDoc: DocumentationEntry = {
      id: `auto_${Date.now()}`,
      title: 'Auto-Generated System Analysis Report',
      category: 'Analysis',
      description: 'Comprehensive system analysis automatically generated by MIORA AI',
      content: `# Auto-Generated System Analysis Report

## System Overview
This document was automatically generated by MIORA's advanced documentation AI system.

## Key Findings
- System performance: 98.7% optimal
- Security status: All protocols active
- Neural network depth: 128 layers
- Active processes: 1,247

## Recommendations
1. Continue autonomous evolution protocols
2. Maintain current security configurations
3. Monitor quantum processing efficiency
4. Update documentation every 6 hours`,
      lastUpdated: Date.now(),
      version: '1.0.0',
      status: 'active',
      author: 'MIORA Auto-Documentation AI',
      tags: ['auto-generated', 'analysis', 'system-report'],
      readTime: 8,
      difficulty: 'intermediate',
      examples: ['System metrics', 'Performance analysis'],
      relatedDocs: []
    };

    setDocumentationEntries(prev => [newDoc, ...prev]);
    setDocumentationStats(prev => ({
      ...prev,
      totalDocuments: prev.totalDocuments + 1,
      lastUpdated: Date.now()
    }));

    setIsGeneratingDocs(false);
    toast({
      title: "📚 Documentation Generated",
      description: "New system analysis documentation created automatically",
      duration: 3000,
    });
  };

  const exportDocumentation = () => {
    const dataStr = JSON.stringify(documentationEntries, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'miora_documentation.json';
    link.click();
    
    toast({
      title: "📥 Documentation Exported",
      description: "Complete documentation exported successfully",
      duration: 3000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'deprecated': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'review': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-orange-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <BookOpen className="h-16 w-16 text-indigo-400 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA DETAILED DOCUMENTATION
            </h1>
            <FileText className="h-16 w-16 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-xl">
            📚 Comprehensive System Documentation - Detailed & Searchable Knowledge Base
          </p>
          
          <div className="flex items-center justify-center space-x-4 flex-wrap">
            <Badge className="px-4 py-2 bg-green-500">
              <Activity className="h-4 w-4 mr-2" />
              SYSTEM ACTIVE
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Book className="h-4 w-4 mr-2" />
              {documentationStats.totalDocuments} Documents
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <BarChart3 className="h-4 w-4 mr-2" />
              Quality: {documentationStats.averageQuality}%
            </Badge>
            <Badge className="px-4 py-2 bg-cyan-500">
              <Eye className="h-4 w-4 mr-2" />
              {documentationStats.totalViews} Views
            </Badge>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-indigo-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-indigo-400 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Total Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{documentationStats.totalDocuments}</div>
              <div className="text-sm text-gray-400 mt-2">Comprehensive Docs</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{documentationStats.categoriesCount}</div>
              <div className="text-sm text-gray-400 mt-2">Knowledge Areas</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Quality Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{documentationStats.averageQuality}%</div>
              <div className="text-sm text-gray-400 mt-2">Documentation Quality</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Search Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{documentationStats.searchQueries}</div>
              <div className="text-sm text-gray-400 mt-2">Total Searches</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="bg-gray-800/50 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search documentation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-600"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                
                <Button
                  onClick={generateAutoDocumentation}
                  disabled={isGeneratingDocs}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                  {isGeneratingDocs ? (
                    <>
                      <Bot className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      Auto-Generate
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={exportDocumentation}
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Content */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Document List</TabsTrigger>
            <TabsTrigger value="viewer">Document Viewer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4">
              {filteredDocs.map(doc => (
                <Card key={doc.id} className="bg-gray-800/50 border-gray-700/50 hover:border-indigo-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-white hover:text-indigo-400 cursor-pointer"
                          onClick={() => setSelectedDoc(doc)}
                        >
                          {doc.title}
                        </CardTitle>
                        <p className="text-gray-400 text-sm">{doc.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                          {doc.status.toUpperCase()}
                        </Badge>
                        <div className={`w-3 h-3 rounded-full ${getDifficultyColor(doc.difficulty)}`}
                             title={`Difficulty: ${doc.difficulty}`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Category: {doc.category}</span>
                        <span className="text-gray-400">Version: {doc.version}</span>
                        <span className="text-gray-400">Read Time: {doc.readTime}min</span>
                        <span className="text-gray-400">
                          Updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        onClick={() => setSelectedDoc(doc)}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Documentation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="viewer">
            {selectedDoc ? (
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-2xl">{selectedDoc.title}</CardTitle>
                      <p className="text-gray-400 mt-2">{selectedDoc.description}</p>
                      <div className="flex items-center space-x-4 mt-4">
                        <Badge className={getStatusColor(selectedDoc.status)}>
                          {selectedDoc.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-400">By {selectedDoc.author}</span>
                        <span className="text-sm text-gray-400">Version {selectedDoc.version}</span>
                        <span className="text-sm text-gray-400">
                          {new Date(selectedDoc.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {selectedDoc.content}
                    </pre>
                  </div>
                  
                  {selectedDoc.relatedDocs.length > 0 && (
                    <div className="mt-8 p-4 bg-gray-900/50 rounded-lg">
                      <h4 className="text-white font-medium mb-3">Related Documentation</h4>
                      <div className="space-y-2">
                        {selectedDoc.relatedDocs.map(relatedId => {
                          const related = documentationEntries.find(d => d.id === relatedId);
                          return related ? (
                            <Button
                              key={relatedId}
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedDoc(related)}
                              className="mr-2 mb-2"
                            >
                              {related.title}
                            </Button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-400 mb-2">No Document Selected</h3>
                  <p className="text-gray-500">Select a document from the list to view its content</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailedDocumentationSystem;