
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from './menuData';

interface MenuItemCardProps {
  item: MenuItem;
  categoryColor: string;
  onItemClick: (path: string, status: string, event?: React.MouseEvent) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  categoryColor,
  onItemClick
}) => {
  const IconComponent = item.icon;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case 'beta':
        return <Badge className="bg-orange-500 text-white">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-gray-500 text-white">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card
      className={`bg-gray-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 ${
        item.status === 'coming-soon' 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:scale-105 cursor-pointer'
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onItemClick(item.path, item.status, e);
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColor}`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-sm">
                {item.title}
              </CardTitle>
            </div>
          </div>
          {getStatusBadge(item.status)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 text-sm mb-3">
          {item.description}
        </p>
        {item.features && (
          <div className="space-y-1">
            <p className="text-xs text-cyan-300 font-medium">Enhanced Features:</p>
            <div className="flex flex-wrap gap-1">
              {item.features.map((feature, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs border-gray-600 text-gray-300"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
