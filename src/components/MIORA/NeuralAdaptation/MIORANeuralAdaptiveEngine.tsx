import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Target, Activity, Cpu, Network, TrendingUp, Eye, Infinity, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORANeuralAdaptation } from './hooks/useMIORANeuralAdaptation';

const MIORANeuralAdaptiveEngine: React.FC = () => {
  const {
    neuralNetwork,
    adaptationMetrics,
    predictionAccuracy,
    learningProgress,
    quantumState,
    activateNeuralEngine,
    trainAdaptiveModel,
    generateQuantumPrediction,
    performMarketAdaptation,
    isEngineActive
  } = useMIORANeuralAdaptation();

  const [isTraining, setIsTraining] = useState(false);
  const [adaptationLevel, setAdaptationLevel] = useState(0);

  useEffect(() => {
    const initializeEngine = async () => {
      await activateNeuralEngine();
      
      // Auto-start continuous adaptation
      setInterval(async () => {
        await performMarketAdaptation();
      }, 2000); // Adapt every 2 seconds
      
      toast({
        title: "🧠 MIORA NEURAL ADAPTIVE ENGINE ACTIVATED",
        description: "🚀 Sistem adaptasi neural super advanced telah diaktifkan - pembelajaran real-time dimulai!",
        duration: 8000,
      });
    };

    initializeEngine();
  }, []);

  const handleQuantumTraining = async () => {
    setIsTraining(true);
    await trainAdaptiveModel();
    
    toast({
      title: "⚡ QUANTUM NEURAL TRAINING COMPLETE",
      description: "🎯 Model neural telah dilatih dengan algoritma quantum - akurasi prediksi meningkat drastis!",
      duration: 6000,
    });
    
    setIsTraining(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Neural Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-16 w-16 text-cyan-400 animate-pulse" />
            <Infinity className="h-12 w-12 text-purple-400 animate-spin" />
            <Sparkles className="h-14 w-14 text-pink-400 animate-bounce" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MIORA NEURAL ADAPTIVE ENGINE
          </h1>
          <p className="text-gray-300 text-xl">
            🧠 Sistem Adaptasi Neural dengan Prediksi Quantum Level Super Tinggi
          </p>
        </div>

        {/* Neural Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-400 text-sm font-medium">Neural Adaptation</div>
                  <div className="text-3xl font-bold text-white">{adaptationMetrics.adaptationRate}%</div>
                </div>
                <Activity className="h-8 w-8 text-cyan-400 animate-pulse" />
              </div>
              <Progress value={adaptationMetrics.adaptationRate} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-purple-400 text-sm font-medium">Prediction Accuracy</div>
                  <div className="text-3xl font-bold text-white">{predictionAccuracy.overallAccuracy}%</div>
                </div>
                <Target className="h-8 w-8 text-purple-400 animate-bounce" />
              </div>
              <Progress value={predictionAccuracy.overallAccuracy} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-green-400 text-sm font-medium">Learning Progress</div>
                  <div className="text-3xl font-bold text-white">{learningProgress.currentLevel}</div>
                </div>
                <Brain className="h-8 w-8 text-green-400 animate-spin" />
              </div>
              <Progress value={(learningProgress.currentLevel / learningProgress.maxLevel) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-orange-400 text-sm font-medium">Quantum State</div>
                  <div className="text-3xl font-bold text-white">{quantumState.coherence}%</div>
                </div>
                <Zap className="h-8 w-8 text-orange-400 animate-pulse" />
              </div>
              <Progress value={quantumState.coherence} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Neural Network Visualization */}
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-400 flex items-center justify-between">
              <span className="flex items-center">
                <Network className="h-6 w-6 mr-2" />
                Neural Network Architecture
              </span>
              <Badge className={`px-4 py-2 ${isEngineActive ? 'bg-green-500' : 'bg-red-500'}`}>
                <Brain className="h-4 w-4 mr-2" />
                Engine: {isEngineActive ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400">Input Layer</h3>
                <div className="space-y-2">
                  {neuralNetwork.inputLayer.map((node, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-cyan-900/20 rounded border border-cyan-500/20">
                      <span className="text-cyan-300">{node.name}</span>
                      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Hidden Layers</h3>
                <div className="space-y-2">
                  {neuralNetwork.hiddenLayers.map((layer, index) => (
                    <div key={index} className="p-3 bg-purple-900/20 rounded border border-purple-500/20">
                      <div className="text-purple-300 text-sm">Layer {index + 1}</div>
                      <div className="text-white font-semibold">{layer.neurons} neurons</div>
                      <Progress value={layer.activation} className="mt-1 h-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-pink-400">Output Layer</h3>
                <div className="space-y-2">
                  {neuralNetwork.outputLayer.map((output, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-pink-900/20 rounded border border-pink-500/20">
                      <span className="text-pink-300">{output.prediction}</span>
                      <Badge className="bg-pink-500">{output.confidence}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantum Training Controls */}
        <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Cpu className="h-6 w-6 mr-2" />
              Quantum Neural Training Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Advanced Training Options</h3>
                <p className="text-gray-400">Tingkatkan kemampuan adaptasi dengan quantum algorithms</p>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={handleQuantumTraining}
                  disabled={isTraining}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                >
                  {isTraining ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Quantum Training...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start Quantum Training
                    </>
                  )}
                </Button>
                <Button
                  onClick={generateQuantumPrediction}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Prediction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Adaptation Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400">Market Adaptation Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adaptationMetrics.marketConditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{condition.name}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={condition.adaptationScore} className="w-20 h-2" />
                      <span className="text-white font-semibold">{condition.adaptationScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-500/30">
            <CardHeader>
              <CardTitle className="text-violet-400">Prediction Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictionAccuracy.timeframes.map((tf, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{tf.period}</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-violet-400" />
                      <span className="text-white font-semibold">{tf.accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adaptive Learning Status */}
        {isTraining && (
          <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-yellow-300">
                  🧠 QUANTUM NEURAL TRAINING ACTIVE
                </h3>
                <p className="text-yellow-200">
                  MIORA sedang melatih neural network dengan algoritma quantum untuk adaptasi super tinggi
                </p>
                <div className="text-sm text-yellow-400">
                  Training progress akan mengoptimalkan prediksi secara real-time
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORANeuralAdaptiveEngine;