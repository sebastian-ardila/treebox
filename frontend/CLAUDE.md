# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TreeBox is a React TypeScript application built with Vite that appears to be a visual CSS/HTML builder with external application integrations. It uses styled-components for styling and has comprehensive tooling for development, testing, and analysis.

## Key Commands

### Development
- `npm run dev` - Start development server
- `npm run preview` - Preview production build

### Building
- `npm run build` - TypeScript check + production build
- `npm run build:analyze` - Build with bundle analysis

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run analyze:deps` - Check for circular dependencies

### Testing
No test commands are currently configured in package.json.

## Architecture

### Modular Structure
The application follows a clean, modular architecture with separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── ThemeProvider/   # Global theme wrapper
│   ├── SideMenu/       # Navigation sidebar
│   └── shared/         # Shared/common components
├── layouts/            # Layout components
│   └── MainLayout/     # Main application layout
├── pages/              # Page components
│   └── Home/          # Home page
├── hooks/              # Custom React hooks for business logic
│   ├── useApplications.ts      # Application management
│   ├── useHTMLElements.ts      # HTML elements data
│   ├── useCSSProperties.ts     # CSS properties data
│   ├── useElementConfigurations.ts # Element configurations
│   └── useNavigation.ts        # Navigation logic
├── data/               # Data models and static data
│   ├── applications.ts # External service integrations
│   ├── cssData.ts     # HTML/CSS element data
│   └── navigation.ts  # Navigation items data
├── styles/            # Global styles and theme
│   ├── GlobalStyles.ts # Global CSS styles
│   ├── theme.ts       # Design system theme
│   └── styled.d.ts    # TypeScript declarations
├── templates/         # Component templates and patterns
├── services/          # External API services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### Component Structure Pattern
All components follow this consistent structure:
```
ComponentName/
├── ComponentName.tsx          # Component logic
├── ComponentName.styles.ts    # Styled components
├── ComponentName.types.ts     # Types (optional)
└── index.ts                   # Export barrel
```

### Key Features
1. **Separation of Concerns**: Business logic in hooks, presentation in components, styling in styled-components
2. **Theme System**: Centralized design system with consistent spacing, colors, and styling
3. **Type Safety**: Full TypeScript coverage with proper interfaces
4. **Modular Data Layer**: Custom hooks manage all data operations
5. **Consistent Patterns**: Template-based component structure

### Technology Stack
- React 19.1.0 with TypeScript
- Vite for build tooling
- Styled Components with comprehensive theming
- Lucide React for icons
- Custom hooks for state management

### Important Configuration
- Global theme provider wraps the entire application
- TypeScript declarations for styled-components theme
- Modular import/export patterns
- Separation between data, business logic, and presentation

## Development Guidelines

### Component Development
- Use the component template in `src/templates/` as a starting point
- Business logic goes in custom hooks in `src/hooks/`
- All styling uses styled-components with theme variables
- Use semantic TypeScript interfaces

### Custom Hooks
- Hooks manage all business logic and data operations
- Follow naming convention: `use[FeatureName]`
- Return objects with clear, descriptive property names
- Use proper TypeScript types for all parameters and return values

### Styling
- Use theme variables instead of hardcoded values
- Follow responsive design patterns
- Use transient props ($propName) for styled component props
- Maintain consistent spacing and colors through theme

### Data Management
- Static data in `src/data/` directory
- Business logic in custom hooks
- Components only handle presentation and user interaction

### TypeScript
- Strict mode enabled with comprehensive type checking
- Separate type files for complex interfaces
- Use proper import/export patterns (type imports when needed)

### Code Quality
- Run `npm run lint` and `npm run lint:fix` before committing
- Follow the established patterns in existing components
- Use meaningful names for components, hooks, and functions