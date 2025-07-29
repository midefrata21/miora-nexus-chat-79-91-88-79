
import { useState, useEffect } from 'react';
import { GrowthTimeline, GrowthEntry } from '@/types/growth';

export const useGrowthStorage = () => {
  const [growthHistory, setGrowthHistory] = useState<GrowthTimeline[]>([]);
  const [todaysGrowth, setTodaysGrowth] = useState<GrowthEntry[]>([]);
  const [totalGrowthPoints, setTotalGrowthPoints] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load existing data only once
  useEffect(() => {
    try {
      const savedGrowth = localStorage.getItem('miora_growth_documentation');
      const savedToday = localStorage.getItem('miora_today_growth');
      const savedPoints = localStorage.getItem('miora_growth_points');

      if (savedGrowth) setGrowthHistory(JSON.parse(savedGrowth));
      if (savedToday) setTodaysGrowth(JSON.parse(savedToday));
      if (savedPoints) setTotalGrowthPoints(parseInt(savedPoints));
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading growth data:', error);
      setIsInitialized(true);
    }
  }, []);

  // Auto-save with debouncing
  useEffect(() => {
    if (!isInitialized) return;
    
    const saveTimer = setTimeout(() => {
      try {
        localStorage.setItem('miora_growth_documentation', JSON.stringify(growthHistory));
      } catch (error) {
        console.error('Error saving growth history:', error);
      }
    }, 500);

    return () => clearTimeout(saveTimer);
  }, [growthHistory, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    const saveTimer = setTimeout(() => {
      try {
        localStorage.setItem('miora_today_growth', JSON.stringify(todaysGrowth));
      } catch (error) {
        console.error('Error saving today growth:', error);
      }
    }, 500);

    return () => clearTimeout(saveTimer);
  }, [todaysGrowth, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    const saveTimer = setTimeout(() => {
      try {
        localStorage.setItem('miora_growth_points', totalGrowthPoints.toString());
      } catch (error) {
        console.error('Error saving growth points:', error);
      }
    }, 500);

    return () => clearTimeout(saveTimer);
  }, [totalGrowthPoints, isInitialized]);

  return {
    growthHistory,
    setGrowthHistory,
    todaysGrowth,
    setTodaysGrowth,
    totalGrowthPoints,
    setTotalGrowthPoints,
    isInitialized
  };
};
