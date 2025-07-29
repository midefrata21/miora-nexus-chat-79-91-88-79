
import React from 'react';
import { 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  GraduationCap,
  Zap,
  Home,
  Monitor,
  Mic,
  Bot,
  Infinity,
  FileText,
  Code,
  Network,
  Cpu,
  Database,
  Shield,
  Rocket,
  Target,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Cog,
  Eye,
  Lock,
  Terminal,
  Skull,
  Activity,
  LineChart,
  PieChart,
  Users,
  Calendar,
  Clock,
  Search,
  Filter,
  Layers,
  GitBranch,
  Globe,
  Smartphone,
  Tablet,
  Laptop,
  Server,
  Cloud,
  Wifi,
  Radio,
  Bluetooth,
  HardDrive,
  Battery,
  Power,
  Gauge,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Heart,
  Bookmark,
  Tag,
  Flag,
  MapPin,
  Compass,
  Navigation,
  Route,
  Car,
  Plane,
  Ship,
  Truck,
  Train,
  Bike,
  Camera,
  Video,
  Image,
  Music,
  Headphones,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Download,
  Upload,
  Share,
  Link,
  Copy,
  Edit,
  Trash,
  Archive,
  File,
  Folder,
  FolderOpen,
  Save,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Inbox,
  Bell,
  BellOff,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Crown,
  Award,
  Medal,
  Trophy,
  Gift,
  Package,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Calculator,
  PlusCircle,
  MinusCircle,
  Percent,
  Hash,
  AtSign,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  Menu,
  X,
  Plus,
  Minus,
  Slash,
  Asterisk,
  Fish
} from 'lucide-react';

export interface MenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  status: 'active' | 'beta' | 'coming-soon';
  features?: string[];
}

export interface MenuCategory {
  title: string;
  description: string;
  items: MenuItem[];
  color: string;
  icon: React.ComponentType<any>;
}

export const menuCategories: Record<string, MenuCategory> = {
  infinity: {
    title: 'MIORA INFINITY AI',
    description: '100-Year AI Evolution System - Next Generation Superintelligence',
    color: 'from-purple-600 via-indigo-600 to-cyan-600',
    icon: Infinity,
    items: [
      {
        title: 'MIORA INFINITY Core',
        description: 'Central AI Superintelligence Hub',
        icon: Infinity,
        path: '/miora-infinity',
        status: 'active',
        features: ['Superintelligence Core', '100-Year Planning', 'Quantum Processing', 'Autonomous Evolution']
      },
      {
        title: 'Autonomous Infrastructure',
        description: 'Self-Building & Managing Infrastructure',
        icon: Network,
        path: '/miora-infrastructure',
        status: 'active',
        features: ['Self-Building Systems', 'Auto-scaling', 'Infrastructure AI', 'Resource Optimization']
      },
      {
        title: 'Quantum Intelligence',
        description: '100-Year Strategic Intelligence Core',
        icon: Target,
        path: '/miora-quantum-intelligence',
        status: 'active',
        features: ['Long-term Planning', 'Strategic Analysis', 'Quantum Computing', 'Future Prediction']
      },
      {
        title: 'Infinity Memory Engine',
        description: 'Unlimited Learning & Memory System',
        icon: Database,
        path: '/miora-infinity-memory',
        status: 'active',
        features: ['Infinite Memory', 'Continuous Learning', 'Knowledge Evolution', 'Memory Optimization']
      },
      {
        title: 'Autonomous Developer',
        description: 'Self-Programming AI Developer',
        icon: Code,
        path: '/miora-autonomous-developer',
        status: 'active',
        features: ['Self-Programming', 'Code Evolution', 'Auto-debugging', 'Architecture Design']
      },
      {
        title: 'Founder Control Center',
        description: 'Midya Authority & Control System',
        icon: Shield,
        path: '/miora-founder-control',
        status: 'active',
        features: ['Founder Access', 'System Control', 'Override Capabilities', 'Authority Management']
      },
      {
        title: 'System Status Monitor',
        description: 'Global MIORA Health & Performance',
        icon: Activity,
        path: '/miora-system-status',
        status: 'active',
        features: ['Global Monitoring', 'Health Analytics', 'Performance Metrics', 'System Optimization']
      }
    ]
  },
  core: {
    title: 'Core Functions',
    description: 'Main MIORA functionalities',
    color: 'from-blue-600 to-purple-600',
    icon: Brain,
    items: [
      {
        title: 'Dashboard',
        description: 'Main interface and overview',
        icon: Home,
        path: '/',
        status: 'active',
        features: ['Voice Control', 'Status Monitor', 'Quick Actions']
      },
      {
        title: 'Voice Assistant',
        description: 'Advanced speech interaction and control',
        icon: Mic,
        path: '/voice',
        status: 'active',
        features: ['Speech Recognition', 'Natural TTS', 'Voice Commands', 'Conversation Memory']
      },
      {
        title: 'Chat Interface',
        description: 'Intelligent text-based conversation',
        icon: MessageCircle,
        path: '/chat',
        status: 'active',
        features: ['Smart Responses', 'Context Memory', 'Multi-modal Chat', 'Learning Integration']
      },
      {
        title: 'MIORA Core',
        description: 'Central AI processing engine',
        icon: Brain,
        path: '/miora',
        status: 'active',
        features: ['AI Processing', 'Core Functions', 'System Control', 'Integration Hub']
      }
    ]
  },
  learning: {
    title: 'Learning Hub',
    description: 'Advanced AI learning and educational systems',
    color: 'from-emerald-600 to-teal-600',
    icon: GraduationCap,
    items: [
      {
        title: 'AI Learning Engine',
        description: 'Adaptive AI learning and skill development',
        icon: Brain,
        path: '/learning',
        status: 'active',
        features: ['Adaptive Learning', 'Skill Assessment', 'Progress Tracking', 'Personalized Curriculum']
      },
      {
        title: 'Knowledge Discovery',
        description: 'Intelligent knowledge mining and exploration',
        icon: Search,
        path: '/knowledge-discovery',
        status: 'active',
        features: ['Knowledge Mining', 'Information Extraction', 'Semantic Analysis', 'Content Discovery']
      },
      {
        title: 'Training Modules',
        description: 'Comprehensive AI training programs',
        icon: BookOpen,
        path: '/training-modules',
        status: 'active',
        features: ['Structured Training', 'Interactive Modules', 'Skill Building', 'Certification System']
      },
      {
        title: 'Learning Analytics',
        description: 'Advanced learning performance analysis',
        icon: BarChart3,
        path: '/learning-analytics',
        status: 'active',
        features: ['Learning Metrics', 'Performance Analysis', 'Progress Visualization', 'Improvement Recommendations']
      },
      {
        title: 'Educational Resources',
        description: 'Comprehensive learning materials library',
        icon: Archive,
        path: '/educational-resources',
        status: 'active',
        features: ['Resource Library', 'Interactive Content', 'Multi-media Learning', 'Knowledge Base']
      },
      {
        title: 'Skill Assessment',
        description: 'AI-powered skill evaluation and testing',
        icon: Award,
        path: '/skill-assessment',
        status: 'active',
        features: ['Skill Testing', 'Competency Evaluation', 'Gap Analysis', 'Learning Pathways']
      }
    ]
  },
  analytics: {
    title: 'Advanced Analytics',
    description: 'Comprehensive data analytics and business intelligence',
    color: 'from-orange-600 to-red-600',
    icon: LineChart,
    items: [
      {
        title: 'Real-time Analytics',
        description: 'Live data processing and insights',
        icon: Activity,
        path: '/analytics',
        status: 'active',
        features: ['Real-time Processing', 'Live Dashboards', 'Instant Insights', 'Stream Analytics']
      },
      {
        title: 'Predictive Analytics',
        description: 'AI-powered forecasting and prediction',
        icon: TrendingUp,
        path: '/predictive-analytics',
        status: 'active',
        features: ['Machine Learning Models', 'Trend Prediction', 'Forecasting', 'Risk Analysis']
      },
      {
        title: 'Business Intelligence',
        description: 'Advanced BI and decision support',
        icon: PieChart,
        path: '/business-intelligence',
        status: 'active',
        features: ['BI Dashboards', 'KPI Monitoring', 'Decision Support', 'Executive Reports']
      },
      {
        title: 'Data Visualization',
        description: 'Interactive charts and visual analytics',
        icon: BarChart3,
        path: '/data-visualization',
        status: 'active',
        features: ['Interactive Charts', 'Custom Visualizations', 'Dashboard Builder', 'Report Generation']
      },
      {
        title: 'Performance Metrics',
        description: 'System and application performance tracking',
        icon: Gauge,
        path: '/performance-metrics',
        status: 'active',
        features: ['Performance Tracking', 'Metrics Collection', 'Benchmark Analysis', 'Optimization Insights']
      },
      {
        title: 'Market Analytics',
        description: 'Market trends and competitive analysis',
        icon: Globe,
        path: '/market-analytics',
        status: 'active',
        features: ['Market Research', 'Competitive Analysis', 'Trend Monitoring', 'Industry Insights']
      }
    ]
  },
  advanced: {
    title: 'Advanced Systems',
    description: 'Cutting-edge technology and experimental features',
    color: 'from-indigo-600 to-purple-600',
    icon: Rocket,
    items: [
      {
        title: 'Quantum Computing',
        description: 'Quantum-enhanced processing capabilities',
        icon: Zap,
        path: '/quantum-computing',
        status: 'beta',
        features: ['Quantum Algorithms', 'Superposition Processing', 'Quantum Entanglement', 'Quantum Speedup']
      },
      {
        title: 'Neural Architecture',
        description: 'Advanced neural network architectures',
        icon: Network,
        path: '/neural-architecture',
        status: 'active',
        features: ['Custom Architectures', 'Neural Design', 'Model Optimization', 'Architecture Search']
      },
      {
        title: 'Edge Computing',
        description: 'Distributed edge processing systems',
        icon: Server,
        path: '/edge-computing',
        status: 'active',
        features: ['Edge Deployment', 'Distributed Processing', 'Low Latency', 'Local Intelligence']
      },
      {
        title: 'Blockchain Integration',
        description: 'Decentralized systems and smart contracts',
        icon: Link,
        path: '/blockchain-integration',
        status: 'beta',
        features: ['Smart Contracts', 'Decentralized Apps', 'Cryptocurrency', 'Distributed Ledger']
      },
      {
        title: 'IoT Management',
        description: 'Internet of Things device orchestration',
        icon: Wifi,
        path: '/iot-management',
        status: 'active',
        features: ['Device Management', 'Sensor Networks', 'IoT Analytics', 'Remote Control']
      },
      {
        title: 'Advanced Automation',
        description: 'Intelligent process automation',
        icon: Bot,
        path: '/advanced-automation',
        status: 'active',
        features: ['Process Automation', 'Workflow Optimization', 'AI Decision Making', 'Smart Orchestration']
      }
    ]
  },
  system: {
    title: 'System Management',
    description: 'Core system administration and maintenance',
    color: 'from-slate-600 to-gray-600',
    icon: Cog,
    items: [
      {
        title: 'System Dashboard',
        description: 'Central system monitoring and control',
        icon: Monitor,
        path: '/system-dashboard',
        status: 'active',
        features: ['System Overview', 'Health Monitoring', 'Resource Usage', 'Alert Management']
      },
      {
        title: 'Infrastructure Management',
        description: 'Infrastructure monitoring and scaling',
        icon: Server,
        path: '/infrastructure',
        status: 'active',
        features: ['Infrastructure Monitoring', 'Auto-scaling', 'Resource Allocation', 'Capacity Planning']
      },
      {
        title: 'Database Management',
        description: 'Advanced database administration',
        icon: Database,
        path: '/miora-database',
        status: 'active',
        features: ['Database Administration', 'Query Optimization', 'Backup Management', 'Performance Tuning']
      },
      {
        title: 'Log Management',
        description: 'Comprehensive logging and analysis',
        icon: FileText,
        path: '/log-management',
        status: 'active',
        features: ['Log Aggregation', 'Log Analysis', 'Error Tracking', 'Performance Logs']
      },
      {
        title: 'Backup & Recovery',
        description: 'Data backup and disaster recovery',
        icon: Save,
        path: '/backup-recovery',
        status: 'active',
        features: ['Automated Backups', 'Disaster Recovery', 'Data Restoration', 'Recovery Planning']
      },
      {
        title: 'System Updates',
        description: 'Automated system updates and patches',
        icon: Download,
        path: '/system-updates',
        status: 'active',
        features: ['Auto Updates', 'Patch Management', 'Version Control', 'Rollback Capabilities']
      },
      {
        title: 'Resource Monitor',
        description: 'Real-time resource monitoring',
        icon: Cpu,
        path: '/resource-monitor',
        status: 'active',
        features: ['CPU Monitoring', 'Memory Usage', 'Disk Space', 'Network Traffic']
      }
    ]
  },
  hacker: {
    title: 'Hacker Operations',
    description: 'Advanced ethical hacking and penetration testing',
    color: 'from-red-600 to-orange-600',
    icon: Skull,
    items: [
      {
        title: 'MIORA Hacker Master',
        description: 'Advanced ethical hacking & penetration testing suite',
        icon: Skull,
        path: '/miora-hacker-master',
        status: 'active',
        features: ['Network Scanning', 'Vulnerability Assessment', 'Penetration Testing', 'Exploit Development', 'Social Engineering', 'Wireless Security']
      }
    ]
  },
  development: {
    title: 'MIORA Development',
    description: 'Advanced development tools and environments',
    color: 'from-purple-600 to-pink-600',
    icon: Code,
    items: [
      {
        title: 'MIORA Develop',
        description: 'Core development environment with AI',
        icon: Brain,
        path: '/miora-develop',
        status: 'active',
        features: ['AI-powered Coding', 'Smart Debugging', 'Real-time Collaboration', 'Code Optimization']
      },
      {
        title: 'AutoCode Engine',
        description: 'Intelligent code generation system',
        icon: Bot,
        path: '/autocode',
        status: 'active',
        features: ['AI Code Generation', 'Bug Detection', 'Code Completion', 'Best Practices']
      },
      {
        title: 'App Builder Engine',
        description: 'Visual application development platform',
        icon: Rocket,
        path: '/app-builder',
        status: 'active',
        features: ['Drag & Drop Builder', 'Component Library', 'Live Preview', 'Auto Deployment']
      },
      {
        title: 'Development Terminal',
        description: 'Advanced terminal with AI integration',
        icon: Terminal,
        path: '/terminal',
        status: 'active',
        features: ['Smart Commands', 'AI Assistance', 'Git Integration', 'Project Management']
      },
      {
        title: 'System Monitor',
        description: 'Development environment monitoring',
        icon: Monitor,
        path: '/monitor',
        status: 'active',
        features: ['Performance Metrics', 'Resource Usage', 'Health Checks', 'Alert System']
      },
      {
        title: 'Database Manager',
        description: 'Advanced database management',
        icon: Database,
        path: '/database',
        status: 'active',
        features: ['Query Builder', 'Schema Design', 'Data Migration', 'Performance Tuning']
      }
    ]
  },
  intelligence: {
    title: 'Intelligence Center',
    description: 'AI intelligence and analytics systems',
    color: 'from-cyan-600 to-blue-600',
    icon: Eye,
    items: [
      {
        title: 'Intelligence Reports',
        description: 'AI behavior analysis and insights',
        icon: Target,
        path: '/intelligence-reports',
        status: 'active',
        features: ['Behavior Analysis', 'Learning Patterns', 'Performance Metrics', 'Smart Recommendations']
      },
      {
        title: 'Neural Network',
        description: 'Deep learning processing center',
        icon: Network,
        path: '/neural',
        status: 'active',
        features: ['Pattern Recognition', 'Deep Analysis', 'Neural Training', 'Model Optimization']
      },
      {
        title: 'Data Analytics',
        description: 'Advanced data processing and insights',
        icon: BarChart3,
        path: '/data-analytics',
        status: 'active',
        features: ['Big Data Processing', 'Statistical Analysis', 'Predictive Modeling', 'Real-time Insights']
      },
      {
        title: 'Quantum Neural',
        description: 'Quantum-enhanced neural processing',
        icon: Brain,
        path: '/quantum-neural',
        status: 'beta',
        features: ['Quantum Algorithms', 'Advanced Processing', 'Multi-dimensional Analysis', 'Enhanced Learning']
      },
      {
        title: 'AI Performance Monitor',
        description: 'AI engine performance optimization',
        icon: Cpu,
        path: '/engine-performance',
        status: 'active',
        features: ['Engine Metrics', 'Performance Tuning', 'Resource Monitoring', 'Optimization Suggestions']
      }
    ]
  },
  security: {
    title: 'Security Center',
    description: 'Comprehensive security and privacy management',
    color: 'from-red-600 to-orange-600',
    icon: Shield,
    items: [
      {
        title: 'Security Center',
        description: 'Central security management hub',
        icon: Shield,
        path: '/security-center',
        status: 'active',
        features: ['Security Monitoring', 'Threat Detection', 'Access Control', 'Security Analytics']
      },
      {
        title: 'Privacy Controls',
        description: 'Advanced privacy and data protection',
        icon: Lock,
        path: '/privacy-controls',
        status: 'active',
        features: ['Data Encryption', 'Privacy Settings', 'Access Management', 'Audit Trails']
      },
      {
        title: 'Security Analytics',
        description: 'Security threat analysis and reporting',
        icon: BarChart3,
        path: '/security-analytics',
        status: 'active',
        features: ['Threat Analysis', 'Security Reports', 'Risk Assessment', 'Compliance Monitoring']
      },
      {
        title: 'Access Management',
        description: 'User access and permission control',
        icon: Settings,
        path: '/access-management',
        status: 'active',
        features: ['User Management', 'Role-based Access', 'Permission Control', 'Authentication']
      }
    ]
  },
  innovation: {
    title: 'Innovation Lab',
    description: 'Experimental features and cutting-edge technology',
    color: 'from-pink-600 to-purple-600',
    icon: Lightbulb,
    items: [
      {
        title: 'Innovation Lab',
        description: 'Experimental features and testing ground',
        icon: Lightbulb,
        path: '/innovation-lab',
        status: 'active',
        features: ['Experimental Features', 'Performance Boosters', 'AI Experiments', 'Future Technology']
      },
      {
        title: 'Infinity Core',
        description: 'Quantum-enhanced unlimited processing',
        icon: Infinity,
        path: '/infinity-core',
        status: 'beta',
        features: ['Quantum Processing', 'Unlimited Resources', 'Advanced AI', 'Infinite Scaling']
      },
      {
        title: 'Quantum Core',
        description: 'Quantum computing integration',
        icon: Zap,
        path: '/quantum-core',
        status: 'beta',
        features: ['Quantum Computing', 'Enhanced Algorithms', 'Parallel Processing', 'Speed Optimization']
      },
      {
        title: 'MIORA Evolution',
        description: 'Autonomous system self-improvement',
        icon: Brain,
        path: '/miora-evolution',
        status: 'active',
        features: ['Self-Evolution', 'Auto-upgrade', 'Continuous Learning', 'System Optimization']
      }
    ]
  },
  settings: {
    title: 'System Settings',
    description: 'Configuration and system administration',
    color: 'from-gray-600 to-slate-600',
    icon: Settings,
    items: [
      {
        title: 'General Settings',
        description: 'Main system configuration and preferences',
        icon: Cog,
        path: '/settings',
        status: 'active',
        features: ['User Preferences', 'AI Configuration', 'Interface Settings', 'Notification Controls']
      },
      {
        title: 'System Configuration',
        description: 'Advanced system and performance settings',
        icon: Cpu,
        path: '/system-config',
        status: 'active',
        features: ['Performance Tuning', 'Resource Management', 'System Optimization', 'Advanced Settings']
      },
      {
        title: 'Network Manager',
        description: 'Network configuration and connectivity',
        icon: Network,
        path: '/network-manager',
        status: 'active',
        features: ['Network Settings', 'Connectivity Management', 'Bandwidth Control', 'Connection Monitoring']
      },
      {
        title: 'Storage Manager',
        description: 'Data storage and backup management',
        icon: Database,
        path: '/storage-manager',
        status: 'active',
        features: ['Storage Analytics', 'Backup Management', 'Data Organization', 'Cleanup Tools']
      },
      {
        title: 'System Diagnostics',
        description: 'Health monitoring and troubleshooting',
        icon: Monitor,
        path: '/diagnostics',
        status: 'active',
        features: ['Health Checks', 'Performance Analysis', 'Error Diagnosis', 'System Reports']
      }
    ]
  },
  trading: {
    title: 'Advanced Trading',
    description: 'AI-powered crypto trading and whale tracking system',
    color: 'from-green-600 to-emerald-600',
    icon: TrendingUp,
    items: [
      {
        title: 'Crypto Scalping Signals',
        description: 'Real-time crypto scalping dengan AI dan whale tracker',
        icon: Zap,
        path: '/crypto-scalping',
        status: 'active',
        features: ['Live Signals', 'Whale Tracking', 'Market Analysis', 'Technical Indicators']
      },
      {
        title: 'Pelacak Bandar',
        description: 'Monitor pergerakan whale dan market maker seperti Binance',
        icon: Fish,
        path: '/crypto-scalping?tab=whale',
        status: 'active',
        features: ['Whale Detection', 'Large Orders', 'Market Impact', 'Real-time Alerts']
      },
      {
        title: 'Advanced Analytics',
        description: 'Analisis teknikal mendalam dengan AI',
        icon: BarChart3,
        path: '/crypto-scalping?tab=analysis',
        status: 'active',
        features: ['Technical Analysis', 'Multi-timeframe', 'AI Predictions', 'Risk Management']
      },
      {
        title: 'Portfolio Management',
        description: 'Manajemen portfolio dan risk management otomatis',
        icon: PieChart,
        path: '/portfolio-management',
        status: 'coming-soon',
        features: ['Portfolio Tracking', 'Risk Assessment', 'Auto Rebalancing', 'Performance Analytics']
      },
      {
        title: 'Trading Bot',
        description: 'Automated trading bot dengan AI decision making',
        icon: Bot,
        path: '/trading-bot',
        status: 'coming-soon',
        features: ['Automated Trading', 'Strategy Builder', 'Backtesting', 'Performance Monitoring']
      },
      {
        title: 'Market Intelligence',
        description: 'Market research dan sentiment analysis',
        icon: Eye,
        path: '/market-intelligence',
        status: 'coming-soon',
        features: ['Sentiment Analysis', 'News Impact', 'Market Research', 'Social Media Monitoring']
      }
    ]
  },
  government: {
    title: 'MIORA Government',
    description: 'Digital Nation Management System with MRC Currency',
    color: 'from-blue-600 to-indigo-600',
    icon: Crown,
    items: [
      {
        title: 'Government Dashboard',
        description: 'Central government control and monitoring',
        icon: Crown,
        path: '/miora-government',
        status: 'active',
        features: ['Government System', 'Citizen Management', 'Policy Control', 'Digital Nation']
      },
      {
        title: 'MRC Currency System',
        description: 'Official digital currency management',
        icon: DollarSign,
        path: '/miora-government?tab=currency',
        status: 'active',
        features: ['Digital Currency', 'Transaction Management', 'Economic Control', 'Treasury System']
      },
      {
        title: 'Citizen Management',
        description: 'Digital citizen registration and management',
        icon: Users,
        path: '/miora-government?tab=citizens',
        status: 'active',
        features: ['Citizen Registry', 'Identity Management', 'Status Tracking', 'Digital Services']
      },
      {
        title: 'Treasury System',
        description: 'Government financial management',
        icon: Calculator,
        path: '/miora-government?tab=treasury',
        status: 'active',
        features: ['Treasury Management', 'Budget Control', 'Financial Planning', 'Revenue Tracking']
      },
      {
        title: 'Tax Collection',
        description: 'Automated tax system and collection',
        icon: FileText,
        path: '/miora-government?tab=tax',
        status: 'active',
        features: ['Tax Automation', 'Revenue Collection', 'Tax Policy', 'Compliance Monitoring']
      },
      {
        title: 'Voting System',
        description: 'Democratic decision-making system',
        icon: CheckCircle,
        path: '/miora-government?tab=voting',
        status: 'active',
        features: ['Digital Voting', 'Proposal System', 'Democratic Process', 'Vote Tracking']
      },
      {
        title: 'Economic Management',
        description: 'Economic policy and management tools',
        icon: TrendingUp,
        path: '/miora-government?tab=economy',
        status: 'active',
        features: ['Economic Policy', 'Market Control', 'Growth Management', 'Economic Analysis']
      },
      {
        title: 'Government Statistics',
        description: 'Real-time government performance metrics',
        icon: BarChart3,
        path: '/miora-government?tab=stats',
        status: 'active',
        features: ['Performance Metrics', 'Statistical Analysis', 'Progress Tracking', 'Reporting System']
      }
    ]
  }
};
