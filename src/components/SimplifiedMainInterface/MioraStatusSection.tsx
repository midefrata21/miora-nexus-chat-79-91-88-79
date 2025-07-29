
import React from 'react';
import StatusDisplay from '../StatusDisplay';
import StatusIndicator from '../StatusIndicator';
import AtomVisualization from '../AtomVisualization';
import ModeSelector from '../ModeSelector';

interface MioraStatusSectionProps {
  mioraVersion: string;
  isFullCharacterMode: boolean;
  autonomousMode: boolean;
  isInfinityModeActive: boolean;
  isLearning: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  pulseIntensity: number;
  brainActivity: number;
  currentMode: any;
  currentStatus: string;
  modeConfig: any;
  onModeSwitch: (mode: any) => void;
}

const MioraStatusSection: React.FC<MioraStatusSectionProps> = ({
  mioraVersion,
  isFullCharacterMode,
  autonomousMode,
  isInfinityModeActive,
  isLearning,
  isListening,
  isSpeaking,
  pulseIntensity,
  brainActivity,
  currentMode,
  currentStatus,
  modeConfig,
  onModeSwitch
}) => {
  const getActiveModulesCount = () => isInfinityModeActive ? 6 : 3;
  
  // Map any currentStatus to valid StatusDisplay status values
  const getValidStatus = (): 'aktif' | 'belajar' | 'fokus' | 'overload' | 'shutdown' => {
    switch (currentStatus) {
      case 'infinity':
      case 'aktif':
        return 'aktif';
      case 'belajar':
        return 'belajar';
      case 'fokus':
        return 'fokus';
      case 'overload':
        return 'overload';
      case 'shutdown':
        return 'shutdown';
      default:
        return 'aktif';
    }
  };

  const safeCurrentStatus = getValidStatus();

  return (
    <>
      {/* Enhanced MIORA Header */}
      <StatusIndicator
        mioraVersion={mioraVersion}
        isFullCharacterMode={isFullCharacterMode}
        autonomousMode={autonomousMode}
        infinityCoreState={{ isBoostActive: isInfinityModeActive }}
        boostStatus={isInfinityModeActive ? 'ACTIVE ∞' : 'STANDBY'}
        getActiveModulesCount={getActiveModulesCount}
      />

      {/* Interactive Atom Visualization */}
      <div className="mb-8">
        <AtomVisualization
          isLearning={isLearning}
          isListening={isListening}
          isSpeaking={isSpeaking}
          pulseIntensity={pulseIntensity}
          brainActivity={brainActivity}
        />
      </div>

      {/* Enhanced Mode Selection */}
      <ModeSelector
        currentMode={currentMode}
        onModeSwitch={onModeSwitch}
      />

      {/* System Status Display */}
      <StatusDisplay
        isLearning={isLearning}
        isListening={isListening}
        isSpeaking={isSpeaking}
        status={safeCurrentStatus}
        mode={modeConfig?.name || 'Assistant'}
      />
    </>
  );
};

export default MioraStatusSection;
