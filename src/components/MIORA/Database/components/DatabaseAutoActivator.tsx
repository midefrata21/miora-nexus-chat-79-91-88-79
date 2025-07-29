import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Database, CheckCircle, Activity } from 'lucide-react';

interface DatabaseAutoActivatorProps {
  onActivated?: () => void;
}

export const DatabaseAutoActivator: React.FC<DatabaseAutoActivatorProps> = ({ onActivated }) => {
  const [isActivating, setIsActivating] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    // Check if database is already activated
    const isAlreadyActivated = localStorage.getItem('miora_database_activated') === 'true';
    
    if (isAlreadyActivated) {
      setIsActivated(true);
      return;
    }

    // Auto-activate database when component mounts
    const activateDatabase = async () => {
      setIsActivating(true);
      
      toast({
        title: "🗄️ MIORA Database Activation",
        description: "Initializing advanced AI database systems...",
        duration: 3000,
      });

      // Simulate database initialization
      setTimeout(() => {
        setIsActivated(true);
        setIsActivating(false);
        localStorage.setItem('miora_database_activated', 'true');
        
        toast({
          title: "✅ MIORA Database Activated",
          description: "AI Memory System, Pattern Recognition & Query Analytics online",
          duration: 5000,
        });

        onActivated?.();
      }, 3000);
    };

    activateDatabase();
  }, [onActivated]);

  if (isActivated) {
    return (
      <div className="flex items-center space-x-2 text-green-400 text-sm">
        <CheckCircle className="h-4 w-4" />
        <span>Database Active</span>
      </div>
    );
  }

  if (isActivating) {
    return (
      <div className="flex items-center space-x-2 text-blue-400 text-sm">
        <Activity className="h-4 w-4 animate-spin" />
        <span>Activating Database...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-gray-400 text-sm">
      <Database className="h-4 w-4" />
      <span>Database Standby</span>
    </div>
  );
};