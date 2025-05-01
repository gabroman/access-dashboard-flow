
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { UserRound, ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarMenu } from './ui/sidebar-menu';
import { useAuth } from '@/context/AuthContext';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <span className="text-xl font-semibold text-medical-600">HealthCare</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-full p-1 hover:bg-gray-100",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <SidebarMenu collapsed={collapsed} />
      </div>
      <div className={cn("p-4 border-t flex items-center gap-3", collapsed && "justify-center")}>
        <div className="rounded-full bg-medical-200 w-8 h-8 flex items-center justify-center">
          <UserRound size={20} className="text-medical-600" />
        </div>
        {!collapsed && (
          <div className="flex-1 truncate">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}
