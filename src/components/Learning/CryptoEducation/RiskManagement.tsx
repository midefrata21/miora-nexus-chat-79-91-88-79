import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  Calculator, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Percent,
  Target
} from 'lucide-react';

interface RiskManagementProps {
  currentLevel: number;
  onLevelUp: (level: number) => void;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
}

interface RiskConcept {
  id: string;
  name: string;
  description: string;
  rules: string[];
  example: string;
  detailedExplanation?: string;
  practicalSteps?: string[];
}

export const RiskManagement: React.FC<RiskManagementProps> = ({
  currentLevel,
  onLevelUp,
  completedLessons,
  onLessonComplete
}) => {
  const [calculatorValues, setCalculatorValues] = useState({
    capital: 10000,
    riskPercent: 2,
    entryPrice: 50000,
    stopLoss: 48000
  });

  const riskLevels = {
    1: {
      title: "Dasar Risk Management",
      concepts: [
        {
          id: "risk-capital",
          name: "Risk Capital",
          description: "Modal yang siap hilang tanpa mempengaruhi hidup dan financial stability",
          rules: ["Hanya trade dengan uang dingin", "Maksimal 10% dari total savings", "Never trade borrowed money", "Emergency fund harus tetap utuh"],
          example: "Salary 10jt -> Savings 50jt -> Emergency fund 30jt -> Risk Capital max 5jt",
          detailedExplanation: "Risk capital adalah uang yang jika hilang tidak akan mempengaruhi kemampuan membayar tagihan, makan, atau kebutuhan dasar lainnya. Ini adalah modal yang secara mental sudah 'siap hilang'.",
          practicalSteps: [
            "Hitung total penghasilan bulanan",
            "Kurangi semua pengeluaran wajib (makan, sewa, tagihan)",
            "Sisakan 6-12 bulan emergency fund",
            "Dari sisanya, maksimal 50% untuk investasi berisiko tinggi",
            "Start small: Mulai dengan 1-2% dari savings total"
          ]
        },
        {
          id: "position-sizing",
          name: "Position Sizing",
          description: "Menentukan ukuran posisi berdasarkan risk tolerance dan stop loss distance",
          rules: ["Risk max 1-2% per trade", "Calculate position size before entry", "Never average down losing positions", "Larger stop = smaller position"],
          example: "Capital 10jt, Risk 2% = 200rb max loss per trade. Entry 50k, SL 48k = max bisa beli 0.1 BTC",
          detailedExplanation: "Position sizing adalah skill paling penting dalam trading. Rumus: Position Size = Risk Amount / (Entry Price - Stop Loss Price). Ini memastikan tidak pernah loss lebih dari toleransi.",
          practicalSteps: [
            "Tentukan % risk per trade (1-2% recommended)",
            "Identify entry dan stop loss price",
            "Hitung distance: Entry - Stop Loss",
            "Position Size = (Account × Risk%) / Distance",
            "Double check: Max loss = Position × Distance"
          ]
        }
      ]
    },
    2: {
      title: "Stop Loss & Take Profit",
      concepts: [
        {
          id: "stop-loss-types",
          name: "Types of Stop Loss",
          description: "Berbagai jenis stop loss untuk berbagai situasi",
          rules: ["Technical SL: Support/Resistance", "Percentage SL: Fixed %", "ATR SL: Based on volatility"],
          example: "BTC bounce dari support 48k, SL di 47.5k"
        },
        {
          id: "risk-reward-ratio",
          name: "Risk:Reward Ratio",
          description: "Perbandingan potential loss vs potential profit",
          rules: ["Minimum 1:2 ratio", "Higher ratio = lower win rate needed", "Consistent RR = profitable long term"],
          example: "Risk 100, Target 300 = 1:3 RR. Need 25% win rate to break even"
        }
      ]
    },
    3: {
      title: "Advanced Money Management",
      concepts: [
        {
          id: "kelly-criterion",
          name: "Kelly Criterion",
          description: "Formula optimal position sizing based on edge",
          rules: ["f = (bp - q) / b", "b = odds, p = win rate, q = lose rate", "Never bet more than Kelly suggests"],
          example: "60% win rate, 1:2 RR -> Kelly = 20% of capital"
        },
        {
          id: "drawdown-management",
          name: "Drawdown Management",
          description: "Mengelola periode losing streak",
          rules: ["Max drawdown 20%", "Reduce size after 3 consecutive losses", "Take break after 10% drawdown"],
          example: "Down 15% -> Reduce position size by 50% until recovery"
        }
      ]
    },
    4: {
      title: "Portfolio Risk",
      concepts: [
        {
          id: "correlation-risk",
          name: "Correlation Risk",
          description: "Risk dari aset yang bergerak sama",
          rules: ["Don't trade correlated pairs", "Diversify across timeframes", "Max 3 positions same direction"],
          example: "BTC/ETH correlation 0.8 -> Don't long both simultaneously"
        },
        {
          id: "leverage-management",
          name: "Leverage Management",
          description: "Penggunaan leverage yang aman",
          rules: ["Max 3x leverage for beginners", "Higher leverage = smaller position", "Never use full margin"],
          example: "10x leverage -> Use only 10% of available margin"
        }
      ]
    }
  };

  const calculateRisk = () => {
    const riskAmount = (calculatorValues.capital * calculatorValues.riskPercent) / 100;
    const priceDiff = Math.abs(calculatorValues.entryPrice - calculatorValues.stopLoss);
    const positionSize = riskAmount / priceDiff;
    const riskReward = priceDiff > 0 ? (calculatorValues.entryPrice * 0.05) / priceDiff : 0; // Assuming 5% target

    return {
      riskAmount: riskAmount.toFixed(2),
      positionSize: positionSize.toFixed(6),
      riskReward: riskReward.toFixed(2)
    };
  };

  const getLevelData = (level: number) => {
    return riskLevels[level as keyof typeof riskLevels] || { title: "Advanced Risk", concepts: [] };
  };

  const handleConceptComplete = (conceptId: string) => {
    const lessonId = `risk-${conceptId}`;
    if (!completedLessons.includes(lessonId)) {
      onLessonComplete(lessonId);
    }
  };

  const riskCalculation = calculateRisk();

  return (
    <div className="space-y-6">
      {/* Risk Calculator */}
      <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Risk Management Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-gray-300">Total Capital ($)</Label>
              <Input
                type="number"
                value={calculatorValues.capital}
                onChange={(e) => setCalculatorValues(prev => ({...prev, capital: Number(e.target.value)}))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Risk per Trade (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={calculatorValues.riskPercent}
                onChange={(e) => setCalculatorValues(prev => ({...prev, riskPercent: Number(e.target.value)}))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Entry Price ($)</Label>
              <Input
                type="number"
                value={calculatorValues.entryPrice}
                onChange={(e) => setCalculatorValues(prev => ({...prev, entryPrice: Number(e.target.value)}))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Stop Loss ($)</Label>
              <Input
                type="number"
                value={calculatorValues.stopLoss}
                onChange={(e) => setCalculatorValues(prev => ({...prev, stopLoss: Number(e.target.value)}))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-red-500/20 rounded-lg border border-red-500/30">
              <DollarSign className="w-6 h-6 mx-auto text-red-400 mb-1" />
              <p className="text-red-300 font-semibold">${riskCalculation.riskAmount}</p>
              <p className="text-red-200 text-sm">Risk Amount</p>
            </div>
            <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Target className="w-6 h-6 mx-auto text-blue-400 mb-1" />
              <p className="text-blue-300 font-semibold">{riskCalculation.positionSize}</p>
              <p className="text-blue-200 text-sm">Position Size</p>
            </div>
            <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <Percent className="w-6 h-6 mx-auto text-green-400 mb-1" />
              <p className="text-green-300 font-semibold">1:{riskCalculation.riskReward}</p>
              <p className="text-green-200 text-sm">Risk:Reward</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Selection */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map((level) => {
          const levelData = getLevelData(level);
          const hasContent = levelData.concepts.length > 0;
          const isActive = currentLevel === level;
          
          return (
            <Button
              key={level}
              variant={isActive ? "default" : "outline"}
              size="sm"
              disabled={false} // All levels are now accessible
              onClick={() => onLevelUp(level)}
              className={`${
                isActive 
                  ? 'bg-cyan-600 text-white' 
                  : hasContent 
                    ? 'bg-gray-700 border-gray-600 text-gray-300' 
                    : 'bg-gray-800 border-gray-700 text-gray-500'
              }`}
            >
              <Shield className="w-4 h-4 mr-1" />
              Level {level}
            </Button>
          );
        })}
      </div>

      {/* Current Level Content */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          {getLevelData(currentLevel).title}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {getLevelData(currentLevel).concepts.map((concept: RiskConcept) => {
            const isCompleted = completedLessons.includes(`risk-${concept.id}`);
            
            return (
              <Card 
                key={concept.id}
                className={`bg-gray-800/50 border-gray-600 ${
                  isCompleted ? 'ring-2 ring-green-500/50' : ''
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-300 flex items-center gap-2">
                    {concept.name}
                    {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{concept.description}</p>
                  
                  <div>
                    <h4 className="text-yellow-300 font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Key Rules:
                    </h4>
                    <ul className="space-y-1">
                      {concept.rules.map((rule, index) => (
                        <li key={index} className="text-yellow-200 text-sm flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-green-300 font-medium text-sm mb-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Example:
                    </h4>
                    <p className="text-green-200 text-sm bg-green-900/20 p-2 rounded border border-green-500/30">
                      {concept.example}
                    </p>
                  </div>

                  {/* Enhanced Details for Level 1 concepts */}
                  {concept.detailedExplanation && (
                    <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                      <h4 className="text-blue-300 font-medium text-sm mb-2">📚 Detailed Explanation:</h4>
                      <p className="text-blue-200 text-sm">{concept.detailedExplanation}</p>
                    </div>
                  )}

                  {concept.practicalSteps && (
                    <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
                      <h4 className="text-purple-300 font-medium text-sm mb-2">🔧 Practical Steps:</h4>
                      <ol className="space-y-1">
                        {concept.practicalSteps.map((step, index) => (
                          <li key={index} className="text-purple-200 text-sm flex items-start gap-2">
                            <span className="text-purple-400 font-medium mt-1">{index + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  
                  {!isCompleted && (
                    <Button
                      size="sm"
                      onClick={() => handleConceptComplete(concept.id)}
                      className="w-full bg-green-600 hover:bg-green-500 mt-4"
                    >
                      Mark as Understood
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Risk Management Rules Summary */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-red-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Golden Rules of Risk Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Never risk more than 2% per trade
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Always set stop loss before entering
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Risk:Reward minimum 1:2
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Position size based on stop distance
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Never move stop loss against you
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Take profits at predetermined levels
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Diversify across different markets
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Review and adjust strategy regularly
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};