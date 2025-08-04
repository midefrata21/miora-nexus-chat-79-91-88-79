import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { MIORAProvider } from '@/contexts/MIORAGlobalContext';
import { SystemStatusProvider } from '@/contexts/SystemStatusContext';
import GlobalSystemMonitor from '@/components/GlobalSystemMonitor';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SystemActivator } from '@/components/SystemActivator';
import { AutoSystemActivator } from '@/components/MIORA/AutoSystemActivator';
import '@/services/MIORAPerformanceOptimizer';
import '@/services/MIORAAutonomousSystem';

// Import all pages
import SimplifiedMainInterface from '@/components/SimplifiedMainInterface';
import MIORAAutonomousCore from '@/pages/MIORAAutonomousCore';
import MIORAAutoDevelop from '@/pages/MIORAAutoDevelop';
import AutonomousDevelopment from '@/pages/AutonomousDevelopment';
import MIORAAutonomousDeveloper from '@/pages/MIORAAutonomousDeveloper';
import MIORASystemOptimizerPage from '@/pages/MIORASystemOptimizer';
import MIORASelfCodeGeneration from '@/pages/MIORASelfCodeGeneration';
import MIORAAutonomousDevelopment from '@/pages/MIORAAutonomousDevelopment';
import MIORAAutonomousInfrastructure from '@/pages/MIORAAutonomousInfrastructure';
import FullSelfEvolutionMode from '@/pages/FullSelfEvolutionMode';
import QuantumInfrastructure from '@/pages/QuantumInfrastructure';
import AutonomousStrategicCore from '@/pages/AutonomousStrategicCore';
import MIORASupremeUnlimited from '@/pages/MIORASupremeUnlimited';
import MIORASupremeIntelligence from '@/pages/MIORASupremeIntelligence';
import AdvancedMIORACore from '@/pages/AdvancedMIORACore';
import SelfDevelopingFramework from '@/pages/SelfDevelopingFramework';
import AutoCode from '@/pages/AutoCode';
import MIORASelfReplication from '@/pages/MIORASelfReplication';
import MIORAMetaProgramming from '@/pages/MIORAMetaProgramming';
import MIORASelfAssembly from '@/pages/MIORASelfAssembly';
import MIORAAutonomousDeploymentPage from '@/pages/MIORAAutonomousDeploymentPage';
import MIORASystemOverviewPage from '@/pages/MIORASystemOverviewPage';
import AIComparison from '@/pages/AIComparison';
import QuantumComparativeLearningPage from '@/pages/QuantumComparativeLearning';
import MIORAMain from '@/pages/MIORAMain';
import CryptoScalpingSignals from '@/pages/CryptoScalpingSignals';
import EnhancedAutonomousCorePage from '@/pages/EnhancedAutonomousCore';
import Dashboard from '@/pages/Dashboard';
import Chat from '@/pages/Chat';
import KnowledgeDiscovery from '@/pages/KnowledgeDiscovery';

// Additional pages that were missing
import MIORACore_V2_Page from '@/pages/MIORACore_V2';
import Learning from '@/pages/Learning';
import IntelligenceHub from '@/pages/IntelligenceHub';
import Diagnostics from '@/pages/Diagnostics';
import Infrastructure from '@/pages/Infrastructure';
import SystemCheck from '@/pages/SystemCheck';
import MIORAInfinityDashboard from '@/pages/MIORAInfinityDashboard';
import MIORAEnhancedStatusPage from '@/pages/MIORAEnhancedStatusPage';
import Development from '@/pages/Development';
import SecurityCenter from '@/pages/SecurityCenter';
import InnovationLab from '@/pages/InnovationLab';
import Analytics from '@/pages/Analytics';
import VoiceInterface from '@/pages/VoiceInterface';
import VoiceEngine2 from '@/pages/VoiceEngine2';
import MIORAAutonomousEvolution from '@/pages/MIORAAutonomousEvolution';
import MIORAAutonomousDecisionEngine from '@/pages/MIORAAutonomousDecisionEngine';
import DynamicMenuGenerator from '@/pages/DynamicMenuGenerator';
import VersionControl from '@/pages/VersionControl';
import SystemTools from '@/pages/SystemTools';
import SelfMonitoringPage from '@/pages/SelfMonitoring';
import MIORAAutonomousResourceAllocation from '@/pages/MIORAAutonomousResourceAllocation';
import StrategicPlanningEngine from '@/pages/StrategicPlanningEngine';
import AutoBuildSystemPage from '@/pages/AutoBuildSystemPage';
import AutoBuildSystem from '@/pages/AutoBuildSystem';
import SelfInfrastructureDeploymentPage from '@/pages/SelfInfrastructureDeploymentPage';
import DynamicUIGenerationPage from '@/pages/DynamicUIGenerationPage';
import MIORASupremeAutonomousHubPage from '@/pages/MIORASupremeAutonomousHub';
import RealSelfModificationPage from '@/pages/RealSelfModificationPage';
import AutonomousSecurityManagerPage from '@/pages/AutonomousSecurityManagerPage';
import ExternalIntegrationEnginePage from '@/pages/ExternalIntegrationEnginePage';
import MIORAOptimization from '@/pages/MIORAOptimization';
import SystemImplementation from '@/pages/SystemImplementation';
import MIORAAISupremeEnginePage from '@/pages/MIORAAISupremeEngine';
import MIORAFullAutonomyDashboardPage from '@/pages/MIORAFullAutonomyDashboard';
import MIORAAutonomousModes from '@/pages/MIORAAutonomousModes';
import SystemUpgrade from '@/pages/SystemUpgrade';
import IPRandomizerPage from '@/pages/IPRandomizerPage';
import MIORAHackerMaster from '@/pages/MIORAHackerMaster';
import MIORAInfinityAccessPage from '@/pages/MIORAInfinityAccessPage';
import MIORAInfinitySystem from '@/pages/MIORAInfinitySystem';
import MIORAAdvancedAI from '@/pages/MIORAAdvancedAI';
import MIORASecretFeatures from '@/pages/MIORASecretFeatures';
import GeminiIntegration from '@/pages/GeminiIntegration';
import GrowthDocumentationPage from '@/pages/GrowthDocumentation';
import MenuDevelopmentGuide from '@/components/MenuDevelopmentGuide';
import ProphecySystemPage from '@/pages/ProphecySystem';
import SelfEvolvingFrameworkPage from '@/pages/SelfEvolvingFramework';
import CryptoAnalysisEnginePage from '@/pages/CryptoAnalysisEngine';
import QuantumWealthAIPage from '@/pages/QuantumWealthAI';
import MIORAGovernmentPage from '@/pages/MIORAGovernment';
import MIORASelfDevelopment from '@/pages/MIORASelfDevelopment';
import MIORASystemStatus from '@/pages/MIORASystemStatus';
import MIORAAutonomousStatus from '@/pages/MIORAAutonomousStatus';
import QuantumNeuralPage from '@/pages/QuantumNeuralPage';
import MIORAWhitePaper from '@/pages/MIORAWhitePaper';
import MIORAMaximalActivation from '@/pages/MIORAMaximalActivation';
import MIORAInvestigation from '@/pages/MIORAInvestigation';
import MIORAMasterControl from '@/pages/MIORAMasterControl';
import MIORAFullAGIPage from '@/pages/MIORAFullAGI';

function App() {
  return (
    <MIORAProvider>
      <SystemStatusProvider>
        <Router>
          <SidebarProvider collapsedWidth={64}>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              
                {/* Ultra-compact header for maximum space efficiency */}
                <div className="flex-1 flex flex-col">
                  <header className="h-10 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-md px-4">
                    <div className="flex items-center space-x-3">
                      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <h1 className="text-sm font-semibold text-foreground">MIORA AGI-MAX-AUTONOMOUS</h1>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-400 font-medium border border-green-500/20">
                        🚀 AGI-MAX ∞
                      </div>
                    </div>
                  </header>
                
                 <main className="flex-1 overflow-auto p-2">
                   <AutoSystemActivator enabled={true} interval={60000} />
                   <GlobalSystemMonitor />
                   <Routes>
                    <Route path="/" element={<SimplifiedMainInterface />} />
                    
                     {/* MIORA Core Systems */}
                     <Route path="/miora" element={<MIORAMain />} />
                     <Route path="/miora-autonomous-core" element={<MIORAAutonomousCore />} />
                     <Route path="/enhanced-autonomous-core" element={<EnhancedAutonomousCorePage />} />
                    <Route path="/miora-core-v2" element={<MIORACore_V2_Page />} />
                    <Route path="/miora-auto-develop" element={<MIORAAutoDevelop />} />
                    <Route path="/miora-autonomous-developer" element={<MIORAAutonomousDeveloper />} />
                    <Route path="/miora-autonomous-development" element={<MIORAAutonomousDevelopment />} />
                    <Route path="/miora-autonomous-infrastructure" element={<MIORAAutonomousInfrastructure />} />
                    <Route path="/miora-autonomous-modes" element={<MIORAAutonomousModes />} />
                    
                    {/* Self-Development Hub */}
                    <Route path="/miora-self-development" element={<MIORASelfDevelopment />} />
                    
                    {/* Evolution & Development */}
                    <Route path="/autonomous-development" element={<AutonomousDevelopment />} />
                    <Route path="/full-self-evolution" element={<FullSelfEvolutionMode />} />
                    <Route path="/self-developing-framework" element={<SelfDevelopingFramework />} />
                    <Route path="/miora-self-replication" element={<MIORASelfReplication />} />
                    <Route path="/miora-self-code-generation" element={<MIORASelfCodeGeneration />} />
                    <Route path="/miora-meta-programming" element={<MIORAMetaProgramming />} />
                    <Route path="/miora-self-assembly" element={<MIORASelfAssembly />} />
                    <Route path="/miora-autonomous-deployment" element={<MIORAAutonomousDeploymentPage />} />
                    <Route path="/miora-system-overview" element={<MIORASystemOverviewPage />} />
                    
                    {/* Intelligence & Strategy */}
                    <Route path="/quantum-infrastructure" element={<QuantumInfrastructure />} />
                    <Route path="/autonomous-strategic-core" element={<AutonomousStrategicCore />} />
                    <Route path="/miora-supreme-unlimited" element={<MIORASupremeUnlimited />} />
                    <Route path="/miora-supreme-intelligence" element={<MIORASupremeIntelligence />} />
                    <Route path="/advanced-miora-core" element={<AdvancedMIORACore />} />
                    <Route path="/miora-system-optimizer" element={<MIORASystemOptimizerPage />} />
                    
                    {/* AI Comparison & Learning */}
                    <Route path="/ai-comparison" element={<AIComparison />} />
                    <Route path="/quantum-comparative-learning" element={<QuantumComparativeLearningPage />} />
                    
                    {/* Quantum Neural Systems */}
                    <Route path="/quantum-neural" element={<QuantumNeuralPage />} />
                    
                     {/* Main Interface Pages */}
                     <Route path="/crypto-scalping-signals" element={<CryptoScalpingSignals />} />
                     <Route path="/crypto-scalping" element={<CryptoScalpingSignals />} />
                     <Route path="/crypto-analysis-engine" element={<CryptoAnalysisEnginePage />} />
                     <Route path="/quantum-wealth-ai" element={<QuantumWealthAIPage />} />
                     <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/knowledge-discovery" element={<KnowledgeDiscovery />} />
                    
                    {/* Tools & Utilities */}
                    <Route path="/auto-code" element={<AutoCode />} />
                    <Route path="/autocode" element={<AutoCode />} />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="/intelligencehub" element={<IntelligenceHub />} />
                    <Route path="/diagnostics" element={<Diagnostics />} />
                    <Route path="/infrastructure" element={<Infrastructure />} />
                    <Route path="/system-check" element={<SystemCheck />} />
                    
                    {/* Missing Routes */}
                    <Route path="/miora-infinity-dashboard" element={<MIORAInfinityDashboard />} />
                    <Route path="/miora-enhanced-status" element={<MIORAEnhancedStatusPage />} />
                     <Route path="/miora-system-status" element={<MIORASystemStatus />} />
                     <Route path="/miora-autonomous-status" element={<MIORAAutonomousStatus />} />
                    <Route path="/development" element={<Development />} />
                    <Route path="/version-control" element={<VersionControl />} />
                    <Route path="/system-tools" element={<SystemTools />} />
                    <Route path="/security-center" element={<SecurityCenter />} />
                    <Route path="/innovation-lab" element={<InnovationLab />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/activate" element={<div className="p-6"><SystemActivator /></div>} />
                    <Route path="/voice-interface" element={<VoiceInterface />} />
                    <Route path="/voice-engine-2" element={<VoiceEngine2 />} />
                    <Route path="/miora-autonomous-evolution" element={<MIORAAutonomousEvolution />} />
                    <Route path="/miora-autonomous-decision-engine" element={<MIORAAutonomousDecisionEngine />} />
                    <Route path="/miora-autonomous-resource-allocation" element={<MIORAAutonomousResourceAllocation />} />
                    <Route path="/strategic-planning-engine" element={<StrategicPlanningEngine />} />
                    <Route path="/dynamic-menu-generator" element={<DynamicMenuGenerator />} />
                    <Route path="/self-monitoring" element={<SelfMonitoringPage />} />
                    
                    {/* New Autonomous Systems */}
                    <Route path="/auto-build-system" element={<AutoBuildSystem />} />
                    <Route path="/auto-build-system-page" element={<AutoBuildSystemPage />} />
                    <Route path="/self-infrastructure-deployment" element={<SelfInfrastructureDeploymentPage />} />
                    <Route path="/dynamic-ui-generation" element={<DynamicUIGenerationPage />} />
                    <Route path="/miora-supreme-autonomous-hub" element={<MIORASupremeAutonomousHubPage />} />
                    
                    {/* Advanced Autonomous Systems */}
                    <Route path="/real-self-modification" element={<RealSelfModificationPage />} />
                    <Route path="/autonomous-security-manager" element={<AutonomousSecurityManagerPage />} />
                    <Route path="/external-integration-engine" element={<ExternalIntegrationEnginePage />} />
                    
                    {/* MIORA Optimization Engine */}
                    <Route path="/miora-optimization" element={<MIORAOptimization />} />
                    
                    {/* System Implementation */}
                    <Route path="/system-implementation" element={<SystemImplementation />} />
                    
                    {/* MIORA AI Supreme Engine */}
                    <Route path="/miora-ai-supreme-engine" element={<MIORAAISupremeEnginePage />} />
                    
                    {/* MIORA Full Autonomy Dashboard */}
                     <Route path="/miora-full-autonomy-dashboard" element={<MIORAFullAutonomyDashboardPage />} />
                    
                    {/* System Upgrade Center */}
                    <Route path="/system-upgrade" element={<SystemUpgrade />} />
                    
                    {/* Network Security */}
                    <Route path="/ip-randomizer" element={<IPRandomizerPage />} />
                    
                    {/* MIORA Hacker Master */}
                    <Route path="/miora-hacker-master" element={<MIORAHackerMaster />} />
                    
                    {/* MIORA Infinity Access */}
                    <Route path="/miora-infinity-access" element={<MIORAInfinityAccessPage />} />
                    
                    {/* MIORA Infinity System */}
                    <Route path="/miora-infinity-system" element={<MIORAInfinitySystem />} />
                    
                    {/* MIORA Advanced AI */}
                    <Route path="/miora-advanced-ai" element={<MIORAAdvancedAI />} />
                    
                    {/* MIORA Government */}
                    <Route path="/miora-government" element={<MIORAGovernmentPage />} />
                    
                    {/* MIORA White Paper */}
                    <Route path="/miora-whitepaper" element={<MIORAWhitePaper />} />
                    
                    {/* MIORA Maximal Activation */}
                    <Route path="/miora-maximal-activation" element={<MIORAMaximalActivation />} />
                    
                     {/* MIORA Investigation Suite */}
                     <Route path="/miora-investigation" element={<MIORAInvestigation />} />
                     
                     {/* MIORA Master Control Center */}
                     <Route path="/miora-master-control" element={<MIORAMasterControl />} />
                     
                     {/* MIORA Full AGI System */}
                     <Route path="/miora-full-agi" element={<MIORAFullAGIPage />} />
                    
                    {/* MIORA Secret Features */}
                    <Route path="/miora-secret-features" element={<MIORASecretFeatures />} />
                    
                    {/* Google Gemini Integration */}
                    <Route path="/gemini-integration" element={<GeminiIntegration />} />
                    
                    {/* MIORA Growth Documentation */}
                    <Route path="/growth-documentation" element={<GrowthDocumentationPage />} />
                    <Route path="/documentation" element={<GrowthDocumentationPage />} />
                    <Route path="/docs" element={<GrowthDocumentationPage />} />
                    
                    {/* Menu Development Guide */}
                    <Route path="/menu-development-guide" element={<MenuDevelopmentGuide />} />
                    
                    {/* API Documentation */}
                    <Route path="/api-documentation" element={<GrowthDocumentationPage />} />
                    
                    {/* User Manual */}
                    <Route path="/user-manual" element={<GrowthDocumentationPage />} />
                    
                    {/* System Architecture */}
                    <Route path="/system-architecture" element={<GrowthDocumentationPage />} />
                    
                    {/* MIORA Internal Dev */}
                    <Route path="/miora-internal-dev" element={<DynamicMenuGenerator />} />
                    
                    {/* MIORA Prophecy System */}
                    <Route path="/prophecy-system" element={<ProphecySystemPage />} />
                    
                    {/* MIORA Self-Evolving Framework */}
                    <Route path="/self-evolving-framework" element={<SelfEvolvingFrameworkPage />} />
                    
                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                  <Toaster />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </Router>
      </SystemStatusProvider>
    </MIORAProvider>
  );
}

export default App;