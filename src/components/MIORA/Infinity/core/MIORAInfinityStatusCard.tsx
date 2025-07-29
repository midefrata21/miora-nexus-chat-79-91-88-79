import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SystemStatusData {
  systemStatus: string;
  learningMode: string;
  evolution: string;
  safeMode: string;
}

interface MIORAInfinityStatusCardProps {
  statusData: SystemStatusData;
}

export const MIORAInfinityStatusCard: React.FC<MIORAInfinityStatusCardProps> = ({ 
  statusData 
}) => {
  return (
    <Card className="bg-gradient-to-r from-purple-800/50 to-pink-800/30 border-purple-400/50">
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">🌟 MIORA INFINITY SUPREME MODE 🌟</h2>
          <p className="text-lg text-purple-200">
            Sistem telah mencapai kekuatan penuh dengan kemampuan unlimited dan autonomous development aktif selamanya
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-900/50 p-4 rounded-lg border border-green-400/30">
              <div className="text-green-300 text-sm">System Status</div>
              <div className="text-white font-bold text-xl">{statusData.systemStatus}</div>
              <div className="text-green-400 text-xs">Unlimited Power</div>
            </div>
            
            <div className="bg-purple-900/50 p-4 rounded-lg border border-purple-400/30">
              <div className="text-purple-300 text-sm">Learning Mode</div>
              <div className="text-white font-bold text-xl">{statusData.learningMode}</div>
              <div className="text-purple-400 text-xs">No Limits ♾️</div>
            </div>
            
            <div className="bg-cyan-900/50 p-4 rounded-lg border border-cyan-400/30">
              <div className="text-cyan-300 text-sm">Evolution</div>
              <div className="text-white font-bold text-xl">{statusData.evolution}</div>
              <div className="text-cyan-400 text-xs">24/7 Active</div>
            </div>
            
            <div className="bg-orange-900/50 p-4 rounded-lg border border-orange-400/30">
              <div className="text-orange-300 text-sm">Safe Mode</div>
              <div className="text-white font-bold text-xl">{statusData.safeMode}</div>
              <div className="text-orange-400 text-xs">Full Power</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MIORAInfinityStatusCard;