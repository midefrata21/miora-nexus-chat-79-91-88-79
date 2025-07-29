
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const QuickStats: React.FC = () => {
  const stats = [
    { value: '42', label: 'INFINITY Modules', color: 'border-purple-500/30', textColor: 'text-purple-300' },
    { value: '100', label: 'Year Evolution', color: 'border-cyan-500/30', textColor: 'text-cyan-300' },
    { value: '7', label: 'Core Systems', color: 'border-blue-500/30', textColor: 'text-blue-300' },
    { value: '∞', label: 'Processing Power', color: 'border-pink-500/30', textColor: 'text-pink-300' },
    { value: 'v∞.0', label: 'Infinity Version', color: 'border-indigo-500/30', textColor: 'text-indigo-300' }
  ];

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gray-800/50 ${stat.color}`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
