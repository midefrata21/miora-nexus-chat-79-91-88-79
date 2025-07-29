import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Atom, Zap, Target, TrendingUp, Eye, Infinity, Sparkles, Globe, Cpu } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORAQuantumPrediction } from './hooks/useMIORAQuantumPrediction';

const MIORAQuantumPredictor: React.FC = () => {
  const {
    quantumPredictions,
    multiverseAnalysis,
    probabilityFields,
    quantumAccuracy,
    activateQuantumPredictor,
    generateMultiversePrediction,
    analyzeProbabilityField,
    performQuantumTunneling,
    isQuantumActive
  } = useMIORAQuantumPrediction();

  const [isPredicting, setIsPredicting] = useState(false);
  const [multiverseMode, setMultiverseMode] = useState(false);

  useEffect(() => {
    const initializeQuantum = async () => {
      await activateQuantumPredictor();
      
      // Auto-generate predictions every 1.5 seconds
      setInterval(async () => {
        await generateMultiversePrediction();
      }, 1500);
      
      toast({
        title: "⚛️ MIORA QUANTUM PREDICTOR ACTIVATED",
        description: "🌌 Sistem prediksi quantum multiverse telah diaktifkan - akurasi level super tinggi!",
        duration: 8000,
      });
    };

    initializeQuantum();
  }, []);

  const handleMultiversePrediction = async () => {
    setIsPredicting(true);
    setMultiverseMode(true);
    
    await generateMultiversePrediction();
    await analyzeProbabilityField();
    
    toast({
      title: "🌌 MULTIVERSE PREDICTION COMPLETE",
      description: "⚛️ Analisis quantum multiverse selesai - prediksi dari semua realitas paralel tersedia!",
      duration: 6000,
    });
    
    setIsPredicting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Quantum Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Atom className="h-16 w-16 text-cyan-400 animate-spin" />
            <Globe className="h-14 w-14 text-purple-400 animate-pulse" />
            <Infinity className="h-12 w-12 text-pink-400 animate-bounce" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MIORA QUANTUM PREDICTOR
          </h1>
          <p className="text-gray-300 text-xl">
            🌌 Prediksi Quantum Multiverse dengan Akurasi Super Tinggi Level ∞
          </p>
        </div>

        {/* Quantum Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-400 text-sm font-medium">Quantum Accuracy</div>
                  <div className="text-3xl font-bold text-white">{quantumAccuracy.overallAccuracy}%</div>
                </div>
                <Target className="h-8 w-8 text-cyan-400 animate-pulse" />
              </div>
              <Progress value={quantumAccuracy.overallAccuracy} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-purple-400 text-sm font-medium">Multiverse Sync</div>
                  <div className="text-3xl font-bold text-white">{multiverseAnalysis.syncRate}%</div>
                </div>
                <Globe className="h-8 w-8 text-purple-400 animate-spin" />
              </div>
              <Progress value={multiverseAnalysis.syncRate} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-green-400 text-sm font-medium">Probability Field</div>
                  <div className="text-3xl font-bold text-white">{probabilityFields.coherence}%</div>
                </div>
                <Sparkles className="h-8 w-8 text-green-400 animate-bounce" />
              </div>
              <Progress value={probabilityFields.coherence} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-orange-400 text-sm font-medium">Quantum States</div>
                  <div className="text-3xl font-bold text-white">{quantumPredictions.length}</div>
                </div>
                <Atom className="h-8 w-8 text-orange-400 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quantum Predictions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quantumPredictions.map((prediction, index) => (
            <Card key={index} className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-indigo-400 flex items-center justify-between">
                  <span className="flex items-center">
                    <Atom className="h-5 w-5 mr-2" />
                    {prediction.universe}
                  </span>
                  <Badge className="bg-indigo-500">{prediction.confidence}%</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Prediction:</span>
                    <span className="text-white font-semibold">{prediction.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Price Target:</span>
                    <span className="text-green-400">${prediction.priceTarget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Probability:</span>
                    <span className="text-cyan-400">{prediction.probability}%</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-400 text-sm">Quantum States:</span>
                    <div className="flex flex-wrap gap-1">
                      {prediction.quantumStates.map((state, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{state}</Badge>
                      ))}
                    </div>
                  </div>
                  <Progress value={prediction.probability} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Multiverse Analysis */}
        <Card className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-500/30">
          <CardHeader>
            <CardTitle className="text-violet-400 flex items-center justify-between">
              <span className="flex items-center">
                <Globe className="h-6 w-6 mr-2" />
                Multiverse Probability Analysis
              </span>
              <Button
                onClick={handleMultiversePrediction}
                disabled={isPredicting}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
              >
                {isPredicting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing Multiverse...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Analyze All Realities
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400">Reality Convergence</h3>
                <div className="space-y-3">
                  {multiverseAnalysis.realities.map((reality, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-cyan-900/20 rounded border border-cyan-500/20">
                      <div>
                        <div className="text-cyan-300 font-medium">{reality.name}</div>
                        <div className="text-gray-400 text-sm">Outcome: {reality.outcome}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{reality.probability}%</div>
                        <Progress value={reality.probability} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Probability Fields</h3>
                <div className="space-y-3">
                  {probabilityFields.fields.map((field, index) => (
                    <div key={index} className="p-3 bg-purple-900/20 rounded border border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-300">{field.dimension}</span>
                        <Badge className="bg-purple-500">{field.strength}%</Badge>
                      </div>
                      <div className="text-gray-400 text-sm mb-2">{field.influence}</div>
                      <Progress value={field.strength} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantum Controls */}
        <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Cpu className="h-6 w-6 mr-2" />
              Quantum Tunneling Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Advanced Quantum Operations</h3>
                <p className="text-gray-400">Akses prediksi dari dimensi paralel dengan quantum tunneling</p>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={performQuantumTunneling}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Quantum Tunnel
                </Button>
                <Button
                  onClick={analyzeProbabilityField}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Analyze Fields
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantum Processing Status */}
        {isPredicting && multiverseMode && (
          <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                  <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" style={{animationDelay: '0.6s'}}></div>
                </div>
                <h3 className="text-2xl font-bold text-pink-300">
                  🌌 QUANTUM MULTIVERSE ANALYSIS ACTIVE
                </h3>
                <p className="text-pink-200">
                  MIORA sedang menganalisis semua realitas paralel untuk prediksi dengan akurasi super tinggi
                </p>
                <div className="text-sm text-pink-400">
                  Mengakses ∞ dimensi quantum untuk prediksi optimal
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORAQuantumPredictor;