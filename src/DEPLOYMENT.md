# Deployment Guide

Production deployment guide for the portfolio website.

---

## 🚀 Quick Deploy

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

**Why Vercel**:
- Zero configuration
- Global CDN
- Automatic HTTPS
- Preview deployments
- Built-in analytics

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy to production
netlify deploy --prod --dir=dist
```

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Cloudflare Pages

```bash
# Install Wrangler
npm i -g wrangler

# Deploy
wrangler pages publish dist
```

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved (`npm run build`)
- [ ] No console.log statements in production code
- [ ] ESLint warnings addressed
- [ ] Proper error handling implemented

### Performance
- [ ] Lighthouse score > 90 on all metrics
- [ ] Images optimized (WebP/AVIF when possible)
- [ ] Bundle size analysis reviewed
- [ ] Critical CSS inlined
- [ ] Lazy loading implemented

### SEO
- [ ] Meta tags configured
- [ ] Open Graph tags added
- [ ] Twitter Card tags added
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Canonical URLs set

### Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Color contrast ratios validated (4.5:1 minimum)

### Security
- [ ] Environment variables secured
- [ ] No sensitive data in client code
- [ ] CSP headers configured
- [ ] HTTPS enforced
- [ ] Dependencies updated (no known vulnerabilities)

### Content
- [ ] All placeholder text replaced
- [ ] Contact information updated
- [ ] Resume PDF uploaded
- [ ] Social media links verified
- [ ] Portfolio projects accurate

---

## 🔧 Build Configuration

### Production Build

```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Run production build
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables

Create `.env.production`:

```env
VITE_APP_ENV=production
VITE_API_URL=https://api.takirami.dev
VITE_ENABLE_ANALYTICS=true
```

### Build Optimization

**Vite Config** (`vite.config.ts`):

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
          animations: ['motion'],
        },
      },
    },
  },
});
```

---

## 🌍 CDN Configuration

### Custom Domain

**Vercel**:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records:
   ```
   A Record: 76.76.21.21
   CNAME: cname.vercel-dns.com
   ```

**Netlify**:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS:
   ```
   A Record: 75.2.60.5
   CNAME: [your-site].netlify.app
   ```

### SSL/TLS

All platforms provide automatic SSL certificates via Let's Encrypt.

---

## 📊 Performance Monitoring

### Lighthouse CI

**.github/workflows/lighthouse.yml**:

```yaml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

**lighthouserc.js**:

```javascript
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

### Core Web Vitals

Monitor with:
- **Vercel Analytics**: Built-in Real User Monitoring
- **Google Search Console**: Search performance + CWV
- **Cloudflare Web Analytics**: Privacy-focused

---

## 🔒 Security Headers

### Vercel (`vercel.json`):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
        }
      ]
    }
  ]
}
```

---

## 📈 Analytics Integration

### Plausible (Recommended)

**Add to `index.html`**:

```html
<script defer data-domain="takirami.dev" src="https://plausible.io/js/script.js"></script>
```

**Features**:
- Privacy-friendly (GDPR compliant)
- No cookies
- Lightweight (<1KB)
- Open source

### Google Analytics

```tsx
// src/utils/analytics.ts
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId) return;
  
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', measurementId);
};
```

---

## 🐛 Error Tracking

### Sentry Setup

```bash
npm install @sentry/react
```

**src/main.tsx**:

```tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

**.github/workflows/deploy.yml**:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit
      
      - name: Build
        run: npm run build
        env:
          VITE_GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
      
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: https://takirami.dev
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📱 Progressive Web App (PWA)

### Setup (Future Enhancement)

```bash
npm install vite-plugin-pwa -D
```

**vite.config.ts**:

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Taki Eddine Rami - Portfolio',
        short_name: 'TER Portfolio',
        description: 'Senior Full-Stack Engineer Portfolio',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

---

## 🌐 Internationalization (Future)

### Setup i18n

```bash
npm install react-i18next i18next
```

**src/i18n/config.ts**:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: require('./en.json') },
    fr: { translation: require('./fr.json') },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
```

---

## 🔍 SEO Optimization

### Meta Tags Template

```tsx
// src/components/SEO.tsx
export const SEO = ({ title, description, image }) => (
  <Helmet>
    <title>{title} | Taki Eddine Rami</title>
    <meta name="description" content={description} />
    
    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    
    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);
```

### Sitemap Generation

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://takirami.dev/</loc>
    <lastmod>2024-02-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://takirami.dev/about</loc>
    <lastmod>2024-02-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

---

## 📊 Performance Budget

### Targets

| Metric | Target | Critical |
|--------|--------|----------|
| Bundle Size (JS) | < 200KB | < 300KB |
| Bundle Size (CSS) | < 50KB | < 75KB |
| LCP | < 2.5s | < 4.0s |
| FID | < 100ms | < 300ms |
| CLS | < 0.1 | < 0.25 |
| TTI | < 3.8s | < 7.3s |

### Monitoring

```bash
# Analyze bundle
npm run build -- --analyze

# Check bundle size
npm run build && ls -lh dist/assets/
```

---

## 🚨 Troubleshooting

### Build Failures

**Issue**: TypeScript errors in build
```bash
# Clear cache and rebuild
rm -rf node_modules dist .cache
npm install
npm run build
```

**Issue**: Out of memory
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Deployment Issues

**Issue**: 404 on client-side routes
- Ensure SPA redirect is configured
- Add `_redirects` (Netlify) or `vercel.json` (Vercel)

**Issue**: Environment variables not working
- Prefix with `VITE_` for Vite
- Add to platform dashboard (Vercel/Netlify)
- Restart deployment

---

## 📞 Support

For deployment issues:
- **Vercel**: https://vercel.com/support
- **Netlify**: https://www.netlify.com/support/
- **Cloudflare**: https://developers.cloudflare.com/support/

---

**Last Updated**: February 11, 2024
**Maintained By**: Taki Eddine Rami
