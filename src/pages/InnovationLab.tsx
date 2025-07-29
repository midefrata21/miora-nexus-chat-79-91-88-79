import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Beaker, Rocket, Sparkles, Atom, Zap } from 'lucide-react';
import { HorizontalCategoryMenu } from '@/components/Navigation/HorizontalCategoryMenu';

const InnovationLab: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900">
      <HorizontalCategoryMenu />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Lightbulb className="w-12 h-12 text-yellow-400" />
              <h1 className="text-4xl font-bold text-white">Innovation Lab</h1>
            </div>
            <p className="text-xl text-yellow-200">Experimental Technologies & Creative Solutions</p>
            <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
              💡 Innovation Mode Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-300 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Idea Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">AI-powered brainstorming and ideation</p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Generate Ideas
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-300 flex items-center">
                  <Beaker className="w-5 h-5 mr-2" />
                  Prototype Lab
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Rapid prototyping and testing environment</p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Start Prototyping
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  Project Launcher
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Launch innovative projects quickly</p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Launch Project
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Creative Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Advanced creative AI assistance</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Create Solutions
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <Atom className="w-5 h-5 mr-2" />
                  Research Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Advanced research and analysis tools</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Research
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Innovation Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Track innovation progress and impact</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Metrics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationLab;