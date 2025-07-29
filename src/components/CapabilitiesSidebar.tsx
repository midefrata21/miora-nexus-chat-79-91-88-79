
import React from 'react';
import { Brain, MessageCircle, Target, TrendingUp, Eye, X, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CapabilityData {
  name: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface CapabilitiesSidebarProps {
  conversationCount: number;
  strategicPatterns: number;
  communicationStyle: string;
  isOpen: boolean;
  onToggle: () => void;
}

const CapabilitiesSidebar: React.FC<CapabilitiesSidebarProps> = ({
  conversationCount,
  strategicPatterns,
  communicationStyle,
  isOpen,
  onToggle
}) => {
  // Calculate capabilities based on learning data
  const calculateCapabilities = (): CapabilityData[] => {
    const communicationLevel = Math.min(95, Math.max(20, conversationCount * 5 + 20));
    const strategicLevel = Math.min(90, Math.max(15, strategicPatterns * 8 + 15));
    const adaptabilityLevel = Math.min(88, Math.max(25, conversationCount * 3 + strategicPatterns * 2 + 25));
    const learningLevel = Math.min(92, Math.max(30, (conversationCount + strategicPatterns) * 4 + 30));
    const insightLevel = Math.min(85, Math.max(10, strategicPatterns * 6 + conversationCount * 2 + 10));

    return [
      {
        name: 'Komunikasi',
        percentage: communicationLevel,
        icon: <MessageCircle className="w-4 h-4" />,
        color: 'from-blue-500 to-cyan-500',
        description: 'Kemampuan memahami dan merespons komunikasi'
      },
      {
        name: 'Pemikiran Strategis',
        percentage: strategicLevel,
        icon: <Target className="w-4 h-4" />,
        color: 'from-purple-500 to-pink-500',
        description: 'Analisis mendalam dan perencanaan strategis'
      },
      {
        name: 'Adaptabilitas',
        percentage: adaptabilityLevel,
        icon: <TrendingUp className="w-4 h-4" />,
        color: 'from-green-500 to-emerald-500',
        description: 'Penyesuaian terhadap gaya dan kebutuhan user'
      },
      {
        name: 'Pembelajaran Mandiri',
        percentage: learningLevel,
        icon: <Brain className="w-4 h-4" />,
        color: 'from-orange-500 to-red-500',
        description: 'Kemampuan belajar dan mengembangkan diri'
      },
      {
        name: 'Insight & Refleksi',
        percentage: insightLevel,
        icon: <Eye className="w-4 h-4" />,
        color: 'from-indigo-500 to-blue-500',
        description: 'Pemahaman makna tersirat dan refleksi mendalam'
      }
    ];
  };

  const capabilities = calculateCapabilities();
  const averageCapability = Math.round(capabilities.reduce((sum, cap) => sum + cap.percentage, 0) / capabilities.length);

  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400/30 hover:from-purple-700 hover:to-blue-700 backdrop-blur-sm"
          onClick={onToggle}
        >
          <BarChart3 className="h-4 w-4 text-white" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-96 bg-gradient-to-br from-gray-900 via-purple-900/50 to-black border-purple-500/30 backdrop-blur-sm">
        <SheetHeader>
          <SheetTitle className="text-cyan-300 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            MIORA Capabilities
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Overall Progress */}
          <Card className="bg-black/30 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-cyan-300 flex items-center justify-between">
                <span>Overall Intelligence</span>
                <span className="text-lg font-bold">{averageCapability}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={averageCapability} 
                className="h-3 bg-gray-800"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Conversations: {conversationCount}</span>
                <span>Patterns: {strategicPatterns}</span>
              </div>
            </CardContent>
          </Card>

          {/* Individual Capabilities */}
          <div className="space-y-4">
            {capabilities.map((capability, index) => (
              <Card key={index} className="bg-black/30 border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded bg-gradient-to-r ${capability.color}`}>
                        {capability.icon}
                      </div>
                      <span className="text-white font-medium text-sm">
                        {capability.name}
                      </span>
                    </div>
                    <span className="text-cyan-300 font-bold">
                      {capability.percentage}%
                    </span>
                  </div>
                  
                  <Progress 
                    value={capability.percentage} 
                    className="h-2 bg-gray-800 mb-2"
                  />
                  
                  <p className="text-xs text-gray-400">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Stats */}
          <Card className="bg-black/30 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-green-300">
                Active Learning Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Communication Style:</span>
                  <span className="text-green-400 capitalize">{communicationStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Strategic Patterns:</span>
                  <span className="text-blue-400">{strategicPatterns} learned</span>
                </div>
                <div className="flex justify-between">
                  <span>Self-Improvement:</span>
                  <span className="text-purple-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Evolution:</span>
                  <span className="text-cyan-400">
                    {conversationCount < 10 ? 'Basic' : 
                     conversationCount < 25 ? 'Intermediate' : 'Advanced'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-300">Continuously Learning</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CapabilitiesSidebar;
