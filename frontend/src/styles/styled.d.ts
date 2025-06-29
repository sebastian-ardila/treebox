import 'styled-components';
import type { theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    spacing: typeof theme.spacing;
    borderRadius: typeof theme.borderRadius;
    shadows: typeof theme.shadows;
    transitions: typeof theme.transitions;
    zIndex: typeof theme.zIndex;
  }
}