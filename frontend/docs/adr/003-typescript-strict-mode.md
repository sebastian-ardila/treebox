# ADR-003: TypeScript Strict Mode Configuration

## Status
**Accepted** - Implemented

## Context
TypeScript can be configured with various levels of type checking strictness. We need to decide on the appropriate level of type safety for the TreeBox project to balance developer productivity with code quality and maintainability.

## Decision
We will use **TypeScript strict mode** with additional strict configuration options enabled.

### Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true
  }
}
```

### Type-First Development
All code must be written with TypeScript-first principles:
- Proper interfaces for all component props
- Type-only imports for type definitions
- Generic types where appropriate
- Avoid `any` type completely

## Rationale

### Benefits of Strict Mode
1. **Early Error Detection**: Catch type errors at compile time
2. **Better IntelliSense**: Enhanced autocomplete and refactoring
3. **Documentation**: Types serve as living documentation
4. **Refactoring Safety**: Confident refactoring with type checking
5. **Team Collaboration**: Clear contracts between components

### Specific Strict Options

#### `noUnusedLocals` & `noUnusedParameters`
Prevents unused variables and parameters, keeping code clean:
```typescript
// ❌ Error: 'unusedVar' is declared but never used
const Component = (props: Props) => {
  const unusedVar = 'test';
  return <div>{props.title}</div>;
};

// ✅ Correct
const Component = (props: Props) => {
  return <div>{props.title}</div>;
};
```

#### `noImplicitReturns`
Ensures all code paths return a value:
```typescript
// ❌ Error: Not all code paths return a value
const getValue = (condition: boolean): string => {
  if (condition) {
    return 'yes';
  }
  // Missing return for else case
};

// ✅ Correct
const getValue = (condition: boolean): string => {
  if (condition) {
    return 'yes';
  }
  return 'no';
};
```

#### `verbatimModuleSyntax`
Enforces explicit type-only imports:
```typescript
// ❌ Error: Must use type-only import
import { User } from './types';

// ✅ Correct
import type { User } from './types';
import { getUser } from './api';
```

## Implementation Patterns

### Component Props
```typescript
// ✅ Strict typing for component props
export interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string; // Optional property clearly marked
  };
  onEdit?: (userId: string) => void; // Optional callback
  onDelete?: (userId: string) => void;
  className?: string; // For styled component integration
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  className
}) => {
  // Implementation with full type safety
};
```

### Hook Return Types
```typescript
// ✅ Explicit return type for hooks
interface UseUserManagementReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (userData: Omit<User, 'id'>) => Promise<User>;
  removeUser: (userId: string) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
}

export const useUserManagement = (): UseUserManagementReturn => {
  // Implementation with guaranteed return type
};
```

### Generic Types
```typescript
// ✅ Proper generic constraints
interface ApiResponse<T extends Record<string, unknown>> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// ✅ Generic hook with constraints
export const useApiData = <T extends Record<string, unknown>>(
  endpoint: string
): {
  data: T | null;
  loading: boolean;
  error: string | null;
} => {
  // Implementation
};
```

### Union Types for Props
```typescript
// ✅ Discriminated unions for variant props
type ButtonProps = 
  | {
      variant: 'primary';
      color?: never; // Exclusive with primary
    }
  | {
      variant: 'custom';
      color: string; // Required with custom
    };

export const Button: React.FC<ButtonProps> = ({ variant, color }) => {
  // TypeScript ensures correct prop combinations
};
```

## Error Handling Patterns

### Async Functions
```typescript
// ✅ Proper error typing
export const fetchUserData = async (userId: string): Promise<User> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data as User; // Explicit type assertion
  } catch (error) {
    // Proper error handling with type narrowing
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    throw new Error('Unknown error occurred');
  }
};
```

### Event Handlers
```typescript
// ✅ Strict event handler typing
interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
};
```

## Development Workflow

### Type-First Development
1. Define interfaces before implementation
2. Use TypeScript compiler to guide development
3. Leverage type inference where appropriate
4. Document complex types with JSDoc

### Code Review Checklist
- [ ] All props have proper interfaces
- [ ] No `any` types used (use `unknown` if needed)
- [ ] Type-only imports for types
- [ ] Proper error handling with type narrowing
- [ ] Generic types have appropriate constraints

## IDE Configuration

### VS Code Settings
```json
{
  "typescript.preferences.strictFunctionTypes": true,
  "typescript.preferences.noImplicitOverride": true,
  "typescript.preferences.useAliasesForRenames": false
}
```

### ESLint Integration
```javascript
// Additional TypeScript ESLint rules
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/no-unused-vars': 'error',
'@typescript-eslint/prefer-nullish-coalescing': 'warn',
'@typescript-eslint/prefer-optional-chain': 'warn',
'@typescript-eslint/naming-convention': [
  'error',
  {
    selector: 'interface',
    format: ['PascalCase'],
    custom: { regex: '^I[A-Z]', match: false }
  }
]
```

## Migration Strategy

### Existing Code
1. Enable strict mode incrementally
2. Fix type errors file by file
3. Add proper interfaces for all components
4. Replace `any` types with proper types

### New Code
All new code must:
- Be written with strict mode compliance
- Include proper TypeScript interfaces
- Use type-only imports appropriately
- Follow established patterns

## Performance Impact

### Compile Time
- Strict mode adds ~10-15% to compilation time
- Type checking catches errors early, reducing runtime debugging
- Better IDE performance with accurate types

### Runtime Impact
- No runtime impact (types are erased)
- Better bundle optimization through dead code elimination
- Enhanced tree-shaking with proper imports

## Consequences

### Positive
- Significantly fewer runtime type errors
- Enhanced developer experience with autocomplete
- Better refactoring safety and confidence
- Self-documenting code through types
- Easier onboarding for new developers

### Negative
- Steeper learning curve for TypeScript beginners
- More verbose code in some cases
- Initial time investment to add proper types
- Potential over-engineering of simple functions

### Mitigation Strategies
- Provide TypeScript training for team members
- Create comprehensive type examples and patterns
- Use utility types to reduce verbosity
- Regular code reviews to maintain standards

## Compliance
This ADR is enforced through:
- TypeScript compiler configuration
- ESLint rules for TypeScript
- Pre-commit hooks checking types
- Code review requirements
- CI/CD pipeline type checking

## Related Decisions
- ADR-001: Modular Architecture with Separation of Concerns
- ADR-002: Styled Components with Centralized Theme System
- ADR-004: Custom Hooks for Business Logic