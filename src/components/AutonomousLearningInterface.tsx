
import React, { useState } from 'react';
import { useAutonomousLearning } from '@/hooks/useAutonomousLearning';
import { SystemStatusCard } from './AutonomousLearning/SystemStatusCard';
import { MemoryStructureCard } from './AutonomousLearning/MemoryStructureCard';
import { WeaknessesImprovementsGrid } from './AutonomousLearning/WeaknessesImprovementsGrid';

const AutonomousLearningInterface: React.FC = () => {
  const {
    mioraVersion,
    autonomousMode,
    retrieveFromFolder,
    performSelfAssessment,
    proposeNewSkill,
    notifyImprovement,
    updateVersion,
    assessWeaknesses,
    suggestImprovements,
  } = useAutonomousLearning();

  const [queryResult, setQueryResult] = useState<any>(null);

  const folderStructure = [
    { key: 'identitasMidya', label: '📁 Identitas Midya', icon: '👤' },
    { key: 'gayaBicaraEmosi', label: '📁 Gaya Bicara & Emosi', icon: '💬' },
    { key: 'strategiTrading', label: '📁 Strategi Trading', icon: '📈' },
    { key: 'polaReversalBreakout', label: '📁 Pola Reversal & Breakout', icon: '🔄' },
    { key: 'skillMiora', label: '📁 Skill MIORA', icon: '🧠' },
    { key: 'perintahPrioritas', label: '📁 Perintah Prioritas', icon: '⚡' },
    { key: 'sistemIntegrasi', label: '📁 Sistem Integrasi', icon: '🔗' }
  ];

  const handleQuery = (folderKey: string, query: string) => {
    const result = retrieveFromFolder(folderKey as any, query);
    setQueryResult(result);
  };

  const handleSelfImprovement = () => {
    const assessment = performSelfAssessment();
    
    const newSkillProposal = `Advanced Risk Assessment v2.0`;
    proposeNewSkill(
      newSkillProposal,
      'Enhanced risk calculation with real-time market volatility adjustment',
      'trading'
    );
    
    notifyImprovement(
      `Berdasarkan self-assessment, saya ingin menambahkan skill "${newSkillProposal}". Apakah boleh saya lanjutkan pengembangan?`
    );
  };

  const handleUpdateVersion = () => {
    updateVersion('Manual system optimization');
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <SystemStatusCard
        mioraVersion={mioraVersion}
        autonomousMode={autonomousMode}
        onSelfImprovement={handleSelfImprovement}
        onUpdateVersion={handleUpdateVersion}
      />

      <MemoryStructureCard
        folderStructure={folderStructure}
        onQuery={handleQuery}
        queryResult={queryResult}
      />

      <WeaknessesImprovementsGrid
        weaknesses={assessWeaknesses()}
        improvements={suggestImprovements()}
      />
    </div>
  );
};

export default AutonomousLearningInterface;
