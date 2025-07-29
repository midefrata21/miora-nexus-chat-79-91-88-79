
import React, { useState } from 'react';
import MenuHeader from './MioraMainMenu/MenuHeader';
import CategorySidebar from './MioraMainMenu/CategorySidebar';
import MainContent from './MioraMainMenu/MainContent';
import QuickStats from './MioraMainMenu/QuickStats';

const MioraMainMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('core');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="max-w-7xl mx-auto">
        <MenuHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <MainContent selectedCategory={selectedCategory} />
          </div>
        </div>

        <QuickStats />
      </div>
    </div>
  );
};

export default MioraMainMenu;
