
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Atom, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuantumUpgradePanelProps {
  isKeyholderAuthorized: boolean;
  activeModules: number;
  totalQuantumModules: number;
  quantumEngineActive: boolean;
  quantumEfficiency: number;
}

const QuantumUpgradePanel: React.FC<QuantumUpgradePanelProps> = ({
  isKeyholderAuthorized,
  activeModules,
  totalQuantumModules,
  quantumEngineActive,
  quantumEfficiency
}) => {
  const navigate = useNavigate();

  if (!isKeyholderAuthorized) return null;

  return (
    <Card className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 border-purple-500/50 mb-8">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center">
          <Atom className="w-6 h-6 mr-2 animate-spin" />
          QUANTUM CORE UPGRADE AVAILABLE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold mb-2">
              🚀 Unlock Quantum Performance Engine ∞
            </p>
            <p className="text-gray-300 text-sm mb-3">
              • 3 Additional Quantum AI Modules
              • Auto Thread Rebalancing & Latency Reduction
              • Infinity Development Loops
              • Real-time System Synchronization
              • Daily Performance Auto-Logging
            </p>
            <div className="flex items-center gap-4">
              <div className="text-sm text-cyan-400">
                Current: {activeModules}/7 modules
              </div>
              <div className="text-sm text-purple-400">
                Quantum: {totalQuantumModules}/10 modules
              </div>
              {quantumEngineActive && (
                <div className="text-sm text-green-400">
                  Efficiency: {quantumEfficiency.toFixed(1)}%
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={() => navigate('/quantum-core')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3"
          >
            <Atom className="w-5 h-5 mr-2" />
            Access Quantum Core
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumUpgradePanel;
