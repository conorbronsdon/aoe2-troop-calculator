# Development Guide

This guide provides detailed instructions for setting up and developing the AoE2 Troop Calculator.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Commands](#development-commands)
- [Configuration](#configuration)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Debugging](#debugging)
- [Building for Production](#building-for-production)
- [Common Issues](#common-issues)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git**

Verify your installations:
```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 8.0.0
git --version
```

### Recommended Tools

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - EditorConfig
  - ES7+ React/Redux/React-Native snippets
- **React Developer Tools** (browser extension)
- **Git client** (GitHub Desktop, GitKraken, etc.)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/conorbronsdon/aoe2-troop-calculator.git
cd aoe2-troop-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Project Structure

```
aoe2-troop-calculator/
├── public/                 # Static assets
│   └── images/            # Favicons, OG images
├── src/
│   ├── components/        # React components
│   │   ├── UnitCard.jsx
│   │   ├── UnitSelection.jsx
│   │   ├── ResourceTracker.jsx
│   │   └── ...
│   ├── context/           # React context providers
│   │   ├── ArmyContext.jsx    # Main state management
│   │   └── ThemeContext.jsx   # Dark/light mode
│   ├── data/              # Game data
│   │   ├── units/         # Unit definitions
│   │   ├── civilizations.js
│   │   ├── fortifications.js
│   │   └── techTree.js
│   ├── services/          # Business logic
│   │   ├── export.service.js
│   │   ├── share.service.js
│   │   └── storage.service.js
│   ├── utils/             # Utility functions
│   │   ├── calculations.js
│   │   ├── validators.js
│   │   ├── errorHandler.js
│   │   └── analytics.js
│   ├── config/            # App configuration
│   │   └── analytics.config.js
│   ├── constants.js       # Application constants
│   ├── App.jsx            # Root component
│   ├── App.css            # Global styles
│   └── main.jsx           # Entry point
├── tests/                 # Test files
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .editorconfig          # Editor configuration
├── vite.config.js         # Vite build configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project overview
```

## Development Commands

### Daily Development

```bash
# Start development server (with hot reload)
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Check test coverage
npm run test:coverage
```

### Code Quality

```bash
# Lint code (check for issues)
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Run all checks (lint + test)
npm run check
```

### Building

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Copy the example file
cp .env.example .env.local
```

Available variables:

```env
# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Vite Configuration

The `vite.config.js` file controls the build process:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/aoe2-troop-calculator/',  // GitHub Pages path
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

## Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run specific test file
npm test -- src/utils/calculations.test.js

# Run tests matching a pattern
npm test -- --grep "calculateUnitCost"
```

### Writing Tests

Tests use [Vitest](https://vitest.dev/) (Vite's test runner):

```javascript
// src/utils/calculations.test.js
import { describe, it, expect } from 'vitest';
import { calculateUnitCost } from './calculations';

describe('calculateUnitCost', () => {
  it('should return base cost for generic civilization', () => {
    const unit = {
      id: 'knight',
      cost: { food: 60, gold: 75 }
    };
    const civ = { id: 'generic', bonuses: [] };

    const result = calculateUnitCost(unit, civ);

    expect(result.food).toBe(60);
    expect(result.gold).toBe(75);
  });

  it('should apply discount bonuses correctly', () => {
    // Test implementation
  });
});
```

### Test Organization

- Unit tests: `src/**/*.test.js`
- Integration tests: `tests/integration/`
- E2E tests: `tests/e2e/`

## Code Quality

### ESLint

ESLint enforces code quality rules:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

Key rules:
- No unused variables
- React hooks rules
- Prop-types validation
- No console.log (use logger utility)

### Prettier

Prettier handles code formatting:

```bash
# Format all files
npm run format
```

Configuration in `.prettierrc`:
- 2 space indentation
- Single quotes
- Semicolons required
- 100 character line width

### EditorConfig

Ensures consistent editor settings across IDEs. Install the EditorConfig extension for your editor.

## Debugging

### React Developer Tools

Install the browser extension to:
- Inspect component hierarchy
- View props and state
- Profile performance

### Logger Utility

Use the built-in logger instead of console:

```javascript
import { logger } from '../utils/errorHandler';

// Available methods:
logger.error('Something went wrong', error);
logger.warn('Potential issue', data);
logger.info('Information', data);
logger.debug('Debug info', data);  // Only in development
```

### Common Debugging Techniques

1. **State inspection**: Use React DevTools to view ArmyContext state
2. **Network issues**: Check browser Network tab for API calls
3. **Performance**: Use React DevTools Profiler
4. **Build issues**: Check Vite output for errors

## Building for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

Build output goes to `dist/` directory.

### Deployment

The app deploys automatically to GitHub Pages via GitHub Actions when pushing to `main`.

Manual deployment:
```bash
npm run build
# Deploy dist/ folder to your hosting
```

## Common Issues

### "Module not found" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port already in use

```bash
# Kill process on port 3000
kill -9 $(lsof -t -i:3000)

# Or use different port
npm run dev -- --port 3001
```

### Tests failing after changes

```bash
# Clear Vitest cache
npx vitest --clearCache

# Run tests again
npm test
```

### Build fails with memory issues

```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### ESLint/Prettier conflicts

Ensure both are configured correctly:
```bash
# Install ESLint-Prettier integration
npm install --save-dev eslint-config-prettier
```

### Hot reload not working

1. Check for syntax errors in the terminal
2. Restart the dev server
3. Clear browser cache
4. Check for circular imports

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## Getting Help

- Check existing issues on GitHub
- Review the [CONTRIBUTING.md](./CONTRIBUTING.md) guide
- Look at similar code in the codebase
- Open a discussion for questions
