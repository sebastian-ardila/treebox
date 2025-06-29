import styled, { css } from 'styled-components';

export type ButtonSize = 'small' | 'medium' | 'large';

const sizeStyles = {
  small: css`
    width: 32px;
    height: 32px;
  `,
  medium: css`
    width: 40px;
    height: 40px;
  `,
  large: css`
    width: 48px;
    height: 48px;
  `,
};

export const StyledButton = styled.button<{
  size: ButtonSize;
  isActive: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  background-color: ${({ isActive }) =>
    isActive ? '#e7f3ff' : 'transparent'};
  color: ${({ isActive }) => (isActive ? '#007bff' : '#333')};
  transition: background-color 0.2s ease, color 0.2s ease;

  ${({ size }) => sizeStyles[size]}

  &:hover {
    background-color: #f0f0f0;
  }

  .icon {
    color: ${({ isActive }) => (isActive ? '#007bff' : '#555')};
  }
`; 