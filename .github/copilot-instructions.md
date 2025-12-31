# Angular Blog Copilot Instructions

## Architecture Overview

This is a **full-stack Angular blog application** with:

- **Frontend**: Angular 20+ standalone components with SSR support
- **Backend**: Express.js REST API with MongoDB integration
- **Database**: MongoDB (via Mongoose) with intermittent connections and caching
- **Caching**: In-memory cache with TTL for optimized performance

### Dual-Server Architecture

- **Frontend server**: Angular SSR at `:4000` (`npm start` or `ng serve`)
- **Backend API**: Express server at `:3000` (`cd backend && npm run server`)
- **Cross-origin**: Frontend calls backend API across ports (CORS enabled)
- **Database**: MongoDB with auto-disconnect after 30s inactivity

## Key Project Patterns

### Component Architecture

- **All components are standalone** - no NgModules
- Use `signal()` for reactive state (see [dashboard.component.ts](src/app/views/dashboard/dashboard.component.ts))
- Components use `input()` function for props (see [blog-card.component.ts](src/app/components/blog-card/blog-card.component.ts))
- Import structure: `RouterModule` for routing, `ButtonModule` from PrimeNG for UI

### Directory Structure

```
src/app/
├── components/        # Reusable UI components (blog-card)
├── views/            # Route components (dashboard, blog-page)
├── shared/           # Layout components (navigation, back-button)
└── mock-blogs.service.ts  # Data services (currently empty)
```

### Routing Pattern

- Simple route config in [app.routes.ts](src/app/app.routes.ts): `''` → dashboard, `blog/:id` → blog detail
- Uses Angular Router with `RouterOutlet` in main app layout

## Backend API Structure

### Module Pattern (ESM)

- Uses ES modules (`"type": "module"` in [backend/package.json](backend/package.json))
- Mix of `import`/`require` - **Backend uses require() for Express routing**
- Routes organized: `routes/index.js` → `routes/blogs.js`

### Database Integration

- **Intermittent MongoDB connections** via [config/database.js](backend/config/database.js)
- **Auto-disconnect** after 30s of inactivity to optimize resources
- **In-memory caching** with TTL (5min for blog lists, 10min for single blogs)
- **Mongoose models** in [models/Blog.js](backend/models/Blog.js) with indexes and virtuals

### API Endpoints (Active)

```javascript
GET /blogs        # List all blogs (cached 5min)
GET /blogs/:id    # Get single blog by ObjectId (cached 10min)
DELETE /blogs/cache  # Clear cache (dev/admin endpoint)
```

## Development Workflow

### Commands

- **Frontend**: `npm start` (Angular dev server)
- **Backend**: `cd backend && npm run server` (Express with concurrently)
- **Database**: `cd backend && npm run seed` (populate with sample data)
- **Tests**: `npm test` (Karma + Jasmine)
- **Build**: `npm run build` (produces SSR-ready dist/)

### Critical Files

- [server.ts](server.ts): Angular SSR configuration
- [backend/server.js](backend/server.js): Express API server with CORS
- [backend/config/database.js](backend/config/database.js): MongoDB connection management
- [backend/utils/cache.js](backend/utils/cache.js): In-memory caching system
- [src/app/app.config.ts](src/app/app.config.ts): Angular app bootstrap with hydration

## Styling System

- **SCSS with CSS variables** in [src/styles/\_variables.scss](src/styles/_variables.scss)
- **PrimeNG component library** for UI elements
- **Component-scoped styles** (each component has `.scss` file)
- Color scheme: Primary `#14213d`, accent `#fca311`, neutral `#e5e5e5`

## Current State & TODOs

### Implemented Features

- **MongoDB integration** with Mongoose ODM
- **Intermittent database connections** (auto-disconnect after 30s)
- **In-memory caching system** with TTL and cleanup
- **Blog model** with validation, indexes, and virtuals
- **Sample data seeder** for development

### Known Issues

- [mock-blogs.service.ts](src/app/mock-blogs.service.ts) is empty - needs implementation
- Backend uses mixed import styles (`import`/`require`)
- Frontend not yet connected to backend API

### Next Development Steps

1. Connect frontend service to backend API endpoints
2. Add blog content management and rich text editing
3. Implement proper error handling and loading states
4. Add user authentication and authorization
