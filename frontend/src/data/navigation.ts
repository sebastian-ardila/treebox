import { Home, Box, Settings, Database, Briefcase, type LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  description?: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/',
    description: 'Dashboard and overview',
  },
  {
    id: 'elements',
    label: 'HTML Elements',
    icon: Box,
    path: '/elements',
    description: 'Visual HTML/CSS builder',
  },
  {
    id: 'process',
    label: 'Process',
    icon: Briefcase,
    path: '/process',
    description: 'Process management',
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    path: '/databases',
    description: 'Database connections',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    description: 'Application settings',
  },
];

export const getNavigationItemById = (id: string): NavigationItem | undefined => {
  return navigationItems.find(item => item.id === id);
};

export const getNavigationItemByPath = (path: string): NavigationItem | undefined => {
  return navigationItems.find(item => item.path === path);
};