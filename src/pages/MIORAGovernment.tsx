import React from 'react';
import { MIORAGovernmentDashboard } from '@/components/MIORA/Government/MIORAGovernmentDashboard';

const MIORAGovernmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <MIORAGovernmentDashboard />
    </div>
  );
};

export default MIORAGovernmentPage;