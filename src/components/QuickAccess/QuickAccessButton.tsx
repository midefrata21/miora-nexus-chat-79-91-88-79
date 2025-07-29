
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickAccessButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled: boolean;
  className: string;
  iconClass: string;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({
  label,
  icon: Icon,
  onClick,
  disabled,
  className,
  iconClass
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`${className} px-4 py-6 flex-col h-auto transition-all duration-300 hover:scale-105 group active:scale-95 ${
        disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
      }`}
    >
      <Icon className={`w-5 h-5 mb-2 group-hover:scale-110 transition-transform ${iconClass}`} />
      <span className="text-xs font-medium text-center leading-tight">{label}</span>
    </Button>
  );
};

export default QuickAccessButton;
