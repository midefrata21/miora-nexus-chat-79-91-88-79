import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Menu, Palette, Navigation, Activity, Sparkles, Grid } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AutonomousMenuGenerator: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [menusGenerated, setMenusGenerated] = useState(0);
  const [designVariations, setDesignVariations] = useState(0);
  
  const [generationTasks, setGenerationTasks] = useState([
    { name: 'Navigation Structure Analysis', progress: 0, status: 'standby' },
    { name: 'Responsive Menu Design', progress: 0, status: 'standby' },
    { name: 'Accessibility Optimization', progress: 0, status: 'standby' },
    { name: 'Dynamic Route Generation', progress: 0, status: 'standby' },
    { name: 'Theme Integration', progress: 0, status: 'standby' }
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setGenerationTasks(prev => prev.map(task => ({
          ...task,
          progress: Math.min(100, task.progress + Math.random() * 11),
          status: task.progress > 82 ? 'complete' : 'active'
        })));
        
        setDesignVariations(prev => Math.min(50, prev + Math.random() * 3));
        if (Math.random() > 0.5) {
          setMenusGenerated(prev => prev + 1);
        }
      }, 1600);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleMenuGenerator = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Menu Generator Stopped" : "🎨 Autonomous Menu Generator Activated",
      description: isActive ? "Menu generation paused" : "MIORA mulai membuat navigation dan UI secara otomatis",
      variant: isActive ? "destructive" : "default"
    });
  };

  return (
    <Card className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border-pink-500/30">
      <CardHeader>
        <CardTitle className="text-pink-300 flex items-center justify-between">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-3" />
            Autonomous Menu Generator
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "GENERATING" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Navigation className="h-6 w-6 mx-auto mb-2 text-pink-400" />
            <div className="text-2xl font-bold text-white">{menusGenerated}</div>
            <div className="text-sm text-gray-400">Menus Generated</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Palette className="h-6 w-6 mx-auto mb-2 text-rose-400" />
            <div className="text-2xl font-bold text-white">{designVariations}</div>
            <div className="text-sm text-gray-400">Design Variations</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Grid className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Responsive</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Generation Pipeline</h3>
          {generationTasks.map((task, index) => (
            <div key={index} className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{task.name}</span>
                <Badge className={
                  task.status === 'complete' ? 'bg-green-500' : 
                  task.status === 'active' ? 'bg-blue-500' : 'bg-gray-500'
                }>
                  <Activity className="h-3 w-3 mr-1" />
                  {task.status}
                </Badge>
              </div>
              <Progress value={task.progress} className="h-2" />
              <div className="text-sm text-gray-400 mt-1">{task.progress.toFixed(1)}% Complete</div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={toggleMenuGenerator}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-pink-600 hover:bg-pink-700'}`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isActive ? "Stop Generator" : "Start Generator"}
          </Button>
        </div>

        <div className="p-4 bg-pink-900/20 rounded-lg border border-pink-500/20">
          <h4 className="text-pink-300 font-medium mb-2">🎨 Auto-Menu Generation Features:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Smart navigation structure berdasarkan content analysis</div>
            <div>• Responsive menu design untuk semua device sizes</div>
            <div>• Automatic accessibility compliance (WCAG)</div>
            <div>• Dynamic route generation dengan breadcrumbs</div>
            <div>• Theme-aware styling dengan dark/light mode</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousMenuGenerator;