
'use client';

import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LucideIcon, 
  Users, 
  UserRound,
  LayoutDashboard, 
  FileText, 
  Calendar,
  Book,
  MessageSquare,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'doctor', 'receptionist', 'patient'],
  },
  {
    title: 'Manage Users',
    href: '/dashboard/admin/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Reports',
    href: '/dashboard/admin/reports',
    icon: FileText,
    roles: ['admin'],
  },
  {
    title: 'My Appointments',
    href: '/dashboard/doctor/appointments',
    icon: Calendar,
    roles: ['doctor'],
  },
  {
    title: 'Patient Records',
    href: '/dashboard/doctor/patient-records',
    icon: Book,
    roles: ['doctor'],
  },
  {
    title: 'Schedule Appointments',
    href: '/dashboard/receptionist/schedule',
    icon: Calendar,
    roles: ['receptionist'],
  },
  {
    title: 'My Medical History',
    href: '/dashboard/patient/medical-history',
    icon: FileText,
    roles: ['patient'],
  },
  {
    title: 'Message Doctor',
    href: '/dashboard/patient/messages',
    icon: MessageSquare,
    roles: ['patient'],
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['admin', 'doctor', 'receptionist', 'patient'],
  },
];

interface SidebarMenuProps {
  collapsed?: boolean;
}

export function SidebarMenu({ collapsed = false }: SidebarMenuProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = useCallback(
    (href: string) => {
      if (href === '/dashboard') {
        return pathname === `/dashboard/${user?.role}`;
      }
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname, user]
  );

  if (!user) {
    return null;
  }

  const filteredMenu = menuItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="flex flex-col space-y-1">
      {filteredMenu.map((item) => (
        <Link
          key={item.href}
          to={item.title === 'Dashboard' ? `/dashboard/${user.role}` : item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-medical-100 hover:text-medical-900",
            isActive(item.href) ? "bg-medical-100 text-medical-900" : "text-muted-foreground"
          )}
        >
          <item.icon className={cn("h-4 w-4", collapsed ? "mx-auto" : "")} />
          {!collapsed && <span>{item.title}</span>}
        </Link>
      ))}
      <button
        onClick={logout}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
          collapsed ? "justify-center" : ""
        )}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
}
