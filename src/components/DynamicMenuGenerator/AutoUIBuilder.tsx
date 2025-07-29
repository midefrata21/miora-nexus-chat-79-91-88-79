import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Code, Eye, Download, Zap, Settings } from 'lucide-react';

interface UITemplate {
  id: string;
  name: string;
  type: 'dashboard' | 'form' | 'table' | 'chart' | 'landing';
  description: string;
  components: string[];
  generated: boolean;
}

export const AutoUIBuilder: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [moduleName, setModuleName] = useState('');
  const [templates, setTemplates] = useState<UITemplate[]>([
    {
      id: '1',
      name: 'Analytics Dashboard',
      type: 'dashboard',
      description: 'Real-time analytics with charts and metrics',
      components: ['charts', 'metrics', 'filters', 'export'],
      generated: true
    },
    {
      id: '2',
      name: 'User Management',
      type: 'table',
      description: 'CRUD interface for user management',
      components: ['table', 'forms', 'search', 'pagination'],
      generated: true
    }
  ]);

  const uiTypes = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'form', label: 'Form Interface' },
    { value: 'table', label: 'Data Table' },
    { value: 'chart', label: 'Chart Visualization' },
    { value: 'landing', label: 'Landing Page' }
  ];

  const generateUI = () => {
    if (!selectedType || !moduleName) return;

    const newTemplate: UITemplate = {
      id: Date.now().toString(),
      name: moduleName,
      type: selectedType as any,
      description: `Auto-generated ${selectedType} for ${moduleName}`,
      components: getComponentsForType(selectedType),
      generated: true
    };

    setTemplates(prev => [...prev, newTemplate]);
    setModuleName('');
    setSelectedType('');
  };

  const getComponentsForType = (type: string): string[] => {
    const componentMap = {
      dashboard: ['header', 'metrics', 'charts', 'sidebar', 'filters'],
      form: ['form-fields', 'validation', 'submit', 'reset'],
      table: ['data-table', 'pagination', 'sorting', 'search', 'actions'],
      chart: ['chart-canvas', 'legend', 'tooltip', 'controls'],
      landing: ['hero', 'features', 'testimonials', 'cta', 'footer']
    };
    return componentMap[type as keyof typeof componentMap] || [];
  };

  const previewTemplate = (template: UITemplate) => {
    // This would open a preview modal or navigate to preview
    console.log('Preview:', template);
  };

  const deployTemplate = (template: UITemplate) => {
    // This would deploy the template as a new page/component
    console.log('Deploy:', template);
  };

  return (
    <div className="space-y-6">
      {/* UI Generator Form */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" />
            Auto UI Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Module/Page Name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
            />
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                <SelectValue placeholder="Select UI Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-600">
                {uiTypes.map(type => (
                  <SelectItem key={type.value} value={type.value} className="text-white">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={generateUI} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Generate UI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <Card key={template.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  {template.type}
                </Badge>
              </div>
              <p className="text-gray-400 text-sm">{template.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white text-sm font-medium mb-2">Components:</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.components.map(comp => (
                      <Badge key={comp} variant="secondary" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => previewTemplate(template)}
                    className="flex-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => deployTemplate(template)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Deploy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};