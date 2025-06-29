import React from 'react';
import { MenuContainer, MenuList, MenuItem, Tooltip } from './SideMenu.styles';
import { useNavigation } from '../../hooks/useNavigation';

interface SideMenuProps {
  onNavigate?: (path: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ onNavigate }) => {
  const { 
    items, 
    hoveredItemId,
    navigate, 
    isActive,
    setHoveredItemId 
  } = useNavigation({
    defaultActiveId: 'home',
    onNavigate: (item) => onNavigate?.(item.path),
  });

  return (
    <MenuContainer>
      <MenuList>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <MenuItem
              key={item.id}
              $isActive={isActive(item.id)}
              onClick={() => navigate(item.id)}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              role="button"
              tabIndex={0}
              aria-label={item.label}
              aria-current={isActive(item.id) ? 'page' : undefined}
            >
              <Icon size={20} />
              {hoveredItemId === item.id && (
                <Tooltip>{item.label}</Tooltip>
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </MenuContainer>
  );
};