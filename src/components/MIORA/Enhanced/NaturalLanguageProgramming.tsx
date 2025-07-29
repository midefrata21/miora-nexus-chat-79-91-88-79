import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mic, MessageSquare, Code2, Zap, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NaturalLanguageProgramming: React.FC = () => {
  const { toast } = useToast();
  const [naturalInput, setNaturalInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isListening, setIsListening] = useState(false);

  const nlpStats = {
    commandsProcessed: 8943,
    accuracyRate: 97.2,
    languagesSupported: 15,
    codeGenerated: 45231
  };

  const exampleCommands = [
    {
      input: "Create a button that changes color when clicked",
      complexity: "Simple",
      category: "UI Component"
    },
    {
      input: "Make a form with validation that submits user data to an API",
      complexity: "Medium",
      category: "Form Handling"
    },
    {
      input: "Build a real-time chat component with message history",
      complexity: "Complex",
      category: "Real-time Features"
    },
    {
      input: "Generate a responsive dashboard with charts and data tables",
      complexity: "Complex",
      category: "Data Visualization"
    }
  ];

  const recentConversions = [
    {
      input: "Create a modal dialog with close button",
      output: "Modal.tsx component with state management",
      time: "2 minutes ago",
      success: true
    },
    {
      input: "Add loading spinner to the submit button",
      output: "Updated Button component with loading state",
      time: "5 minutes ago",
      success: true
    },
    {
      input: "Make the navbar responsive for mobile",
      output: "Added responsive classes and mobile menu",
      time: "8 minutes ago",
      success: true
    }
  ];

  const processNaturalLanguage = () => {
    if (!naturalInput.trim()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      const sampleCode = `// Generated from: "${naturalInput}"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const GeneratedComponent: React.FC = () => {
  const [state, setState] = useState(false);
  
  const handleAction = () => {
    setState(!state);
    // Implementation based on natural language input
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Generated from Natural Language
      </h2>
      <Button 
        onClick={handleAction}
        className={\`\${state ? 'bg-blue-600' : 'bg-gray-600'} text-white\`}
      >
        {state ? 'Active' : 'Inactive'}
      </Button>
      <p className="mt-2 text-sm text-gray-600">
        Current state: {state ? 'On' : 'Off'}
      </p>
    </div>
  );
};

export default GeneratedComponent;`;

      setGeneratedCode(sampleCode);
      setIsProcessing(false);
      
      toast({
        title: "🧠 Natural Language Processed",
        description: "Successfully converted to working code"
      });
    }, 2000);
  };

  const startVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "🎤 Voice Input Active",
        description: "Speak your programming request"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-indigo-300">
            <MessageSquare className="w-6 h-6" />
            Natural Language Programming Interface
            <Badge className="bg-indigo-600/20 text-indigo-300">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-300">{nlpStats.commandsProcessed.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Commands Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{nlpStats.accuracyRate}%</div>
              <div className="text-xs text-gray-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{nlpStats.languagesSupported}</div>
              <div className="text-xs text-gray-400">Languages Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{nlpStats.codeGenerated.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Lines Generated</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white text-sm font-medium">Natural Language Input</label>
                <Button
                  onClick={startVoiceInput}
                  size="sm"
                  className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isListening ? 'Stop Recording' : 'Voice Input'}
                </Button>
              </div>
              <Textarea 
                placeholder="Describe what you want to create in plain English... (e.g., 'Create a user profile card with avatar, name, email, and edit button')"
                value={naturalInput}
                onChange={(e) => setNaturalInput(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              onClick={processNaturalLanguage}
              disabled={isProcessing || !naturalInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing Natural Language...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Convert to Code
                </>
              )}
            </Button>
          </div>

          {generatedCode && (
            <Card className="bg-black/20 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-indigo-300 text-lg flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Generated Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                  {generatedCode}
                </pre>
              </CardContent>
            </Card>
          )}

          <Card className="bg-black/20 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-indigo-300 text-lg">Example Commands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exampleCommands.map((example, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800/70 transition-all"
                  onClick={() => setNaturalInput(example.input)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`text-xs ${
                      example.complexity === 'Simple' ? 'bg-green-600/20 text-green-300' :
                      example.complexity === 'Medium' ? 'bg-yellow-600/20 text-yellow-300' :
                      'bg-red-600/20 text-red-300'
                    }`}>
                      {example.complexity}
                    </Badge>
                    <span className="text-xs text-gray-400">{example.category}</span>
                  </div>
                  <div className="text-sm text-white">{example.input}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-indigo-300 text-lg">Recent Conversions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentConversions.map((conversion, index) => (
                <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm text-white font-medium">"{conversion.input}"</div>
                    <span className="text-xs text-gray-400">{conversion.time}</span>
                  </div>
                  <div className="text-sm text-gray-300">→ {conversion.output}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default NaturalLanguageProgramming;