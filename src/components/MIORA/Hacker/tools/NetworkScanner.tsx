import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Wifi, Globe, Shield, AlertCircle } from 'lucide-react';

interface ScanResult {
  ip: string;
  hostname?: string;
  ports: number[];
  services: string[];
  status: 'online' | 'offline' | 'filtered';
  responseTime: number;
}

export const NetworkScanner: React.FC = () => {
  const [targetNetwork, setTargetNetwork] = useState('192.168.1.0/24');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [scanType, setScanType] = useState<'ping' | 'port' | 'full'>('ping');

  // Educational mock scanner - simulates network discovery
  const startScan = async () => {
    if (!targetNetwork) return;
    
    setIsScanning(true);
    setProgress(0);
    setScanResults([]);
    
    // Ethical validation
    if (!isLocalNetwork(targetNetwork)) {
      console.warn('⚠️ ETHICAL WARNING: Only scan networks you own!');
      alert('Educational Mode: Only scan your own networks!');
      setIsScanning(false);
      return;
    }

    // Simulate progressive scanning
    const totalHosts = scanType === 'full' ? 254 : 50;
    const discoveredHosts: ScanResult[] = [];

    for (let i = 1; i <= totalHosts; i++) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Realistic delay
      
      setProgress((i / totalHosts) * 100);
      
      // Simulate host discovery (educational)
      if (Math.random() > 0.8) { // 20% chance of finding a host
        const mockHost: ScanResult = {
          ip: generateMockIP(targetNetwork, i),
          hostname: generateMockHostname(),
          ports: generateMockPorts(scanType),
          services: generateMockServices(),
          status: Math.random() > 0.1 ? 'online' : 'filtered',
          responseTime: Math.floor(Math.random() * 100) + 1
        };
        
        discoveredHosts.push(mockHost);
        setScanResults([...discoveredHosts]);
      }
    }
    
    setIsScanning(false);
    console.log(`🔍 Educational scan complete: ${discoveredHosts.length} hosts discovered`);
  };

  const isLocalNetwork = (network: string): boolean => {
    // Check if it's a local/private network range
    const localRanges = [
      /^192\.168\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^127\./,
      /^localhost/
    ];
    
    return localRanges.some(range => range.test(network));
  };

  const generateMockIP = (network: string, hostNum: number): string => {
    const baseIP = network.split('/')[0].split('.').slice(0, 3).join('.');
    return `${baseIP}.${hostNum}`;
  };

  const generateMockHostname = (): string => {
    const hostnames = [
      'router.local', 'printer-hp.local', 'laptop-user.local', 
      'smartphone.local', 'nas-server.local', 'iot-device.local'
    ];
    return hostnames[Math.floor(Math.random() * hostnames.length)];
  };

  const generateMockPorts = (type: string): number[] => {
    const commonPorts = [22, 23, 53, 80, 135, 139, 443, 445, 993, 995];
    const allPorts = [...commonPorts, 21, 25, 110, 143, 587, 993, 995, 3389, 5900];
    
    if (type === 'ping') return [];
    if (type === 'port') return commonPorts.filter(() => Math.random() > 0.7);
    return allPorts.filter(() => Math.random() > 0.6);
  };

  const generateMockServices = (): string[] => {
    const services = ['SSH', 'HTTP', 'HTTPS', 'SMB', 'FTP', 'Telnet', 'DNS'];
    return services.filter(() => Math.random() > 0.6);
  };

  return (
    <div className="space-y-4">
      {/* Ethical Warning */}
      <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
        <div className="flex items-center text-yellow-400 mb-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="font-semibold">Ethical Hacking Notice</span>
        </div>
        <p className="text-xs text-yellow-300">
          Educational Tool: Only scan networks you own or have explicit permission to test.
          Unauthorized network scanning may violate local laws and regulations.
        </p>
      </div>

      {/* Scan Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Target Network</label>
          <Input
            placeholder="192.168.1.0/24"
            value={targetNetwork}
            onChange={(e) => setTargetNetwork(e.target.value)}
            className="bg-black/40 border-gray-600"
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Scan Type</label>
          <select
            className="w-full p-2 bg-black/40 border border-gray-600 rounded-md text-white"
            value={scanType}
            onChange={(e) => setScanType(e.target.value as any)}
          >
            <option value="ping">Ping Sweep</option>
            <option value="port">Port Scan</option>
            <option value="full">Full Scan</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <Button
            onClick={startScan}
            disabled={isScanning || !targetNetwork}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isScanning ? 'SCANNING...' : 'START SCAN'}
          </Button>
        </div>
      </div>

      {/* Progress */}
      {isScanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Scanning progress...</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Results */}
      {scanResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-green-400">
              📡 Discovered Hosts: {scanResults.length}
            </h4>
            <Badge className="bg-blue-600">
              {scanType.toUpperCase()} SCAN
            </Badge>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {scanResults.map((result, index) => (
              <div
                key={index}
                className="p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span className="font-mono text-green-400">{result.ip}</span>
                    {result.hostname && (
                      <span className="text-gray-300 text-sm">({result.hostname})</span>
                    )}
                  </div>
                  <Badge
                    className={
                      result.status === 'online'
                        ? 'bg-green-600'
                        : result.status === 'filtered'
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }
                  >
                    {result.status.toUpperCase()}
                  </Badge>
                </div>
                
                {result.ports.length > 0 && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Shield className="h-3 w-3 text-orange-400" />
                    <span className="text-xs text-gray-400">Open Ports:</span>
                    <span className="text-xs text-orange-300 font-mono">
                      {result.ports.join(', ')}
                    </span>
                  </div>
                )}
                
                {result.services.length > 0 && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Wifi className="h-3 w-3 text-purple-400" />
                    <span className="text-xs text-gray-400">Services:</span>
                    <span className="text-xs text-purple-300">
                      {result.services.join(', ')}
                    </span>
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Response Time: {result.responseTime}ms
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};