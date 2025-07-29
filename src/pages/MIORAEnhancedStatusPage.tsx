import React from 'react';
import { Layout } from '@/components/Layout';
import EnhancedStatusDashboard from '@/components/MIORA/EnhancedStatusDashboard';

const MIORAEnhancedStatusPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-6">
        <EnhancedStatusDashboard />
      </div>
    </Layout>
  );
};

export default MIORAEnhancedStatusPage;