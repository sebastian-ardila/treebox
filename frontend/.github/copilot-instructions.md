# GitHub Copilot Instructions for TreeBox

## Project Context
TreeBox is a modular React TypeScript application for HTML/CSS configuration and application integrations. It follows strict separation of concerns with custom hooks for business logic, styled-components for styling, and a comprehensive theme system.

## Code Generation Guidelines

### Component Generation
When generating React components:

1. **Structure**: Always create components in their own folder with:
   - `ComponentName.tsx` - Main component file
   - `ComponentName.styles.ts` - Styled components
   - `index.ts` - Export barrel

2. **TypeScript**: Define proper interfaces for all props:
   ```typescript
   export interface ComponentNameProps {
     title: string;
     onAction?: () => void;
     children?: React.ReactNode;
   }
   
   export const ComponentName: React.FC<ComponentNameProps> = ({ title, onAction, children }) => {
     // Component implementation
   };
   ```

3. **Styling**: Use styled-components with theme variables:
   ```typescript
   import styled from 'styled-components';
   
   export const Container = styled.div`
     padding: ${({ theme }) => theme.spacing.md};
     background-color: ${({ theme }) => theme.colors.surface};
     border-radius: ${({ theme }) => theme.borderRadius.md};
   `;
   ```

### Hook Generation
When generating custom hooks:

1. **Naming**: Always start with "use" prefix
2. **Logic**: Extract all business logic from components
3. **Return**: Use descriptive object properties
4. **Types**: Proper TypeScript interfaces for parameters and returns

```typescript
export const useFeatureName = (initialValue?: string) => {
  const [state, setState] = useState(initialValue || '');
  
  const updateValue = useCallback((newValue: string) => {
    setState(newValue);
  }, []);
  
  return {
    value: state,
    updateValue,
    isValid: state.length > 0,
  };
};
```

## Styling Rules

### Theme Usage
- **Never** use hardcoded values
- **Always** use theme variables: `${({ theme }) => theme.colors.primary}`
- **Responsive**: Use consistent breakpoints
- **Accessibility**: Ensure proper contrast and focus states

### Available Theme Variables
```typescript
theme.colors.primary        // #1a73e8
theme.colors.surface        // #ffffff
theme.colors.background     // #f0f2f5
theme.spacing.sm           // 8px
theme.spacing.md           // 16px
theme.spacing.lg           // 24px
theme.borderRadius.md      // 8px
theme.shadows.sm           // Light shadow
theme.transitions.fast     // 150ms ease-in-out
```

## Data Management

### Static Data
Place in `src/data/` directory with proper TypeScript interfaces:

```typescript
export interface DataItem {
  id: string;
  name: string;
  description: string;
}

export const DATA_ITEMS: DataItem[] = [
  { id: '1', name: 'Item 1', description: 'Description' }
];
```

### Business Logic
Always extract to custom hooks, never in components:

```typescript
// ❌ Wrong - logic in component
const Component = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... complex logic
};

// ✅ Correct - logic in hook
const useData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... complex logic
  return { data, loading, refetch };
};
```

## Import Patterns

### Correct Import Order
```typescript
// 1. React
import React from 'react';

// 2. External libraries
import styled from 'styled-components';
import { Icon } from 'lucide-react';

// 3. Internal hooks
import { useCustomHook } from '../../hooks/useCustomHook';

// 4. Internal components
import { Component } from '../Component';

// 5. Types (type-only imports)
import type { CustomType } from './types';
```

### Barrel Exports
Always create index.ts files for clean imports:

```typescript
// src/components/MyComponent/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

## Accessibility Guidelines

### Required Attributes
- Use semantic HTML elements
- Add proper ARIA labels
- Implement keyboard navigation
- Ensure focus management

```typescript
<Button
  onClick={handleClick}
  aria-label="Close dialog"
  tabIndex={0}
  role="button"
>
  Close
</Button>
```

## Performance Considerations

### React Optimization
- Use `React.memo` for expensive components
- Implement proper dependency arrays
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations

```typescript
const Component = React.memo(({ items, onSelect }: Props) => {
  const handleSelect = useCallback((id: string) => {
    onSelect(id);
  }, [onSelect]);
  
  const filteredItems = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);
  
  return (
    // Component JSX
  );
});
```

## Error Handling

### Component Error Boundaries
```typescript
const ComponentWithErrorHandling = () => {
  const { data, error, loading } = useData();
  
  if (error) {
    return <ErrorMessage>Failed to load data</ErrorMessage>;
  }
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return <DataDisplay data={data} />;
};
```

## Testing Considerations (Future)

When tests are added, generate:
- Component behavior tests
- Hook logic tests
- Accessibility tests
- Integration tests

## Code Quality

### ESLint Rules Adherence
- No unused variables
- Proper TypeScript types
- Consistent formatting
- Meaningful names

### File Size Limits
- Components: < 200 lines
- Hooks: < 150 lines
- Utility functions: < 100 lines

## Anti-Patterns to Avoid

### Don't Generate
- Components with hardcoded styles
- Business logic inside components
- Default exports
- `any` types
- Inline CSS or className usage
- Large, monolithic components
- Direct DOM manipulation

### Always Generate
- Proper TypeScript interfaces
- Styled-components with theme usage
- Named exports
- Accessible markup
- Responsive design patterns
- Error handling
- Loading states
- Proper import organization

## Context Awareness

### Existing Patterns
Follow these established patterns in the codebase:
- Theme-based styling system
- Custom hooks for all business logic
- Modular component architecture
- Type-safe data structures
- Accessible design patterns

### Integration Points
When adding new features, consider:
- Navigation integration (useNavigation hook)
- Theme consistency
- Data layer integration
- Existing component patterns
- Accessibility requirements

Generate code that seamlessly integrates with the existing TreeBox architecture and maintains the high standards of modularity, type safety, and accessibility.