
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { navigationCategories } from './navigationCategories';
import { isActiveRoute } from './utils';

export const HorizontalCategoryMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 px-4 py-3 shadow-lg">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {navigationCategories.map((category) => {
          const IconComponent = category.icon;
          const active = isActiveRoute(location.pathname, category.path);
          
          return (
            <Button
              key={category.id}
              variant={active ? "default" : "ghost"}
              size="sm"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('HorizontalCategoryMenu: Navigating to:', category.path);
                navigate(category.path);
              }}
              className={`flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
                active 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{category.name}</span>
              {active && (
                <Badge className="bg-white/20 text-white text-xs">
                  Active
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
