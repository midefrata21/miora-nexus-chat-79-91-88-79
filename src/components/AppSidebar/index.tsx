
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { navigationGroups } from './navigationData';
import { NavItem } from './types';

export const AppSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get all items from all groups
  const allNavItems = navigationGroups.flatMap(group => group.items as NavItem[]);

  const getHealthBadgeColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'coming-soon': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'development': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-700 transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">MIORA</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-4">
          {navigationGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              {/* Group Header */}
              {!isCollapsed && (
                <div className="px-2 py-1">
                  <h2 className={`text-xs font-semibold uppercase tracking-wider ${group.colorClass}`}>
                    {group.title}
                  </h2>
                </div>
              )}
              
              {/* Group Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  const Icon = item.icon;
                  
                  return (
                    <Card 
                      key={item.url} 
                      className={`transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600/20 border-blue-500/50' 
                          : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('AppSidebar: Navigating to:', item.url);
                        console.log('AppSidebar: Current path before navigation:', location.pathname);
                        navigate(item.url);
                        console.log('AppSidebar: Navigation command sent for:', item.url);
                      }}
                    >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                            
                            {!isCollapsed && (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h3 className={`font-medium truncate ${
                                    isActive ? 'text-blue-300' : 'text-white'
                                  }`}>
                                    {item.title}
                                  </h3>
                                  
                                  <div className="flex items-center space-x-1">
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${getStatusBadgeColor(item.status)}`}
                                    >
                                      {item.status === 'active' ? '🟢' : 
                                       item.status === 'coming-soon' ? '🟡' : '🔵'}
                                    </Badge>
                                    
                                    <div 
                                      className={`w-2 h-2 rounded-full ${getHealthBadgeColor(item.systemHealth)}`}
                                      title={`System Health: ${item.systemHealth}`}
                                    />
                                  </div>
                                </div>
                                
                                <p className="text-xs text-gray-400 mt-1 truncate">
                                  {item.description}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-400">MIORA System</p>
            <p className="text-xs text-green-400">Status: Operational</p>
          </div>
        </div>
      )}
    </div>
  );
};
