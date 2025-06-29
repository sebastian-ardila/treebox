import { useState, useMemo, useCallback } from 'react';
import { 
  APPLICATIONS_DATA, 
  ApplicationCategory, 
  searchApplications
} from '../data/applications';

export const useApplications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ApplicationCategory | null>(null);
  const [connectedApps, setConnectedApps] = useState<Set<string>>(new Set());

  const filteredApplications = useMemo(() => {
    let apps = APPLICATIONS_DATA;

    if (searchQuery) {
      apps = searchApplications(searchQuery);
    }

    if (selectedCategory) {
      apps = apps.filter(app => app.category === selectedCategory);
    }

    return apps;
  }, [searchQuery, selectedCategory]);

  const applicationsByCategory = useMemo(() => {
    const grouped = {} as Record<ApplicationCategory, typeof APPLICATIONS_DATA>;
    Object.values(ApplicationCategory).forEach(category => {
      grouped[category] = APPLICATIONS_DATA.filter(app => app.category === category);
    });
    return grouped;
  }, []);

  const connectApplication = useCallback((appId: string) => {
    setConnectedApps(prev => new Set(prev).add(appId));
  }, []);

  const disconnectApplication = useCallback((appId: string) => {
    setConnectedApps(prev => {
      const newSet = new Set(prev);
      newSet.delete(appId);
      return newSet;
    });
  }, []);

  const isApplicationConnected = useCallback((appId: string) => {
    return connectedApps.has(appId);
  }, [connectedApps]);

  const categories = useMemo(() => {
    return Object.values(ApplicationCategory);
  }, []);

  return {
    applications: filteredApplications,
    applicationsByCategory,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    connectedApps: Array.from(connectedApps),
    connectApplication,
    disconnectApplication,
    isApplicationConnected,
    categories,
    totalApplications: APPLICATIONS_DATA.length,
    filteredCount: filteredApplications.length,
  };
};