
import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Code, Calendar, BarChart3 } from 'lucide-react';

interface NavigationTabsProps {
  selectedView: 'overview' | 'structure' | 'timeline' | 'analytics';
  onViewChange: (view: 'overview' | 'structure' | 'timeline' | 'analytics') => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ selectedView, onViewChange }) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        onClick={() => onViewChange('overview')}
        variant={selectedView === 'overview' ? 'default' : 'outline'}
        className={selectedView === 'overview' ? 'bg-indigo-600' : ''}
      >
        <Activity className="w-4 h-4 mr-2" />
        Overview
      </Button>
      <Button
        onClick={() => onViewChange('structure')}
        variant={selectedView === 'structure' ? 'default' : 'outline'}
        className={selectedView === 'structure' ? 'bg-purple-600' : ''}
      >
        <Code className="w-4 h-4 mr-2" />
        MIORA Structure
      </Button>
      <Button
        onClick={() => onViewChange('timeline')}
        variant={selectedView === 'timeline' ? 'default' : 'outline'}
        className={selectedView === 'timeline' ? 'bg-blue-600' : ''}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Timeline
      </Button>
      <Button
        onClick={() => onViewChange('analytics')}
        variant={selectedView === 'analytics' ? 'default' : 'outline'}
        className={selectedView === 'analytics' ? 'bg-green-600' : ''}
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Analytics
      </Button>
    </div>
  );
};

export default NavigationTabs;
