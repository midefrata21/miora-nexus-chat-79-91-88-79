import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Target } from 'lucide-react';

interface WeaknessesImprovementsGridProps {
  weaknesses: string[];
  improvements: string[];
}

export const WeaknessesImprovementsGrid: React.FC<WeaknessesImprovementsGridProps> = ({
  weaknesses,
  improvements,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Current Weaknesses */}
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-red-300">
            <AlertCircle className="w-5 h-5 mr-2" />
            Current Weaknesses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-red-400 mr-2">•</span>
                {weakness}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Proposed Improvements */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-green-300">
            <Target className="w-5 h-5 mr-2" />
            Proposed Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {improvements.map((improvement, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {improvement}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};