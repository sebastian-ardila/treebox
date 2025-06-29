# TreeBox Rules and Standards Summary

## Overview
This document provides a comprehensive summary of all rules, standards, and guidelines implemented for the TreeBox project after the modularization and refactoring process.

## 🏗️ Architecture Rules

### Modular Structure
```
src/
├── components/          # UI components only
├── layouts/            # Layout components
├── pages/              # Page-level components
├── hooks/              # Business logic and state management
├── data/               # Static data and configurations
├── styles/             # Global styles and theme
├── services/           # External API services
├── types/              # Global TypeScript definitions
├── utils/              # Pure utility functions
└── templates/          # Component templates and patterns
```

### Component Structure Pattern
**REQUIRED** for every component:
```
ComponentName/
├── index.ts                 # Export barrel (required)
├── ComponentName.tsx        # Component logic (required)
├── ComponentName.styles.ts  # Styled components (required)
└── ComponentName.types.ts   # Complex types (optional)
```

## 📋 Code Quality Rules

### ESLint Configuration
Enforced through automated linting:

```javascript
// Naming conventions
'@typescript-eslint/naming-convention': [
  'error',
  {
    selector: 'interface',
    format: ['PascalCase'],
    custom: { regex: '^I[A-Z]', match: false } // No "I" prefix
  },
  {
    selector: 'function',
    filter: { regex: '^use[A-Z]', match: true },
    format: ['camelCase'] // Hooks must be camelCase
  }
],

// TypeScript strict rules
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/no-unused-vars': 'error',

// React rules
'react-hooks/exhaustive-deps': 'error',

// Code quality
'no-console': 'warn',
'prefer-const': 'error',
'no-var': 'error',
'no-duplicate-imports': 'error',

// Architectural rules
'no-restricted-imports': [
  'error',
  {
    patterns: [
      {
        group: ['../../../*'],
        message: 'Avoid deep relative imports. Use absolute imports or barrel exports.'
      }
    ]
  }
]
```

## 🎨 Styling Rules

### Styled Components Requirements
**MANDATORY** patterns:

```typescript
// ✅ Correct - Use theme variables
export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

// ✅ Correct - Use transient props for styling logic
export const Card = styled.div<{ $isActive: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.active : theme.colors.surface};
`;

// ❌ FORBIDDEN - Hardcoded values
export const BadButton = styled.button`
  padding: 8px 16px;
  background-color: #1a73e8;
  border-radius: 4px;
`;
```

### Theme System
**REQUIRED** usage:
- Colors: `theme.colors.primary`, `theme.colors.text.secondary`
- Spacing: `theme.spacing.sm`, `theme.spacing.md`, `theme.spacing.lg`
- Border Radius: `theme.borderRadius.sm`, `theme.borderRadius.md`
- Shadows: `theme.shadows.sm`, `theme.shadows.md`
- Transitions: `theme.transitions.fast`, `theme.transitions.normal`
- Z-Index: `theme.zIndex.dropdown`, `theme.zIndex.modal`

## 📝 TypeScript Rules

### Strict Configuration
**ENFORCED** TypeScript settings:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "verbatimModuleSyntax": true
}
```

### Interface Patterns
**REQUIRED** naming and structure:

```typescript
// ✅ Correct - Component props interface
export interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  className?: string;
}

// ✅ Correct - Hook return interface
interface UseUserManagementReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (userData: Omit<User, 'id'>) => Promise<User>;
  removeUser: (userId: string) => void;
}

// ❌ FORBIDDEN - Hungarian notation
interface IUserProps { }  // Don't use "I" prefix
```

### Import Patterns
**REQUIRED** organization:

```typescript
// 1. React imports
import React, { useState, useCallback } from 'react';

// 2. External libraries
import styled from 'styled-components';
import { Icon } from 'lucide-react';

// 3. Internal hooks
import { useCustomHook } from '../../hooks/useCustomHook';

// 4. Internal components
import { Component } from '../Component';

// 5. Types (inline type imports preferred)
import { type CustomType } from './types';
```

## 🎯 Component Development Rules

### React Component Pattern
**MANDATORY** structure:

```typescript
// ✅ Correct component structure
export interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const Component: React.FC<ComponentProps> = ({ 
  title, 
  onAction 
}) => {
  // Use hooks for ALL business logic
  const { data, handleClick } = useComponentLogic();
  
  // Only presentation logic here
  return (
    <Container>
      <Title>{title}</Title>
      <Button onClick={handleClick}>Action</Button>
    </Container>
  );
};

// ❌ FORBIDDEN - Business logic in component
export const BadComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Complex business logic here (WRONG!)
  const complexLogic = () => {
    // This should be in a hook
  };
};
```

### Custom Hooks Pattern
**REQUIRED** structure:

```typescript
export const useFeature = (options: FeatureOptions = {}) => {
  // State management
  const [state, setState] = useState(initialState);
  
  // Business logic with proper dependencies
  const handleAction = useCallback((action: Action) => {
    // Complex business logic here
  }, [dependency1, dependency2]);
  
  // Return clean, descriptive interface
  return {
    // State
    data: state.data,
    loading: state.loading,
    error: state.error,
    
    // Actions
    actions: {
      handleAction,
      reset: () => setState(initialState),
    },
    
    // Computed values
    computed: {
      isValid: state.data.length > 0,
      hasError: !!state.error,
    },
  };
};
```

## ♿ Accessibility Rules

### REQUIRED Accessibility Patterns

```typescript
// ✅ Correct - Proper ARIA attributes
<Button
  onClick={handleClick}
  aria-label="Close dialog"
  aria-pressed={isPressed}
  role="button"
  tabIndex={0}
>
  Close
</Button>

// ✅ Correct - Semantic HTML
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="menuitem">
      <a href="/home">Home</a>
    </li>
  </ul>
</nav>

// ✅ Correct - Form accessibility
<div>
  <label htmlFor={inputId}>Search</label>
  <input
    id={inputId}
    type="search"
    aria-describedby={`${inputId}-description`}
  />
  <div id={`${inputId}-description`}>
    Type to search through items
  </div>
</div>
```

## 📊 Performance Rules

### React Optimization
**REQUIRED** patterns:

```typescript
// ✅ Use React.memo for expensive components
export const ExpensiveComponent = React.memo<Props>(({ data, onSelect }) => {
  const handleSelect = useCallback((item: Item) => {
    onSelect(item);
  }, [onSelect]);

  const sortedData = useMemo(() => {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return (
    <Container>
      {sortedData.map(item => (
        <Item key={item.id} item={item} onSelect={handleSelect} />
      ))}
    </Container>
  );
});

ExpensiveComponent.displayName = 'ExpensiveComponent';
```

## 🚫 Anti-Patterns (FORBIDDEN)

### What NOT to do:

```typescript
// ❌ FORBIDDEN - Hardcoded styles
const BadComponent = styled.div`
  color: #1a73e8;
  padding: 8px;
  margin: 16px;
`;

// ❌ FORBIDDEN - Business logic in components
const BadComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Complex API logic here (should be in hook)
    fetchUsers().then(setUsers);
  }, []);
};

// ❌ FORBIDDEN - Default exports
export default Component;

// ❌ FORBIDDEN - Hungarian notation
interface IComponentProps { }

// ❌ FORBIDDEN - Any types
const badFunction = (data: any) => { };

// ❌ FORBIDDEN - Deep relative imports
import { Component } from '../../../components/Component';

// ❌ FORBIDDEN - Missing dependency arrays
useEffect(() => {
  doSomething(prop);
}, []); // Missing 'prop' in dependencies

// ❌ FORBIDDEN - Inline styles
<div style={{ color: 'red' }}>Content</div>

// ❌ FORBIDDEN - CSS classes
<div className="button-primary">Button</div>
```

## ✅ Mandatory Checklist

Before any code submission, ensure:

### Structure ✅
- [ ] Component follows folder structure pattern
- [ ] Proper naming conventions used
- [ ] Index.ts barrel exports created
- [ ] No deep relative imports (max 2 levels)

### TypeScript ✅
- [ ] All props have proper interfaces
- [ ] No `any` types used
- [ ] Type-only imports for types
- [ ] Proper generic typing where applicable

### Styling ✅
- [ ] Uses styled-components exclusively
- [ ] No hardcoded values - uses theme variables
- [ ] Responsive design implemented
- [ ] Proper accessibility attributes

### React ✅
- [ ] Functional components with hooks
- [ ] Business logic extracted to custom hooks
- [ ] Proper dependency arrays
- [ ] Performance optimizations where needed

### Code Quality ✅
- [ ] ESLint passes without errors or warnings
- [ ] Meaningful variable and function names
- [ ] Proper error handling implemented
- [ ] No console.log statements

## 🛠️ Enforcement

These rules are enforced through:

1. **ESLint Configuration** - Automated linting on every save
2. **TypeScript Strict Mode** - Compile-time type checking
3. **Code Review Guidelines** - Manual review requirements
4. **Pre-commit Hooks** - Automated checks before commits
5. **CI/CD Pipeline** - Build-time validation
6. **Component Templates** - Standardized starting points

## 📚 Documentation

All rules are documented in:
- [`.cursorrules`](.cursorrules) - Cursor IDE rules
- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) - GitHub Copilot guidance
- [`STYLE_GUIDE.md`](STYLE_GUIDE.md) - Comprehensive style guide
- [`docs/adr/`](docs/adr/) - Architecture Decision Records
- [`CLAUDE.md`](CLAUDE.md) - Claude Code assistant guidance

## 🔄 Continuous Improvement

These rules will be:
- Updated as the project evolves
- Reviewed regularly for effectiveness
- Enhanced based on team feedback
- Adapted to new TypeScript/React features

**Remember**: These rules exist to maintain code quality, consistency, and developer productivity. Follow them consistently to ensure a maintainable and scalable codebase.