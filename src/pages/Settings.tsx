
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Settings as SettingsIcon, 
  User, 
  Mic, 
  Volume2, 
  Brain, 
  Shield,
  Palette,
  Bell,
  Globe,
  Monitor,
  Database,
  Wifi
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Voice Settings
    voiceEnabled: true,
    speechRecognition: true,
    textToSpeech: true,
    voiceVolume: [80],
    micSensitivity: [70],
    autoResponse: true,
    
    // AI Settings
    aiPersonality: 'bersahabat',
    contextMemory: true,
    emotionDetection: true,
    learningMode: true,
    
    // Interface Settings
    darkMode: true,
    animations: true,
    notifications: true,
    compactMode: false,
    
    // Privacy Settings
    dataCollection: false,
    cloudSync: false,
    localOnly: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "⚙️ Settings Updated",
      description: `${key} telah diperbarui`,
      duration: 2000,
    });
  };

  const personalities = [
    { id: 'professional', name: 'Professional', desc: 'Formal dan sistematis' },
    { id: 'santai', name: 'Santai', desc: 'Kasual dan rileks' },
    { id: 'bersahabat', name: 'Bersahabat', desc: 'Hangat dan suportif' },
    { id: 'penasihat', name: 'Penasihat', desc: 'Bijaksana dan membimbing' },
    { id: 'spiritual', name: 'Spiritual', desc: 'Tenang dan kontemplatif' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
            MIORA Settings
            <Brain className="w-8 h-8 text-purple-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Configure your MIORA AI experience
          </p>
        </div>

        <Tabs defaultValue="voice" className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-gray-600/30 grid grid-cols-5">
            <TabsTrigger value="voice" className="data-[state=active]:bg-blue-600">
              <Mic className="w-4 h-4 mr-2" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              AI
            </TabsTrigger>
            <TabsTrigger value="interface" className="data-[state=active]:bg-green-600">
              <Palette className="w-4 h-4 mr-2" />
              Interface
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-red-600">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-orange-600">
              <Monitor className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Voice Settings */}
          <TabsContent value="voice" className="space-y-6">
            <Card className="bg-gray-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Voice Engine Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Voice Recognition</h3>
                        <p className="text-gray-400 text-sm">Enable speech input</p>
                      </div>
                      <Switch
                        checked={settings.speechRecognition}
                        onCheckedChange={(value) => handleSettingChange('speechRecognition', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Text-to-Speech</h3>
                        <p className="text-gray-400 text-sm">Enable voice output</p>
                      </div>
                      <Switch
                        checked={settings.textToSpeech}
                        onCheckedChange={(value) => handleSettingChange('textToSpeech', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Auto Response</h3>
                        <p className="text-gray-400 text-sm">Automatic conversation starter</p>
                      </div>
                      <Switch
                        checked={settings.autoResponse}
                        onCheckedChange={(value) => handleSettingChange('autoResponse', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">Voice Volume</h3>
                        <span className="text-blue-300">{settings.voiceVolume[0]}%</span>
                      </div>
                      <Slider
                        value={settings.voiceVolume}
                        onValueChange={(value) => handleSettingChange('voiceVolume', value)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">Mic Sensitivity</h3>
                        <span className="text-blue-300">{settings.micSensitivity[0]}%</span>
                      </div>
                      <Slider
                        value={settings.micSensitivity}
                        onValueChange={(value) => handleSettingChange('micSensitivity', value)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Behavior Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">AI Personality</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {personalities.map((personality) => (
                      <Button
                        key={personality.id}
                        onClick={() => handleSettingChange('aiPersonality', personality.id)}
                        variant={settings.aiPersonality === personality.id ? "default" : "outline"}
                        className={`justify-start h-auto p-4 ${
                          settings.aiPersonality === personality.id 
                            ? 'bg-purple-600 text-white' 
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium">{personality.name}</div>
                          <div className="text-sm opacity-80">{personality.desc}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Context Memory</h3>
                        <p className="text-gray-400 text-sm">Remember conversation context</p>
                      </div>
                      <Switch
                        checked={settings.contextMemory}
                        onCheckedChange={(value) => handleSettingChange('contextMemory', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Learning Mode</h3>
                        <p className="text-gray-400 text-sm">Continuous learning from interactions</p>
                      </div>
                      <Switch
                        checked={settings.learningMode}
                        onCheckedChange={(value) => handleSettingChange('learningMode', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Emotion Detection</h3>
                        <p className="text-gray-400 text-sm">Analyze emotional context</p>
                      </div>
                      <Switch
                        checked={settings.emotionDetection}
                        onCheckedChange={(value) => handleSettingChange('emotionDetection', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interface Settings */}
          <TabsContent value="interface" className="space-y-6">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Interface Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Dark Mode</h3>
                        <p className="text-gray-400 text-sm">Use dark theme</p>
                      </div>
                      <Switch
                        checked={settings.darkMode}
                        onCheckedChange={(value) => handleSettingChange('darkMode', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Animations</h3>
                        <p className="text-gray-400 text-sm">Enable UI animations</p>
                      </div>
                      <Switch
                        checked={settings.animations}
                        onCheckedChange={(value) => handleSettingChange('animations', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Notifications</h3>
                        <p className="text-gray-400 text-sm">Show system notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications}
                        onCheckedChange={(value) => handleSettingChange('notifications', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Compact Mode</h3>
                        <p className="text-gray-400 text-sm">Use compact interface</p>
                      </div>
                      <Switch
                        checked={settings.compactMode}
                        onCheckedChange={(value) => handleSettingChange('compactMode', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-gray-800/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Data Collection</h3>
                        <p className="text-gray-400 text-sm">Allow usage analytics</p>
                      </div>
                      <Switch
                        checked={settings.dataCollection}
                        onCheckedChange={(value) => handleSettingChange('dataCollection', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Cloud Sync</h3>
                        <p className="text-gray-400 text-sm">Sync data to cloud</p>
                      </div>
                      <Switch
                        checked={settings.cloudSync}
                        onCheckedChange={(value) => handleSettingChange('cloudSync', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Local Only Mode</h3>
                        <p className="text-gray-400 text-sm">Keep all data local</p>
                      </div>
                      <Switch
                        checked={settings.localOnly}
                        onCheckedChange={(value) => handleSettingChange('localOnly', value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <h3 className="text-green-300 font-medium">Privacy Status</h3>
                  </div>
                  <p className="text-green-200 text-sm">
                    MIORA beroperasi dalam mode privacy-first dengan enkripsi lokal dan tanpa ketergantungan cloud.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card className="bg-gray-800/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-300 flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-700/50 border-gray-600/30">
                    <CardContent className="p-4 text-center">
                      <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                      <div className="text-lg font-bold text-white">2.1 GB</div>
                      <div className="text-sm text-gray-400">Storage Used</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700/50 border-gray-600/30">
                    <CardContent className="p-4 text-center">
                      <Wifi className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      <div className="text-lg font-bold text-white">Online</div>
                      <div className="text-sm text-gray-400">Connection</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700/50 border-gray-600/30">
                    <CardContent className="p-4 text-center">
                      <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                      <div className="text-lg font-bold text-white">Active</div>
                      <div className="text-sm text-gray-400">AI Engine</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Monitor className="w-4 h-4 mr-2" />
                    Run System Diagnostics
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Export Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
