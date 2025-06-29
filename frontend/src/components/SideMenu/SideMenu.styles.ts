import styled from 'styled-components';

export const MenuContainer = styled.nav`
  position: fixed;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  bottom: ${({ theme }) => theme.spacing.sm};
  width: 60px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  transition: width ${({ theme }) => theme.transitions.normal};

  @media (max-width: 768px) {
    width: 50px;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

export const MenuItem = styled.li<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  width: 40px;
  height: 40px;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : theme.colors.text.primary)};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.active : 'transparent')};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : theme.colors.text.secondary)};
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  left: 100%;
  margin-left: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  z-index: ${({ theme }) => theme.zIndex.tooltip};

  ${MenuItem}:hover & {
    opacity: 1;
  }
`;