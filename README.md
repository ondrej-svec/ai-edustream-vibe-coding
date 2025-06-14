# ☕ AI EduStream Vibe Coding

## Overview
AI EduStream Vibe Coding is a modern **coffee matching application** that helps users discover their perfect coffee based on taste preferences. Built with React, TypeScript, and a Magic UI-inspired design system, it features intelligent coffee recommendations, geographic roaster filtering, and a clean, responsive interface.

## ✨ Recent Updates - Codebase Optimization & Magic UI Redesign

### 🧹 **Major Cleanup (Latest)**
- **43% CSS Bundle Reduction**: Removed 25+ unused UI components (62.63 kB → 35.72 kB)
- **Lean Component Library**: Only 6 actively used components remain
- **Clean Architecture**: Removed obsolete files, optimized imports, fixed lint issues
- **Updated Documentation**: DESIGN_SYSTEM.md now accurately reflects current components

### 🎨 **Magic UI Redesign**
- **Modern Design System**: Magic UI-inspired color palette with blue/purple gradients
- **📱 Mobile-First Responsive Design**: Optimized for all screen sizes with 44px touch targets
- **🎯 Enhanced UX**: Improved typography, spacing, and interactive elements
- **⚡ Performance Optimized**: Clean, efficient component architecture
- **♿ Accessibility Focused**: WCAG compliant with proper focus states and keyboard navigation

## 🚀 Features

### ☕ **Coffee Matching**
- **Intelligent Taste Quiz**: Multi-step questionnaire to determine coffee preferences
- **Geographic Filtering**: Find roasters by continent and country
- **Personalized Recommendations**: AI-powered coffee matching based on taste profile
- **Real-time API Integration**: Live coffee data from backend service

### 🎨 **Design & UX**
- **Magic UI-inspired component library** (6 optimized components)
- **Responsive design system** with 7 custom breakpoints (xs to 3xl)
- **Modern gradient styling** and enhanced visual hierarchy
- **Mobile-first approach** with 44px touch targets
- **Accessibility focused** (WCAG compliant)

### 🛠️ **Technical**
- **React 18** with TypeScript for type safety
- **Tailwind CSS** with custom design tokens
- **React Query** for efficient data fetching
- **React Router** for navigation
- **Comprehensive testing** (Vitest + Playwright)
- **Clean architecture** with abstracted service layer
- **Optimized bundle size** (43% CSS reduction)

## 🎨 Design System

Our lean, optimized design system is built on Magic UI principles with **6 core components**:

### 📦 **Available Components**
1. **Button** - Primary interactive element with gradient variants
2. **Badge** - Status indicators and labels
3. **Card** - Content container component
4. **Input** - Form input fields with validation states
5. **Toaster/Sonner** - Toast notification system
6. **Error Boundary** - Error handling wrapper

### 🎨 **Visual Design**
- **Primary**: Blue gradient (`from-blue-600 to-purple-600`)
- **Accent**: Purple gradient (`from-purple-500 to-pink-500`)
- **Typography**: Inter (body) + Nunito Sans (headings)
- **Rounded corners**: 0.75rem default for modern feel

### 📱 **Responsive Breakpoints**
```javascript
xs: 480px   // Extra small devices (large phones)
sm: 600px   // Small devices (tablets)
md: 768px   // Medium devices (small laptops)
lg: 1024px  // Large devices (laptops)
xl: 1280px  // Extra large devices (desktops)
2xl: 1440px // 2K displays
3xl: 1600px // Large displays
```

For complete design system documentation, see [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

## 🛠️ Getting Started

### Prerequisites
- **Node.js** v18+ (recommended)
- **npm** v9+ (recommended)
- **Git** for version control

### Installation
```bash
git clone <repo-url>
cd ai-edustream-vibe-coding
npm install
```

### Environment Configuration
Create a `.env` file in the project root:
```bash
# Coffee API Configuration
VITE_COFFEE_API_URL=your_backend_api_url_here

# Optional: Additional API keys if needed
# VITE_OTHER_API_KEY=your_key_here
```

## 🚀 Usage

### Development
```bash
npm run dev
# App runs at http://localhost:8080 (or next available port)
```

### Testing
```bash
# Run unit tests
npm test

# Run tests in watch mode
npx vitest

# Run E2E tests (requires dev server running)
npx playwright test
```

### Production Build
```bash
npm run build
npm run preview  # Preview production build locally
```

### Additional Scripts
```bash
npm run lint          # Check code quality
npm run storybook     # Run Storybook (component documentation)
npm run build-storybook  # Build Storybook for deployment
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # 6 core UI components
│   └── RoasterGeographicFilter.tsx
├── pages/
│   ├── Index.tsx          # Landing page
│   ├── Quiz.tsx           # Taste preference quiz
│   ├── BeansList.tsx      # Coffee recommendations
│   └── NotFound.tsx       # 404 page
├── services/
│   └── coffeeService.ts   # API integration
├── types/
│   ├── coffee.ts          # Coffee data types
│   └── coffee-api.ts      # API request/response types
├── hooks/
│   └── useApiCall.ts      # Custom API hook
└── lib/
    └── utils.ts           # Utility functions
```

## 🧪 Testing

Our optimized test suite includes:
- **Unit tests**: Core component functionality (Vitest)
- **Integration tests**: API services and data flow
- **E2E tests**: Complete user workflows (Playwright)
- **Accessibility tests**: WCAG compliance validation

**Test Status**: ✅ All core functionality tests pass. Removed tests for unused components during cleanup.

## 🤝 Contributing

1. **Fork** the repository and create a feature branch
2. **Follow** the Magic UI design system guidelines
3. **Write tests** for new features and components
4. **Ensure accessibility** with keyboard navigation testing
5. **Test responsive design** across all 7 breakpoints
6. **Run linting** with `npm run lint` before committing
7. **Document** new components in DESIGN_SYSTEM.md
8. **Open a pull request** with a clear description

### Code Quality Standards
- TypeScript strict mode enabled
- ESLint configuration with React hooks rules
- Prettier formatting (automatic)
- 100% test coverage for new components

## 🔧 Troubleshooting

### Common Issues
- **Dependencies fail to install**: Update Node.js to v18+ and npm to v9+
- **Dev server won't start**: Check `.env` file configuration and port availability
- **Test failures**: Run `npm run lint` to check for code style issues
- **E2E test issues**: Ensure dev server is running on port 8080
- **Build errors**: Clear `node_modules` and reinstall dependencies

### Performance
- **Bundle size**: Current CSS bundle is 35.72 kB (optimized)
- **Component count**: 6 core components (lean architecture)
- **Build time**: ~10-15 seconds for production build

## License
MIT
