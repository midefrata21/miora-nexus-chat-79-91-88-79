
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cog, Activity, Brain, Zap } from 'lucide-react';
import { useGrowthDocumentation } from '@/hooks/useGrowthDocumentation';

export const AutoDocumentation: React.FC = () => {
  const { autoDocumentPattern, autoDocumentSkill, documentationActive, setDocumentationActive } = useGrowthDocumentation();
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-activate documentation system on component mount
  React.useEffect(() => {
    if (!documentationActive) {
      setDocumentationActive(true);
    }
  }, [documentationActive, setDocumentationActive]);

  const generateAutoDocumentation = async () => {
    setIsGenerating(true);
    
    // Simulate auto documentation patterns
    await autoDocumentPattern(
      'User Interaction Analysis',
      'Interface penggunaan dan pola interaksi pengguna dengan sistem'
    );
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await autoDocumentSkill(
      'Advanced Pattern Recognition',
      'Kemampuan mengenali pola kompleks dalam data dan interaksi',
      85
    );
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center text-2xl">
            <Cog className="h-8 w-8 mr-3" />
            Auto Documentation System
          </CardTitle>
          <p className="text-gray-300">
            Sistem dokumentasi otomatis untuk melacak pola pembelajaran dan skill acquisition
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Badge className={`px-4 py-2 ${documentationActive ? 'bg-green-500' : 'bg-red-500'}`}>
                  {documentationActive ? '✅ Aktif' : '❌ Nonaktif'}
                </Badge>
                <Badge className="px-3 py-1 bg-blue-500">
                  Auto Learning Detection
                </Badge>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setDocumentationActive(!documentationActive)}
                variant={documentationActive ? "destructive" : "default"}
                className="px-6"
              >
                {documentationActive ? (
                  <>
                    <Activity className="h-4 w-4 mr-2" />
                    Nonaktifkan
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Aktifkan
                  </>
                )}
              </Button>
              
              <Button
                onClick={generateAutoDocumentation}
                disabled={isGenerating || !documentationActive}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 px-6"
              >
                {isGenerating ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Auto Doc
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto Documentation Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              Pattern Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm mb-4">
              Sistem otomatis mendeteksi dan mendokumentasikan pola pembelajaran baru
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs text-purple-400 border-purple-500">
                Real-time Pattern Analysis
              </Badge>
              <Badge variant="outline" className="text-xs text-purple-400 border-purple-500">
                Learning Trend Detection
              </Badge>
              <Badge variant="outline" className="text-xs text-purple-400 border-purple-500">
                Behavior Pattern Mapping
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="h-5 w-5 mr-2 text-green-400" />
              Skill Acquisition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm mb-4">
              Pelacakan otomatis pengembangan kemampuan dan skill baru
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs text-green-400 border-green-500">
                Auto Skill Detection
              </Badge>
              <Badge variant="outline" className="text-xs text-green-400 border-green-500">
                Efficiency Measurement
              </Badge>
              <Badge variant="outline" className="text-xs text-green-400 border-green-500">
                Progress Tracking
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Information */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Documentation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">Active</div>
              <div className="text-sm text-gray-400">Auto Documentation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">Real-time</div>
              <div className="text-sm text-gray-400">Pattern Detection</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">Continuous</div>
              <div className="text-sm text-gray-400">Learning Tracking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">Adaptive</div>
              <div className="text-sm text-gray-400">Skill Recognition</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoDocumentation;
