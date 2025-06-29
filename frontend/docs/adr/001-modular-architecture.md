# ADR-001: Modular Architecture with Separation of Concerns

## Status
**Accepted** - Implemented

## Context
The TreeBox application was initially structured as a simple React app with components containing mixed concerns. As the application grows in complexity, we need a more maintainable and scalable architecture that separates business logic, data management, and presentation concerns.

## Decision
We will implement a modular architecture with clear separation of concerns:

### 1. Folder Structure
```
src/
├── components/     # Pure UI components
├── layouts/        # Layout components  
├── pages/          # Page-level components
├── hooks/          # Business logic and state management
├── data/           # Static data and configurations
├── styles/         # Global styles and theme system
├── services/       # External API services
├── types/          # Global TypeScript definitions
├── utils/          # Pure utility functions
└── templates/      # Component templates and patterns
```

### 2. Separation of Concerns
- **Components**: Only handle presentation and user interactions
- **Hooks**: Contain all business logic and state management
- **Data**: Static configurations and type definitions
- **Services**: External API interactions and side effects

### 3. Component Structure Pattern
Each component follows a consistent structure:
```
ComponentName/
├── index.ts                 # Export barrel
├── ComponentName.tsx        # Component logic
├── ComponentName.styles.ts  # Styled components
└── ComponentName.types.ts   # Complex types (optional)
```

## Rationale

### Benefits
1. **Maintainability**: Clear separation makes code easier to understand and modify
2. **Testability**: Business logic in hooks can be tested independently
3. **Reusability**: Components and hooks can be easily reused across the application
4. **Scalability**: New features can be added without affecting existing code
5. **Developer Experience**: Consistent patterns reduce cognitive load

### Trade-offs
1. **Initial Complexity**: More files and folders to manage
2. **Learning Curve**: Developers need to understand the architecture patterns
3. **Over-engineering Risk**: Simple features might seem over-architected

## Implementation Details

### Custom Hooks Pattern
```typescript
export const useFeature = (options: FeatureOptions) => {
  // State management
  const [state, setState] = useState(initialState);
  
  // Business logic
  const handleAction = useCallback((action: Action) => {
    // Complex business logic here
  }, [dependencies]);
  
  // Return clean interface
  return {
    state,
    actions: { handleAction },
    computed: { isValid: state.isValid }
  };
};
```

### Component Pattern
```typescript
export const Component: React.FC<ComponentProps> = (props) => {
  // Use hooks for business logic
  const { state, actions } = useFeature(props);
  
  // Only presentation logic here
  return (
    <StyledContainer>
      {/* JSX with styled components */}
    </StyledContainer>
  );
};
```

## Consequences

### Positive
- Clean, maintainable codebase
- Easy to test business logic separately
- Consistent patterns across the application
- Better code reusability
- Improved developer productivity

### Negative
- More initial setup for simple components
- Requires discipline to maintain patterns
- Potential for over-abstraction

## Compliance
This ADR is enforced through:
- ESLint rules for import patterns
- Code review guidelines
- Component templates
- Style guide documentation

## Related Decisions
- ADR-002: Styled Components Theme System
- ADR-003: Custom Hooks for Business Logic
- ADR-004: TypeScript Strict Mode Configuration