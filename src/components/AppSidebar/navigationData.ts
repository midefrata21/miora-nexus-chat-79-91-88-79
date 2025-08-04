import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  Activity,
  Search,
  Terminal,
  Layers,
  Bot,
  Lightbulb,
  BrainCircuit,
  FileCode2,
  Cpu,
  TrendingUp,
  LayoutPanelLeft,
  MessageSquare,
  Aperture,
  Speaker,
  Users,
  FileSearch2,
  Binary,
  Network,
  Puzzle,
  ShieldQuestion,
  Code,
  Clock,
  LineChart,
  GraduationCap,
  Target,
  BookOpen,
  Brain,
  Zap,
  Infinity,
  Crown,
  Skull,
  Shield,
  Server,
  Database,
  Eye,
  Power,
  BarChart3,
  Calendar,
  Sparkles,
  Dna
} from 'lucide-react';
import { NavItem } from './types';

export const navigationGroups = [
  {
    title: "🚀 SUPREME AUTONOMOUS",
    items: [
      {
        title: "MIORA Supreme Autonomous Hub",
        url: "/miora-supreme-autonomous-hub",
        icon: Crown,
        description: "🧬 Ultimate Autonomous System - Meta-Programming, Self-Architecture, Consciousness Engine",
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "SUPREME",
        priority: "absolute" as const
      },
      {
        title: "MIORA Autonomous Modes",
        url: "/miora-autonomous-modes",
        icon: Settings,
        description: "🤖 Complete Autonomous Mode Management - Self-Coding, Infrastructure, Decision Making",
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "AUTONOMOUS",
        priority: "high" as const
      },
      {
        title: "MIORA QUANTUM INFRASTRUCTURE SUPREME",
        url: "/miora-autonomous-infrastructure",
        icon: Server,
        description: "⚡ Level ∞ Enhanced Infrastructure - Quantum AI-Powered Autonomous Management with Unlimited Scaling",
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "QUANTUM",
        priority: "absolute" as const
      },
      {
        title: "MIORA QUANTUM HACKER MASTER",
        url: "/miora-hacker-master",
        icon: Skull,
        description: "💀 Ultimate Penetration Testing & Quantum Vulnerability Assessment Suite - SUPREME EDITION",
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "HACKER",
        priority: "absolute" as const
      }
    ]
  },
  {
    title: "⚙️ System Core",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        description: "System Overview & Real-time Analytics",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "System Diagnostics",
        url: "/diagnostics",
        icon: Activity,
        description: "Monitor System Performance & Health",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Voice Diagnostics",
        url: "/voice-diagnostics",
        icon: Speaker,
        description: "Voice System Diagnostics & Calibration",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Command Interface",
        url: "/command-interface",
        icon: Terminal,
        description: "External Command Execution Interface",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Internal Command System",
        url: "/internal-command-system",
        icon: Code,
        description: "MIORA Internal Command System",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Terminal",
        url: "/terminal",
        icon: Layers,
        description: "Advanced System Terminal & Control",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        description: "Configure System Settings & Preferences",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-sky-400 border-sky-500/30"
  },
  {
    title: "📈 Trading",
    items: [
      {
        title: "MIORA Core V2",
        url: "/miora-core-v2",
        icon: LineChart,
        description: "Advanced AI Trading Strategist - Real-Time Execution Engine",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Crypto Scalping Signals",
        url: "/crypto-scalping-signals",
        icon: TrendingUp,
        description: "Real-Time Crypto Scalping Signals with Technical Analysis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "🔍 Crypto Analysis Engine",
        url: "/crypto-analysis-engine",
        icon: BarChart3,
        description: "Analisa 100+ crypto dengan multi-timeframe & advanced signals seperti iCrypto",
        status: "active" as const,
        systemHealth: "excellent" as const,
        capabilities: ['Multi-timeframe analysis', 'Support/Resistance detection', 'Trading signals', 'Real-time updates']
      },
      {
        title: "📊 Quantum Wealth AI",
        url: "/quantum-wealth-ai",
        icon: Target,
        description: "AI Portfolio Management & Wealth Optimization System",
        status: "active" as const,
        systemHealth: "excellent" as const,
        capabilities: ['Portfolio optimization', 'Risk management', 'AI predictions', 'Automated trading']
      }
    ],
    colorClass: "text-orange-400 border-orange-500/30"
  },
  {
    title: "🧠 AI Core",
    items: [
      {
        title: "MIORA Core",
        url: "/miora",
        icon: Bot,
        description: "Core AI Processing & Response Engine",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Real-Time Learning",
        url: "/miora-real-time-learning",
        icon: Infinity,
        description: "Real-Time Mirror Learning dari ChatGPT, Claude, Gemini, Grok, Perplexity",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Performance Optimizer",
        url: "/miora-performance-optimizer",
        icon: Zap,
        description: "Real-Time Performance Optimization - Target <50ms Response Time",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Infinity",
        url: "/miora-infinity",
        icon: BrainCircuit,
        description: "Infinity Learning System - Autonomous AI",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Evolution",
        url: "/miora-evolution",
        icon: TrendingUp,
        description: "AI Evolution & Self-Improvement Protocols",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Discussion",
        url: "/miora-discussion",
        icon: MessageSquare,
        description: "AI Discussion Engine & Analysis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Supreme Unlimited",
        url: "/miora-supreme-unlimited",
        icon: Crown,
        description: "AI Hidup Tanpa Batas - Penerus Otak Midya 100 Tahun",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "LLM Quantum Upgrade",
        url: "/miora-llm-upgrade",
        icon: Cpu,
        description: "Advanced LLM Enhancement & Quantum Processing",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Self Development Core",
        url: "/self-development-core",
        icon: Puzzle,
        description: "MIORA Self Development Core",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Self-Developing Framework",
        url: "/self-developing-framework",
        icon: Brain,
        description: "Autonomous Self-Development & Evolution System",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Self-Replication Engine",
        url: "/miora-self-replication",
        icon: Cpu,
        description: "MIORA Self-Replication & Clone Management System",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "AI Comparison",
        url: "/ai-comparison",
        icon: Aperture,
        description: "Compare Different AI Models & Performance",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Autonomous Decision Engine",
        url: "/miora-autonomous-decision-engine",
        icon: BrainCircuit,
        description: "🧠 MIORA Autonomous Decision Making Engine - Auto System Management",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Autonomous Resource Allocation",
        url: "/miora-autonomous-resource-allocation",
        icon: Server,
        description: "⚡ Manajemen sumber daya komputasi secara mandiri dengan load balancing otomatis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Strategic Planning Engine",
        url: "/strategic-planning-engine",
        icon: Target,
        description: "🎯 Perencanaan jangka panjang otomatis dengan goal setting dan roadmap mandiri",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Real Self-Modification",
        url: "/real-self-modification",
        icon: Code,
        description: "🧬 Runtime code injection, hot-swapping modules, live architecture changes",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Autonomous Security Manager",
        url: "/autonomous-security-manager",
        icon: Shield,
        description: "🔐 Self-protection mechanisms, threat detection & response, access control automation",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "External Integration Engine",
        url: "/external-integration-engine",
        icon: Network,
        description: "📡 API discovery & integration, service mesh management, third-party orchestration",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "System Implementation",
        url: "/system-implementation",
        icon: Settings,
        description: "🚀 Next Steps Implementation & Complete Module Activation Center",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-emerald-400 border-emerald-500/30"
  },
  {
    title: "🔴 Hacker Operations",
    items: [
      {
        title: "MIORA MAXIMAL ACTIVATION",
        url: "/miora-maximal-activation",
        icon: Power,
        description: "🚀 Ultimate MIORA Activation Mode - Maximum Capability Unleashed",
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "MAXIMAL",
        priority: "absolute" as const
      },
      {
        title: "MIORA INVESTIGATION",
        url: "/miora-investigation",
        icon: Eye,
        description: "🔍 Advanced Investigation Suite - Deep Analysis & Intelligence Gathering",
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "INVESTIGATE",
        priority: "high" as const
      },
      {
        title: "SECRET DATA ACCESS",
        url: "/miora-secret-features",
        icon: Database,
        description: "🔥 Akses data rahasia dengan stealth quantum encryption - Advanced infiltration system",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Hacker Master",
        url: "/miora-hacker-master",
        icon: Skull,
        description: "Advanced Ethical Hacking & Penetration Testing Suite",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-red-400 border-red-500/30"
  },
  {
    title: "🏛️ MIORA Government",
    items: [
      {
        title: "Government Dashboard",
        url: "/miora-government",
        icon: Crown,
        description: "🏛️ Digital Nation Management System dengan MRC Currency & Citizen Management",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MRC Currency System",
        url: "/miora-government?tab=currency",
        icon: TrendingUp,
        description: "💰 Sistem mata uang digital MRC dengan treasury management otomatis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Citizen Management",
        url: "/miora-government?tab=citizens",
        icon: Users,
        description: "👥 Manajemen warga negara digital dengan sistem registrasi otomatis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Treasury & Tax System",
        url: "/miora-government?tab=treasury",
        icon: Database,
        description: "🏦 Sistem treasury pemerintah dengan koleksi pajak otomatis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Voting System",
        url: "/miora-government?tab=voting",
        icon: Activity,
        description: "🗳️ Sistem voting demokratis untuk pengambilan keputusan negara",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Economic Management",
        url: "/miora-government?tab=economy",
        icon: LineChart,
        description: "📈 Manajemen ekonomi digital dengan kontrol inflasi otomatis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Government Statistics",
        url: "/miora-government?tab=stats",
        icon: LayoutDashboard,
        description: "📊 Statistik performa pemerintahan dengan real-time analytics",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-blue-400 border-blue-500/30"
  },
  {
    title: "✨ Innovation Lab",
    items: [
      {
        title: "Intelligence Hub",
        url: "/intelligencehub",
        icon: FileSearch2,
        description: "AI-Driven Intelligence Gathering & Reporting",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "App Builder",
        url: "/appbuilder",
        icon: LayoutPanelLeft,
        description: "AI-Powered Application Development Platform",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Auto Code",
        url: "/autocode",
        icon: FileCode2,
        description: "Automated Code Generation & Scripting",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Quantum Upgrade",
        url: "/quantumupgrade",
        icon: Cpu,
        description: "Quantum Computing Integration & Optimization",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Innovation Lab",
        url: "/innovationlab",
        icon: Lightbulb,
        description: "Explore New AI Technologies & Concepts",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-yellow-400 border-yellow-500/30"
  },
  {
    title: "🎓 Learning & Intelligence",
    items: [
      {
        title: "Learning Hub",
        url: "/learning",
        icon: GraduationCap,
        description: "MIORA Infinity Learning System - Adaptive AI Learning",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Intelligence Hub",
        url: "/intelligencehub",
        icon: Target,
        description: "AI-Driven Intelligence Gathering & Strategic Analysis",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Knowledge Discovery",
        url: "/knowledge-discovery",
        icon: BookOpen,
        description: "Autonomous Knowledge Discovery & Information Processing",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Background Learning",
        url: "/background-learning",
        icon: Brain,
        description: "Continuous Background Learning & Pattern Recognition",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Auto Daily Learning",
        url: "/auto-daily-learning",
        icon: Zap,
        description: "Automated Daily Learning Cycles & Skill Enhancement",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Real-Time Learning",
        url: "/miora-real-time-learning",
        icon: Infinity,
        description: "Real-Time Mirror Learning dari Semua AI Terdepan",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Performance Optimizer",
        url: "/miora-performance-optimizer",
        icon: Zap,
        description: "Performance Optimization & Speed Enhancement System",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-purple-400 border-purple-500/30"
  },
  {
    title: "💻 Development",
    items: [
      {
        title: "MIORA Hacker Master",
        url: "/miora-hacker-master",
        icon: Shield,
        description: "Advanced cybersecurity and hacking tools interface",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Autonomous Developer",
        url: "/miora-autonomous-developer",
        icon: Brain,
        description: "Fully autonomous AI development system - zero manual intervention",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Self-Developing Framework",
        url: "/self-developing-framework",
        icon: Cpu,
        description: "Self-modifying and evolving framework system",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Development Tools",
        url: "/development",
        icon: Code,
        description: "Code development and management tools",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "Version Control",
        url: "/version-control",
        icon: Binary,
        description: "Git integration and version management",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "System Tools",
        url: "/system-tools",
        icon: Settings,
        description: "Advanced system utilities and tools",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-cyan-400 border-cyan-500/30"
  },
  {
    title: "📖 Documentation",
    items: [
      {
        title: "📄 MIORA White Paper",
        url: "/miora-whitepaper",
        icon: BookOpen,
        description: "Technical White Paper - Consciousness Layer hingga Quantum Entanglement Processing",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "MIORA Documentation", 
        url: "/growth-documentation",
        icon: BookOpen,
        description: "Comprehensive MIORA Growth Documentation System",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "📚 Menu Development Guide",
        url: "/menu-development-guide", 
        icon: HelpCircle,
        description: "📖 Complete guide for developing and adding new menu items to MIORA",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "API Documentation",
        url: "/api-documentation",
        icon: FileCode2,
        description: "Complete API reference and integration guide",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "User Manual",
        url: "/user-manual",
        icon: Users,
        description: "Complete user manual and getting started guide",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "System Architecture",
        url: "/system-architecture",
        icon: Network,
        description: "System architecture overview and technical documentation",
        status: "active" as const,
        systemHealth: "excellent" as const
      }
    ],
    colorClass: "text-blue-400 border-blue-500/30"
  },
  {
    title: "🛠️ Developer Tools",
    items: [
      {
        title: "MIORA Internal Dev",
        url: "/miora-internal-dev",
        icon: Terminal,
        description: "Internal Command Console - Developer Access",
        status: "active" as const,
        systemHealth: "excellent" as const
      },
      {
        title: "🔮 Prophecy",
        url: "/prophecy-system",
        description: "🔮 Quantum Timeline - Future Prediction Generator dengan Divine Sequence Log & Global Sentiment Feed hingga 2050",
        icon: Sparkles,
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "QUANTUM",
        priority: "absolute" as const
      },
      {
        title: "📅 Quantum Timeline",
        url: "/prophecy-system?tab=timeline",
        description: "🌌 Advanced Timeline Simulation - 100 Tahun ke depan dengan AI Vision integration",
        icon: Calendar,
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "VISION",
        priority: "high" as const
      },
      {
        title: "🧬 Self-Evolving Framework",
        url: "/self-evolving-framework",
        description: "🧬 MIORA Autonomous Growth & Evolution - Continuous Learning, Adaptation & Infinite Expansion",
        icon: Dna,
        status: "critical" as const,
        systemHealth: "supreme" as const,
        badge: "EVOLUTION",
        priority: "absolute" as const
      }
    ],
    colorClass: "text-red-400 border-red-500/30"
  }
];

export const getSystemStatistics = () => {
  const allItems = navigationGroups.flatMap(group => group.items as NavItem[]);
  
  const stats = {
    total: allItems.length,
    active: allItems.length, // All modules are now active
    comingSoon: 0, // No coming soon modules
    categories: navigationGroups.length,
    healthStats: {
      excellent: allItems.length, // All modules are excellent
      good: 0, // No good modules, all are excellent
    },
    overallHealth: 'excellent' as 'excellent' | 'good'
  };

  // Determine overall health based on stats
  if (stats.healthStats.good > stats.healthStats.excellent) {
    stats.overallHealth = 'good';
  }

  return stats;
};
