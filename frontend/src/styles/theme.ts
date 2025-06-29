export const theme = {
  colors: {
    primary: '#1a73e8',
    secondary: '#5f6368',
    background: '#f0f2f5',
    surface: '#ffffff',
    text: {
      primary: '#333333',
      secondary: '#5f6368',
      disabled: '#9aa0a6',
    },
    border: '#dadce0',
    hover: '#f1f3f4',
    active: '#e8f0fe',
    error: '#d93025',
    success: '#1e8e3e',
    warning: '#f9ab00',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '50%',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    popover: 1100,
    tooltip: 1150,
  },
} as const;

export type Theme = typeof theme;