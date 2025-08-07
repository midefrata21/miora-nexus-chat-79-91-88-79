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
  Command,
  TrendingUp
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
    title: "🏠 Dashboard",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "System Status", url: "/system-status", icon: Activity },
      { title: "Quick Actions", url: "/quick-actions", icon: Zap },
    ]
  },
  {
    title: "📊 Trading Systems",
    items: [
      { title: "Crypto Scalping Signals", url: "/crypto-scalping-signals", icon: Target },
      { title: "Crypto Analysis Engine", url: "/crypto-analysis-engine", icon: Activity },
      { title: "Quantum Wealth AI", url: "/quantum-wealth-ai", icon: Star },
      { title: "MIORA Core V2", url: "/miora-core-v2", icon: Layers },
    ]
  },
  {
    title: "🛡️ Hacker Operations",
    items: [
      { title: "MIORA Hacker Master", url: "/miora-hacker-master", icon: Shield },
      { title: "Maximal Activation", url: "/miora-maximal-activation", icon: Power },
      { title: "Investigation Suite", url: "/miora-investigation", icon: Eye },
      { title: "Secret Data Access", url: "/miora-secret-features", icon: Lock },
    ]
  },
  {
    title: "🧠 MIORA Core",
    items: [
      { title: "MIORA Main", url: "/miora", icon: Brain },
      { title: "Enhanced Autonomous Core", url: "/enhanced-autonomous-core", icon: Sparkles },
      { title: "Self-Evolving Framework", url: "/self-evolving-framework", icon: GitBranch },
      { title: "AI Control Center", url: "/ai-control-center", icon: Cpu },
      { title: "Memory Intelligence", url: "/memory-intelligence", icon: Database },
    ]
  },
  {
    title: "⚡ Quantum Infrastructure",
    items: [
      { title: "Quantum Infrastructure", url: "/quantum-infrastructure", icon: Layers },
      { title: "Performance Analytics", url: "/performance-analytics", icon: Activity },
      { title: "System Monitoring", url: "/system-monitoring", icon: Gauge },
      { title: "Auto Scaling", url: "/auto-scaling", icon: Network },
    ]
  },
  {
    title: "🔮 Development Tools",
    items: [
      { title: "Prophecy System", url: "/prophecy-system", icon: Eye },
      { title: "API Testing", url: "/api-testing", icon: Code },
      { title: "Debug Console", url: "/debug-console", icon: Terminal },
      { title: "Performance Metrics", url: "/performance-metrics", icon: Gauge },
    ]
  },
  {
    title: "🌌 Infinity Systems",
    items: [
      { title: "Infinity System", url: "/miora-infinity-system", icon: Infinity },
      { title: "Autonomous Operations", url: "/miora-autonomous-operations", icon: Bot },
      { title: "Evolution Tracker", url: "/miora-evolution-tracker", icon: TrendingUp },
      { title: "Supreme Unlimited", url: "/miora-supreme-unlimited", icon: Crown },
    ]
  }
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    // Auto-open all main groups by default for better visibility
    return [
      "🏠 Dashboard", 
      "📊 Trading Systems", 
      "🛡️ Hacker Operations", 
      "🧠 MIORA Core"
    ]
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
      className={`${collapsed ? "w-16" : "w-80"} transition-all duration-300 border-r border-border/50 bg-background`}
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