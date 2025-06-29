# TreeBox Development Guide

This guide provides comprehensive information for developers working on the TreeBox project.

## Project Structure

```
treebox-project/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── data/            # Static data
│   │   ├── styles/          # Global styles and theme
│   │   └── templates/       # Component templates
│   ├── public/              # Static assets
│   └── docs/                # Frontend-specific documentation
├── backend/                  # Future backend application
├── scripts/                  # Shared build and deployment scripts
├── docs/                     # Shared project documentation
└── package.json             # Root package.json with workspaces
```

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm (comes with Node.js)
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd treebox-project
   ```

2. **Run setup script**
   ```bash
   ./scripts/setup.sh
   ```

   Or manually:
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Development Workflow

### Frontend Development

#### Available Commands
```bash
# Development
npm run dev                 # Start frontend dev server
npm run dev:frontend        # Same as above (explicit)

# Building
npm run build              # Build frontend for production
npm run build:frontend     # Same as above (explicit)
npm run preview            # Preview production build

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues automatically

# Utilities
npm run clean              # Clean all node_modules and build artifacts
```

#### Component Development
1. **Use the component template**
   ```bash
   cp -r frontend/src/templates/ComponentTemplate frontend/src/components/MyComponent
   # Rename files and update content
   ```

2. **Follow the established patterns**
   - Business logic in custom hooks
   - Styled components with theme variables
   - TypeScript interfaces for all props
   - Proper accessibility attributes

3. **Test your component**
   ```bash
   npm run lint              # Check for code quality issues
   npm run build             # Ensure it builds successfully
   ```

#### Architecture Rules
- **Separation of Concerns**: Components handle UI, hooks handle logic
- **Styled Components**: All styling through styled-components with theme
- **TypeScript**: Strict mode with proper interfaces
- **No Default Exports**: Use named exports consistently

### Backend Development (Future)

The backend is planned but not yet implemented. When development begins:

1. **Technology Selection**: Choose runtime (Node.js, Python, etc.)
2. **Project Setup**: Initialize backend project in `/backend/`
3. **API Design**: Follow RESTful principles
4. **Integration**: Connect with existing frontend service layer

## Code Quality Standards

### ESLint Rules
The project enforces strict ESLint rules:
- No `any` types
- Proper naming conventions
- No deep relative imports
- Exhaustive dependency arrays for hooks

### TypeScript Configuration
- Strict mode enabled
- No unused variables or parameters
- Type-only imports enforced
- Proper interface definitions required

### Styling Standards
- Use theme variables exclusively
- No hardcoded colors, spacing, or design tokens
- Responsive design patterns
- Accessibility-first approach

## File Organization

### Component Structure
Every component must follow this pattern:
```
ComponentName/
├── index.ts                 # Export barrel
├── ComponentName.tsx        # Component logic
├── ComponentName.styles.ts  # Styled components
└── ComponentName.types.ts   # Types (optional)
```

### Import Organization
```typescript
// 1. React imports
import React, { useState } from 'react';

// 2. External libraries
import styled from 'styled-components';
import { Icon } from 'lucide-react';

// 3. Internal hooks and components
import { useCustomHook } from '../../hooks/useCustomHook';
import { Component } from '../Component';

// 4. Types (inline imports preferred)
import { type CustomType } from './types';
```

## Testing Strategy (Future)

When tests are added, they should follow these patterns:

### Component Testing
```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { ComponentName } from './ComponentName';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ComponentName', () => {
  test('renders with correct props', () => {
    renderWithTheme(<ComponentName title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Hook Testing
```typescript
// useCustomHook.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  test('returns correct initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.data).toEqual([]);
  });
});
```

## Deployment

### Development Deployment
```bash
# Build only
./scripts/deploy.sh --build-only

# Deploy to Vercel
./scripts/deploy.sh --platform vercel

# Deploy to Netlify
./scripts/deploy.sh --platform netlify

# Prepare static files
./scripts/deploy.sh --platform static
```

### Production Deployment
1. **Environment Variables**: Set up production environment variables
2. **Build Process**: Use CI/CD pipeline for automated builds
3. **Testing**: Run comprehensive test suite
4. **Deployment**: Deploy to chosen platform (Vercel, Netlify, etc.)

## Environment Configuration

### Frontend Environment Variables
```bash
# .env.local (for local development)
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=TreeBox
VITE_VERSION=1.0.0
```

### Development vs Production
- **Development**: Hot reload, detailed error messages, dev tools
- **Production**: Optimized builds, minified code, error boundaries

## Common Development Tasks

### Adding a New Component
1. Copy the component template
2. Rename files appropriately
3. Update component logic and styles
4. Create proper TypeScript interfaces
5. Add to appropriate index.ts for exports
6. Test with lint and build commands

### Adding a New Hook
1. Create hook in `/frontend/src/hooks/`
2. Follow naming convention (`useFeatureName`)
3. Return object with descriptive properties
4. Use proper TypeScript types
5. Export from hooks index.ts

### Adding New Styled Components
1. Use theme variables exclusively
2. Follow semantic naming conventions
3. Include hover, focus, and active states
4. Implement responsive design patterns
5. Add proper accessibility attributes

### Integrating External APIs (Future)
1. Add service functions in `/frontend/src/services/`
2. Create custom hooks for API state management
3. Implement proper error handling
4. Add loading states and retry logic

## Troubleshooting

### Common Issues

#### Build Failures
- Check ESLint errors: `npm run lint`
- Verify TypeScript compilation: `npx tsc --noEmit`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

#### Styling Issues
- Ensure theme variables are used
- Check styled-component prop naming (use `$` prefix for transient props)
- Verify ThemeProvider is wrapping components

#### Import Errors
- Use relative imports for same-level files
- Use barrel exports for cleaner imports
- Avoid deep relative imports (max 2 levels)

#### Performance Issues
- Use React.memo for expensive components
- Implement proper dependency arrays in hooks
- Use useMemo and useCallback appropriately

### Getting Help

1. **Check Documentation**: Review all documentation in `/docs/` and `/frontend/docs/`
2. **Follow Patterns**: Look at existing components for examples
3. **Use Templates**: Start with component templates for consistency
4. **Code Review**: Ensure all code follows established patterns

## Contributing Guidelines

### Before Submitting Code
- [ ] All ESLint rules pass
- [ ] TypeScript compilation is clean
- [ ] Components follow established patterns
- [ ] Business logic is in custom hooks
- [ ] Styled components use theme variables
- [ ] Accessibility requirements are met
- [ ] Code is properly documented

### Code Review Checklist
- [ ] Follows architectural patterns
- [ ] Proper TypeScript usage
- [ ] Theme-based styling
- [ ] Performance considerations
- [ ] Accessibility compliance
- [ ] Error handling implementation

### Git Workflow
1. Create feature branch from main
2. Implement changes following guidelines
3. Test thoroughly with lint and build
4. Create pull request with clear description
5. Address review feedback
6. Merge after approval

This development guide ensures consistency and quality across the TreeBox project. Follow these patterns to maintain the high standards established in the codebase.