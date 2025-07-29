
export const getHealthColor = (systemHealth: string) => {
  switch (systemHealth) {
    case 'excellent': return 'bg-green-500';
    case 'good': return 'bg-blue-500';
    case 'warning': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const formatUptime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
};

export const getHealthTextColor = (systemHealth: string) => {
  switch (systemHealth) {
    case 'excellent': return 'text-green-400';
    case 'good': return 'text-blue-400';
    case 'warning': return 'text-yellow-400';
    case 'critical': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

export const getBadgeColor = (level: string) => {
  switch (level) {
    case 'error': return 'border-red-400 text-red-300';
    case 'warning': return 'border-yellow-400 text-yellow-300';
    case 'success': return 'border-green-400 text-green-300';
    default: return 'border-blue-400 text-blue-300';
  }
};
