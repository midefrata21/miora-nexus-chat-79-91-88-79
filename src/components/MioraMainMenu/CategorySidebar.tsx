
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { menuCategories } from './menuData';

interface CategorySidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <Card className="bg-gray-800/50 border-purple-500/30 sticky top-4">
      <CardHeader>
        <CardTitle className="text-cyan-300">Enhanced Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(menuCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "ghost"}
                className={`w-full justify-start ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => onCategorySelect(key)}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.title}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySidebar;
