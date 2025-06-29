# TreeBox Project

TreeBox is a comprehensive application for HTML/CSS configuration and external application integrations. The project is structured as a monorepo with separate frontend and backend applications.

## Project Structure

```
treebox/
├── frontend/           # React TypeScript frontend application
├── backend/            # Future backend application (Node.js/Express, Python, etc.)
├── docs/               # Shared documentation
├── scripts/            # Shared build and deployment scripts
└── README.md           # This file
```

## Applications

### Frontend (`/frontend/`)
- **Technology**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Styled Components with comprehensive theming
- **Architecture**: Modular architecture with separation of concerns
- **Features**: 
  - HTML/CSS visual builder
  - Application integrations (Salesforce, Google Drive, OpenAI, etc.)
  - Responsive design with accessibility support

### Backend (`/backend/`)
- **Status**: Planned for future implementation
- **Purpose**: API server for data persistence, authentication, and external integrations
- **Potential Technologies**: 
  - Node.js with Express/Fastify
  - Python with FastAPI/Django
  - Java with Spring Boot
  - .NET Core

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Available scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Backend Development
*Coming soon - backend application not yet implemented*

## Architecture Overview

### Frontend Architecture
The frontend follows a modular architecture with strict separation of concerns:

```
frontend/src/
├── components/         # UI components
├── layouts/           # Layout components
├── pages/             # Page-level components
├── hooks/             # Business logic and state management
├── data/              # Static data and configurations
├── styles/            # Global styles and theme system
├── services/          # API service layer (future backend integration)
└── utils/             # Utility functions
```

Key principles:
- **Components**: Pure UI presentation
- **Hooks**: Business logic and state management
- **Styled Components**: All styling with centralized theme
- **TypeScript**: Strict type safety throughout

### Future Backend Integration
The frontend is prepared for backend integration with:
- Service layer for API calls (`/services/`)
- Authentication hooks and components
- Data management patterns ready for server state
- Error handling for network operations

## Development Guidelines

### Code Quality
- **ESLint**: Strict linting rules enforced
- **TypeScript**: Strict mode with comprehensive type checking
- **Styled Components**: Theme-based styling only
- **Testing**: Framework ready for unit and integration tests

### Architecture Rules
- Modular component structure with consistent patterns
- Business logic extracted to custom hooks
- Proper separation between data, logic, and presentation
- Accessibility-first development

## Documentation

### Frontend Documentation
- [`frontend/CLAUDE.md`](frontend/CLAUDE.md) - Claude Code guidance
- [`frontend/STYLE_GUIDE.md`](frontend/STYLE_GUIDE.md) - Comprehensive style guide
- [`frontend/RULES_SUMMARY.md`](frontend/RULES_SUMMARY.md) - All rules and standards
- [`frontend/docs/adr/`](frontend/docs/adr/) - Architecture Decision Records

### Development Rules
- [`.cursorrules`](frontend/.cursorrules) - Cursor IDE rules
- [`.github/copilot-instructions.md`](frontend/.github/copilot-instructions.md) - GitHub Copilot guidance

## Technology Decisions

### Frontend Choices
- **React**: Component-based UI development
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast development and optimized builds
- **Styled Components**: CSS-in-JS with theming
- **Modular Architecture**: Scalable and maintainable structure

### Future Backend Considerations
- RESTful API design
- Database integration (PostgreSQL, MongoDB, etc.)
- Authentication and authorization
- Real-time features (WebSockets, Server-Sent Events)
- Microservices architecture potential

## Deployment

### Frontend Deployment
The frontend can be deployed to:
- Vercel (recommended for Vite projects)
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Build command: `npm run build`
Output directory: `dist/`

### Future Backend Deployment
Backend deployment will depend on the chosen technology stack:
- Docker containerization
- Cloud platforms (AWS, GCP, Azure)
- Traditional VPS hosting
- Serverless functions

## Contributing

### Development Workflow
1. Follow the established architecture patterns
2. Use the component templates in `frontend/src/templates/`
3. Ensure all ESLint rules pass
4. Follow TypeScript strict mode requirements
5. Use styled-components with theme variables only

### Code Review
- All code must pass ESLint without errors
- TypeScript compilation must be clean
- Components must follow established patterns
- Business logic must be in custom hooks
- Accessibility requirements must be met

## Future Roadmap

### Short Term
- [ ] Complete frontend feature set
- [ ] Add comprehensive testing suite
- [ ] Implement additional application integrations
- [ ] Enhance responsive design

### Medium Term
- [ ] Backend API development
- [ ] User authentication system
- [ ] Data persistence layer
- [ ] Real-time collaboration features

### Long Term
- [ ] Advanced HTML/CSS builder features
- [ ] Plugin architecture for extensions
- [ ] Multi-tenant support
- [ ] Advanced analytics and reporting

## Support

For development questions or issues:
1. Check the comprehensive documentation in `/frontend/docs/`
2. Review the style guide and rules summary
3. Follow the established patterns in existing code
4. Use the component templates for new features

## License

*To be determined based on project requirements*