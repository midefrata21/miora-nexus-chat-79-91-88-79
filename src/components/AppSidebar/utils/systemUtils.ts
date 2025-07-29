
import { NavItem } from '../types';

export const getSystemOverallHealth = (items: NavItem[]): 'excellent' | 'good' | 'warning' | 'critical' => {
  const healthScores = items.map(item => {
    switch (item.systemHealth) {
      case 'excellent': return 4;
      case 'good': return 3;
      case 'warning': return 2;
      case 'critical': return 1;
      default: return 3;
    }
  });
  
  const averageScore = healthScores.reduce((sum, score) => sum + score, 0) / healthScores.length;
  
  if (averageScore >= 3.5) return 'excellent';
  if (averageScore >= 2.5) return 'good';
  if (averageScore >= 1.5) return 'warning';
  return 'critical';
};

export const getInfrastructureStatus = () => {
  const currentTime = new Date();
  const uptime = Math.floor((currentTime.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    status: 'operational',
    uptime: `${uptime} days`,
    lastUpdate: currentTime.toISOString(),
    activeServices: 47,
    totalServices: 50,
    cpuUsage: Math.floor(Math.random() * 30) + 15, // 15-45%
    memoryUsage: Math.floor(Math.random() * 25) + 35, // 35-60%
    diskUsage: Math.floor(Math.random() * 20) + 25, // 25-45%
    networkLatency: Math.floor(Math.random() * 10) + 5 // 5-15ms
  };
};

export const getSystemHealthColor = (health: string) => {
  switch (health) {
    case 'excellent': return 'text-green-400';
    case 'good': return 'text-blue-400';
    case 'warning': return 'text-yellow-400';
    case 'critical': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-600/80 text-green-100';
    case 'beta': return 'bg-orange-600/80 text-orange-100';
    case 'coming-soon': return 'bg-slate-600/80 text-slate-300';
    default: return 'bg-gray-600/80 text-gray-300';
  }
};
