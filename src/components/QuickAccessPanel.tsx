
import React from 'react';
import QuickAccessButton from './QuickAccess/QuickAccessButton';
import { useQuickAccessHandlers } from './QuickAccess/useQuickAccessHandlers';
import { createQuickAccessButtons } from './QuickAccess/quickAccessConfig';

interface QuickAccessPanelProps {
  infinityCoreState: any;
  isKeyholderAuthorized: boolean;
  boostStatus: string;
  onInfinityCore: () => Promise<void>;
  onSystemStatus: () => void;
  onAutonomousAI: () => void;
  onClearChat: () => void;
}

const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({
  infinityCoreState,
  isKeyholderAuthorized,
  boostStatus,
  onInfinityCore,
  onSystemStatus,
  onAutonomousAI,
  onClearChat
}) => {
  const handlers = useQuickAccessHandlers({
    infinityCoreState,
    isKeyholderAuthorized,
    onInfinityCore,
    onSystemStatus,
    onAutonomousAI,
    onClearChat
  });

  const quickAccessButtons = createQuickAccessButtons(
    infinityCoreState,
    handlers,
    isKeyholderAuthorized
  );

  return (
    <div className="mt-8 w-full max-w-4xl">
      <h3 className="text-center text-gray-400 text-sm mb-4 font-medium">Panel Kontrol Akses Cepat</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickAccessButtons.map((button, index) => (
          <QuickAccessButton
            key={index}
            label={button.label}
            icon={button.icon}
            onClick={button.onClick}
            disabled={button.disabled}
            className={button.className}
            iconClass={button.iconClass}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessPanel;
