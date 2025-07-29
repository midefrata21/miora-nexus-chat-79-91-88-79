
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { GrowthTimeline as GrowthTimelineType } from '@/types/growth';

interface GrowthTimelineProps {
  growthHistory: GrowthTimelineType[];
}

const GrowthTimeline: React.FC<GrowthTimelineProps> = ({ growthHistory }) => {
  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-blue-800/50 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-300">
          <Calendar className="w-5 h-5 mr-2" />
          Growth Timeline (Last 7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {growthHistory.slice(-7).reverse().map((day) => (
            <div key={day.date} className="border-l-2 border-blue-500/30 pl-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">
                  {new Date(day.date).toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                <Badge variant="outline" className="text-blue-300 border-blue-400">
                  {day.entries.length} entries
                </Badge>
              </div>
              <p className="text-gray-300 text-sm mb-2">{day.dailySummary}</p>
              <div className="flex flex-wrap gap-1">
                {day.keyAchievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="text-xs text-green-300 border-green-400">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthTimeline;
