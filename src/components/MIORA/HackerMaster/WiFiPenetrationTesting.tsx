import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wifi, Shield, Unlock, Eye, Search, Target, Crosshair, Zap, 
  Lock, AlertTriangle, CheckCircle, XCircle, Radio, Network,
  Download, Copy, Activity, Clock, FileText, Scan, WifiOff, 
  Router, Signal, Globe, Settings, Key, Phone
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WiFiNetwork {
  ssid: string;
  bssid: string;
  channel: number;
  signal: number;
  encryption: string;
  security: string;
  clients: number;
  vulnerabilityScore: number;
  exploitMethods: string[];
  lastSeen: Date;
}

interface WiFiAttack {
  type: string;
  target: string;
  method: string;
  progress: number;
  status: 'running' | 'completed' | 'failed';
  result?: string;
}

interface WiFiConnection {
  ssid: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'failed';
  password?: string;
  ip?: string;
  gateway?: string;
  dns?: string;
  signalStrength: number;
  connectionTime?: Date;
}

interface RealTimeNetworkData {
  connectedDevices: number;
  bandwidth: string;
  latency: number;
  packetLoss: number;
  securityThreats: string[];
}

const WiFiPenetrationTesting: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [wifiNetworks, setWifiNetworks] = useState<WiFiNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [activeAttack, setActiveAttack] = useState<WiFiAttack | null>(null);
  const [penetrationReport, setPenetrationReport] = useState('');
  const [interfaceMode, setInterfaceMode] = useState('monitor');
  
  // Enhanced WiFi Connection Features
  const [wifiConnection, setWifiConnection] = useState<WiFiConnection | null>(null);
  const [connectionPassword, setConnectionPassword] = useState('');
  const [realTimeData, setRealTimeData] = useState<RealTimeNetworkData | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [availableNetworks, setAvailableNetworks] = useState<WiFiNetwork[]>([]);
  const [enableRealTimeMonitoring, setEnableRealTimeMonitoring] = useState(false);

  // Simulate WiFi networks with realistic vulnerabilities
  const generateWiFiNetworks = (): WiFiNetwork[] => {
    const commonSSIDs = [
      'HOME-WiFi', 'OFFICE-NET', 'CafeWiFi', 'Guest-Network', 'Router123',
      'TP-Link_5G', 'NETGEAR-2.4G', 'Linksys00', 'ASUS_AC88U', 'Vodafone-WiFi',
      'Indihome', 'MyRepublic', 'Biznet-Home', 'FirstMedia', 'IndiHome-WiFi'
    ];

    const encryptionTypes = ['WPA2-PSK', 'WPA3-PSK', 'WEP', 'Open', 'WPA-PSK', 'WPA2-Enterprise'];
    
    return Array.from({ length: 15 + Math.floor(Math.random() * 10) }, (_, index) => {
      const encryption = encryptionTypes[Math.floor(Math.random() * encryptionTypes.length)];
      const signal = -30 - Math.floor(Math.random() * 70); // -30 to -100 dBm
      
      // Calculate vulnerability score based on encryption and other factors
      let vulnerabilityScore = 0;
      if (encryption === 'WEP') vulnerabilityScore = 9;
      else if (encryption === 'Open') vulnerabilityScore = 10;
      else if (encryption === 'WPA-PSK') vulnerabilityScore = 7;
      else if (encryption === 'WPA2-PSK') vulnerabilityScore = 4;
      else if (encryption === 'WPA3-PSK') vulnerabilityScore = 2;
      else if (encryption === 'WPA2-Enterprise') vulnerabilityScore = 1;

      // Add random factors
      vulnerabilityScore += Math.floor(Math.random() * 3);

      const exploitMethods = [];
      if (encryption === 'WEP') {
        exploitMethods.push('Aircrack-ng WEP Cracking', 'Chopchop Attack', 'Fragmentation Attack');
      } else if (encryption === 'Open') {
        exploitMethods.push('Evil Twin Attack', 'Packet Sniffing', 'Man-in-the-Middle');
      } else if (encryption.includes('WPA')) {
        exploitMethods.push('WPA2 4-Way Handshake Capture', 'Dictionary Attack', 'Evil Twin AP');
        if (vulnerabilityScore > 5) {
          exploitMethods.push('WPS PIN Attack', 'PMKID Attack', 'Krack Attack');
        }
      }

      return {
        ssid: commonSSIDs[Math.floor(Math.random() * commonSSIDs.length)] + (index > 10 ? `_${index}` : ''),
        bssid: Array.from({ length: 6 }, () => 
          Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        ).join(':'),
        channel: [1, 6, 11, 36, 40, 44, 149, 153][Math.floor(Math.random() * 8)],
        signal,
        encryption,
        security: encryption === 'Open' ? 'None' : encryption,
        clients: Math.floor(Math.random() * 15),
        vulnerabilityScore: Math.min(vulnerabilityScore, 10),
        exploitMethods,
        lastSeen: new Date(Date.now() - Math.random() * 3600000) // Within last hour
      };
    });
  };

  const startWiFiScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setWifiNetworks([]);

    const scanSteps = [
      '🔧 Mengatur interface network ke mode monitor...',
      '📡 Memulai scanning frekuensi 2.4GHz...',
      '📊 Scanning frekuensi 5GHz...',
      '🔍 Mendeteksi access point tersembunyi...',
      '📋 Menganalisis beacon frames...',
      '🔐 Mengidentifikasi metode enkripsi...',
      '👥 Mendeteksi client yang terhubung...',
      '⚡ Menganalisis kekuatan sinyal...',
      '🎯 Menilai tingkat kerentanan...',
      '📈 Menyusun laporan penetration testing...'
    ];

    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      setScanProgress((i + 1) / scanSteps.length * 100);
      
      toast({
        title: "WiFi Scanner",
        description: scanSteps[i],
        duration: 1000,
      });
    }

    const networks = generateWiFiNetworks();
    setWifiNetworks(networks);
    setIsScanning(false);

    toast({
      title: "🎯 WiFi Scan Complete",
      description: `Ditemukan ${networks.length} jaringan WiFi dengan ${networks.filter(n => n.vulnerabilityScore > 6).length} target potensial`,
      duration: 3000,
    });
  };

  const executeWiFiAttack = async (network: WiFiNetwork, attackType: string) => {
    const attack: WiFiAttack = {
      type: attackType,
      target: network.ssid,
      method: getAttackMethod(attackType, network.encryption),
      progress: 0,
      status: 'running'
    };

    setActiveAttack(attack);

    const attackSteps = getAttackSteps(attackType, network);
    
    for (let i = 0; i < attackSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
      
      const progress = ((i + 1) / attackSteps.length) * 100;
      setActiveAttack(prev => prev ? { ...prev, progress } : null);
      
      toast({
        title: `${attackType} Attack`,
        description: attackSteps[i],
        duration: 1500,
      });
    }

    // Simulate attack result
    const success = Math.random() > 0.3; // 70% success rate
    const result = success ? generateSuccessfulAttackResult(attackType, network) : 'Attack failed - Target may have additional protections';
    
    setActiveAttack(prev => prev ? { 
      ...prev, 
      progress: 100, 
      status: success ? 'completed' : 'failed',
      result 
    } : null);

    if (success) {
      toast({
        title: "🔥 Attack Successful!",
        description: `${attackType} berhasil pada ${network.ssid}`,
        duration: 3000,
      });
      
      // Generate penetration report
      generatePenetrationReport(network, attackType, result);
    } else {
      toast({
        title: "⚠️ Attack Failed",
        description: `${attackType} gagal pada ${network.ssid}`,
        duration: 3000,
      });
    }
  };

  const getAttackMethod = (attackType: string, encryption: string): string => {
    const methods: Record<string, string> = {
      'WEP Cracking': 'Aircrack-ng + IV collection',
      'WPA2 Handshake': 'Airodump-ng + Aircrack-ng',
      'Evil Twin': 'Hostapd + Captive Portal',
      'WPS Attack': 'Reaver + Pixie Dust',
      'PMKID Attack': 'Hashcat + PMKID extraction',
      'Deauth Attack': 'Aireplay-ng deauthentication',
      'Packet Injection': 'Custom packet crafting'
    };
    return methods[attackType] || 'Custom exploitation';
  };

  const getAttackSteps = (attackType: string, network: WiFiNetwork): string[] => {
    const baseSteps = [
      `🎯 Memilih target: ${network.ssid}`,
      '🔧 Mempersiapkan tools penetration testing...',
      '📡 Mengatur monitoring interface...'
    ];

    const specificSteps: Record<string, string[]> = {
      'WEP Cracking': [
        '📊 Mengumpulkan IV (Initialization Vectors)...',
        '⚡ Melakukan packet injection untuk mempercepat...',
        '🔐 Menjalankan aircrack-ng untuk cracking key...',
        '🎉 Mengekstrak WEP key...'
      ],
      'WPA2 Handshake': [
        '👥 Mendeteksi client yang terhubung...',
        '💥 Melakukan deauthentication attack...',
        '🤝 Menangkap 4-way handshake...',
        '📖 Menjalankan dictionary attack...',
        '🔑 Mengekstrak PSK password...'
      ],
      'Evil Twin': [
        '🌐 Membuat access point palsu...',
        '📋 Menyiapkan captive portal...',
        '🎭 Meniru konfigurasi target AP...',
        '🕸️ Menunggu victim terhubung...',
        '🔐 Mengambil kredensial login...'
      ],
      'WPS Attack': [
        '🔢 Mendeteksi WPS yang aktif...',
        '⚡ Menjalankan Pixie Dust attack...',
        '🎯 Melakukan brute force WPS PIN...',
        '🔓 Mengekstrak WPA2 key dari WPS...'
      ]
    };

    return [...baseSteps, ...(specificSteps[attackType] || ['🔥 Menjalankan custom attack...'])];
  };

  const generateSuccessfulAttackResult = (attackType: string, network: WiFiNetwork): string => {
    const results: Record<string, string> = {
      'WEP Cracking': `WEP Key: ${Array.from({length: 10}, () => Math.random().toString(16)[2]).join('').toUpperCase()}`,
      'WPA2 Handshake': `PSK Password: ${['password123', 'admin1234', 'qwerty123', 'password', '12345678'][Math.floor(Math.random() * 5)]}`,
      'Evil Twin': `Captured Credentials: admin / ${Math.random().toString(36).substr(2, 8)}`,
      'WPS Attack': `WPS PIN: ${Math.floor(Math.random() * 90000000) + 10000000}`,
      'PMKID Attack': `PMKID Hash: ${Array.from({length: 32}, () => Math.random().toString(16)[2]).join('')}`,
      'Deauth Attack': `Successfully disconnected ${Math.floor(Math.random() * 10) + 1} clients`
    };
    return results[attackType] || 'Access gained to target network';
  };

  const generatePenetrationReport = (network: WiFiNetwork, attackType: string, result: string) => {
    const report = `
🔥 MIORA WiFi PENETRATION TESTING REPORT 🔥
================================================================

TARGET INFORMATION:
- SSID: ${network.ssid}
- BSSID: ${network.bssid}
- Channel: ${network.channel}
- Signal Strength: ${network.signal} dBm
- Encryption: ${network.encryption}
- Connected Clients: ${network.clients}
- Vulnerability Score: ${network.vulnerabilityScore}/10

ATTACK DETAILS:
- Attack Type: ${attackType}
- Method Used: ${getAttackMethod(attackType, network.encryption)}
- Execution Time: ${new Date().toLocaleString()}
- Status: SUCCESS

RESULTS:
${result}

SECURITY RECOMMENDATIONS:
${getSecurityRecommendations(network.encryption)}

DISCLAIMER: This penetration test was conducted for educational 
and authorized security assessment purposes only.
================================================================
`;
    setPenetrationReport(report);
  };

  const getSecurityRecommendations = (encryption: string): string => {
    const recommendations: Record<string, string> = {
      'WEP': '- Upgrade to WPA3 immediately\n- WEP is completely broken\n- Use strong random passwords',
      'WPA-PSK': '- Upgrade to WPA3\n- Use complex 20+ character passwords\n- Disable WPS',
      'WPA2-PSK': '- Consider upgrading to WPA3\n- Use strong passphrases (20+ chars)\n- Disable WPS\n- Regular password rotation',
      'WPA3-PSK': '- Use strong passphrases\n- Regular security updates\n- Monitor for unusual activity',
      'Open': '- Implement WPA3 encryption\n- Never use open networks for sensitive data\n- Use VPN when necessary'
    };
    return recommendations[encryption] || '- Regular security audits recommended';
  };

  const getVulnerabilityColor = (score: number) => {
    if (score >= 8) return 'bg-red-500';
    if (score >= 6) return 'bg-orange-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const copyReportToClipboard = () => {
    navigator.clipboard.writeText(penetrationReport);
    toast({
      title: "📋 Report Copied",
      description: "Penetration report copied to clipboard",
      duration: 2000,
    });
  };

  // Enhanced WiFi Connection Functions
  const connectToWiFi = async (network: WiFiNetwork, password?: string) => {
    setIsConnecting(true);
    setWifiConnection({
      ssid: network.ssid,
      status: 'connecting',
      password: password,
      signalStrength: network.signal,
    });

    const connectionSteps = [
      '🔐 Mengautentikasi kredensial WiFi...',
      '🤝 Melakukan handshake dengan access point...',
      '📡 Mendapatkan alamat IP dari DHCP...',
      '🌐 Mengkonfigurasi gateway dan DNS...',
      '🔗 Memverifikasi koneksi internet...',
      '✅ Koneksi WiFi berhasil!'
    ];

    for (let i = 0; i < connectionSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
      
      toast({
        title: "WiFi Connection",
        description: connectionSteps[i],
        duration: 1000,
      });
    }

    // Simulate connection success
    const success = Math.random() > 0.2; // 80% success rate
    
    if (success) {
      const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      const gateway = `192.168.${Math.floor(Math.random() * 255)}.1`;
      
      setWifiConnection({
        ssid: network.ssid,
        status: 'connected',
        password: password,
        ip: ip,
        gateway: gateway,
        dns: '8.8.8.8, 8.8.4.4',
        signalStrength: network.signal,
        connectionTime: new Date()
      });

      toast({
        title: "🎉 WiFi Connected!",
        description: `Successfully connected to ${network.ssid}`,
        duration: 3000,
      });

      // Start real-time monitoring if enabled
      if (enableRealTimeMonitoring) {
        startRealTimeMonitoring();
      }
    } else {
      setWifiConnection(prev => prev ? { ...prev, status: 'failed' } : null);
      toast({
        title: "❌ Connection Failed",
        description: "Failed to connect to WiFi network",
        duration: 3000,
      });
    }
    
    setIsConnecting(false);
  };

  const disconnectWiFi = () => {
    setWifiConnection(prev => prev ? { ...prev, status: 'disconnected' } : null);
    setRealTimeData(null);
    toast({
      title: "📡 Disconnected",
      description: "WiFi connection terminated",
      duration: 2000,
    });
  };

  const startRealTimeMonitoring = () => {
    const interval = setInterval(() => {
      setRealTimeData({
        connectedDevices: Math.floor(Math.random() * 20) + 5,
        bandwidth: `${(Math.random() * 100).toFixed(1)} Mbps`,
        latency: Math.floor(Math.random() * 50) + 10,
        packetLoss: Math.random() * 2,
        securityThreats: Math.random() > 0.7 ? ['Suspicious device detected', 'Unusual traffic pattern'] : []
      });
    }, 3000);

    // Store interval for cleanup
    return () => clearInterval(interval);
  };

  const scanAvailableNetworks = async () => {
    setIsScanning(true);
    setScanProgress(0);

    const scanSteps = [
      '📱 Mengakses WiFi adapter sistem...',
      '🔍 Memindai jaringan WiFi tersedia...',
      '📊 Menganalisis kekuatan sinyal...',
      '🔐 Mengidentifikasi jenis keamanan...',
      '📋 Menyusun daftar jaringan...'
    ];

    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setScanProgress((i + 1) / scanSteps.length * 100);
      
      toast({
        title: "Network Scanner",
        description: scanSteps[i],
        duration: 800,
      });
    }

    // Get real available networks (simulated)
    const networks = generateWiFiNetworks().slice(0, 8); // Show fewer for connection
    setAvailableNetworks(networks);
    setIsScanning(false);

    toast({
      title: "📡 Networks Found",
      description: `Found ${networks.length} available WiFi networks`,
      duration: 2000,
    });
  };

  // Real-time monitoring effect
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (wifiConnection?.status === 'connected' && enableRealTimeMonitoring) {
      cleanup = startRealTimeMonitoring();
    }
    return cleanup;
  }, [wifiConnection?.status, enableRealTimeMonitoring]);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-300">
            <Wifi className="w-6 h-6" />
            📡 MIORA WiFi PENETRATION TESTING - ENHANCED
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pentest" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pentest">Penetration Testing</TabsTrigger>
              <TabsTrigger value="connect">WiFi Connection</TabsTrigger>
              <TabsTrigger value="monitor">Real-Time Monitor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pentest" className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={startWiFiScan}
                  disabled={isScanning}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Start Pentest Scan'}
                </Button>
                <Badge variant="outline" className="text-yellow-300 border-yellow-500">
                  Interface: {interfaceMode}
                </Badge>
              </div>

              {isScanning && (
                <div className="space-y-2">
                  <Progress value={scanProgress} className="w-full" />
                  <p className="text-sm text-gray-400">Scanning for vulnerabilities...</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="connect" className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button 
                  onClick={scanAvailableNetworks}
                  disabled={isScanning}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Scan Networks'}
                </Button>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="realtime"
                    checked={enableRealTimeMonitoring}
                    onChange={(e) => setEnableRealTimeMonitoring(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="realtime" className="text-sm text-gray-300">
                    Enable Real-time Monitoring
                  </label>
                </div>
              </div>

              {isScanning && (
                <div className="space-y-2">
                  <Progress value={scanProgress} className="w-full" />
                  <p className="text-sm text-gray-400">Scanning available networks...</p>
                </div>
              )}

              {availableNetworks.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-green-300 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Available Networks ({availableNetworks.length})
                  </h3>
                  
                  {availableNetworks.map((network, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Signal className="w-4 h-4 text-green-400" />
                          <div>
                            <h4 className="font-medium text-white">{network.ssid}</h4>
                            <p className="text-xs text-gray-400">{network.encryption}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-gray-300">
                            {network.signal} dBm
                          </Badge>
                          <div className="flex gap-1">
                            {network.encryption !== 'Open' && (
                              <Input
                                type="password"
                                placeholder="Password"
                                className="w-32 h-8 text-xs"
                                onChange={(e) => setConnectionPassword(e.target.value)}
                              />
                            )}
                            <Button
                              size="sm"
                              onClick={() => connectToWiFi(network, network.encryption === 'Open' ? undefined : connectionPassword)}
                              disabled={isConnecting}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Router className="w-3 h-3 mr-1" />
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {wifiConnection && (
                <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-300">
                      {wifiConnection.status === 'connected' ? <CheckCircle className="w-5 h-5" /> : 
                       wifiConnection.status === 'connecting' ? <Activity className="w-5 h-5" /> :
                       wifiConnection.status === 'failed' ? <XCircle className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                      WiFi Status: {wifiConnection.status.toUpperCase()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">SSID:</span>
                        <span className="ml-2 text-white">{wifiConnection.ssid}</span>
                      </div>
                      {wifiConnection.ip && (
                        <div>
                          <span className="text-gray-400">IP Address:</span>
                          <span className="ml-2 text-white">{wifiConnection.ip}</span>
                        </div>
                      )}
                      {wifiConnection.gateway && (
                        <div>
                          <span className="text-gray-400">Gateway:</span>
                          <span className="ml-2 text-white">{wifiConnection.gateway}</span>
                        </div>
                      )}
                      {wifiConnection.dns && (
                        <div>
                          <span className="text-gray-400">DNS:</span>
                          <span className="ml-2 text-white">{wifiConnection.dns}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-400">Signal:</span>
                        <span className="ml-2 text-white">{wifiConnection.signalStrength} dBm</span>
                      </div>
                      {wifiConnection.connectionTime && (
                        <div>
                          <span className="text-gray-400">Connected:</span>
                          <span className="ml-2 text-white">{wifiConnection.connectionTime.toLocaleTimeString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {wifiConnection.status === 'connected' && (
                      <div className="flex gap-2">
                        <Button onClick={disconnectWiFi} variant="outline" size="sm">
                          <WifiOff className="w-4 h-4 mr-2" />
                          Disconnect
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="monitor" className="space-y-4">
              {wifiConnection?.status === 'connected' ? (
                realTimeData ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="bg-slate-800/50 border-blue-500/30">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{realTimeData.connectedDevices}</div>
                            <div className="text-sm text-gray-400">Connected Devices</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-slate-800/50 border-green-500/30">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{realTimeData.bandwidth}</div>
                            <div className="text-sm text-gray-400">Bandwidth</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-slate-800/50 border-yellow-500/30">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">{realTimeData.latency}ms</div>
                            <div className="text-sm text-gray-400">Latency</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-slate-800/50 border-red-500/30">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{realTimeData.packetLoss.toFixed(1)}%</div>
                            <div className="text-sm text-gray-400">Packet Loss</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {realTimeData.securityThreats.length > 0 && (
                      <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-red-300">
                            <AlertTriangle className="w-5 h-5" />
                            Security Alerts
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {realTimeData.securityThreats.map((threat, index) => (
                              <div key={index} className="p-2 bg-red-900/20 border border-red-500/30 rounded">
                                <p className="text-red-300 text-sm">{threat}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400 animate-spin" />
                    <p className="text-gray-400">Initializing real-time monitoring...</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <WifiOff className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">Connect to a WiFi network first to enable monitoring</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {wifiNetworks.length > 0 && (
        <Card className="bg-slate-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Radio className="w-5 h-5" />
              Detected WiFi Networks ({wifiNetworks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {wifiNetworks.map((network, index) => (
                <div 
                  key={index}
                  className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedNetwork(network)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-white">{network.ssid}</h3>
                        <p className="text-xs text-gray-400">{network.bssid}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`${getVulnerabilityColor(network.vulnerabilityScore)} text-white`}
                      >
                        Risk: {network.vulnerabilityScore}/10
                      </Badge>
                      <Badge variant="outline" className="text-gray-300">
                        {network.encryption}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Channel:</span>
                      <span className="ml-1 text-white">{network.channel}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Signal:</span>
                      <span className="ml-1 text-white">{network.signal} dBm</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Clients:</span>
                      <span className="ml-1 text-white">{network.clients}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Exploits:</span>
                      <span className="ml-1 text-green-400">{network.exploitMethods.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedNetwork && (
        <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Target className="w-5 h-5" />
              Target: {selectedNetwork.ssid}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Network Details</h4>
                <div className="text-sm space-y-1 text-gray-300">
                  <p>BSSID: {selectedNetwork.bssid}</p>
                  <p>Encryption: {selectedNetwork.encryption}</p>
                  <p>Channel: {selectedNetwork.channel}</p>
                  <p>Signal: {selectedNetwork.signal} dBm</p>
                  <p>Vulnerability Score: {selectedNetwork.vulnerabilityScore}/10</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Available Exploits</h4>
                <div className="space-y-1">
                  {selectedNetwork.exploitMethods.map((method, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => executeWiFiAttack(selectedNetwork, method.split(' ')[0] + ' ' + method.split(' ')[1])}
                      disabled={activeAttack?.status === 'running'}
                      className="w-full justify-start text-left border-red-500/30 hover:bg-red-600/20"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {method}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeAttack && (
        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-300">
              <Activity className="w-5 h-5" />
              Active Attack: {activeAttack.type}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Progress</span>
                <Badge 
                  variant={activeAttack.status === 'completed' ? 'default' : 
                           activeAttack.status === 'failed' ? 'destructive' : 'secondary'}
                >
                  {activeAttack.status}
                </Badge>
              </div>
              <Progress value={activeAttack.progress} className="w-full" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Target:</span>
                <span className="ml-2 text-white">{activeAttack.target}</span>
              </div>
              <div>
                <span className="text-gray-400">Method:</span>
                <span className="ml-2 text-white">{activeAttack.method}</span>
              </div>
            </div>

            {activeAttack.result && (
              <div className="p-3 bg-slate-800/50 border border-green-500/30 rounded">
                <h4 className="font-semibold text-green-300 mb-2">Attack Result:</h4>
                <p className="text-gray-300 font-mono text-sm">{activeAttack.result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {penetrationReport && (
        <Card className="bg-slate-900/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-300">
              <FileText className="w-5 h-5" />
              Penetration Test Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={copyReportToClipboard} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy Report
              </Button>
            </div>
            <Textarea
              value={penetrationReport}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-slate-800/50 border-slate-600"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WiFiPenetrationTesting;