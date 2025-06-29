# TreeBox Style Guide

## Overview
This style guide defines the coding standards, patterns, and conventions for the TreeBox project. Following these guidelines ensures consistency, maintainability, and scalability across the codebase.

## Table of Contents
1. [File Organization](#file-organization)
2. [Naming Conventions](#naming-conventions)
3. [TypeScript Guidelines](#typescript-guidelines)
4. [React Component Patterns](#react-component-patterns)
5. [Styled Components](#styled-components)
6. [Custom Hooks](#custom-hooks)
7. [Data Management](#data-management)
8. [Import/Export Patterns](#importexport-patterns)
9. [Accessibility](#accessibility)
10. [Performance](#performance)

## File Organization

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── ComponentName/
│   │   ├── index.ts                 # Export barrel
│   │   ├── ComponentName.tsx        # Component logic
│   │   ├── ComponentName.styles.ts  # Styled components
│   │   └── ComponentName.types.ts   # Types (optional)
│   └── shared/         # Shared components
├── layouts/            # Layout components
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── data/               # Static data and configurations
├── styles/             # Global styles and theme
├── services/           # API services
├── types/              # Global type definitions
├── utils/              # Utility functions
└── templates/          # Component templates
```

### Component File Structure
Every component must follow this exact structure:

```typescript
// index.ts - Export barrel
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';

// ComponentName.tsx - Main component
import React from 'react';
import { Container, Title } from './ComponentName.styles';

export interface ComponentNameProps {
  title: string;
  onAction?: () => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onAction
}) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

// ComponentName.styles.ts - Styled components
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

## Naming Conventions

### Files and Folders
- **Components**: PascalCase (`SideMenu`, `MainLayout`)
- **Hooks**: camelCase with "use" prefix (`useNavigation`, `useApplications`)
- **Utilities**: camelCase (`formatDate`, `validateEmail`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS`, `DEFAULT_CONFIG`)

### Variables and Functions
```typescript
// ✅ Good
const userName = 'john';
const isLoading = false;
const handleClick = () => {};
const getUserData = async () => {};

// ❌ Bad
const user_name = 'john';
const loading = false;
const clickHandler = () => {};
const get_user_data = async () => {};
```

### TypeScript Interfaces and Types
```typescript
// ✅ Good - No "I" prefix
interface UserProps {
  name: string;
  email: string;
}

type NavigationItem = {
  id: string;
  label: string;
};

// ❌ Bad - Hungarian notation
interface IUserProps {
  name: string;
  email: string;
}
```

### Styled Components
```typescript
// ✅ Good - PascalCase, semantic names
export const Container = styled.div``;
export const NavigationList = styled.ul``;
export const ActionButton = styled.button``;

// ❌ Bad - Generic or unclear names
export const Div = styled.div``;
export const StyledButton = styled.button``;
export const Wrapper = styled.div``;
```

## TypeScript Guidelines

### Interface Definitions
```typescript
// ✅ Good - Descriptive, optional properties clearly marked
export interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  isEditable?: boolean;
}

// ❌ Bad - Unclear types, missing optionals
export interface Props {
  user: any;
  onEdit: Function;
  editable: boolean;
}
```

### Function Typing
```typescript
// ✅ Good - Explicit parameter and return types
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

const handleUserAction = useCallback(
  (action: 'edit' | 'delete', userId: string): void => {
    if (action === 'edit') {
      onEdit?.(userId);
    } else {
      onDelete?.(userId);
    }
  },
  [onEdit, onDelete]
);

// ❌ Bad - Implicit types
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

### Generic Types
```typescript
// ✅ Good - Meaningful generic constraints
interface DataResponse<T extends Record<string, unknown>> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// Hook with proper generic typing
const useApiData = <T extends Record<string, unknown>>(
  endpoint: string
): { data: T | null; loading: boolean; error: string | null } => {
  // Implementation
};
```

## React Component Patterns

### Component Structure
```typescript
// ✅ Good - Clean, focused component
export interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
  isSelected?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onSelect,
  isSelected = false
}) => {
  const handleClick = useCallback(() => {
    onSelect?.(user);
  }, [onSelect, user]);

  return (
    <Container $isSelected={isSelected} onClick={handleClick}>
      <Avatar src={user.avatar} alt={`${user.name} avatar`} />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </UserInfo>
    </Container>
  );
};
```

### Conditional Rendering
```typescript
// ✅ Good - Clear conditional logic
const UserList: React.FC<UserListProps> = ({ users, loading, error }) => {
  if (error) {
    return <ErrorMessage>Failed to load users: {error}</ErrorMessage>;
  }

  if (loading) {
    return <LoadingSpinner aria-label="Loading users" />;
  }

  if (users.length === 0) {
    return <EmptyState>No users found</EmptyState>;
  }

  return (
    <UserContainer>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </UserContainer>
  );
};

// ❌ Bad - Nested ternary operators
const UserList = ({ users, loading, error }) => (
  error ? <div>Error</div> : loading ? <div>Loading</div> : users.length === 0 ? <div>Empty</div> : <div>{users.map(...)}</div>
);
```

## Styled Components

### Theme Usage
```typescript
// ✅ Good - Use theme variables
export const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  background-color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.surface : theme.colors.text.primary};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// ❌ Bad - Hardcoded values
export const Button = styled.button`
  padding: 8px 16px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
`;
```

### Responsive Design
```typescript
// ✅ Good - Mobile-first responsive design
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;
```

### Transient Props
```typescript
// ✅ Good - Use transient props ($prop) for styled component logic
export const Card = styled.div<{ $isActive: boolean; $size: 'small' | 'large' }>`
  padding: ${({ $size, theme }) => 
    $size === 'small' ? theme.spacing.sm : theme.spacing.lg};
  
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.active : theme.colors.surface};
  
  border: 2px solid ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.border};
`;

// Usage
<Card $isActive={isSelected} $size="large">Content</Card>
```

## Custom Hooks

### Hook Structure
```typescript
// ✅ Good - Well-structured hook with proper typing
export interface UseUserManagementOptions {
  initialUsers?: User[];
  onUserUpdate?: (user: User) => void;
}

export const useUserManagement = (options: UseUserManagementOptions = {}) => {
  const { initialUsers = [], onUserUpdate } = options;
  
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addUser = useCallback(async (userData: Omit<User, 'id'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser: User = {
        ...userData,
        id: generateId(),
      };
      
      setUsers(prev => [...prev, newUser]);
      onUserUpdate?.(newUser);
      
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onUserUpdate]);

  const removeUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  const updateUser = useCallback((userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
  }, []);

  const getUserById = useCallback((userId: string) => {
    return users.find(user => user.id === userId) || null;
  }, [users]);

  return {
    users,
    loading,
    error,
    addUser,
    removeUser,
    updateUser,
    getUserById,
    userCount: users.length,
  };
};
```

### Hook Dependencies
```typescript
// ✅ Good - Proper dependency arrays
const useFilteredData = <T>(data: T[], filterFn: (item: T) => boolean) => {
  const filteredData = useMemo(() => {
    return data.filter(filterFn);
  }, [data, filterFn]); // Include all dependencies

  const count = useMemo(() => {
    return filteredData.length;
  }, [filteredData]);

  return { filteredData, count };
};

// ❌ Bad - Missing dependencies
const useFilteredData = <T>(data: T[], filterFn: (item: T) => boolean) => {
  const filteredData = useMemo(() => {
    return data.filter(filterFn);
  }, [data]); // Missing filterFn dependency
};
```

## Data Management

### Static Data Structure
```typescript
// ✅ Good - Well-typed data with helper functions
export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  description?: string;
  isEnabled?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/',
    description: 'Dashboard overview',
    isEnabled: true,
  },
  // ... more items
];

// Helper functions
export const getNavigationItemById = (id: string): NavigationItem | undefined => {
  return navigationItems.find(item => item.id === id);
};

export const getEnabledNavigationItems = (): NavigationItem[] => {
  return navigationItems.filter(item => item.isEnabled !== false);
};
```

### Constants and Enums
```typescript
// ✅ Good - Descriptive enums and constants
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export const API_ENDPOINTS = {
  USERS: '/api/users',
  APPLICATIONS: '/api/applications',
  SETTINGS: '/api/settings',
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
```

## Import/Export Patterns

### Import Organization
```typescript
// ✅ Good - Organized imports
// 1. React and React-related
import React, { useState, useCallback, useMemo } from 'react';

// 2. External libraries
import styled from 'styled-components';
import { Search, User, Settings } from 'lucide-react';

// 3. Internal hooks (relative imports for same level, absolute for others)
import { useUserManagement } from '../../hooks/useUserManagement';
import { useNavigation } from '../../hooks/useNavigation';

// 4. Internal components
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';

// 5. Data and utilities
import { navigationItems } from '../../data/navigation';
import { formatDate } from '../../utils/dateUtils';

// 6. Types (type-only imports)
import type { User } from '../../types/user';
import type { NavigationItem } from '../../data/navigation';
```

### Export Patterns
```typescript
// ✅ Good - Named exports with barrel files

// Component file
export const UserProfile: React.FC<UserProfileProps> = () => {};
export type { UserProfileProps };

// Index file (barrel export)
export { UserProfile } from './UserProfile';
export type { UserProfileProps } from './UserProfile';

// ❌ Bad - Default exports
export default UserProfile;
```

## Accessibility

### Semantic HTML and ARIA
```typescript
// ✅ Good - Proper accessibility attributes
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  isLoading = false
}) => {
  const inputId = useId();
  
  return (
    <SearchContainer>
      <Label htmlFor={inputId}>Search</Label>
      <InputWrapper>
        <Input
          id={inputId}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby={`${inputId}-description`}
          aria-busy={isLoading}
        />
        <SearchIcon aria-hidden="true" />
      </InputWrapper>
      <Description id={`${inputId}-description`}>
        Type to search through available items
      </Description>
    </SearchContainer>
  );
};
```

### Keyboard Navigation
```typescript
// ✅ Good - Proper keyboard navigation
export const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        // Handle selection
        break;
    }
  }, [items.length]);

  return (
    <MenuContainer
      role="menu"
      onKeyDown={handleKeyDown}
      aria-label="Main navigation"
    >
      {items.map((item, index) => (
        <MenuItem
          key={item.id}
          role="menuitem"
          tabIndex={index === focusedIndex ? 0 : -1}
          aria-current={index === focusedIndex ? 'true' : 'false'}
        >
          {item.label}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};
```

## Performance

### React Optimization
```typescript
// ✅ Good - Optimized component with memoization
export const UserList = React.memo<UserListProps>(({ users, onUserSelect }) => {
  const handleUserSelect = useCallback((user: User) => {
    onUserSelect(user);
  }, [onUserSelect]);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  return (
    <Container>
      {sortedUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onSelect={handleUserSelect}
        />
      ))}
    </Container>
  );
});

UserList.displayName = 'UserList';
```

### Bundle Optimization
```typescript
// ✅ Good - Lazy loading for large components
const LazyUserManagement = React.lazy(() => 
  import('./UserManagement').then(module => ({
    default: module.UserManagement
  }))
);

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <LazyUserManagement />
</Suspense>
```

## Error Handling

### Component Error Boundaries
```typescript
// ✅ Good - Comprehensive error handling
export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { user, error, loading, refetch } = useUser(userId);

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>
          Failed to load user profile: {error.message}
        </ErrorMessage>
        <RetryButton onClick={refetch}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner aria-label="Loading user profile" />
      </LoadingContainer>
    );
  }

  if (!user) {
    return (
      <EmptyContainer>
        <EmptyMessage>User not found</EmptyMessage>
      </EmptyContainer>
    );
  }

  return (
    <ProfileContainer>
      {/* User profile content */}
    </ProfileContainer>
  );
};
```

## Code Quality Checklist

Before submitting code, ensure:

### ✅ Structure
- [ ] Component follows the established folder structure
- [ ] Proper file naming conventions
- [ ] Index.ts barrel exports created
- [ ] No deep relative imports (max 2 levels)

### ✅ TypeScript
- [ ] All props have proper interfaces
- [ ] No `any` types used
- [ ] Proper generic typing where applicable
- [ ] Type-only imports for types

### ✅ Styling
- [ ] Uses styled-components exclusively
- [ ] No hardcoded values - uses theme variables
- [ ] Responsive design implemented
- [ ] Proper accessibility attributes

### ✅ React
- [ ] Functional components with hooks
- [ ] Proper dependency arrays
- [ ] Performance optimizations where needed
- [ ] Error handling implemented

### ✅ Code Quality
- [ ] ESLint passes without errors
- [ ] Meaningful variable and function names
- [ ] Proper commenting for complex logic
- [ ] No console.log statements in production code

This style guide ensures consistency and maintainability across the TreeBox codebase. All team members should familiarize themselves with these patterns and apply them consistently.