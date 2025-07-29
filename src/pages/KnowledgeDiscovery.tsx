import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, Database, Brain, Lightbulb, Target } from 'lucide-react';

const KnowledgeDiscovery: React.FC = () => {
  const discoveries = [
    {
      title: 'Neural Pattern Recognition',
      description: 'Penemuan pola baru dalam neural network processing',
      category: 'AI Research',
      confidence: 94,
      impact: 'High'
    },
    {
      title: 'Quantum Learning Algorithm',
      description: 'Algoritma pembelajaran kuantum untuk optimasi sistem',
      category: 'Quantum Computing',
      confidence: 87,
      impact: 'Critical'
    },
    {
      title: 'Autonomous Decision Making',
      description: 'Framework baru untuk pengambilan keputusan otomatis',
      category: 'Autonomous Systems',
      confidence: 91,
      impact: 'High'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Knowledge Discovery Hub
          </h1>
          <p className="text-gray-300">AI-Powered Knowledge Mining and Pattern Recognition</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Knowledge Base</CardTitle>
              <Database className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2.4M</div>
              <p className="text-xs text-emerald-400">+12% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Discoveries</CardTitle>
              <Lightbulb className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">347</div>
              <p className="text-xs text-yellow-400">New insights</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Pattern Recognition</CardTitle>
              <Brain className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">98.7%</div>
              <p className="text-xs text-purple-400">Accuracy rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Research Impact</CardTitle>
              <Target className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">High</div>
              <p className="text-xs text-cyan-400">Critical findings</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Discoveries */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Discoveries</h2>
          <div className="space-y-4">
            {discoveries.map((discovery, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">{discovery.title}</h3>
                      <Badge className="bg-emerald-500/20 text-emerald-400">
                        {discovery.category}
                      </Badge>
                    </div>
                    <Badge className={`${
                      discovery.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      discovery.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {discovery.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-4">{discovery.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Confidence:</span>
                      <span className="text-emerald-400 font-semibold">{discovery.confidence}%</span>
                    </div>
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
                      Explore Further
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Knowledge Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'AI & Machine Learning', count: 1247, icon: Brain, color: 'purple' },
            { name: 'Quantum Computing', count: 892, icon: Target, color: 'cyan' },
            { name: 'Neural Networks', count: 1543, icon: Lightbulb, color: 'yellow' },
            { name: 'Autonomous Systems', count: 673, icon: Search, color: 'green' },
            { name: 'Data Science', count: 1891, icon: Database, color: 'blue' },
            { name: 'Research Papers', count: 2134, icon: BookOpen, color: 'orange' },
          ].map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <IconComponent className={`w-5 h-5 text-${category.color}-400`} />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">{category.count.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Knowledge entries</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDiscovery;