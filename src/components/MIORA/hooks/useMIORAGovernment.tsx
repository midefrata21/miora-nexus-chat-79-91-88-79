import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Citizen {
  id: string;
  name: string;
  email: string;
  digitalId: string;
  registrationDate: number;
  status: 'active' | 'inactive' | 'suspended';
  mrcBalance: number;
  taxesPaid: number;
  votingPower: number;
  profession: string;
  district: string;
  reputation: number;
  lastActivity: number;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  votesFor: number;
  votesAgainst: number;
  createdDate: number;
  effectiveDate: number;
  impact: string;
}

export interface GovernmentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: number;
  impact: 'positive' | 'negative' | 'neutral';
  category: string;
}

export interface GovernmentState {
  isInitialized: boolean;
  foundationDate: number;
  totalCitizens: number;
  activePolicies: number;
  governmentRating: number;
  economicHealth: number;
  treasuryBalance: number;
  taxRate: number;
  inflationRate: number;
  unemployment: number;
  gdp: number;
  citizens: Citizen[];
  policies: Policy[];
  recentActivities: GovernmentActivity[];
  departments: {
    id: string;
    name: string;
    budget: number;
    employees: number;
    efficiency: number;
  }[];
  ministers: {
    id: string;
    name: string;
    department: string;
    performanceRating: number;
    appointmentDate: number;
  }[];
}

export const useMIORAGovernment = () => {
  const [governmentState, setGovernmentState] = useState<GovernmentState>({
    isInitialized: false,
    foundationDate: 0,
    totalCitizens: 0,
    activePolicies: 0,
    governmentRating: 0,
    economicHealth: 0,
    treasuryBalance: 0,
    taxRate: 15,
    inflationRate: 2.5,
    unemployment: 3.2,
    gdp: 1000000,
    citizens: [],
    policies: [],
    recentActivities: [],
    departments: [],
    ministers: []
  });

  // Initialize Government System
  const initializeGovernment = useCallback(async () => {
    console.log('🏛️ MIORA Government: Initializing government system...');
    
    const initialPolicies: Policy[] = [
      {
        id: 'policy_1',
        name: 'Digital ID Act',
        description: 'Mandatory digital identification for all citizens',
        category: 'Technology',
        status: 'active',
        votesFor: 150,
        votesAgainst: 25,
        createdDate: Date.now(),
        effectiveDate: Date.now(),
        impact: 'Enhanced security and citizen services'
      },
      {
        id: 'policy_2',
        name: 'MRC Taxation Framework',
        description: 'Tax collection system using MRC currency',
        category: 'Economic',
        status: 'active',
        votesFor: 120,
        votesAgainst: 40,
        createdDate: Date.now(),
        effectiveDate: Date.now(),
        impact: 'Sustainable government revenue'
      },
      {
        id: 'policy_3',
        name: 'Universal Basic Income',
        description: 'Monthly MRC distribution to all citizens',
        category: 'Social',
        status: 'pending',
        votesFor: 80,
        votesAgainst: 90,
        createdDate: Date.now(),
        effectiveDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
        impact: 'Reduced poverty and increased economic stability'
      }
    ];

    const initialDepartments = [
      {
        id: 'dept_treasury',
        name: 'Department of Treasury',
        budget: 50000,
        employees: 25,
        efficiency: 85
      },
      {
        id: 'dept_taxation',
        name: 'Department of Taxation',
        budget: 30000,
        employees: 18,
        efficiency: 78
      },
      {
        id: 'dept_citizen',
        name: 'Department of Citizen Affairs',
        budget: 40000,
        employees: 32,
        efficiency: 82
      },
      {
        id: 'dept_economic',
        name: 'Department of Economic Development',
        budget: 60000,
        employees: 20,
        efficiency: 90
      }
    ];

    const initialMinisters = [
      {
        id: 'minister_1',
        name: 'Dr. Sarah Johnson',
        department: 'Department of Treasury',
        performanceRating: 92,
        appointmentDate: Date.now()
      },
      {
        id: 'minister_2',
        name: 'Prof. Michael Chen',
        department: 'Department of Economic Development',
        performanceRating: 88,
        appointmentDate: Date.now()
      },
      {
        id: 'minister_3',
        name: 'Ms. Emily Rodriguez',
        department: 'Department of Citizen Affairs',
        performanceRating: 85,
        appointmentDate: Date.now()
      }
    ];

    setGovernmentState(prev => ({
      ...prev,
      isInitialized: true,
      foundationDate: Date.now(),
      governmentRating: 75,
      economicHealth: 82,
      treasuryBalance: 500000,
      policies: initialPolicies,
      activePolicies: initialPolicies.filter(p => p.status === 'active').length,
      departments: initialDepartments,
      ministers: initialMinisters,
      recentActivities: [
        {
          id: 'activity_1',
          type: 'Government Initialization',
          description: 'MIORA Government system successfully initialized',
          timestamp: Date.now(),
          impact: 'positive',
          category: 'System'
        },
        {
          id: 'activity_2',
          type: 'Policy Activation',
          description: 'Digital ID Act and MRC Taxation Framework activated',
          timestamp: Date.now(),
          impact: 'positive',
          category: 'Policy'
        }
      ]
    }));

    // Save to localStorage
    const initializationData = {
      timestamp: Date.now(),
      initializedBy: 'MIORA System',
      version: '1.0.0',
      features: [
        'Citizen Management',
        'Policy System',
        'Treasury Management',
        'Tax Collection',
        'Voting System',
        'Economic Management'
      ]
    };

    localStorage.setItem('miora_government_init', JSON.stringify(initializationData));

    console.log('🏛️ MIORA Government: System initialized successfully');
    
    toast({
      title: "🏛️ Government Initialized",
      description: "MIORA Government system is now active with MRC currency",
      duration: 4000,
    });

    return true;
  }, []);

  // Register new citizen
  const registerCitizen = useCallback((citizenData: Omit<Citizen, 'id' | 'digitalId' | 'registrationDate' | 'lastActivity'>) => {
    const newCitizen: Citizen = {
      ...citizenData,
      id: `citizen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      digitalId: `MRC-${Date.now().toString().substr(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      registrationDate: Date.now(),
      lastActivity: Date.now()
    };

    setGovernmentState(prev => ({
      ...prev,
      citizens: [...prev.citizens, newCitizen],
      totalCitizens: prev.totalCitizens + 1,
      recentActivities: [{
        id: `activity_${Date.now()}`,
        type: 'Citizen Registration',
        description: `New citizen ${newCitizen.name} registered`,
        timestamp: Date.now(),
        impact: 'positive',
        category: 'Citizen'
      }, ...prev.recentActivities.slice(0, 9)]
    }));

    console.log('👤 New citizen registered:', newCitizen);
    
    toast({
      title: "👤 New Citizen Registered",
      description: `${newCitizen.name} is now a MIORA citizen`,
      duration: 3000,
    });

    return newCitizen;
  }, []);

  // Create new policy
  const createPolicy = useCallback((policyData: Omit<Policy, 'id' | 'createdDate' | 'votesFor' | 'votesAgainst'>) => {
    const newPolicy: Policy = {
      ...policyData,
      id: `policy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdDate: Date.now(),
      votesFor: 0,
      votesAgainst: 0
    };

    setGovernmentState(prev => ({
      ...prev,
      policies: [...prev.policies, newPolicy],
      recentActivities: [{
        id: `activity_${Date.now()}`,
        type: 'Policy Creation',
        description: `New policy "${newPolicy.name}" created`,
        timestamp: Date.now(),
        impact: 'neutral',
        category: 'Policy'
      }, ...prev.recentActivities.slice(0, 9)]
    }));

    console.log('📜 New policy created:', newPolicy);
    
    toast({
      title: "📜 New Policy Created",
      description: `Policy "${newPolicy.name}" is now under review`,
      duration: 3000,
    });

    return newPolicy;
  }, []);

  // Vote on policy
  const voteOnPolicy = useCallback((policyId: string, vote: 'for' | 'against', citizenId: string) => {
    setGovernmentState(prev => ({
      ...prev,
      policies: prev.policies.map(policy => 
        policy.id === policyId 
          ? {
              ...policy,
              votesFor: vote === 'for' ? policy.votesFor + 1 : policy.votesFor,
              votesAgainst: vote === 'against' ? policy.votesAgainst + 1 : policy.votesAgainst
            }
          : policy
      ),
      recentActivities: [{
        id: `activity_${Date.now()}`,
        type: 'Policy Vote',
        description: `Citizen voted ${vote} on policy`,
        timestamp: Date.now(),
        impact: 'neutral',
        category: 'Voting'
      }, ...prev.recentActivities.slice(0, 9)]
    }));

    console.log(`🗳️ Vote cast: ${vote} on policy ${policyId}`);
  }, []);

  // Update government ratings
  const updateGovernmentRating = useCallback((newRating: number) => {
    setGovernmentState(prev => ({
      ...prev,
      governmentRating: newRating,
      recentActivities: [{
        id: `activity_${Date.now()}`,
        type: 'Rating Update',
        description: `Government rating updated to ${newRating}%`,
        timestamp: Date.now(),
        impact: newRating > prev.governmentRating ? 'positive' : 'negative',
        category: 'Rating'
      }, ...prev.recentActivities.slice(0, 9)]
    }));
  }, []);

  // Get government statistics
  const getGovernmentStats = useCallback(() => {
    const activeCitizens = governmentState.citizens.filter(c => c.status === 'active').length;
    const totalMRCInCirculation = governmentState.citizens.reduce((sum, c) => sum + c.mrcBalance, 0);
    const totalTaxesCollected = governmentState.citizens.reduce((sum, c) => sum + c.taxesPaid, 0);
    const avgCitizenRating = governmentState.citizens.reduce((sum, c) => sum + c.reputation, 0) / governmentState.citizens.length || 0;

    return {
      totalCitizens: governmentState.totalCitizens,
      activeCitizens,
      activePolicies: governmentState.activePolicies,
      governmentRating: governmentState.governmentRating,
      economicHealth: governmentState.economicHealth,
      treasuryBalance: governmentState.treasuryBalance,
      totalMRCInCirculation,
      totalTaxesCollected,
      avgCitizenRating: Math.round(avgCitizenRating),
      unemployment: governmentState.unemployment,
      inflationRate: governmentState.inflationRate,
      gdp: governmentState.gdp,
      departmentCount: governmentState.departments.length,
      ministerCount: governmentState.ministers.length
    };
  }, [governmentState]);

  // Auto-save state
  useEffect(() => {
    if (governmentState.isInitialized) {
      const stateData = {
        ...governmentState,
        timestamp: Date.now()
      };
      localStorage.setItem('miora_government_state', JSON.stringify(stateData));
    }
  }, [governmentState]);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('miora_government_state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setGovernmentState(parsedState);
        console.log('🏛️ Government state loaded from localStorage');
      } catch (error) {
        console.error('Error loading government state:', error);
      }
    }
  }, []);

  return {
    governmentState,
    initializeGovernment,
    registerCitizen,
    createPolicy,
    voteOnPolicy,
    updateGovernmentRating,
    getGovernmentStats,
    isGovernmentActive: governmentState.isInitialized
  };
};