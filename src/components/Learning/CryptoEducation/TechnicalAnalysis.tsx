import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Activity, 
  BarChart3, 
  Target,
  CheckCircle,
  Lock,
  Zap,
  LineChart
} from 'lucide-react';

interface TechnicalAnalysisProps {
  currentLevel: number;
  onLevelUp: (level: number) => void;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
}

interface Indicator {
  id: string;
  name: string;
  type: string;
  description: string;
  usage: string;
  signals: string;
  timeframes: string;
  example: string;
  detailedExplanation?: string;
  tradingRules?: string[];
  settings?: Record<string, string>;
}

export const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({
  currentLevel,
  onLevelUp,
  completedLessons,
  onLessonComplete
}) => {
  const [selectedCategory, setSelectedCategory] = useState('indicators');

  const technicalCategories = {
    indicators: {
      title: "Technical Indicators",
      icon: Activity,
      levels: {
        1: [
          {
            id: "moving-averages",
            name: "Moving Averages (MA)",
            type: "trend",
            description: "SMA, EMA, WMA - dasar analisis trend",
            usage: "Identifikasi trend direction dan support/resistance dinamis",
            signals: "Golden Cross (MA50 > MA200) = Bullish, Death Cross = Bearish",
            timeframes: "Scalping: 5,10,20 | Swing: 50,100,200",
            example: "EMA21 break above = trend change signal"
          },
          {
            id: "rsi",
            name: "Relative Strength Index (RSI)",
            type: "momentum",
            description: "Oscillator momentum 0-100, ukur overbought/oversold",
            usage: "RSI > 70 = Overbought, RSI < 30 = Oversold",
            signals: "Divergence RSI vs Price = reversal signal",
            timeframes: "Period 14 standard, 21 untuk volatile market",
            example: "RSI divergence + support = strong buy signal"
          }
        ],
        2: [
          {
            id: "macd",
            name: "MACD (Moving Average Convergence Divergence)",
            type: "momentum",
            description: "MACD Line, Signal Line, Histogram - momentum analysis untuk mendeteksi perubahan trend",
            usage: "MACD cross Signal = entry signal, Histogram = momentum strength. MACD > 0 = bullish bias, MACD < 0 = bearish bias",
            signals: "Bullish: MACD > Signal + Histogram naik. Bearish: MACD < Signal + Histogram turun. Divergence = reversal warning",
            timeframes: "12,26,9 standard. Scalping: 5,13,1 atau 8,21,5. Swing: 19,39,9",
            example: "MACD bullish cross + histogram expanding + price above EMA = triple confirmation buy",
            detailedExplanation: "MACD terdiri dari 3 komponen: 1) MACD Line (EMA12 - EMA26), 2) Signal Line (EMA9 dari MACD), 3) Histogram (MACD - Signal). Histogram adalah leading indicator yang menunjukkan momentum sebelum MACD cross terjadi.",
            tradingRules: [
              "Entry saat MACD cross Signal Line dengan histogram confirm",
              "Exit saat histogram mulai mengecil (momentum berkurang)",
              "Avoid trading saat MACD flat (sideways market)",
              "Gunakan divergence untuk early reversal warning"
            ],
            settings: {
              standard: "12, 26, 9",
              scalping: "5, 13, 1 atau 8, 21, 5", 
              swing: "19, 39, 9",
              longTerm: "26, 52, 18"
            }
          },
          {
            id: "bollinger-bands",
            name: "Bollinger Bands",
            type: "volatility",
            description: "Volatility indicator dengan middle line (SMA) + Upper/Lower bands (2 standard deviation)",
            usage: "Price touch upper = overbought, touch lower = oversold. Band width = volatility measure",
            signals: "Squeeze = low volatility (breakout coming), Expansion = high volatility. Band walk = strong trend",
            timeframes: "20 period SMA dengan 2 standard deviation untuk most timeframes",
            example: "BB squeeze (band sempit) + volume spike + price break = strong breakout setup",
            detailedExplanation: "Bollinger Bands mengukur volatility dan relative price position. Saat bands menyempit (squeeze), volatility rendah dan breakout akan datang. Saat bands melebar, volatility tinggi. Price cenderung bounce dari bands.",
            tradingRules: [
              "Buy saat price bounce dari lower band + RSI oversold",
              "Sell saat price reject dari upper band + RSI overbought", 
              "Breakout entry saat price keluar dari bands dengan volume",
              "Band squeeze = wait for breakout direction"
            ],
            settings: {
              standard: "20 period, 2 std dev",
              scalping: "10 period, 1.5 std dev",
              swing: "50 period, 2.5 std dev",
              conservative: "20 period, 1 std dev"
            }
          },
          {
            id: "adx",
            name: "Average Directional Index (ADX)",
            type: "trend-strength",
            description: "Mengukur kekuatan trend tanpa memberikan direction. ADX > 25 = trend kuat",
            usage: "ADX > 25 = trending market, ADX < 20 = ranging market. +DI dan -DI untuk direction",
            signals: "ADX naik = trend menguat, ADX turun = trend melemah. +DI > -DI = bullish, sebaliknya bearish",
            timeframes: "14 period standard untuk semua timeframes",
            example: "ADX > 30 + +DI > -DI + price above EMA = strong uptrend confirmation",
            detailedExplanation: "ADX mengukur strength of trend (0-100), bukan direction. Semakin tinggi ADX, semakin kuat trend. +DI (Positive Directional Indicator) dan -DI (Negative Directional Indicator) menunjukkan direction.",
            tradingRules: [
              "Trade dengan trend saat ADX > 25",
              "Avoid trending strategies saat ADX < 20",
              "Entry saat +DI cross -DI dengan ADX rising",
              "Exit saat ADX peak dan mulai turun"
            ],
            settings: {
              standard: "14 period",
              shortTerm: "7 period",
              longTerm: "21 period",
              scalping: "5 period"
            }
          }
        ],
        3: [
          {
            id: "stochastic",
            name: "Stochastic Oscillator",
            type: "momentum",
            description: "%K line dan %D line, momentum oscillator 0-100",
            usage: "Stoch > 80 = Overbought, Stoch < 20 = Oversold",
            signals: "%K cross %D = trading signal",
            timeframes: "14,3,3 atau 5,3,3 untuk scalping",
            example: "Stochastic bullish cross di oversold = buy signal"
          },
          {
            id: "fibonacci",
            name: "Fibonacci Retracement",
            type: "support-resistance",
            description: "23.6%, 38.2%, 50%, 61.8%, 78.6% retracement levels",
            usage: "Identifikasi potential support/resistance levels",
            signals: "Rejection di fib level = continuation, Break = reversal",
            timeframes: "Swing high to swing low untuk retracement",
            example: "Price bounce from 61.8% fib = strong support"
          }
        ]
      }
    },
    patterns: {
      title: "Chart Patterns",
      icon: BarChart3,
      levels: {
        1: [
          {
            id: "support-resistance",
            name: "Support & Resistance",
            type: "basic",
            description: "Level dimana price bereaksi - bounce atau break",
            usage: "Support = floor, Resistance = ceiling",
            signals: "Break dengan volume = valid breakout",
            timeframes: "Gunakan multiple timeframe untuk konfirmasi",
            example: "Multiple touch di resistance + break = strong move"
          },
          {
            id: "trendlines",
            name: "Trendlines",
            type: "basic",
            description: "Garis yang menghubungkan swing high/low",
            usage: "Uptrend: higher lows, Downtrend: lower highs",
            signals: "Trendline break = potential trend change",
            timeframes: "Valid trendline minimal 3 touch points",
            example: "Ascending trendline support break = bearish signal"
          }
        ],
        2: [
          {
            id: "triangles",
            name: "Triangle Patterns",
            type: "continuation",
            description: "Ascending, Descending, Symmetrical triangles",
            usage: "Consolidation sebelum breakout direction",
            signals: "Break triangle dengan volume = valid move",
            timeframes: "Minimal 5 waves dalam triangle",
            example: "Ascending triangle break up = target = height of triangle"
          },
          {
            id: "head-shoulders",
            name: "Head & Shoulders",
            type: "reversal",
            description: "3 peaks dengan middle peak tertinggi",
            usage: "Reversal pattern di top atau bottom trend",
            signals: "Neckline break = target = head to neckline distance",
            timeframes: "Pattern harus proporsional dan symmetrical",
            example: "H&S + volume confirmation = powerful reversal"
          }
        ]
      }
    },
    volume: {
      title: "Volume Analysis",
      icon: BarChart3,
      levels: {
        1: [
          {
            id: "volume-basics",
            name: "Volume Basics",
            type: "confirmation",
            description: "Volume confirms price movement strength",
            usage: "High volume = strong move, Low volume = weak move",
            signals: "Volume spike = institutional interest",
            timeframes: "Compare current volume vs average volume",
            example: "Breakout + 2x average volume = valid move"
          }
        ],
        2: [
          {
            id: "volume-profile",
            name: "Volume Profile",
            type: "advanced",
            description: "Volume at price levels - POC, VAH, VAL",
            usage: "High volume nodes = strong support/resistance",
            signals: "Price rejection at high volume node = reversal",
            timeframes: "Use session volume or longer periods",
            example: "POC acting as strong support in uptrend"
          }
        ]
      }
    }
  };

  const getCategoryData = (category: string) => {
    return technicalCategories[category as keyof typeof technicalCategories];
  };

  const getIndicatorsByLevel = (category: string, level: number) => {
    const categoryData = getCategoryData(category);
    return categoryData?.levels[level as keyof typeof categoryData.levels] || [];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trend': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'momentum': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'volatility': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'volume': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'reversal': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'continuation': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const handleLessonComplete = (indicatorId: string) => {
    const lessonId = `technical-${indicatorId}`;
    if (!completedLessons.includes(lessonId)) {
      onLessonComplete(lessonId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          {Object.entries(technicalCategories).map(([key, category]) => (
            <TabsTrigger 
              key={key} 
              value={key}
              className="flex items-center gap-2 data-[state=active]:bg-cyan-600/20"
            >
              <category.icon className="w-4 h-4" />
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(technicalCategories).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <div className="space-y-4">
              {/* Level Selection */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((level) => {
                  const hasContent = getIndicatorsByLevel(key, level).length > 0;
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
                            ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-800 border-gray-700 text-gray-500'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Level {level}
                    </Button>
                  );
                })}
              </div>

              {/* Indicators Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {getIndicatorsByLevel(key, currentLevel).map((indicator: Indicator) => {
                  const isCompleted = completedLessons.includes(`technical-${indicator.id}`);
                  
                  return (
                    <Card 
                      key={indicator.id}
                      className={`bg-gray-800/50 border-gray-600 ${
                        isCompleted ? 'ring-2 ring-green-500/50' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg text-cyan-300 flex items-center gap-2">
                              {indicator.name}
                              {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                            </CardTitle>
                            <Badge className={`text-xs ${getTypeColor(indicator.type)} mt-2`}>
                              {indicator.type}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                       <CardContent className="space-y-4">
                        <p className="text-gray-300 text-sm">{indicator.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-300 text-sm font-medium">Usage:</span>
                          </div>
                          <p className="text-blue-200 text-sm pl-6">{indicator.usage}</p>
                          
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 text-sm font-medium">Signals:</span>
                          </div>
                          <p className="text-yellow-200 text-sm pl-6">{indicator.signals}</p>
                          
                          <div className="flex items-center gap-2">
                            <LineChart className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-sm font-medium">Timeframes:</span>
                          </div>
                          <p className="text-purple-200 text-sm pl-6">{indicator.timeframes}</p>
                          
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-300 text-sm font-medium">Example:</span>
                          </div>
                          <p className="text-green-200 text-sm pl-6">{indicator.example}</p>

                          {/* Enhanced Details for Level 2+ indicators */}
                          {indicator.detailedExplanation && (
                            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                              <h4 className="text-blue-300 font-medium text-sm mb-2">📚 Detailed Explanation:</h4>
                              <p className="text-blue-200 text-sm">{indicator.detailedExplanation}</p>
                            </div>
                          )}

                          {indicator.tradingRules && (
                            <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                              <h4 className="text-green-300 font-medium text-sm mb-2">⚡ Trading Rules:</h4>
                              <ul className="space-y-1">
                                {indicator.tradingRules.map((rule, index) => (
                                  <li key={index} className="text-green-200 text-sm flex items-start gap-2">
                                    <span className="text-green-400 mt-1">•</span>
                                    {rule}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {indicator.settings && (
                            <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
                              <h4 className="text-purple-300 font-medium text-sm mb-2">⚙️ Settings untuk Different Timeframes:</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                {Object.entries(indicator.settings).map(([setting, value]) => (
                                  <div key={setting} className="flex justify-between">
                                    <span className="text-purple-400 capitalize">{setting}:</span>
                                    <span className="text-purple-200">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {!isCompleted && (
                          <Button
                            size="sm"
                            onClick={() => handleLessonComplete(indicator.id)}
                            className="w-full bg-green-600 hover:bg-green-500 mt-4"
                          >
                            Mark as Mastered
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};