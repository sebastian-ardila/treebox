# Component Structure Pattern

This template demonstrates the standard component structure for the TreeBox project.

## Folder Structure

```
ComponentName/
├── ComponentName.tsx          # Component logic
├── ComponentName.styles.ts    # Styled components
├── ComponentName.types.ts     # TypeScript interfaces (if complex)
├── ComponentName.test.tsx     # Component tests (when added)
└── index.ts                   # Export barrel file
```

## Component Guidelines

### 1. Component File (.tsx)

- Use functional components with TypeScript
- Define props interface with `ComponentNameProps` naming
- Use hooks for state and side effects
- Keep business logic in custom hooks
- Export the component as named export

### 2. Styles File (.styles.ts)

- Use styled-components exclusively
- Access theme through props
- Use semantic naming for styled components
- Avoid hardcoded values - use theme variables
- Use transient props ($propName) for styled component props

### 3. Types File (.types.ts) - Optional

- Create when component has complex types
- Export all interfaces and types
- Use for shared types between component and hooks

### 4. Index File (index.ts)

- Export the main component
- Export types if needed
- Keep it simple - just re-exports

## Example Usage

```typescript
// MyComponent/MyComponent.tsx
import React from 'react';
import { Container, Title } from './MyComponent.styles';
import { useMyComponentLogic } from '../../hooks/useMyComponentLogic';

export interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title,
  onAction 
}) => {
  const { data, handleClick } = useMyComponentLogic();

  return (
    <Container>
      <Title>{title}</Title>
      <button onClick={handleClick}>Action</button>
    </Container>
  );
};
```

```typescript
// MyComponent/MyComponent.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
`;
```

```typescript
// MyComponent/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

## Best Practices

1. **Separation of Concerns**: Keep logic in hooks, styling in styled-components, and presentation in components
2. **Theme Usage**: Always use theme variables instead of hardcoded values
3. **TypeScript**: Use proper typing for all props and functions
4. **Naming**: Use clear, descriptive names for components and props
5. **Accessibility**: Include proper ARIA attributes and semantic HTML
6. **Performance**: Use React.memo when appropriate, especially for list items