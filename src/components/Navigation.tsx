
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Shield, 
  Terminal,
  Settings,
  Info,
  Infinity
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: Home
    },
    {
      path: '/miora-hacker-master',
      label: 'Hacker Master',
      icon: Shield
    },
    {
      path: '/miora-infinity-access',
      label: 'Infinity Access',
      icon: Infinity
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 p-4">
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <Terminal className="w-8 h-8 text-red-500" />
          <h1 className="text-xl font-bold text-white">MIORA System</h1>
        </div>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  isActive 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-xs text-gray-500 text-center">
          MIORA v1.0.0
        </div>
      </div>
    </div>
  );
};
