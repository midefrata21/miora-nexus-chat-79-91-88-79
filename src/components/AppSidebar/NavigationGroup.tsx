
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavItem } from './types';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

interface NavigationGroupProps {
  title: string;
  items: NavItem[];
  colorClass: string;
  collapsed: boolean;
}

const NavigationGroup: React.FC<NavigationGroupProps> = ({ title, items, colorClass, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;
  
  const [isOpen, setIsOpen] = useState(true);
  const hasActiveItem = items.some(item => currentPath === item.url);

  React.useEffect(() => {
    if (hasActiveItem) {
      setIsOpen(true);
    }
  }, [hasActiveItem]);

  const isActive = (path: string) => currentPath === path;
  
  const getNavClassName = (path: string, status: string) => {
    const isCurrentActive = isActive(path);
    const isDisabled = status === 'coming-soon';
    
    if (isDisabled) {
      return "w-full justify-start transition-all duration-300 text-slate-400 cursor-not-allowed opacity-60 hover:opacity-75 rounded-lg px-3 py-2.5";
    }
    
    return isCurrentActive 
      ? "w-full justify-start transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-purple-500/15 text-blue-300 border border-blue-500/40 rounded-lg shadow-lg backdrop-blur-sm px-3 py-2.5 transform scale-[1.02]"
      : "w-full justify-start transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border hover:border-slate-500/40 rounded-lg hover:shadow-md hover:transform hover:scale-[1.01] px-3 py-2.5";
  };

  const getStatusBadge = (status: string) => {
    if (collapsed) return null;
    
    switch (status) {
      case 'beta':
        return (
          <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs px-2 py-0.5 rounded-full font-medium animate-pulse">
            Beta
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border border-slate-500/30 text-xs px-2 py-0.5 rounded-full font-medium">
            Soon
          </Badge>
        );
      case 'active':
        return (
          <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 text-xs px-2 py-0.5 rounded-full font-medium">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
            Active
          </Badge>
        );
      default:
        return null;
    }
  };

  const getHealthIndicator = (health?: string) => {
    if (collapsed || !health) return null;
    
    switch (health) {
      case 'excellent':
        return <CheckCircle className="w-3 h-3 text-green-400 ml-auto flex-shrink-0" />;
      case 'good':
        return <CheckCircle className="w-3 h-3 text-blue-400 ml-auto flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-3 h-3 text-yellow-400 ml-auto flex-shrink-0" />;
      case 'critical':
        return <AlertCircle className="w-3 h-3 text-red-400 ml-auto flex-shrink-0 animate-pulse" />;
      default:
        return null;
    }
  };

  const handleNavClick = (path: string, status: string, title: string) => {
    if (status === 'coming-soon') {
      toast({
        title: `${title} Coming Soon`,
        description: "This feature is currently under development",
        duration: 3000,
      });
      return;
    }
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const activeItemsCount = items.filter(item => item.status === 'active').length;

  return (
    <SidebarGroup className="py-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <SidebarGroupLabel className={`${colorClass} text-sm font-bold uppercase tracking-wider mb-3 mx-1 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-800/70 to-slate-700/50 border border-slate-600/40 flex items-center justify-between backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] group`}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold group-hover:text-white transition-colors">
                {title}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-current/40 bg-slate-900/60 px-2 py-1 font-medium">
                {activeItemsCount}/{items.length}
              </Badge>
              {isOpen ? (
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform duration-200" />
              )}
            </div>
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={`${getNavClassName(item.url, item.status)} min-h-[48px] group`}
                    onClick={() => handleNavClick(item.url, item.status, item.title)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                          isActive(item.url) 
                            ? 'bg-blue-500/30 border border-blue-400/50 shadow-md' 
                            : 'bg-slate-700/70 border border-slate-600/40 group-hover:bg-slate-600/70'
                        }`}>
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                        </div>
                      </div>
                      
                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm truncate leading-tight group-hover:text-white transition-colors">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                            {getHealthIndicator(item.systemHealth)}
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 truncate leading-tight opacity-90 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
};

export default NavigationGroup;
