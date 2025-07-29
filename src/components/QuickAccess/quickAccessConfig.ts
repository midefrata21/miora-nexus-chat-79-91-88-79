
import { Settings, Trash2, Infinity, Zap, BarChart3, Brain } from "lucide-react";

export const createQuickAccessButtons = (
  infinityCoreState: any,
  handlers: {
    handleInfinityCore: () => void;
    handleSystemStatus: () => void;
    handleAutonomousAI: () => void;
    handleAnalytics: () => void;
    handleLearningHub: () => void;
    handleClearChat: () => void;
  },
  isKeyholderAuthorized: boolean
) => [
  {
    label: infinityCoreState?.isBoostActive ? 'Core Aktif' : 'Infinity Core',
    icon: Infinity,
    onClick: handlers.handleInfinityCore,
    disabled: !isKeyholderAuthorized,
    className: `${
      infinityCoreState?.isBoostActive 
        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse' 
        : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700'
    } text-white shadow-lg hover:shadow-xl transition-all duration-300`,
    iconClass: infinityCoreState?.isBoostActive ? 'animate-spin' : ''
  },
  {
    label: 'Status Sistem',
    icon: Settings,
    onClick: handlers.handleSystemStatus,
    disabled: false,
    className: 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
    iconClass: ''
  },
  {
    label: 'AI Otonom',
    icon: Zap,
    onClick: handlers.handleAutonomousAI,
    disabled: false,
    className: 'bg-gradient-to-r from-green-600 via-teal-600 to-lime-600 hover:from-green-700 hover:via-teal-700 hover:to-lime-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
    iconClass: ''
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    onClick: handlers.handleAnalytics,
    disabled: false,
    className: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
    iconClass: ''
  },
  {
    label: 'Learning Hub',
    icon: Brain,
    onClick: handlers.handleLearningHub,
    disabled: false,
    className: 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
    iconClass: ''
  },
  {
    label: 'Hapus Chat',
    icon: Trash2,
    onClick: handlers.handleClearChat,
    disabled: false,
    className: 'bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
    iconClass: ''
  }
];
