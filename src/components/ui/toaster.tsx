
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

export const Toaster: React.FC = () => {
  const { toasts, dismiss } = useToast();

  if (!toasts) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-xs opacity-75">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative p-2 rounded shadow border text-xs ${
            toast.variant === 'destructive'
              ? 'bg-red-600 border-red-500 text-white'
              : 'bg-gray-800 border-gray-700 text-white'
          }`}
        >
          <button
            onClick={() => dismiss()}
            className="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded"
          >
            <X className="h-4 w-4" />
          </button>
          
          {toast.title && (
            <div className="font-semibold mb-1">{toast.title}</div>
          )}
          
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
          
          {toast.action && (
            <div className="mt-2">{toast.action}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export { useToast, toast } from '@/hooks/use-toast';
