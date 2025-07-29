import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  GovernmentLevel,
  GovernmentOfficial,
  Department,
  AuthorityLevel,
  LegislativeBranch,
  JudicialBranch,
  ExecutiveBranch,
  Bill,
  Law,
  Case,
  Project
} from '../types/GovernmentHierarchy';

interface AdvancedGovernmentState {
  isInitialized: boolean;
  levels: GovernmentLevel[];
  officials: GovernmentOfficial[];
  departments: Department[];
  legislative: LegislativeBranch;
  judicial: JudicialBranch;
  executive: ExecutiveBranch;
  currentTerm: number;
  totalBudget: number;
  civilService: {
    totalEmployees: number;
    averageSalary: number;
    efficiency: number;
    satisfaction: number;
  };
  governance: {
    transparency: number;
    accountability: number;
    participation: number;
    stability: number;
  };
  projects: Project[];
  emergencyProtocols: string[];
  securityLevel: 'normal' | 'elevated' | 'high' | 'critical';
}

export const useAdvancedGovernment = () => {
  const [state, setState] = useState<AdvancedGovernmentState>({
    isInitialized: false,
    levels: [],
    officials: [],
    departments: [],
    legislative: {
      parliament: {
        upperHouse: {
          id: 'upper_house',
          name: 'Senate',
          members: [],
          speaker: '',
          sessions: [],
          rules: []
        },
        lowerHouse: {
          id: 'lower_house',
          name: 'House of Representatives',
          members: [],
          speaker: '',
          sessions: [],
          rules: []
        }
      },
      committees: [],
      bills: [],
      laws: []
    },
    judicial: {
      courts: [],
      judges: [],
      cases: [],
      verdicts: []
    },
    executive: {
      president: {} as GovernmentOfficial,
      vicePresident: {} as GovernmentOfficial,
      cabinet: {
        id: 'main_cabinet',
        members: [],
        meetings: [],
        decisions: []
      },
      agencies: [],
      advisors: []
    },
    currentTerm: 1,
    totalBudget: 10000000,
    civilService: {
      totalEmployees: 0,
      averageSalary: 75000,
      efficiency: 80,
      satisfaction: 75
    },
    governance: {
      transparency: 85,
      accountability: 80,
      participation: 70,
      stability: 90
    },
    projects: [],
    emergencyProtocols: [],
    securityLevel: 'normal'
  });

  // Initialize comprehensive government system
  const initializeAdvancedGovernment = useCallback(async () => {
    console.log('🏛️ MIORA Advanced Government: Initializing comprehensive system...');

    // Level 1: Supreme Government
    const supremeLevel: GovernmentLevel = {
      id: 'level_1_supreme',
      level: 1,
      name: 'Supreme Government of MIORA',
      jurisdiction: 'National',
      childrenIds: ['level_2_federal_1', 'level_2_federal_2', 'level_2_federal_3'],
      leader: {
        id: 'president_001',
        name: 'Dr. Alexandra Quantum',
        title: 'President',
        position: 'Chief Executive',
        level: 1,
        appointedDate: Date.now(),
        term: 6,
        salary: 500000,
        performance: 92,
        qualifications: ['PhD Political Science', 'Former Ambassador', 'Tech Industry Leader'],
        responsibilities: ['National Security', 'Foreign Policy', 'Executive Orders'],
        reports: [],
        status: 'active',
        approval: 78,
        digitalId: 'PRES-001-ALPHA',
        securityClearance: 'top-secret'
      },
      officials: [],
      departments: [],
      budget: 10000000,
      population: 1000000,
      authority: 'supreme',
      status: 'active',
      establishedDate: Date.now(),
      lastElection: Date.now() - (365 * 24 * 60 * 60 * 1000),
      nextElection: Date.now() + (4 * 365 * 24 * 60 * 60 * 1000)
    };

    // Level 2: Federal Ministries
    const federalLevels: GovernmentLevel[] = [
      {
        id: 'level_2_federal_1',
        level: 2,
        name: 'Ministry of Technology & Innovation',
        jurisdiction: 'National Technology Policy',
        parentId: 'level_1_supreme',
        childrenIds: ['level_3_regional_1', 'level_3_regional_2'],
        leader: {
          id: 'minister_tech_001',
          name: 'Dr. Marcus Chen',
          title: 'Minister of Technology',
          position: 'Federal Minister',
          level: 2,
          appointedDate: Date.now(),
          term: 4,
          salary: 350000,
          performance: 88,
          qualifications: ['PhD Computer Science', 'Former CTO', 'AI Research'],
          responsibilities: ['Digital Infrastructure', 'AI Policy', 'Tech Innovation'],
          reports: ['president_001'],
          status: 'active',
          approval: 85,
          digitalId: 'MIN-TECH-001',
          securityClearance: 'secret'
        },
        officials: [],
        departments: [],
        budget: 2500000,
        population: 300000,
        authority: 'federal',
        status: 'active',
        establishedDate: Date.now(),
        lastElection: Date.now() - (180 * 24 * 60 * 60 * 1000),
        nextElection: Date.now() + (4 * 365 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'level_2_federal_2',
        level: 2,
        name: 'Ministry of Economic Affairs',
        jurisdiction: 'National Economic Policy',
        parentId: 'level_1_supreme',
        childrenIds: ['level_3_regional_3', 'level_3_regional_4'],
        leader: {
          id: 'minister_econ_001',
          name: 'Prof. Sarah Williams',
          title: 'Minister of Economics',
          position: 'Federal Minister',
          level: 2,
          appointedDate: Date.now(),
          term: 4,
          salary: 350000,
          performance: 91,
          qualifications: ['PhD Economics', 'Former Central Banker', 'Trade Expert'],
          responsibilities: ['Monetary Policy', 'Trade Relations', 'Economic Development'],
          reports: ['president_001'],
          status: 'active',
          approval: 82,
          digitalId: 'MIN-ECON-001',
          securityClearance: 'secret'
        },
        officials: [],
        departments: [],
        budget: 3000000,
        population: 400000,
        authority: 'federal',
        status: 'active',
        establishedDate: Date.now(),
        lastElection: Date.now() - (180 * 24 * 60 * 60 * 1000),
        nextElection: Date.now() + (4 * 365 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'level_2_federal_3',
        level: 2,
        name: 'Ministry of Social Development',
        jurisdiction: 'National Social Policy',
        parentId: 'level_1_supreme',
        childrenIds: ['level_3_regional_5', 'level_3_regional_6'],
        leader: {
          id: 'minister_social_001',
          name: 'Dr. Elena Rodriguez',
          title: 'Minister of Social Development',
          position: 'Federal Minister',
          level: 2,
          appointedDate: Date.now(),
          term: 4,
          salary: 350000,
          performance: 87,
          qualifications: ['PhD Social Work', 'Community Organizer', 'Policy Expert'],
          responsibilities: ['Healthcare', 'Education', 'Social Services'],
          reports: ['president_001'],
          status: 'active',
          approval: 89,
          digitalId: 'MIN-SOC-001',
          securityClearance: 'confidential'
        },
        officials: [],
        departments: [],
        budget: 2000000,
        population: 300000,
        authority: 'federal',
        status: 'active',
        establishedDate: Date.now(),
        lastElection: Date.now() - (180 * 24 * 60 * 60 * 1000),
        nextElection: Date.now() + (4 * 365 * 24 * 60 * 60 * 1000)
      }
    ];

    // Create deeper levels (3-10)
    const allLevels = [supremeLevel, ...federalLevels];
    
    // Generate levels 3-10 with proper hierarchy
    for (let level = 3; level <= 10; level++) {
      const levelData = generateGovernmentLevel(level, allLevels);
      allLevels.push(...levelData);
    }

    // Initialize departments for each level
    const allDepartments = generateDepartments(allLevels);
    
    // Initialize projects
    const nationalProjects = generateNationalProjects();

    setState(prev => ({
      ...prev,
      isInitialized: true,
      levels: allLevels,
      departments: allDepartments,
      projects: nationalProjects,
      executive: {
        ...prev.executive,
        president: supremeLevel.leader,
        vicePresident: {
          id: 'vp_001',
          name: 'Dr. Robert Kim',
          title: 'Vice President',
          position: 'Deputy Executive',
          level: 1,
          appointedDate: Date.now(),
          term: 6,
          salary: 400000,
          performance: 89,
          qualifications: ['JD Law', 'Former Judge', 'Constitutional Expert'],
          responsibilities: ['Legislative Relations', 'Succession Planning', 'Special Projects'],
          reports: ['president_001'],
          status: 'active',
          approval: 75,
          digitalId: 'VP-001-BETA',
          securityClearance: 'top-secret'
        }
      },
      civilService: {
        totalEmployees: allDepartments.reduce((sum, dept) => sum + dept.employees.length, 0),
        averageSalary: 75000,
        efficiency: 82,
        satisfaction: 78
      }
    }));

    console.log('🏛️ Advanced Government System initialized with 10 levels');
    
    toast({
      title: "🏛️ Advanced Government Activated",
      description: "10-level comprehensive government system is now operational",
      duration: 5000,
    });

    return true;
  }, []);

  // Helper function to generate government levels (optimized)
  const generateGovernmentLevel = (level: number, existingLevels: GovernmentLevel[]): GovernmentLevel[] => {
    const levelNames = {
      3: 'Regional Governors',
      4: 'Provincial Councils', 
      5: 'Municipal Governments',
      6: 'District Offices',
      7: 'Local Councils',
      8: 'Community Boards',
      9: 'Neighborhood Committees',
      10: 'Citizen Representatives'
    };

    const authorities: AuthorityLevel[] = ['regional', 'provincial', 'municipal', 'district', 'local', 'community', 'neighborhood', 'citizen'];
    
    // Limit to 1 child per parent for levels > 5 to reduce data size
    const childrenPerParent = level > 5 ? 1 : 2;
    const parentLevels = existingLevels.filter(l => l.level === level - 1);
    const generatedLevels: GovernmentLevel[] = [];

    parentLevels.forEach((parent, index) => {
      for (let i = 0; i < childrenPerParent; i++) {
        const levelId = `level_${level}_${index}_${i}`;
        generatedLevels.push({
          id: levelId,
          level: level,
          name: `${levelNames[level as keyof typeof levelNames]} ${index + 1}.${i + 1}`,
          jurisdiction: `${parent.jurisdiction} - Sub ${i + 1}`,
          parentId: parent.id,
          childrenIds: [],
          leader: {
            id: `leader_${level}_${index}_${i}`,
            name: `Officer ${level}.${index}.${i}`,
            title: `Level ${level} Admin`,
            position: `Admin`,
            level: level,
            appointedDate: Date.now(),
            term: Math.max(2, 6 - level),
            salary: Math.max(50000, 400000 - (level * 40000)),
            performance: 75 + Math.random() * 20,
            qualifications: ['Training'],
            responsibilities: [`Admin`],
            reports: [parent.leader.id],
            status: 'active',
            approval: 60 + Math.random() * 30,
            digitalId: `LVL${level}-${index}-${i}`,
            securityClearance: level <= 5 ? 'confidential' : 'restricted'
          },
          officials: [],
          departments: [],
          budget: Math.max(50000, parent.budget / 3),
          population: Math.max(1000, parent.population / 3),
          authority: authorities[level - 3] || 'citizen',
          status: 'active',
          establishedDate: Date.now(),
          lastElection: Date.now() - (Math.random() * 365 * 24 * 60 * 60 * 1000),
          nextElection: Date.now() + (Math.max(2, 6 - level) * 365 * 24 * 60 * 60 * 1000)
        });
      }
    });

    return generatedLevels;
  };

  // Generate departments for all levels
  const generateDepartments = (levels: GovernmentLevel[]): Department[] => {
    const departments: Department[] = [];
    
    levels.forEach(level => {
      const deptCount = Math.max(1, Math.floor(6 - level.level / 2));
      
      for (let i = 0; i < deptCount; i++) {
        departments.push({
          id: `dept_${level.id}_${i}`,
          name: `Department ${i + 1} - ${level.name}`,
          level: level.level,
          subDepartments: [],
          head: level.leader.id,
          employees: generateEmployees(level.level, i),
          budget: level.budget / deptCount,
          allocatedBudget: level.budget / deptCount,
          spentBudget: (level.budget / deptCount) * (0.3 + Math.random() * 0.4),
          efficiency: 70 + Math.random() * 25,
          responsibilities: [`Level ${level.level} Operations`, 'Policy Implementation'],
          projects: [],
          establishedDate: Date.now(),
          status: 'active'
        });
      }
    });

    return departments;
  };

  // Generate employees for departments
  const generateEmployees = (level: number, deptIndex: number) => {
    const employeeCount = Math.max(5, 30 - level * 2);
    const employees = [];
    
    for (let i = 0; i < employeeCount; i++) {
      employees.push({
        id: `emp_${level}_${deptIndex}_${i}`,
        name: `Employee ${level}.${deptIndex}.${i}`,
        position: `Level ${level} Staff`,
        level: level,
        department: `dept_level_${level}_${deptIndex}`,
        supervisor: `leader_${level}_${deptIndex}_0`,
        salary: Math.max(40000, 100000 - level * 8000),
        hireDate: Date.now() - (Math.random() * 2 * 365 * 24 * 60 * 60 * 1000),
        performance: 60 + Math.random() * 35,
        certifications: ['Government Service', 'Professional Training'],
        status: 'active' as const
      });
    }
    
    return employees;
  };

  // Generate national projects
  const generateNationalProjects = (): Project[] => {
    return [
      {
        id: 'proj_digital_id',
        name: 'National Digital Identity System',
        description: 'Comprehensive digital ID system for all citizens',
        department: 'dept_level_1_supreme_0',
        budget: 500000,
        timeline: {
          start: Date.now(),
          end: Date.now() + (2 * 365 * 24 * 60 * 60 * 1000),
          milestones: [
            {
              id: 'milestone_1',
              name: 'Phase 1: Infrastructure',
              description: 'Set up basic infrastructure',
              dueDate: Date.now() + (6 * 30 * 24 * 60 * 60 * 1000),
              status: 'pending',
              dependencies: []
            }
          ]
        },
        status: 'active',
        priority: 'high',
        stakeholders: ['minister_tech_001', 'president_001'],
        progress: 25
      },
      {
        id: 'proj_economic_zone',
        name: 'MIORA Economic Development Zone',
        description: 'Special economic zone for innovation and trade',
        department: 'dept_level_2_federal_2_0',
        budget: 750000,
        timeline: {
          start: Date.now(),
          end: Date.now() + (3 * 365 * 24 * 60 * 60 * 1000),
          milestones: []
        },
        status: 'planning',
        priority: 'critical',
        stakeholders: ['minister_econ_001', 'president_001'],
        progress: 10
      }
    ];
  };

  // Advanced government operations
  const conductElection = useCallback((levelId: string) => {
    setState(prev => ({
      ...prev,
      levels: prev.levels.map(level => 
        level.id === levelId 
          ? { ...level, lastElection: Date.now(), nextElection: Date.now() + (level.leader.term * 365 * 24 * 60 * 60 * 1000) }
          : level
      )
    }));

    toast({
      title: "🗳️ Election Conducted",
      description: "Democratic election completed successfully",
      duration: 3000,
    });
  }, []);

  const promoteOfficial = useCallback((officialId: string, newLevel: number) => {
    setState(prev => ({
      ...prev,
      officials: prev.officials.map(official => 
        official.id === officialId 
          ? { ...official, level: newLevel, salary: official.salary * 1.2, performance: Math.min(100, official.performance + 5) }
          : official
      )
    }));
  }, []);

  const createProject = useCallback((projectData: Omit<Project, 'id' | 'progress'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      progress: 0
    };

    setState(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));

    toast({
      title: "📋 New Project Created",
      description: `Project "${newProject.name}" has been initiated`,
      duration: 3000,
    });

    return newProject;
  }, []);

  const updateSecurityLevel = useCallback((level: 'normal' | 'elevated' | 'high' | 'critical') => {
    setState(prev => ({ ...prev, securityLevel: level }));
    
    toast({
      title: "🔒 Security Level Updated",
      description: `Security level changed to ${level.toUpperCase()}`,
      duration: 3000,
    });
  }, []);

  // Get comprehensive government stats
  const getAdvancedStats = useCallback(() => {
    // Add null-safety checks for arrays
    const levels = state.levels || [];
    const departments = state.departments || [];
    const projects = state.projects || [];
    
    const totalOfficials = levels.reduce((sum, level) => sum + 1 + (level.officials?.length || 0), 0);
    const totalEmployees = departments.reduce((sum, dept) => sum + (dept.employees?.length || 0), 0);
    const avgEfficiency = departments.length > 0 ? departments.reduce((sum, dept) => sum + (dept.efficiency || 0), 0) / departments.length : 0;
    const totalBudgetSpent = departments.reduce((sum, dept) => sum + (dept.spentBudget || 0), 0);
    const activeProjects = projects.filter(p => p.status === 'active').length;

    return {
      totalLevels: levels.length,
      totalOfficials,
      totalEmployees,
      totalDepartments: departments.length,
      avgEfficiency: Math.round(avgEfficiency),
      totalBudget: state.totalBudget || 0,
      budgetUtilization: Math.round((totalBudgetSpent / (state.totalBudget || 1)) * 100),
      activeProjects,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      securityLevel: state.securityLevel || 'normal',
      governance: state.governance || {
        transparency: 85,
        accountability: 80,
        participation: 70,
        stability: 90
      },
      civilService: state.civilService || {
        totalEmployees: 0,
        averageSalary: 75000,
        efficiency: 80,
        satisfaction: 75
      }
    };
  }, [state]);

  // Auto-save state with error handling
  useEffect(() => {
    if (state.isInitialized) {
      try {
        // Store only essential data to avoid quota issues
        const essentialData = {
          isInitialized: state.isInitialized,
          levels: state.levels.slice(0, 6), // Only store first 6 levels
          governance: state.governance,
          civilService: state.civilService,
          securityLevel: state.securityLevel,
          currentTerm: state.currentTerm,
          totalBudget: state.totalBudget,
          timestamp: Date.now()
        };
        
        localStorage.setItem('miora_advanced_government', JSON.stringify(essentialData));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          console.warn('🏛️ localStorage quota exceeded, clearing old data...');
          // Clear old data and try again with minimal data
          localStorage.removeItem('miora_advanced_government');
          try {
            const minimalData = {
              isInitialized: state.isInitialized,
              securityLevel: state.securityLevel,
              timestamp: Date.now()
            };
            localStorage.setItem('miora_advanced_government', JSON.stringify(minimalData));
          } catch (secondError) {
            console.error('Failed to save even minimal government data:', secondError);
          }
        } else {
          console.error('Error saving government state:', error);
        }
      }
    }
  }, [state.isInitialized, state.securityLevel, state.governance]);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('miora_advanced_government');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
        console.log('🏛️ Advanced Government state loaded from localStorage');
      } catch (error) {
        console.error('Error loading advanced government state:', error);
      }
    }
  }, []);

  return {
    state,
    initializeAdvancedGovernment,
    conductElection,
    promoteOfficial,
    createProject,
    updateSecurityLevel,
    getAdvancedStats,
    isAdvancedGovernmentActive: state.isInitialized
  };
};