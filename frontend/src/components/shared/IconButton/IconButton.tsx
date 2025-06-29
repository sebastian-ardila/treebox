import React from 'react';
import { StyledButton, type ButtonSize } from './IconButton.styles';

interface IconButtonProps {
  /**
   * The icon component to render.
   * Should be a component from a library like lucide-react.
   */
  icon: React.ElementType;
  /**
   * The size of the button.
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * The size of the icon inside the button.
   */
  iconSize?: number;
  /**
   * Whether the button is currently active.
   * @default false
   */
  isActive?: boolean;
  /**
   * Function to call when the button is clicked.
   */
  onClick?: () => void;
  /**
   * Additional class name for styling.
   */
  className?: string;
}

/**
 * A reusable icon button component with different sizes and an active state.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = 'medium',
  iconSize,
  isActive = false,
  onClick,
  className,
}) => {
  const defaultIconSizes: Record<ButtonSize, number> = {
    small: 18,
    medium: 20,
    large: 24,
  };

  return (
    <StyledButton
      size={size}
      isActive={isActive}
      onClick={onClick}
      className={className}
    >
      <Icon className="icon" size={iconSize || defaultIconSizes[size]} />
    </StyledButton>
  );
}; 