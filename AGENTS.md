# AGENTS.md - AI Coding Agent Guide

This document provides essential information for AI coding agents working on the Extreme Portfolio Website project.

---

## Project Overview

**Extreme Portfolio Website** is a modern, production-grade personal portfolio website built as a single-page application (SPA). It showcases the work and skills of Taki Eddine Rami, a Senior Full-Stack Engineer & Solutions Architect.

- **Original Design**: Based on a Figma design available at https://www.figma.com/design/59cNukUsvRTdSR7kswWZBm/Extreme-Portfolio-Website
- **Live Demo**: Deployed on Netlify/Vercel (see individual project demos in `src/data/mockData.ts`)

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 18.3.1 |
| Language | TypeScript | ^5.x |
| Build Tool | Vite | 6.3.5 |
| Router | React Router | v7 (via `react-router` package) |
| Styling | Tailwind CSS | v4.1.3 |
| Animation | Motion (Framer Motion successor) | * |
| UI Components | Radix UI | Various |
| Icons | Lucide React | 0.487.0 |

### Key Dependencies

- **@radix-ui/react-***: Headless UI primitives for accessible components
- **class-variance-authority (cva)**: Component variant management
- **tailwind-merge + clsx**: Utility for merging Tailwind classes
- **lucide-react**: Icon library
- **recharts**: Charts for data visualization
- **embla-carousel-react**: Carousel component

---

## Project Structure

```
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration with path aliases
├── src/
│   ├── main.tsx           # React app entry point
│   ├── App.tsx            # Root component with router provider
│   ├── routes.ts          # Route definitions
│   ├── index.css          # Tailwind CSS bundle (compiled)
│   ├── styles/
│   │   └── globals.css    # Global styles and CSS variables
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   ├── data/
│   │   └── mockData.ts    # Portfolio data (projects, skills, etc.)
│   ├── hooks/             # Custom React hooks
│   │   ├── useInView.ts
│   │   ├── useMousePosition.ts
│   │   ├── useScrollProgress.ts
│   │   └── useTypingEffect.ts
│   ├── pages/             # Route-level page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ExperiencePage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFound.tsx
│   └── components/
│       ├── layouts/       # Layout wrappers
│       │   └── MainLayout.tsx
│       ├── navigation/    # Navigation components
│       │   └── Navigation.tsx
│       ├── ui/            # Reusable UI components (shadcn/ui style)
│       │   ├── button.tsx
│       │   ├── card.tsx
│       │   ├── dialog.tsx
│       │   └── ... (50+ components)
│       ├── about/         # About page specific
│       ├── hero/          # Hero section components
│       ├── projects/      # Project-related components
│       ├── experience/    # Experience timeline
│       ├── cursor/        # Custom cursor
│       └── figma/         # Figma-specific components
```

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production (output: build/)
npm run build
```

### Vite Configuration Notes

- **Entry Point**: `/src/main.tsx`
- **Output Directory**: `build/`
- **Dev Server Port**: 3000
- **Path Alias**: `@/` maps to `./src/`
- **Build Target**: `esnext`

---

## Code Style Guidelines

### TypeScript Conventions

1. **Strict Mode**: Project uses TypeScript strict mode - avoid `any` types
2. **Interface Naming**: PascalCase for interfaces (e.g., `Project`, `Experience`)
3. **Component Props**: Define explicit interfaces for all component props
4. **Type Exports**: Export types from `src/types/index.ts`

### Component Patterns

```typescript
// Standard component structure
import * as React from "react";

interface ComponentProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  );
};
```

### Styling Conventions

1. **Tailwind CSS**: Use utility classes primarily
2. **Class Merging**: Use `cn()` utility from `src/components/ui/utils.ts`
3. **CSS Variables**: Custom properties defined in `src/styles/globals.css`
4. **Color Palette**:
   - Primary: Cyan (`#06b6d4`)
   - Secondary: Blue (`#3b82f6`)
   - Accent: Purple (`#8b5cf6`)
   - Background: Pure Black (`#000000`)
   - Text: White (`#ffffff`)

### File Naming

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useInView.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Styles**: kebab-case (e.g., `globals.css`)

---

## Key Architecture Patterns

### 1. Component Organization

- **UI Components** (`/components/ui/`): Pure presentational, highly reusable
- **Feature Components** (`/components/[feature]/`): Domain-specific
- **Page Components** (`/pages/`): Route entry points
- **Layout Components** (`/components/layouts/`): Structural wrappers

### 2. State Management

- **Local State**: `useState` for component-specific data
- **URL State**: React Router for filters, modals, pagination
- **No Global State**: Currently no Redux/Context - add if needed

### 3. Custom Hooks

Located in `/src/hooks/`:
- `useInView`: Intersection Observer wrapper for scroll animations
- `useMousePosition`: Track mouse coordinates
- `useScrollProgress`: Calculate scroll percentage
- `useTypingEffect`: Animated typing text effect

### 4. Animation Strategy

Uses **Motion** (Framer Motion successor):

```typescript
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```

**Important**: Respect `prefers-reduced-motion` media query for accessibility.

---

## Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Hero, stats, GitHub contributions |
| `/about` | AboutPage | Bio, skills radar, testimonials |
| `/projects` | ProjectsPage | Project grid with filtering |
| `/experience` | ExperiencePage | Timeline of work & education |
| `/contact` | ContactPage | Contact form and info |
| `*` | NotFound | 404 page |

---

## Data Structure

Portfolio data is stored in `src/data/mockData.ts`:

- `profileData`: Personal information
- `projects`: Array of `Project` objects
- `experiences`: Array of `Experience` objects
- `skills`: Array of `Skill` objects
- `socialLinks`: Social media links
- `testimonials`: Client/colleague testimonials

---

## Testing Strategy

**Current Status**: No test suite configured.

**Recommended Future Setup**:
- Unit Tests: Vitest + React Testing Library
- E2E Tests: Playwright

---

## Deployment

### Recommended Platforms

1. **Vercel** (zero config, automatic HTTPS)
2. **Netlify** (with `_redirects` for SPA routing)
3. **Cloudflare Pages**

### Build Output

- Static files in `build/` directory
- SPA routing requires catch-all redirect to `index.html`

---

## Security Considerations

1. **No Sensitive Data**: All data is mock/public
2. **Environment Variables**: Prefix with `VITE_` for client access
3. **CSP Headers**: Configure in deployment platform
4. **HTTPS**: Enforce in production

---

## Accessibility (A11y)

1. **Keyboard Navigation**: All interactive elements focusable
2. **ARIA Labels**: Use on icon-only buttons
3. **Focus Visible**: Cyan outline (`#06b6d4`) on focus
4. **Reduced Motion**: Animations disabled when `prefers-reduced-motion: reduce`
5. **Semantic HTML**: Proper heading hierarchy

---

## Performance Guidelines

1. **Images**: Use WebP/AVIF when possible, lazy loading
2. **Bundle Size**: Monitor with `npm run build -- --analyze`
3. **Code Splitting**: Route-based lazy loading (future)
4. **Memoization**: Use `React.memo`, `useMemo`, `useCallback` appropriately

---

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/routes.ts`
3. Add navigation link in `src/components/navigation/Navigation.tsx`

### Adding a New UI Component

1. Create file in `src/components/ui/`
2. Follow existing patterns (see `button.tsx`)
3. Use `cn()` utility for class merging
4. Export from component file

### Adding a New Project

1. Add `Project` object to `projects` array in `src/data/mockData.ts`
2. Include all required fields (see `Project` interface in `src/types/index.ts`)

---

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors**:
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Vite alias not working**:
- Check `vite.config.ts` resolve.alias configuration
- Restart dev server after config changes

**Styles not applying**:
- Ensure `index.css` is imported in `main.tsx`
- Check Tailwind class syntax

---

## Documentation References

- `src/ARCHITECTURE.md`: Detailed architecture decisions
- `src/COMPONENT_GUIDE.md`: Component usage reference
- `src/DEPLOYMENT.md`: Deployment instructions
- `src/Attributions.md`: Third-party attributions

---

**Last Updated**: February 15, 2026
