# Component Guide

Complete reference for all components in the portfolio.

---

## 📁 Component Organization

### `/components/about/` - About Page Components

#### `SkillRadar.tsx`
**Purpose**: SVG-based radar chart visualizing core competencies

**Features**:
- Interactive polygon visualization
- Skill proficiency mapping (0-100%)
- Smooth animations on scroll
- Responsive sizing

**Usage**:
```tsx
<SkillRadar />
```

#### `TestimonialCarousel.tsx`
**Purpose**: Swipeable carousel for testimonials

**Props**:
```typescript
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}
```

**Features**:
- Keyboard navigation (arrows)
- Touch gestures
- Auto-rotation (optional)
- Star rating display
- Pagination dots

---

### `/components/cursor/` - Custom Cursor System

#### `CustomCursor.tsx`
**Purpose**: Magnetic custom cursor with trail effect

**Features**:
- Blend mode difference for visibility
- Hover state detection
- Spring physics animation
- Pointer detection for clickable elements

**Implementation Details**:
- Uses `useMousePosition` hook
- Event delegation for performance
- `mix-blend-difference` for contrast
- Disabled on touch devices

---

### `/components/experience/` - Experience Components

#### `TimelineItem.tsx`
**Purpose**: Individual experience card in timeline

**Props**:
```typescript
interface TimelineItemProps {
  experience: Experience;
  index: number; // For stagger animations
}
```

**Features**:
- Vertical timeline connector
- Animated node indicator
- Technology tags
- Achievement bullets
- External links

---

### `/components/hero/` - Homepage Hero Components

#### `GitHubContributions.tsx`
**Purpose**: GitHub-style contribution heatmap

**Features**:
- 365 days of activity
- Color-coded by contribution level (0-4)
- Hover tooltips with details
- Total contribution count
- Responsive grid layout

**Data Structure**:
```typescript
interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
```

#### `ParticleField.tsx`
**Purpose**: Interactive canvas particle system

**Features**:
- 150+ particles with physics
- Mouse interaction (repulsion)
- Particle connections
- Performance optimized with requestAnimationFrame
- Responsive to viewport size

**Performance**:
- ~60 FPS on modern hardware
- Alpha blending for trails
- Damping for smooth motion

---

### `/components/layouts/` - Layout Components

#### `MainLayout.tsx`
**Purpose**: Root layout wrapper

**Features**:
- Navigation header
- Footer
- Scroll progress bar
- Back to top button
- Grid background pattern
- Route transitions

**Children**: All page routes

---

### `/components/navigation/` - Navigation Components

#### `Navigation.tsx`
**Purpose**: Main navigation bar

**Features**:
- Sticky header
- Glass morphism effect on scroll
- Active route highlighting
- Mobile hamburger menu
- Animated logo
- CTA button

**Responsive**:
- Desktop: Horizontal nav
- Mobile: Drawer menu

---

### `/components/projects/` - Project Components

#### `ProjectCard.tsx`
**Purpose**: Project preview card

**Props**:
```typescript
interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}
```

**Features**:
- 3D hover tilt effect
- Image overlay with gradient
- Technology tags
- GitHub stats (stars, forks)
- Featured badge
- Hover action buttons

#### `ProjectModal.tsx`
**Purpose**: Full-screen project details

**Props**:
```typescript
interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}
```

**Features**:
- Hero image with overlay stats
- Detailed description
- Technology list
- Achievement checklist
- External links (GitHub, Demo)
- Backdrop click to close
- Escape key handling

---

### `/components/ui/` - Reusable UI Components

#### `AnimatedCounter.tsx`
**Purpose**: Counting animation for numbers

**Props**:
```typescript
interface AnimatedCounterProps {
  value: number;
  duration?: number; // Animation duration in seconds
  suffix?: string; // e.g., "+", "k", "%"
  className?: string;
}
```

**Usage**:
```tsx
<AnimatedCounter value={100} suffix="+" duration={2} />
```

#### `BackToTop.tsx`
**Purpose**: Floating button to scroll to top

**Features**:
- Appears after 500px scroll
- Smooth scroll animation
- Fixed positioning
- Fade in/out transitions

#### `Footer.tsx`
**Purpose**: Site footer

**Sections**:
- Brand and tagline
- Quick links
- Social media icons
- Copyright notice

#### `GlitchText.tsx`
**Purpose**: Cyberpunk glitch effect on text

**Props**:
```typescript
interface GlitchTextProps {
  children: string;
  className?: string;
}
```

**Features**:
- Random glitch intervals
- RGB split effect
- Position offset animation

#### `LoadingScreen.tsx`
**Purpose**: Initial page load animation

**Features**:
- Progress bar simulation
- Logo reveal
- Fade out on completion

#### `ScrollProgress.tsx`
**Purpose**: Page scroll indicator

**Features**:
- Fixed at top of viewport
- Gradient color
- Smooth scale animation
- 1px height

#### `TerminalSimulator.tsx`
**Purpose**: Animated terminal with commands

**Features**:
- Auto-cycling commands
- Typing animation
- Syntax highlighting
- Progress indicator
- Terminal window chrome

---

## 🎣 Custom Hooks

### `useInView.ts`
**Purpose**: Intersection Observer wrapper

**Signature**:
```typescript
function useInView<T extends HTMLElement>(
  options?: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  }
): [RefObject<T>, boolean]
```

**Usage**:
```tsx
const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

<motion.div
  ref={ref}
  animate={inView ? { opacity: 1 } : { opacity: 0 }}
>
  Content
</motion.div>
```

### `useMousePosition.ts`
**Purpose**: Track mouse coordinates

**Returns**:
```typescript
interface MousePosition {
  x: number;
  y: number;
}
```

**Performance**: Throttled updates

### `useScrollProgress.ts`
**Purpose**: Calculate scroll percentage

**Returns**: `number` (0-100)

**Calculation**: `(scrollTop / maxScroll) * 100`

### `useTypingEffect.ts`
**Purpose**: Animated typing text

**Options**:
```typescript
interface UseTypingEffectOptions {
  speed?: number; // ms per character
  delay?: number; // initial delay
}
```

**Usage**:
```tsx
const text = useTypingEffect("Hello World", { speed: 50 });
return <span>{text}</span>;
```

---

## 📄 Pages

### `HomePage.tsx`
**Route**: `/`

**Sections**:
- Hero with particle background
- Name and role typing effect
- Call-to-action buttons
- Social links
- GitHub contributions
- Stats grid
- Scroll indicator

### `AboutPage.tsx`
**Route**: `/about`

**Sections**:
- Introduction
- Statistics counters
- Technical skills by category
- Skill radar chart
- Testimonials carousel
- Engineering philosophy
- Terminal simulator

### `ProjectsPage.tsx`
**Route**: `/projects`

**Features**:
- Category filtering
- Project cards grid
- Stats overview
- Modal details
- FLIP animations

### `ExperiencePage.tsx`
**Route**: `/experience`

**Sections**:
- Work experience timeline
- Education timeline
- Certifications grid

### `ContactPage.tsx`
**Route**: `/contact`

**Features**:
- Contact information cards
- Functional form with validation
- Social media links
- Availability status

### `NotFound.tsx`
**Route**: `*` (404)

**Features**:
- Animated 404 text
- Code snippet
- Navigation buttons
- Animated background

---

## 🎨 Styling Conventions

### Tailwind Classes
- **Spacing**: Consistent `gap-*`, `p-*`, `m-*`
- **Colors**: `cyan-*`, `blue-*`, `purple-*`, `white/*`
- **Effects**: `backdrop-blur-sm`, `bg-white/5`

### Custom Classes
```css
.glass - Glassmorphism effect
.text-gradient - Gradient text
.cyber-border - Animated border
```

### Motion Variants
```tsx
// Common pattern
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

---

## 🔧 Performance Tips

### Lazy Loading
```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Memoization
```tsx
const MemoizedComponent = memo(Component);
const memoizedValue = useMemo(() => computeExpensive(), [deps]);
const memoizedCallback = useCallback(() => {}, [deps]);
```

### Virtualization (Future)
For long lists, use `react-window` or `react-virtual`

---

## ♿ Accessibility

### ARIA Labels
```tsx
<button aria-label="Close modal">
  <X />
</button>
```

### Keyboard Navigation
- All interactive elements focusable
- Tab order logical
- Escape closes modals

### Focus Management
```tsx
*:focus-visible {
  outline: 2px solid #06b6d4;
  outline-offset: 2px;
}
```

---

## 🧪 Testing Guidelines (Future)

### Unit Tests
```tsx
describe('AnimatedCounter', () => {
  it('counts from 0 to target value', () => {
    // Test implementation
  });
});
```

### Integration Tests
```tsx
describe('ProjectsPage', () => {
  it('filters projects by category', () => {
    // Test implementation
  });
});
```

### E2E Tests
```typescript
test('user can navigate and view project details', async ({ page }) => {
  // Playwright test
});
```

---

## 📝 Component Checklist

When creating new components:

- [ ] TypeScript props interface defined
- [ ] PropTypes documented (via TypeScript)
- [ ] Accessibility considerations
- [ ] Responsive design
- [ ] Error boundaries (if needed)
- [ ] Loading states (if async)
- [ ] Empty states (if applicable)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Comments for complex logic
- [ ] Exported from index (if in directory)

---

## 🎯 Best Practices

1. **Component Size**: Keep under 300 lines
2. **Props**: Max 7-10 props per component
3. **Hooks**: Extract to custom hooks if >3 useState
4. **Nesting**: Max 3-4 levels deep
5. **Naming**: PascalCase for components, camelCase for functions
6. **Files**: One component per file
7. **Imports**: Absolute from `src/`, relative for siblings

---

This guide is a living document. Update as components evolve.
