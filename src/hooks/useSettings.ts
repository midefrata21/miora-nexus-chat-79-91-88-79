
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SettingsData {
  profile: {
    username: string;
    email: string;
    avatar: string;
    language: string;
    timezone: string;
  };
  appearance: {
    theme: string;
    accentColor: string;
    fontSize: number[];
    animations: boolean;
    compactMode: boolean;
    sidebar: string;
  };
  ai: {
    voiceEnabled: boolean;
    voiceSpeed: number[];
    voiceLanguage: string;
    autoResponse: boolean;
    learningMode: boolean;
    contextMemory: number[];
    creativityLevel: number[];
  };
  notifications: {
    desktop: boolean;
    sound: boolean;
    email: boolean;
    telegram: boolean;
    learningUpdates: boolean;
    systemAlerts: boolean;
    weeklyReports: boolean;
  };
  security: {
    encryptData: boolean;
    sessionTimeout: number[];
    twoFactorAuth: boolean;
    dataRetention: number[];
    anonymousUsage: boolean;
    secureMode: boolean;
  };
  performance: {
    autoOptimize: boolean;
    backgroundProcessing: boolean;
    lowPowerMode: boolean;
    cacheSize: number[];
    maxConnections: number[];
    compressionLevel: number[];
  };
}

const defaultSettings: SettingsData = {
  profile: {
    username: 'MIORA User',
    email: 'user@miora.ai',
    avatar: '',
    language: 'Indonesian',
    timezone: 'Asia/Jakarta'
  },
  appearance: {
    theme: 'dark',
    accentColor: 'purple',
    fontSize: [16],
    animations: true,
    compactMode: false,
    sidebar: 'expanded'
  },
  ai: {
    voiceEnabled: true,
    voiceSpeed: [1.0],
    voiceLanguage: 'id-ID',
    autoResponse: true,
    learningMode: true,
    contextMemory: [10],
    creativityLevel: [0.7]
  },
  notifications: {
    desktop: true,
    sound: true,
    email: false,
    telegram: false,
    learningUpdates: true,
    systemAlerts: true,
    weeklyReports: true
  },
  security: {
    encryptData: true,
    sessionTimeout: [30],
    twoFactorAuth: false,
    dataRetention: [90],
    anonymousUsage: false,
    secureMode: true
  },
  performance: {
    autoOptimize: true,
    backgroundProcessing: true,
    lowPowerMode: false,
    cacheSize: [512],
    maxConnections: [5],
    compressionLevel: [6]
  }
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('miora-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error parsing saved settings:', error);
        toast({
          title: "⚠️ Settings Load Error",
          description: "Using default settings due to corrupted data",
          duration: 3000,
        });
      }
    }
  }, [toast]);

  const updateSettings = (newSettings: Partial<SettingsData>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      // Save to localStorage immediately
      try {
        localStorage.setItem('miora-settings', JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
      return updated;
    });
  };

  const updateProfileSettings = (profile: Partial<SettingsData['profile']>) => {
    updateSettings({ profile: { ...settings.profile, ...profile } });
  };

  const updateAppearanceSettings = (appearance: Partial<SettingsData['appearance']>) => {
    updateSettings({ appearance: { ...settings.appearance, ...appearance } });
  };

  const updateAISettings = (ai: Partial<SettingsData['ai']>) => {
    updateSettings({ ai: { ...settings.ai, ...ai } });
  };

  const updateNotificationSettings = (notifications: Partial<SettingsData['notifications']>) => {
    updateSettings({ notifications: { ...settings.notifications, ...notifications } });
  };

  const updateSecuritySettings = (security: Partial<SettingsData['security']>) => {
    updateSettings({ security: { ...settings.security, ...security } });
  };

  const updatePerformanceSettings = (performance: Partial<SettingsData['performance']>) => {
    updateSettings({ performance: { ...settings.performance, ...performance } });
  };

  const saveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('miora-settings', JSON.stringify(settings));
      
      toast({
        title: "✅ Settings Saved Successfully",
        description: "All your preferences have been updated and saved",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "❌ Save Failed",
        description: "Failed to save settings. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem('miora-settings', JSON.stringify(defaultSettings));
    
    toast({
      title: "🔄 Settings Reset",
      description: "All settings have been restored to default values",
      duration: 3000,
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'miora-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "📥 Settings Exported",
      description: "Settings file downloaded successfully",
      duration: 3000,
    });
  };

  return {
    settings,
    isLoading,
    updateProfileSettings,
    updateAppearanceSettings,
    updateAISettings,
    updateNotificationSettings,
    updateSecuritySettings,
    updatePerformanceSettings,
    saveSettings,
    resetSettings,
    exportSettings
  };
};
