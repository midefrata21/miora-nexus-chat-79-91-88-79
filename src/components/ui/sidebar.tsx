import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarContextType {
  isOpen: boolean;
  collapsed: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ 
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsedWidth?: number;
}> = ({ children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, collapsed, toggle, open, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
};

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    collapsible?: string;
    side?: 'left' | 'right';
  }
>(({ children, className, collapsible, side = 'left', ...props }, ref) => {
  const { isOpen } = useSidebar();
  
  return (
    <div
      ref={ref}
      className={cn(
        'sidebar h-full transition-all duration-300 ease-in-out relative',
        side === 'right' ? 'order-last' : 'order-first',
        !isOpen && 'w-0 overflow-hidden md:w-16',
        isOpen && 'w-80',
        className
      )}
      {...props}
    >
      <div className="h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sidebar-content h-full', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContent.displayName = 'SidebarContent';

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sidebar-header', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarHeader.displayName = 'SidebarHeader';

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sidebar-footer', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarFooter.displayName = 'SidebarFooter';

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ children, className, open, onOpenChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sidebar-group', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarGroup.displayName = 'SidebarGroup';

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sidebar-group-content', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarGroupContent.displayName = 'SidebarGroupContent';

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sidebar-group-label', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn('sidebar-menu', className)}
      {...props}
    >
      {children}
    </ul>
  );
});

SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ children, className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn('sidebar-menu-item', className)}
      {...props}
    >
      {children}
    </li>
  );
});

SidebarMenuItem.displayName = 'SidebarMenuItem';

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    tooltip?: string;
  }
>(({ children, className, asChild, tooltip, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn('sidebar-menu-button', className, (children as any).props.className),
      ...props
    });
  }

  return (
    <button
      ref={ref}
      className={cn('sidebar-menu-button', className)}
      title={tooltip}
      {...props}
    >
      {children}
    </button>
  );
});

SidebarMenuButton.displayName = 'SidebarMenuButton';

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  const { toggle } = useSidebar();
  
  return (
    <button
      ref={ref}
      onClick={toggle}
      className={cn('sidebar-trigger p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors', className)}
      {...props}
    >
      {children || (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  );
});

SidebarTrigger.displayName = 'SidebarTrigger';
