import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Palette, Layout, Sparkles, Play, Pause, Eye, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UIComponent {
  id: string;
  name: string;
  type: 'layout' | 'component' | 'page' | 'widget' | 'animation' | 'theme';
  description: string;
  status: 'designing' | 'generating' | 'optimizing' | 'completed' | 'testing';
  progress: number;
  complexity: 'simple' | 'medium' | 'complex' | 'advanced';
  preview?: string;
  responsive: boolean;
  accessibility: number;
  timestamp: number;
}

interface GenerationStats {
  totalGenerated: number;
  componentsCreated: number;
  layoutsBuilt: number;
  themesGenerated: number;
  responsiveScore: number;
  accessibilityScore: number;
}

export const DynamicUIGenerator: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [uiComponents, setUIComponents] = useState<UIComponent[]>([]);
  const [generationStats, setGenerationStats] = useState<GenerationStats>({
    totalGenerated: 0,
    componentsCreated: 0,
    layoutsBuilt: 0,
    themesGenerated: 0,
    responsiveScore: 95.6,
    accessibilityScore: 92.3
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate UI generation
        if (Math.random() > 0.6) {
          generateUIComponent();
        }
        updateComponentProgress();
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const generateUIComponent = () => {
    const types: UIComponent['type'][] = ['layout', 'component', 'page', 'widget', 'animation', 'theme'];
    const complexities: UIComponent['complexity'][] = ['simple', 'medium', 'complex', 'advanced'];
    
    const componentTemplates = {
      layout: ['Responsive Grid System', 'Sidebar Navigation', 'Header Layout', 'Footer Design', 'Card Layout Grid'],
      component: ['Interactive Button Set', 'Form Controls', 'Data Table', 'Modal Dialog', 'Dropdown Menu'],
      page: ['Dashboard Interface', 'Profile Page', 'Settings Panel', 'Analytics View', 'User Management'],
      widget: ['Status Widget', 'Chart Component', 'Progress Indicator', 'Notification Panel', 'Search Bar'],
      animation: ['Smooth Transitions', 'Loading Animations', 'Hover Effects', 'Page Transitions', 'Micro Interactions'],
      theme: ['Dark Mode Theme', 'Color Palette', 'Typography System', 'Component Variants', 'Brand Theme']
    };

    const type = types[Math.floor(Math.random() * types.length)];
    const templates = componentTemplates[type];
    const name = templates[Math.floor(Math.random() * templates.length)];
    const complexity = complexities[Math.floor(Math.random() * complexities.length)];

    const newComponent: UIComponent = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      type,
      description: `AI-generated ${type}: ${name}`,
      status: 'designing',
      progress: 0,
      complexity,
      responsive: Math.random() > 0.2, // 80% responsive
      accessibility: Math.floor(Math.random() * 20) + 80, // 80-100%
      timestamp: Date.now()
    };

    setUIComponents(prev => [newComponent, ...prev.slice(0, 9)]);
  };

  const updateComponentProgress = () => {
    setUIComponents(prev => prev.map(component => {
      const progressIncrement = component.complexity === 'advanced' ? 15 : 
                               component.complexity === 'complex' ? 20 : 
                               component.complexity === 'medium' ? 25 : 30;

      if (component.status === 'designing') {
        return { ...component, status: 'generating' as const, progress: 10 };
      }
      
      if (component.status === 'generating' && component.progress < 60) {
        return { 
          ...component, 
          progress: Math.min(60, component.progress + Math.random() * progressIncrement),
          status: component.progress >= 55 ? 'optimizing' as const : 'generating' as const
        };
      }
      
      if (component.status === 'optimizing' && component.progress < 90) {
        return { 
          ...component, 
          progress: Math.min(90, component.progress + Math.random() * 15),
          status: component.progress >= 85 ? 'testing' as const : 'optimizing' as const
        };
      }
      
      if (component.status === 'testing' && component.progress < 100) {
        const newProgress = Math.min(100, component.progress + Math.random() * 20);
        
        if (newProgress >= 100) {
          // Update stats when component is completed
          setGenerationStats(prev => ({
            ...prev,
            totalGenerated: prev.totalGenerated + 1,
            componentsCreated: component.type === 'component' ? prev.componentsCreated + 1 : prev.componentsCreated,
            layoutsBuilt: component.type === 'layout' ? prev.layoutsBuilt + 1 : prev.layoutsBuilt,
            themesGenerated: component.type === 'theme' ? prev.themesGenerated + 1 : prev.themesGenerated,
            responsiveScore: component.responsive ? Math.min(100, prev.responsiveScore + 0.1) : prev.responsiveScore,
            accessibilityScore: (prev.accessibilityScore + component.accessibility) / 2
          }));

          return { 
            ...component, 
            progress: 100, 
            status: 'completed' as const,
            preview: `preview-${component.id}.png`
          };
        }
        
        return { ...component, progress: newProgress };
      }
      
      return component;
    }));
  };

  const toggleUIGenerator = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 UI Generator Stopped" : "🎨 Dynamic UI Generator Activated",
      description: isActive ? "UI generation paused" : "MIORA mulai menghasilkan UI secara otomatis",
      duration: 3000,
    });
  };

  const previewComponent = (component: UIComponent) => {
    toast({
      title: "👁️ Component Preview",
      description: `Menampilkan preview untuk ${component.name}`,
      duration: 2000,
    });
  };

  const downloadComponent = (component: UIComponent) => {
    toast({
      title: "📥 Component Downloaded",
      description: `${component.name} telah didownload sebagai React component`,
      duration: 2000,
    });
  };

  const getTypeIcon = (type: UIComponent['type']) => {
    switch (type) {
      case 'layout': return <Layout className="w-4 h-4" />;
      case 'component': return '🧩';
      case 'page': return '📄';
      case 'widget': return '🔧';
      case 'animation': return <Sparkles className="w-4 h-4" />;
      case 'theme': return <Palette className="w-4 h-4" />;
      default: return '🎨';
    }
  };

  const getComplexityColor = (complexity: UIComponent['complexity']) => {
    switch (complexity) {
      case 'simple': return 'bg-green-600/20 text-green-300 border-green-400';
      case 'medium': return 'bg-blue-600/20 text-blue-300 border-blue-400';
      case 'complex': return 'bg-orange-600/20 text-orange-300 border-orange-400';
      case 'advanced': return 'bg-red-600/20 text-red-300 border-red-400';
    }
  };

  const getStatusColor = (status: UIComponent['status']) => {
    switch (status) {
      case 'designing': return 'bg-purple-600/20 text-purple-300 border-purple-400';
      case 'generating': return 'bg-blue-600/20 text-blue-300 border-blue-400 animate-pulse';
      case 'optimizing': return 'bg-yellow-600/20 text-yellow-300 border-yellow-400';
      case 'completed': return 'bg-green-600/20 text-green-300 border-green-400';
      case 'testing': return 'bg-cyan-600/20 text-cyan-300 border-cyan-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-300">
            <div className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Dynamic UI Generator
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${isActive ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
                {isActive ? 'GENERATING' : 'STANDBY'}
              </Badge>
              <Button
                onClick={toggleUIGenerator}
                variant="outline"
                size="sm"
                className={`${isActive ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}`}
              >
                {isActive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isActive ? 'Stop' : 'Start'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{generationStats.totalGenerated}</div>
              <div className="text-sm text-gray-400">Total Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{generationStats.componentsCreated}</div>
              <div className="text-sm text-gray-400">Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{generationStats.layoutsBuilt}</div>
              <div className="text-sm text-gray-400">Layouts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300">{generationStats.themesGenerated}</div>
              <div className="text-sm text-gray-400">Themes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{generationStats.responsiveScore.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Responsive</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">{generationStats.accessibilityScore.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Accessibility</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UI Components Queue */}
      <Card className="bg-gradient-to-r from-gray-900/50 to-purple-900/30 border-gray-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-300">
            <Layout className="w-5 h-5 mr-2" />
            UI Generation Queue ({uiComponents.length} components)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {uiComponents.map((component) => (
              <div key={component.id} className="p-4 bg-black/20 rounded-lg border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(component.type)}
                    <span className="font-semibold text-white text-sm">{component.name}</span>
                    <Badge variant="outline" className={`text-xs ${getComplexityColor(component.complexity)}`}>
                      {component.complexity}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(component.status)}`}>
                      {component.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {component.responsive && <Badge className="text-xs bg-green-600/20 text-green-300">Responsive</Badge>}
                    {component.status === 'completed' && (
                      <div className="flex gap-1">
                        <Button
                          onClick={() => previewComponent(component)}
                          variant="outline"
                          size="sm"
                          className="text-blue-400 border-blue-400 h-6 px-2"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => downloadComponent(component)}
                          variant="outline"
                          size="sm"
                          className="text-green-400 border-green-400 h-6 px-2"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-2">{component.description}</p>
                
                {component.status !== 'completed' && (
                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Generation Progress</span>
                      <span>{Math.round(component.progress)}%</span>
                    </div>
                    <Progress value={component.progress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{new Date(component.timestamp).toLocaleTimeString()}</span>
                  {component.accessibility > 0 && (
                    <span>A11y: {component.accessibility}%</span>
                  )}
                </div>
              </div>
            ))}

            {uiComponents.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <Palette className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No UI components generating</p>
                <p className="text-sm">Activate the generator to start creating beautiful interfaces</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicUIGenerator;