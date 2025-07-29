import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  CheckCircle,
  Lock,
  Star,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface CandlestickEducationProps {
  currentLevel: number;
  onLevelUp: (level: number) => void;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
}

interface DetailedInfo {
  rules: string[];
  confirmation: string;
  stopLoss: string;
  target: string;
}

interface CandlestickPattern {
  id: string;
  name: string;
  type: string;
  description: string;
  visual: string;
  significance: string;
  example: string;
  detailedInfo?: DetailedInfo;
}

export const CandlestickEducation: React.FC<CandlestickEducationProps> = ({
  currentLevel,
  onLevelUp,
  completedLessons,
  onLessonComplete
}) => {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  const candlestickLevels = {
    1: {
      title: "Dasar-Dasar Candlestick",
      patterns: [
        {
          id: "basic-candle",
          name: "Struktur Candlestick",
          type: "basic",
          description: "Memahami komponen dasar: Body, Wick (Shadow), Open, High, Low, Close",
          visual: "📊",
          significance: "Foundation semua analisis candlestick",
          example: "Candle hijau = harga naik, candle merah = harga turun"
        },
        {
          id: "doji",
          name: "Doji",
          type: "reversal",
          description: "Candle dengan body sangat kecil atau tidak ada, menunjukkan ketidakpastian",
          visual: "➕",
          significance: "Sinyal potensial reversal trend",
          example: "Doji di top trend naik bisa jadi sinyal bearish"
        }
      ]
    },
    2: {
      title: "Pola Candlestick Tunggal",
      patterns: [
        {
          id: "hammer",
          name: "Hammer",
          type: "reversal",
          description: "Body kecil di atas, shadow bawah panjang minimal 2x body. Warna body tidak penting",
          visual: "🔨",
          significance: "Bullish reversal di downtrend, menunjukkan rejection dari sellers",
          example: "Hammer di support level = strong buy signal, apalagi dengan volume tinggi",
          detailedInfo: {
            rules: [
              "Lower shadow minimal 2x dari body size",
              "Upper shadow sangat kecil atau tidak ada",
              "Body bisa bullish atau bearish",
              "Harus muncul di downtrend untuk valid"
            ],
            confirmation: "Volume tinggi + gap up di candle berikutnya",
            stopLoss: "Di bawah low hammer candle",
            target: "Resistance terdekat atau 1:2 risk reward"
          }
        },
        {
          id: "shooting-star",
          name: "Shooting Star",
          type: "reversal",
          description: "Body kecil di bawah, shadow atas panjang",
          visual: "🌠",
          significance: "Bearish reversal di uptrend",
          example: "Shooting star di resistance = strong sell signal"
        },
        {
          id: "spinning-top",
          name: "Spinning Top",
          type: "indecision",
          description: "Body kecil dengan shadow panjang di kedua sisi",
          visual: "🎯",
          significance: "Ketidakpastian market, tunggu konfirmasi",
          example: "Spinning top = market indecision"
        }
      ]
    },
    3: {
      title: "Pola Candlestick Ganda",
      patterns: [
        {
          id: "engulfing-bullish",
          name: "Bullish Engulfing",
          type: "reversal",
          description: "Candle hijau besar yang 'menelan' candle merah sebelumnya completely",
          visual: "🟢⬅️🔴",
          significance: "Strong bullish reversal signal, menunjukkan shift dari sellers ke buyers",
          example: "Volume tinggi + engulfing = very strong signal untuk reversal",
          detailedInfo: {
            rules: [
              "Second candle harus completely engulf first candle body",
              "First candle harus bearish, second harus bullish",
              "Harus terjadi di downtrend untuk valid",
              "Volume pada engulfing candle harus tinggi"
            ],
            confirmation: "Break resistance + volume expansion di candle berikutnya",
            stopLoss: "Di bawah low dari engulfing pattern",
            target: "Previous resistance atau 1:3 risk reward ratio"
          }
        },
        {
          id: "engulfing-bearish",
          name: "Bearish Engulfing",
          type: "reversal",
          description: "Candle merah besar yang 'menelan' candle hijau sebelumnya",
          visual: "🔴⬅️🟢",
          significance: "Strong bearish reversal signal",
          example: "Di resistance level = excellent short opportunity"
        },
        {
          id: "tweezer-tops",
          name: "Tweezer Tops",
          type: "reversal",
          description: "Dua candle dengan high yang hampir sama di top",
          visual: "⚡⚡",
          significance: "Bearish reversal, resistance kuat",
          example: "Double top pattern dengan tweezer"
        }
      ]
    },
    4: {
      title: "Pola Candlestick Triple",
      patterns: [
        {
          id: "morning-star",
          name: "Morning Star",
          type: "reversal",
          description: "3 candle: bearish, small body, bullish - reversal pattern",
          visual: "🔴➕🟢",
          significance: "Powerful bullish reversal",
          example: "Morning star + oversold RSI = excellent buy"
        },
        {
          id: "evening-star",
          name: "Evening Star",
          type: "reversal",
          description: "3 candle: bullish, small body, bearish - top reversal",
          visual: "🟢➕🔴",
          significance: "Powerful bearish reversal",
          example: "Evening star + overbought RSI = excellent sell"
        },
        {
          id: "three-white-soldiers",
          name: "Three White Soldiers",
          type: "continuation",
          description: "3 candle hijau berturut-turut dengan body besar",
          visual: "🟢🟢🟢",
          significance: "Strong bullish continuation",
          example: "After consolidation = breakout signal"
        }
      ]
    },
    5: {
      title: "Advanced Candlestick Patterns",
      patterns: [
        {
          id: "harami-bullish",
          name: "Bullish Harami",
          type: "reversal",
          description: "Candle kecil di dalam body candle besar sebelumnya",
          visual: "🔴🟩",
          significance: "Potential bullish reversal",
          example: "Harami + support = reversal confirmation"
        },
        {
          id: "dark-cloud-cover",
          name: "Dark Cloud Cover",
          type: "reversal",
          description: "Candle bearish yang menutup di tengah body bullish sebelumnya",
          visual: "🟢🔴☁️",
          significance: "Bearish reversal signal",
          example: "Gap up + dark cloud = failed breakout"
        }
      ]
    }
  };

  const getPatternsByLevel = (level: number) => {
    const levelData = candlestickLevels[level as keyof typeof candlestickLevels];
    return levelData || { title: "Advanced Patterns", patterns: [] };
  };

  const getPatternTypeColor = (type: string) => {
    switch (type) {
      case 'reversal': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'continuation': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'indecision': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  const getCurrentLevelData = () => getPatternsByLevel(currentLevel);

  const handlePatternComplete = (patternId: string) => {
    const lessonId = `candlestick-${patternId}`;
    if (!completedLessons.includes(lessonId)) {
      onLessonComplete(lessonId);
    }
  };

  const canAccessLevel = (level: number) => {
    // All levels are now accessible - no restrictions
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Level Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(candlestickLevels).map((level) => {
          const levelNum = parseInt(level);
          const accessible = canAccessLevel(levelNum);
          const isActive = currentLevel === levelNum;
          
          return (
            <Button
              key={level}
              variant={isActive ? "default" : "outline"}
              size="sm"
              disabled={!accessible}
              onClick={() => onLevelUp(levelNum)}
              className={`${
                isActive 
                  ? 'bg-cyan-600 text-white' 
                  : accessible 
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-800 border-gray-700 text-gray-500'
              }`}
            >
              {accessible ? <CheckCircle className="w-4 h-4 mr-1" /> : <Lock className="w-4 h-4 mr-1" />}
              Level {level}
            </Button>
          );
        })}
      </div>

      {/* Current Level Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            {getCurrentLevelData().title}
          </h3>
          <Badge variant="outline" className="text-cyan-400 border-cyan-500">
            Level {currentLevel}
          </Badge>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {getCurrentLevelData().patterns.map((pattern: CandlestickPattern) => {
            const isCompleted = completedLessons.includes(`candlestick-${pattern.id}`);
            
            return (
              <Card 
                key={pattern.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPattern === pattern.id
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-cyan-400/20'
                    : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                } ${isCompleted ? 'ring-2 ring-green-500/50' : ''}`}
                onClick={() => setSelectedPattern(pattern.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{pattern.visual}</div>
                      <div>
                        <CardTitle className="text-lg text-cyan-300 flex items-center gap-2">
                          {pattern.name}
                          {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                        </CardTitle>
                        <Badge className={`text-xs ${getPatternTypeColor(pattern.type)}`}>
                          {pattern.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-300 text-sm mb-3">{pattern.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 text-sm font-medium">Significance:</span>
                    </div>
                    <p className="text-yellow-200 text-sm pl-6">{pattern.significance}</p>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 text-sm font-medium">Example:</span>
                    </div>
                    <p className="text-blue-200 text-sm pl-6">{pattern.example}</p>

                    {/* Enhanced Details for patterns with detailedInfo */}
                    {pattern.detailedInfo && (
                      <>
                        <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                          <h4 className="text-green-300 font-medium text-sm mb-2">📋 Pattern Rules:</h4>
                          <ul className="space-y-1">
                            {pattern.detailedInfo.rules.map((rule, index) => (
                              <li key={index} className="text-green-200 text-sm flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                {rule}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                          <h4 className="text-blue-300 font-medium text-sm mb-2">✅ Confirmation:</h4>
                          <p className="text-blue-200 text-sm">{pattern.detailedInfo.confirmation}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-red-900/20 p-2 rounded border border-red-500/30">
                            <h4 className="text-red-300 font-medium text-xs mb-1">🛑 Stop Loss:</h4>
                            <p className="text-red-200 text-xs">{pattern.detailedInfo.stopLoss}</p>
                          </div>
                          <div className="bg-green-900/20 p-2 rounded border border-green-500/30">
                            <h4 className="text-green-300 font-medium text-xs mb-1">🎯 Target:</h4>
                            <p className="text-green-200 text-xs">{pattern.detailedInfo.target}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {!isCompleted && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatternComplete(pattern.id);
                      }}
                      className="mt-4 w-full bg-green-600 hover:bg-green-500"
                    >
                      Mark as Learned
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress Summary */}
        <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
          <CardContent className="p-4">
            <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Progress Level {currentLevel}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">
                  {getCurrentLevelData().patterns.filter(p => 
                    completedLessons.includes(`candlestick-${p.id}`)
                  ).length}
                </p>
                <p className="text-green-300">Patterns Mastered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {getCurrentLevelData().patterns.length}
                </p>
                <p className="text-blue-300">Total Patterns</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">
                  {Math.round((getCurrentLevelData().patterns.filter(p => 
                    completedLessons.includes(`candlestick-${p.id}`)
                  ).length / getCurrentLevelData().patterns.length) * 100)}%
                </p>
                <p className="text-purple-300">Completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};