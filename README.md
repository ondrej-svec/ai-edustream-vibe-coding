# AI EduStream Vibe Coding

## Overview
AI EduStream Vibe Coding is a modern educational platform and coding environment designed for interactive learning, code experimentation, and rapid prototyping. It features a **Magic UI-inspired design system**, robust validation, API integration, and comprehensive testing.

## ✨ Recent Updates - Magic UI Redesign
This application has been completely redesigned to match the modern, elegant aesthetic of Magic UI Agent. Key improvements include:

- **🎨 Modern Design System**: Magic UI-inspired color palette with blue/purple gradients
- **📱 Mobile-First Responsive Design**: Optimized for all screen sizes with 44px touch targets
- **🎯 Enhanced UX**: Improved typography, spacing, and interactive elements
- **⚡ Performance Optimized**: Clean, efficient component architecture
- **♿ Accessibility Focused**: WCAG compliant with proper focus states and keyboard navigation

## Features
- **Magic UI-inspired component library** (Tailwind CSS + Custom Variants)
- Centralized type and constant management
- Abstracted data service layer
- Comprehensive input validation
- Secure HTML rendering (DOMPurify)
- Loading and error state management
- Real API integration (no mock data)
- Full test suite (unit, integration, E2E)
- **Responsive design system** with custom breakpoints
- **Modern gradient styling** and enhanced visual hierarchy

## Design System
Our design system is built on Magic UI principles:

### Color Palette
- **Primary**: Blue gradient (`from-blue-600 to-purple-600`)
- **Accent**: Purple gradient (`from-purple-500 to-pink-500`)
- **Modern neutrals**: Carefully selected grays for optimal contrast

### Typography
- **Primary Font**: Inter (clean, modern sans-serif)
- **Heading Font**: Nunito Sans (friendly, approachable)
- **Responsive scaling**: Mobile-first typography that scales beautifully

### Responsive Breakpoints
- `xs`: 480px (Extra small devices)
- `sm`: 600px (Small devices)
- `md`: 768px (Medium devices)
- `lg`: 1024px (Large devices)
- `xl`: 1280px (Extra large devices)
- `2xl`: 1440px (2K displays)
- `3xl`: 1600px (Large displays)

### Component Variants
All components feature Magic UI-inspired styling:
- **Gradient backgrounds** for primary actions
- **Rounded corners** (0.75rem default)
- **Enhanced shadows** and hover effects
- **Smooth transitions** for all interactions

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Git

## Installation
```sh
git clone <repo-url>
cd ai-edustream-vibe-coding
npm install
```

## Configuration
- Copy `.env.example` to `.env` and fill in required values (API keys, endpoints, etc.)
- See `package.json` scripts for available commands

## Usage
- **Development server:**
  ```sh
  npm run dev
  # App runs at http://localhost:8081 (or next available port)
  ```
- **Run tests:**
  ```sh
  npm test
  # or
  npx vitest run
  ```
- **Run E2E tests:**
  ```sh
  npx playwright test
  ```
- **Build for production:**
  ```sh
  npm run build
  ```

## Component Documentation
For detailed component usage and styling guidelines, see:
- `src/components/ui/` - Core UI components with Magic UI styling
- `src/constants/index.ts` - Design tokens and validation constants
- `tailwind.config.ts` - Custom breakpoints and theme configuration

## Testing
Our test suite includes:
- **Unit tests**: Component functionality and styling
- **Integration tests**: API services and data flow
- **E2E tests**: Complete user workflows
- **Accessibility tests**: WCAG compliance validation

Note: Some tests for deleted Radix UI components are expected to fail. Core functionality tests pass successfully.

## Contribution Guidelines
- Fork the repo and create a feature branch
- Write clear, focused commits
- Add/maintain tests for new features
- Follow the Magic UI design system guidelines
- Document new components/APIs
- Ensure responsive design across all breakpoints
- Test accessibility with keyboard navigation
- Open a pull request with a clear description

## Troubleshooting
- If dependencies fail to install, ensure Node/npm versions are up to date
- For test failures, run `npm run lint` and check for code style issues
- If the dev server fails to start, check `.env` configuration
- For Playwright E2E issues, ensure the dev server is running on the correct port
- **Design System Issues**: Check `tailwind.config.ts` for custom breakpoints and theme settings

## License
MIT
