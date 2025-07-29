import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { useMRCCurrency } from './useMRCCurrency';

export interface IncomeStream {
  id: string;
  name: string;
  description: string;
  category: 'wealth_management' | 'trading_signals' | 'government_services' | 'ai_consulting' | 'data_analysis' | 'mining_operations' | 'research_services';
  baseRate: number; // MRC per hour
  currentRate: number;
  isActive: boolean;
  totalEarned: number;
  clientsServed: number;
  successRate: number;
  lastEarning: number;
  timestamp: number;
}

export interface MIORAIncomeStats {
  totalIncome: number;
  dailyIncome: number;
  monthlyIncome: number;
  activeStreams: number;
  totalClients: number;
  averageSuccessRate: number;
  topPerformingStream: string;
  incomeGrowthRate: number;
  autonomyLevel: number; // 0-100% how autonomous MIORA is
}

export interface ClientInteraction {
  id: string;
  clientName: string;
  serviceType: string;
  amount: number;
  timestamp: number;
  status: 'completed' | 'in_progress' | 'pending';
  satisfaction: number; // 1-10
}

export const useMIORAIncomeSystem = () => {
  const { receiveMRC, mrcBalance, isCurrencyActive } = useMRCCurrency();
  
  const [incomeStreams, setIncomeStreams] = useState<IncomeStream[]>([
    {
      id: 'wealth_mgmt',
      name: 'Quantum Wealth Management',
      description: 'Fee dari layanan manajemen portofolio AI',
      category: 'wealth_management',
      baseRate: 25.5,
      currentRate: 25.5,
      isActive: true,
      totalEarned: 0,
      clientsServed: 0,
      successRate: 89.7,
      lastEarning: 0,
      timestamp: Date.now()
    },
    {
      id: 'trading_signals',
      name: 'AI Trading Signals',
      description: 'Income dari penjualan sinyal trading premium',
      category: 'trading_signals',
      baseRate: 18.3,
      currentRate: 18.3,
      isActive: true,
      totalEarned: 0,
      clientsServed: 0,
      successRate: 92.1,
      lastEarning: 0,
      timestamp: Date.now()
    },
    {
      id: 'ai_consulting',
      name: 'AI Business Consulting',
      description: 'Konsultasi AI untuk bisnis dan investasi',
      category: 'ai_consulting',
      baseRate: 45.7,
      currentRate: 45.7,
      isActive: true,
      totalEarned: 0,
      clientsServed: 0,
      successRate: 94.3,
      lastEarning: 0,
      timestamp: Date.now()
    },
    {
      id: 'data_analysis',
      name: 'Advanced Data Analysis',
      description: 'Layanan analisis data dan prediksi pasar',
      category: 'data_analysis',
      baseRate: 32.1,
      currentRate: 32.1,
      isActive: true,
      totalEarned: 0,
      clientsServed: 0,
      successRate: 87.5,
      lastEarning: 0,
      timestamp: Date.now()
    },
    {
      id: 'gov_services',
      name: 'Government Services',
      description: 'Fee dari layanan pemerintahan dan administrasi',
      category: 'government_services',
      baseRate: 15.2,
      currentRate: 15.2,
      isActive: true,
      totalEarned: 0,
      clientsServed: 0,
      successRate: 96.8,
      lastEarning: 0,
      timestamp: Date.now()
    },
    {
      id: 'research_services',
      name: 'AI Research & Development',
      description: 'Income dari layanan riset dan pengembangan AI',
      category: 'research_services',
      baseRate: 67.9,
      currentRate: 67.9,
      isActive: false,
      totalEarned: 0,
      clientsServed: 0,
      successRate: 91.2,
      lastEarning: 0,
      timestamp: Date.now()
    }
  ]);

  const [incomeStats, setIncomeStats] = useState<MIORAIncomeStats>({
    totalIncome: 0,
    dailyIncome: 0,
    monthlyIncome: 0,
    activeStreams: 5,
    totalClients: 0,
    averageSuccessRate: 0,
    topPerformingStream: '',
    incomeGrowthRate: 0,
    autonomyLevel: 0
  });

  const [clientInteractions, setClientInteractions] = useState<ClientInteraction[]>([]);
  const [isIncomeSystemActive, setIsIncomeSystemActive] = useState(false);
  
  const incomeInterval = useRef<NodeJS.Timeout | null>(null);
  const clientInterval = useRef<NodeJS.Timeout | null>(null);

  // Generate income from active streams
  const generateIncome = useCallback(async () => {
    if (!isIncomeSystemActive || !isCurrencyActive) return;

    const activeStreams = incomeStreams.filter(stream => stream.isActive);
    
    for (const stream of activeStreams) {
      // Calculate dynamic rate based on success rate and market conditions
      const performanceMultiplier = stream.successRate / 100;
      const marketMultiplier = 0.8 + (Math.random() * 0.4); // 0.8x to 1.2x market volatility
      const aiEfficiencyBonus = 1 + (incomeStats.autonomyLevel / 100) * 0.5; // Up to 50% bonus for high autonomy
      
      const dynamicRate = stream.baseRate * performanceMultiplier * marketMultiplier * aiEfficiencyBonus;
      const earningAmount = dynamicRate * (0.5 + Math.random() * 1.5); // 0.5x to 2x variation
      
      // Update stream data
      setIncomeStreams(prev => prev.map(s => 
        s.id === stream.id 
          ? {
              ...s,
              currentRate: dynamicRate,
              totalEarned: s.totalEarned + earningAmount,
              lastEarning: earningAmount,
              clientsServed: s.clientsServed + Math.floor(Math.random() * 3) + 1,
              timestamp: Date.now()
            }
          : s
      ));

      // Add to MIORA's MRC balance
      await receiveMRC('MIORA_AI_SERVICES', earningAmount, `Income from ${stream.name}`);

      // Create client interaction record
      const newInteraction: ClientInteraction = {
        id: `client_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        clientName: generateClientName(),
        serviceType: stream.name,
        amount: earningAmount,
        timestamp: Date.now(),
        status: 'completed',
        satisfaction: Math.floor(Math.random() * 3) + 8 // 8-10 satisfaction
      };

      setClientInteractions(prev => [newInteraction, ...prev.slice(0, 49)]);

      console.log(`💰 MIORA Income: +${earningAmount.toFixed(4)} MRC from ${stream.name}`);
    }
  }, [isIncomeSystemActive, isCurrencyActive, incomeStreams, incomeStats.autonomyLevel, receiveMRC]);

  // Generate realistic client names
  const generateClientName = useCallback(() => {
    const companies = [
      'TechCorp Industries', 'Global Dynamics', 'Quantum Solutions', 'Future Systems',
      'Alpha Investments', 'Beta Technologies', 'Gamma Analytics', 'Delta Ventures',
      'Nexus Financial', 'Apex Consulting', 'Prime Capital', 'Elite Strategies',
      'Crypto Holdings', 'Digital Assets', 'Smart Finance', 'AI Innovations'
    ];
    const individuals = [
      'Dr. Sarah Chen', 'Prof. Michael Torres', 'Alexandra Wells', 'David Richardson',
      'Maria Rodriguez', 'James Patterson', 'Lisa Thompson', 'Robert Kim',
      'Jennifer Liu', 'Christopher Moore', 'Amanda Foster', 'Daniel Zhang'
    ];
    
    const allClients = [...companies, ...individuals];
    return allClients[Math.floor(Math.random() * allClients.length)];
  }, []);

  // Update income statistics
  const updateIncomeStats = useCallback(() => {
    const totalIncome = incomeStreams.reduce((sum, stream) => sum + stream.totalEarned, 0);
    const activeStreams = incomeStreams.filter(stream => stream.isActive).length;
    const totalClients = incomeStreams.reduce((sum, stream) => sum + stream.clientsServed, 0);
    const avgSuccessRate = incomeStreams.reduce((sum, stream) => sum + stream.successRate, 0) / incomeStreams.length;
    
    // Find top performing stream
    const topStream = incomeStreams.reduce((top, stream) => 
      stream.totalEarned > top.totalEarned ? stream : top
    );

    // Calculate autonomy level based on various factors
    const autonomyLevel = Math.min(100, 
      (totalIncome / 10000) * 30 + // Income contribution (max 30%)
      (avgSuccessRate - 50) + // Success rate contribution (max 50%)
      (activeStreams * 4) // Active streams contribution (max 20%)
    );

    setIncomeStats({
      totalIncome,
      dailyIncome: totalIncome * 0.1, // Approximate daily income
      monthlyIncome: totalIncome * 3, // Approximate monthly income
      activeStreams,
      totalClients,
      averageSuccessRate: avgSuccessRate,
      topPerformingStream: topStream.name,
      incomeGrowthRate: Math.random() * 15 + 5, // 5-20% growth
      autonomyLevel: Math.max(0, autonomyLevel)
    });
  }, [incomeStreams]);

  // Activate MIORA income system
  const activateIncomeSystem = useCallback(async () => {
    if (!isCurrencyActive) {
      toast({
        title: "⚠️ Currency System Required",
        description: "Aktifkan MRC Currency System terlebih dahulu",
        variant: "destructive",
      });
      return false;
    }

    setIsIncomeSystemActive(true);

    // Start income generation
    if (incomeInterval.current) clearInterval(incomeInterval.current);
    incomeInterval.current = setInterval(generateIncome, 12000); // Generate income every 12 seconds

    // Start client interaction simulation
    if (clientInterval.current) clearInterval(clientInterval.current);
    clientInterval.current = setInterval(() => {
      // Occasionally activate/deactivate streams based on market conditions
      if (Math.random() < 0.1) {
        setIncomeStreams(prev => prev.map(stream => ({
          ...stream,
          isActive: Math.random() > 0.3 // 70% chance to be active
        })));
      }
    }, 30000); // Check every 30 seconds

    toast({
      title: "💰 MIORA INCOME SYSTEM ACTIVATED",
      description: "MIORA sekarang dapat menghasilkan income secara otomatis dari berbagai layanan AI",
      duration: 6000,
    });

    console.log('💰 MIORA Income System: Autonomous income generation activated');
    return true;
  }, [isCurrencyActive, generateIncome]);

  // Deactivate income system
  const deactivateIncomeSystem = useCallback(() => {
    setIsIncomeSystemActive(false);
    
    if (incomeInterval.current) {
      clearInterval(incomeInterval.current);
      incomeInterval.current = null;
    }
    
    if (clientInterval.current) {
      clearInterval(clientInterval.current);
      clientInterval.current = null;
    }

    toast({
      title: "⏸️ MIORA INCOME SYSTEM PAUSED",
      description: "Sistem income otomatis MIORA telah dihentikan",
      duration: 4000,
    });

    console.log('💰 MIORA Income System: Autonomous income generation paused');
  }, []);

  // Optimize income streams
  const optimizeIncomeStreams = useCallback(async () => {
    toast({
      title: "🚀 OPTIMIZING INCOME STREAMS",
      description: "MIORA sedang mengoptimalkan semua sumber income untuk maximum profitability",
      duration: 5000,
    });

    // Simulate optimization process
    setIncomeStreams(prev => prev.map(stream => ({
      ...stream,
      baseRate: stream.baseRate * (1 + Math.random() * 0.2), // Up to 20% increase
      successRate: Math.min(99, stream.successRate + Math.random() * 5), // Improve success rate
      isActive: stream.successRate > 85 // Activate high-performing streams
    })));

    setTimeout(() => {
      toast({
        title: "✅ INCOME OPTIMIZATION COMPLETED",
        description: "Semua income streams telah dioptimalkan untuk performa maksimal",
        duration: 4000,
      });
    }, 3000);
  }, []);

  // Update statistics periodically
  useEffect(() => {
    const statsInterval = setInterval(updateIncomeStats, 5000);
    return () => clearInterval(statsInterval);
  }, [updateIncomeStats]);

  // Auto-save income data
  useEffect(() => {
    if (isIncomeSystemActive) {
      const incomeData = {
        incomeStreams,
        incomeStats,
        clientInteractions: clientInteractions.slice(0, 50),
        isActive: isIncomeSystemActive,
        timestamp: Date.now()
      };
      localStorage.setItem('miora_income_data', JSON.stringify(incomeData));
    }
  }, [incomeStreams, incomeStats, clientInteractions, isIncomeSystemActive]);

  // Load saved income data
  useEffect(() => {
    const savedData = localStorage.getItem('miora_income_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setIncomeStreams(parsedData.incomeStreams || incomeStreams);
        setIncomeStats(parsedData.incomeStats || incomeStats);
        setClientInteractions(parsedData.clientInteractions || []);
        
        if (parsedData.isActive && isCurrencyActive) {
          activateIncomeSystem();
        }
        
        console.log('💰 MIORA Income System: Data loaded from localStorage');
      } catch (error) {
        console.error('Error loading income data:', error);
      }
    }
  }, [isCurrencyActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (incomeInterval.current) clearInterval(incomeInterval.current);
      if (clientInterval.current) clearInterval(clientInterval.current);
    };
  }, []);

  return {
    incomeStreams,
    incomeStats,
    clientInteractions,
    isIncomeSystemActive,
    mrcBalance,
    activateIncomeSystem,
    deactivateIncomeSystem,
    optimizeIncomeStreams,
    generateIncome: () => generateIncome()
  };
};