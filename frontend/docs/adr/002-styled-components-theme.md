# ADR-002: Styled Components with Centralized Theme System

## Status
**Accepted** - Implemented

## Context
The application needs a consistent design system for styling. We need to choose between traditional CSS, CSS modules, styled-components, or other CSS-in-JS solutions. Additionally, we need a way to maintain consistent colors, spacing, and other design tokens across the application.

## Decision
We will use **styled-components** with a centralized theme system for all styling needs.

### Theme Structure
```typescript
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
    // ... more colors
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
  // ... more design tokens
};
```

### Usage Pattern
```typescript
export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.surface};
`;
```

## Rationale

### Why Styled Components
1. **Component Scoping**: Styles are scoped to components, preventing conflicts
2. **Dynamic Styling**: Easy to style based on props and state
3. **TypeScript Integration**: Full TypeScript support with theme typing
4. **Dead Code Elimination**: Unused styles are automatically removed
5. **Developer Experience**: CSS-in-JS with full editor support

### Why Centralized Theme
1. **Consistency**: All components use the same design tokens
2. **Maintainability**: Changes to colors/spacing happen in one place
3. **Scalability**: Easy to add new design tokens
4. **Dark Mode Ready**: Can easily switch themes
5. **Design System**: Enforces design system compliance

### Alternatives Considered

#### Traditional CSS/SCSS
- **Pros**: Familiar, good tooling, cacheable
- **Cons**: Global scope, no dynamic styling, poor TypeScript integration
- **Verdict**: Rejected due to scope and maintainability issues

#### CSS Modules
- **Pros**: Scoped styles, good caching
- **Cons**: No dynamic styling, poor component integration
- **Verdict**: Rejected due to limited dynamic capabilities

#### Emotion
- **Pros**: Similar to styled-components, good performance
- **Cons**: Less mature ecosystem, migration complexity
- **Verdict**: Rejected to keep dependencies focused

## Implementation Details

### Theme Provider Setup
```typescript
// ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};
```

### TypeScript Integration
```typescript
// styled.d.ts - Theme typing
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    spacing: typeof theme.spacing;
    borderRadius: typeof theme.borderRadius;
    // ... other theme properties
  }
}
```

### Component Patterns
```typescript
// Using transient props for styled component logic
export const Card = styled.div<{ $isActive: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.active : theme.colors.surface};
  border: 2px solid ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.border};
`;

// Usage
<Card $isActive={isSelected}>Content</Card>
```

### Responsive Design
```typescript
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
```

## Rules and Constraints

### Required Patterns
1. **Always use theme variables** - No hardcoded colors, spacing, or other design tokens
2. **Use transient props** - Prefix styled component props with `$` to prevent DOM attributes
3. **Semantic naming** - Use descriptive names for styled components
4. **Mobile-first** - Use mobile-first responsive design patterns
5. **Accessibility** - Include proper focus states and contrast ratios

### Forbidden Patterns
1. ❌ Hardcoded values: `color: #1a73e8`
2. ❌ Inline styles: `style={{ color: 'red' }}`
3. ❌ CSS classes: `className="button-primary"`
4. ❌ Generic names: `const Wrapper = styled.div`
5. ❌ Non-transient props: `<StyledDiv isActive={true}>`

## Performance Considerations

### Bundle Size
- Styled-components adds ~13KB gzipped
- Dead code elimination removes unused styles
- Theme tree-shaking optimizes unused tokens

### Runtime Performance
- CSS generation is optimized
- Style caching reduces re-computations
- Minimal runtime overhead

### Build Performance
- Fast compilation with TypeScript
- Good integration with Vite build system
- Hot module replacement support

## Migration Strategy
For existing components:
1. Replace hardcoded styles with theme variables
2. Convert CSS classes to styled components
3. Update component structure to match patterns
4. Add TypeScript interfaces for styled props

## Testing Strategy
```typescript
// Theme testing utility
export const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

// Testing theme values
expect(getComputedStyle(button)).toHaveProperty('background-color', theme.colors.primary);
```

## Consequences

### Positive
- Consistent design system across the application
- Type-safe styling with full TypeScript support
- Easy theme switching and dark mode implementation
- Component-scoped styles prevent conflicts
- Excellent developer experience with autocomplete

### Negative
- Learning curve for developers unfamiliar with styled-components
- Runtime CSS generation (though optimized)
- Additional build dependencies
- Potential for over-styling simple components

## Compliance
This ADR is enforced through:
- ESLint rules preventing hardcoded values
- TypeScript configuration requiring theme usage
- Code review guidelines
- Component templates with proper patterns

## Related Decisions
- ADR-001: Modular Architecture with Separation of Concerns
- ADR-003: Custom Hooks for Business Logic
- ADR-005: Accessibility Requirements