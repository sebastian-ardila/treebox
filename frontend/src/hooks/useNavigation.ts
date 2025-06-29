import { useState, useCallback, useEffect } from 'react';
import { navigationItems, getNavigationItemById, type NavigationItem } from '../data/navigation';

interface UseNavigationProps {
  defaultActiveId?: string;
  onNavigate?: (item: NavigationItem) => void;
}

export const useNavigation = ({ 
  defaultActiveId = 'home', 
  onNavigate 
}: UseNavigationProps = {}) => {
  const [activeItemId, setActiveItemId] = useState(defaultActiveId);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const navigate = useCallback((itemId: string) => {
    const item = getNavigationItemById(itemId);
    if (item) {
      setActiveItemId(itemId);
      onNavigate?.(item);
    }
  }, [onNavigate]);

  const isActive = useCallback((itemId: string) => {
    return activeItemId === itemId;
  }, [activeItemId]);

  const isHovered = useCallback((itemId: string) => {
    return hoveredItemId === itemId;
  }, [hoveredItemId]);

  const activeItem = getNavigationItemById(activeItemId);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const currentIndex = navigationItems.findIndex(item => item.id === activeItemId);
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        navigate(navigationItems[currentIndex - 1].id);
      } else if (e.key === 'ArrowDown' && currentIndex < navigationItems.length - 1) {
        navigate(navigationItems[currentIndex + 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeItemId, navigate]);

  return {
    items: navigationItems,
    activeItemId,
    activeItem,
    hoveredItemId,
    navigate,
    isActive,
    isHovered,
    setHoveredItemId,
  };
};