
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuCategories } from './menuData';
import MenuItemCard from './MenuItemCard';

interface MainContentProps {
  selectedCategory: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const handleMenuClick = (path: string, status: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (status === 'coming-soon') {
      return; // Don't navigate for coming soon items
    }
    
    console.log('MainContent: Navigating to:', path);
    navigate(path);
  };

  if (!selectedCategory || !menuCategories[selectedCategory]) {
    return null;
  }

  const category = menuCategories[selectedCategory];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {category.title}
        </h2>
        <p className="text-gray-300">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {category.items.map((item, index) => (
          <MenuItemCard
            key={index}
            item={item}
            categoryColor={category.color}
            onItemClick={handleMenuClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
