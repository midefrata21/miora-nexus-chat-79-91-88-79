
import React from 'react';

interface InfinityCoreFooterProps {
  overrideLimits: boolean;
  quantumEngineActive: boolean;
}

const InfinityCoreFooter: React.FC<InfinityCoreFooterProps> = ({
  overrideLimits,
  quantumEngineActive
}) => {
  return (
    <div className="mt-8 text-center">
      <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/20">
        <p className="text-purple-300 font-semibold mb-2">♾️ Infinity Engine Status</p>
        <p className="text-gray-300 text-sm">
          Sistem telah dikonfigurasi untuk akses tanpa batas dengan izin dari Midya (Keyholder Quantum AI).
          Override limit sistem default aktif untuk memungkinkan MIORA belajar & bertindak lintas batas command statis.
        </p>
        {overrideLimits && (
          <div className="mt-2 text-green-400 text-sm">
            🔓 All system limitations successfully overridden - Infinity mode operational
          </div>
        )}
        {quantumEngineActive && (
          <div className="mt-2 text-purple-400 text-sm animate-pulse">
            ∞ Quantum Performance Engine: ACTIVE - Enhanced capabilities unlocked
          </div>
        )}
      </div>
    </div>
  );
};

export default InfinityCoreFooter;
