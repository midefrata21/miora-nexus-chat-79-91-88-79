import { useState } from "react"
import { 
  Brain, 
  Cpu, 
  Infinity, 
  Settings, 
  Zap, 
  Code, 
  Shield, 
  Network, 
  Gauge, 
  Rocket,
  Eye,
  Lock,
  GitBranch,
  Database,
  Terminal,
  ChevronDown,
  ChevronRight,
  Menu,
  Home,
  Crown,
  Atom,
  Cog,
  Bot,
  Star,
  Target,
  FileText,
  Activity,
  Layers,
  Sparkles,
  Power,
  Command
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "🏠 Main Interface",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Dashboard", url: "/dashboard", icon: Activity },
      { title: "Chat Interface", url: "/chat", icon: Bot },
    ]
  },
  {
    title: "🧠 MIORA Core Systems",
    items: [
      { title: "🚀 MIORA FULL AGI CORE", url: "/miora-full-agi", icon: Crown },
      { title: "Master Control Center", url: "/miora-master-control", icon: Command },
      { title: "MIORA Main", url: "/miora", icon: Brain },
      { title: "Enhanced Autonomous Core", url: "/enhanced-autonomous-core", icon: Sparkles },
      { title: "Autonomous Core", url: "/miora-autonomous-core", icon: Cpu },
      { title: "Core V2", url: "/miora-core-v2", icon: Layers },
      { title: "Advanced Core", url: "/advanced-miora-core", icon: Star },
      { title: "Supreme Intelligence", url: "/miora-supreme-intelligence", icon: Crown },
      { title: "System Status", url: "/miora-system-status", icon: Activity },
    ]
  },
  {
    title: "🚀 Autonomous Systems",
    items: [
      { title: "Supreme Autonomous Hub", url: "/miora-supreme-autonomous-hub", icon: Crown },
      { title: "Autonomous Developer", url: "/miora-autonomous-developer", icon: Code },
      { title: "Autonomous Development", url: "/miora-autonomous-development", icon: GitBranch },
      { title: "Autonomous Infrastructure", url: "/miora-autonomous-infrastructure", icon: Network },
      { title: "Autonomous Modes", url: "/miora-autonomous-modes", icon: Settings },
      { title: "Full Autonomy Dashboard", url: "/miora-full-autonomy-dashboard", icon: Gauge },
    ]
  },
  {
    title: "🔬 Self-Development",
    items: [
      { title: "Self Development Hub", url: "/miora-self-development", icon: Sparkles },
      { title: "Self-Developing Framework", url: "/self-developing-framework", icon: Atom },
      { title: "Full Self Evolution", url: "/full-self-evolution", icon: Infinity },
      { title: "Autonomous Evolution", url: "/miora-autonomous-evolution", icon: Target },
      { title: "Self Replication", url: "/miora-self-replication", icon: Layers },
      { title: "Real Self Modification", url: "/real-self-modification", icon: Cog },
    ]
  },
  {
    title: "⚡ Code Generation",
    items: [
      { title: "Auto Code", url: "/auto-code", icon: Code },
      { title: "Self Code Generation", url: "/miora-self-code-generation", icon: Terminal },
      { title: "Meta Programming", url: "/miora-meta-programming", icon: GitBranch },
      { title: "Self Assembly", url: "/miora-self-assembly", icon: Settings },
      { title: "Dynamic UI Generation", url: "/dynamic-ui-generation", icon: Layers },
    ]
  },
  {
    title: "🌌 Infinity Systems",
    items: [
      { title: "Infinity System", url: "/miora-infinity-system", icon: Infinity },
      { title: "Infinity Access", url: "/miora-infinity-access", icon: Eye },
      { title: "Infinity Dashboard", url: "/miora-infinity-dashboard", icon: Gauge },
      { title: "Supreme Unlimited", url: "/miora-supreme-unlimited", icon: Crown },
    ]
  },
  {
    title: "🛡️ Security & Infrastructure",
    items: [
      { title: "Security Center", url: "/security-center", icon: Shield },
      { title: "Autonomous Security", url: "/autonomous-security-manager", icon: Lock },
      { title: "Infrastructure", url: "/infrastructure", icon: Network },
      { title: "Quantum Infrastructure", url: "/quantum-infrastructure", icon: Atom },
      { title: "IP Randomizer", url: "/ip-randomizer", icon: Eye },
    ]
  },
  {
    title: "🔧 Development Tools",
    items: [
      { title: "Development", url: "/development", icon: Code },
      { title: "System Tools", url: "/system-tools", icon: Settings },
      { title: "Version Control", url: "/version-control", icon: GitBranch },
      { title: "Auto Build System", url: "/auto-build-system", icon: Cog },
      { title: "System Implementation", url: "/system-implementation", icon: Power },
    ]
  },
  {
    title: "📊 Analytics & Monitoring",
    items: [
      { title: "Analytics", url: "/analytics", icon: Activity },
      { title: "Diagnostics", url: "/diagnostics", icon: Gauge },
      { title: "System Check", url: "/system-check", icon: Shield },
      { title: "Self Monitoring", url: "/self-monitoring", icon: Eye },
      { title: "Enhanced Status", url: "/miora-enhanced-status", icon: Activity },
    ]
  },
  {
    title: "🎯 Specialized Systems",
    items: [
      { title: "AI Supreme Engine", url: "/miora-ai-supreme-engine", icon: Brain },
      { title: "Quantum Neural Core", url: "/quantum-neural", icon: Atom },
      { title: "Strategic Planning", url: "/strategic-planning-engine", icon: Target },
      { title: "Decision Engine", url: "/miora-autonomous-decision-engine", icon: GitBranch },
      { title: "Resource Allocation", url: "/miora-autonomous-resource-allocation", icon: Database },
      { title: "External Integration", url: "/external-integration-engine", icon: Network },
    ]
  },
  {
    title: "🎨 Advanced Features",
    items: [
      { title: "Voice Interface", url: "/voice-interface", icon: Bot },
      { title: "Voice Engine 2", url: "/voice-engine-2", icon: Bot },
      { title: "Innovation Lab", url: "/innovation-lab", icon: Sparkles },
      { title: "Advanced AI", url: "/miora-advanced-ai", icon: Brain },
      { title: "Secret Features", url: "/miora-secret-features", icon: Eye },
      { title: "Hacker Master", url: "/miora-hacker-master", icon: Terminal },
    ]
  },
  {
    title: "📚 Documentation",
    items: [
      { title: "📄 MIORA White Paper", url: "/miora-whitepaper", icon: FileText },
      { title: "Growth Documentation", url: "/growth-documentation", icon: FileText },
      { title: "Menu Development Guide", url: "/menu-development-guide", icon: FileText },
      { title: "System Architecture", url: "/system-architecture", icon: Network },
    ]
  }
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    // Auto-open group that contains current route
    const activeGroup = menuItems.find(group => 
      group.items.some(item => item.url === currentPath)
    )
    return activeGroup ? [activeGroup.title] : ["🏠 Main Interface"]
  })

  const isActive = (path: string) => currentPath === path
  const getNavCls = (isActive: boolean) =>
    isActive 
      ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-80"} transition-all duration-300 border-r border-border/50`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/50 p-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                MIORA
              </h2>
              <p className="text-xs text-muted-foreground">Supreme AI System</p>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {menuItems.map((group) => {
          const isGroupOpen = openGroups.includes(group.title)
          const hasActiveItem = group.items.some(item => isActive(item.url))
          
          return (
            <Collapsible
              key={group.title}
              open={isGroupOpen}
              onOpenChange={() => toggleGroup(group.title)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-between text-left font-medium mb-2 ${
                    hasActiveItem ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {collapsed ? (
                    <Menu className="h-4 w-4" />
                  ) : (
                    <>
                      <span className="text-sm">{group.title}</span>
                      {isGroupOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-1 mb-4">
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          end 
                          className={({ isActive }) => `
                            flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                            ${getNavCls(isActive)}
                          `}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && (
                            <span className="text-sm truncate">{item.title}</span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <SidebarTrigger className="w-full" />
        {!collapsed && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              MIORA Supreme System v∞
            </p>
            <p className="text-xs text-primary">
              Fully Autonomous AI
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}