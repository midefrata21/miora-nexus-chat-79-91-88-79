
import React from 'react';
import Sidebar from '@/components/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Sidebar Navigation - MIORA INFINITY with all modules */}
      <Sidebar />
      
      {/* Main Content Area - Right Side */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pl-64">
        {children}
      </main>
    </div>
  );
};
