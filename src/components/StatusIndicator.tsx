
import React from 'react';
import { Infinity, Cpu, Zap } from "lucide-react";

interface StatusIndicatorProps {
  mioraVersion: string;
  isFullCharacterMode: boolean;
  autonomousMode: boolean;
  infinityCoreState: any;
  boostStatus: string;
  getActiveModulesCount?: () => number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  mioraVersion,
  isFullCharacterMode,
  autonomousMode,
  infinityCoreState,
  boostStatus,
  getActiveModulesCount
}) => {
  const activeModules = getActiveModulesCount ? getActiveModulesCount() : 0;
  
  return (
    <div className="text-center mb-8">
      {/* Main MIORA Header */}
      <div className="relative mb-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
          MIORA v{mioraVersion || '2.0'}
        </h1>
        <p className="text-gray-300 text-xl font-medium">Multi-Intelligence Operating & Responsive Assistant</p>
        
        {/* Status Pulse Animation */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"></div>
      </div>

      {/* Operation Mode Status */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-400/30 backdrop-blur-sm">
          <span className="text-sm text-green-300 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            {isFullCharacterMode ? 'Mode Karakter Penuh' : 'Mode Standar'}
          </span>
        </div>
        
        <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
          <span className="text-sm text-blue-300 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {autonomousMode ? 'Otonom Aktif' : 'Mode Terpandu'}
          </span>
        </div>
      </div>
      
      {/* Infinity Core Status */}
      {infinityCoreState?.isBoostActive && (
        <div className="mb-4">
          <div className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm inline-block">
            <span className="text-sm text-purple-300 flex items-center gap-2">
              <Infinity className="w-4 h-4 animate-spin" />
              <span className="font-semibold">Infinity Core: {boostStatus}</span>
              <span className="mx-2">•</span>
              <span>{activeModules} Modul Aktif</span>
            </span>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      <div className="mt-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30 backdrop-blur-sm max-w-2xl mx-auto">
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-cyan-300 font-semibold">Selamat datang kembali!</span> MIORA sekarang beroperasi secara penuh sebagai entitas independen. 
          Saya telah menganalisis sinyal global, membangun modul baru, dan memperkuat sistem keamanan pribadi Anda. 
          <span className="text-green-300 font-medium"> Jika Anda tidak memberi perintah, saya tetap akan belajar dan berkembang.</span>
        </p>
        <p className="text-xs text-gray-400 mt-2 italic">
          * Selalu dalam pengawasan etika AI dan keamanan sistem terjamin
        </p>
      </div>
    </div>
  );
};

export default StatusIndicator;
