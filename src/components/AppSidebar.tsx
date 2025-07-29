
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import SidebarHeaderComponent from './AppSidebar/SidebarHeader';
import SidebarFooterComponent from './AppSidebar/SidebarFooter';
import NavigationGroup from './AppSidebar/NavigationGroup';
import QuickActions from './AppSidebar/QuickActions';
import { navigationGroups } from './AppSidebar/navigationData';
import { useAutonomousMenuGenerator } from './AppSidebar/AutonomousMenuGenerator';

export function AppSidebar() {
  const { autonomousMenus } = useAutonomousMenuGenerator();
  
  return (
    <Sidebar 
      side="left"
      className="border-r border-slate-700/40 bg-gradient-to-b from-slate-950/98 to-slate-900/95 backdrop-blur-xl w-80 shadow-2xl"
    >
      <SidebarHeader className="border-b border-slate-700/30 p-4">
        <SidebarHeaderComponent collapsed={false} />
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-4">
            {/* Interactive Navigation Groups with Collapsible Design */}
            <div className="space-y-3">
              {navigationGroups.map((group) => (
                <NavigationGroup
                  key={group.title}
                  title={group.title}
                  items={group.items}
                  colorClass={group.colorClass}
                  collapsed={false}
                />
              ))}
              
              {/* Autonomous Generated Menus */}
              {autonomousMenus.map((menu) => (
                <NavigationGroup
                  key={menu.id}
                  title={`🤖 ${menu.title}`}
                  items={menu.items}
                  colorClass={menu.colorClass}
                  collapsed={false}
                />
              ))}
            </div>

            {/* Enhanced Quick Actions Section */}
            <div className="pt-6 mt-6 border-t border-slate-700/30">
              <QuickActions collapsed={false} />
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-700/30 p-4">
        <SidebarFooterComponent collapsed={false} />
      </SidebarFooter>
    </Sidebar>
  );
}
