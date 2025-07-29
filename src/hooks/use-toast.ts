import { useState, useCallback, useEffect } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: React.ReactNode;
}

let toastId = 0;
const listeners: Array<(toasts: Toast[]) => void> = [];
let memoryState: Toast[] = [];

// Enhanced global toast throttling mechanism with smarter deduplication
const toastThrottleMap = new Map<string, number>();
const toastContentMap = new Map<string, number>();
const TOAST_THROTTLE_DURATION = 45000; // 45 seconds - much longer for better user experience
const DUPLICATE_CONTENT_THROTTLE = 60000; // 1 minute for identical content

function createToastKey(title?: string, description?: string): string {
  return `${title || ''}:${description || ''}`;
}

function createContentHash(title?: string, description?: string): string {
  const content = `${title || ''}_${description || ''}`.toLowerCase();
  // Simple hash function for content deduplication
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

function dispatch(toast: Toast) {
  memoryState = [...memoryState, toast];
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function dismiss(id?: string) {
  if (id) {
    memoryState = memoryState.filter((t) => t.id !== id);
  } else {
    memoryState = [];
  }
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export const toast = (props: Omit<Toast, 'id'>) => {
  const now = Date.now();
  
  // Enhanced duplicate detection
  const toastKey = createToastKey(props.title, props.description);
  const contentHash = createContentHash(props.title, props.description);
  
  // Check if exact same content was recently shown
  const lastContentShown = toastContentMap.get(contentHash);
  if (lastContentShown && (now - lastContentShown) < DUPLICATE_CONTENT_THROTTLE) {
    return {
      id: 'content-throttled',
      dismiss: () => {},
    };
  }
  
  // Check if this specific toast was recently shown
  const lastShown = toastThrottleMap.get(toastKey);
  if (lastShown && (now - lastShown) < TOAST_THROTTLE_DURATION) {
    return {
      id: 'throttled',
      dismiss: () => {},
    };
  }
  
  // Update both throttle maps
  toastThrottleMap.set(toastKey, now);
  toastContentMap.set(contentHash, now);
  
  const id = (++toastId).toString();
  const newToast: Toast = {
    ...props,
    id,
  };

  dispatch(newToast);

  if (props.duration !== Infinity) {
    setTimeout(() => dismiss(id), props.duration || 3000); // Optimized duration
  }

  return {
    id,
    dismiss: () => dismiss(id),
  };
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(memoryState);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      const index = listeners.indexOf(setToasts);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts,
    toast,
    addToast: toast, // Compatibility alias
    dismiss: (id?: string) => dismiss(id),
  };
}