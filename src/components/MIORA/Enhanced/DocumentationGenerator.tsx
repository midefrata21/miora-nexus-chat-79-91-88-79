import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Zap, Book, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentationGenerator: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDocs = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "📚 Documentation Generated",
        description: "Complete API and component documentation ready"
      });
    }, 2000);
  };

  return (
    <Card className="bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border-teal-500/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-teal-300">
          <FileText className="w-6 h-6" />
          Documentation Generator
          <Badge className="bg-teal-600/20 text-teal-300">Auto-Generated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-300">1,247</div>
            <div className="text-xs text-gray-400">Pages Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300">98.2%</div>
            <div className="text-xs text-gray-400">Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">156</div>
            <div className="text-xs text-gray-400">API Endpoints</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">89</div>
            <div className="text-xs text-gray-400">Components</div>
          </div>
        </div>

        <Button 
          onClick={generateDocs}
          disabled={isGenerating}
          className="bg-teal-600 hover:bg-teal-700 text-white w-full"
        >
          {isGenerating ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Book className="w-4 h-4 mr-2" />
              Generate Documentation
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentationGenerator;