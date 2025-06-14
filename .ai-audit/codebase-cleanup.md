# Codebase Cleanup Task

## Description
Clean up obsolete and redundant code from the AI EduStream Vibe Coding codebase to improve maintainability and reduce technical debt, while preserving all existing functionality.

## Step-by-Step Instructions

### 1. Remove Obsolete CSS Files and Styles

#### 1.1 Remove App.css
- **File**: `src/App.css`
- **Reason**: This file contains Vite template CSS that is not used anywhere in the application
- **Action**: Delete the entire file
- **Impact**: The styles (`.logo`, `.card`, `.read-the-docs`) are not referenced in any component

#### 1.2 Clean up index.css
- **File**: `src/index.css`  
- **Action**: Remove unused animation keyframes and utilities
- **Specific removals**:
  - Remove `@keyframes fadeInDelay2`, `@keyframes fadeInDelay3`, `@keyframes fadeInDelay4` if not used
  - Check usage of `.animate-fade-in-delay-2`, `.animate-fade-in-delay-3`, `.animate-fade-in-delay-4` classes

### 2. Optimize React Imports

#### 2.1 Remove Explicit React Imports (Modern React/Vite)
- **Files to update**:
  - `src/App.tsx` - Remove `import React from "react";`, use `useEffect` directly from react
  - `src/components/RoasterGeographicFilter.tsx` - Remove `import React from "react";`
  - Story files can keep React imports for Storybook compatibility

#### 2.2 Update App.tsx React usage
- **File**: `src/App.tsx`
- **Action**: 
  - Remove `import React from "react";`
  - Change `React.useEffect` to `useEffect` and add `import { useEffect } from "react";`

### 3. Remove Unused UI Components

Based on the audit, identify and remove UI components that are not imported anywhere in the main application code:

#### 3.1 Potentially Unused Components to Review
- `drawer.tsx` - Not found in any imports
- `input-otp.tsx` - Not found in any imports
- `pagination.tsx` - Not found in any imports
- `resizable.tsx` - Not found in any imports
- `sidebar.tsx` - Not found in any imports
- `table.tsx` - Not found in any imports
- `tabs.tsx` - Not found in any imports
- `calendar.tsx` - Not found in any imports
- `alert.tsx` - Not found in any imports
- `alert-dialog.tsx` - Not found in any imports
- `popover.tsx` - Not found in any imports
- `form.tsx` - Not found in any imports
- `chart.tsx` - Not found in any imports
- `carousel.tsx` - Not found in any imports
- `aspect-ratio.tsx` - Not found in any imports
- `textarea.tsx` - Not found in any imports
- Validation components: `validation-message.tsx`, `validation-summary.tsx`, `field-status.tsx`, `error-message.tsx`
- Skeleton components: `skeleton-card.tsx`, `skeleton-list.tsx`, `skeleton.tsx`
- Utility components: `loader.tsx`, `retry-button.tsx`

**Important**: Before removing, do a comprehensive search to ensure these are truly unused.

### 4. Clean Up Package Dependencies

#### 4.1 Audit Dependencies
Check if these packages can be removed (after confirming components are unused):
- `@radix-ui/react-accordion` - if accordion not used
- `@radix-ui/react-alert-dialog` - if alert-dialog not used
- `@radix-ui/react-aspect-ratio` - if aspect-ratio not used
- `@radix-ui/react-calendar` - if calendar not used
- `@radix-ui/react-collapsible` - if collapsible not used
- `@radix-ui/react-context-menu` - if context-menu not used
- `@radix-ui/react-dialog` - if dialog not used
- `@radix-ui/react-dropdown-menu` - if dropdown-menu not used
- `@radix-ui/react-hover-card` - if hover-card not used
- `@radix-ui/react-menubar` - if menubar not used
- `@radix-ui/react-navigation-menu` - if navigation-menu not used
- `@radix-ui/react-popover` - if popover not used
- `@radix-ui/react-progress` - if progress not used
- `@radix-ui/react-radio-group` - if radio-group not used
- `@radix-ui/react-scroll-area` - if scroll-area not used
- `@radix-ui/react-select` - if select not used (Note: memory indicates shadcn/ui select should be used)
- `@radix-ui/react-slider` - if slider not used
- `@radix-ui/react-switch` - if switch not used
- `@radix-ui/react-tabs` - if tabs not used
- `@radix-ui/react-toggle` - if toggle not used
- `@radix-ui/react-toggle-group` - if toggle-group not used
- `cmdk` - if command not used
- `date-fns` - if date utilities not used
- `embla-carousel-react` - if carousel not used
- `input-otp` - if OTP input not used
- `react-day-picker` - if day picker not used
- `react-resizable-panels` - if resizable panels not used
- `recharts` - if charts not used
- `vaul` - if drawer not used

### 5. Clean Up Test Files

#### 5.1 Remove Test Files for Deleted Components
After removing unused UI components, also remove their corresponding test files and story files.

### 6. Review and Clean Story Files

#### 6.1 Remove Stories for Deleted Components
Remove Storybook stories for any components that were deleted.

### 7. Optimize Configuration Files

#### 7.1 Clean ESLint Configuration
- **File**: `eslint.config.js`
- **Action**: Review and remove any rules or configurations that are no longer needed

#### 7.2 Review TypeScript Configuration
- **Files**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Action**: Ensure all type definitions are still needed

### 8. Clean Up Constants and Types

#### 8.1 Review Type Definitions
- **Directory**: `src/types/`
- **Action**: Remove any type definitions that are no longer used

#### 8.2 Review Constants
- **Directory**: `src/constants/`
- **Action**: Remove any constants that are no longer referenced

## Verification Steps

1. **Build Check**: Run `npm run build` to ensure nothing is broken
2. **Lint Check**: Run `npm run lint` to ensure no linting errors
3. **Test Check**: Run `npm run test` to ensure all tests still pass
4. **Development Server**: Run `npm run dev` and verify all pages load correctly
5. **Storybook Check**: Run `npm run storybook` and verify remaining stories work
6. **Manual Testing**: Navigate through all pages ("/", "/quiz", "/beans") and verify functionality

## Definition of Done

- [ ] All obsolete CSS files and unused styles are removed
- [ ] All unnecessary React imports are cleaned up
- [ ] All truly unused UI components and their tests/stories are removed
- [ ] All unused package dependencies are removed from package.json
- [ ] Application builds successfully without errors
- [ ] All existing functionality works exactly as before
- [ ] All tests pass
- [ ] Storybook builds and displays remaining components correctly
- [ ] No linting errors introduced
- [ ] No broken imports or missing dependencies
- [ ] Development server starts and runs without issues
- [ ] All three main pages (Index, Quiz, BeansList) function correctly

## Risk Mitigation

- **Backup**: Ensure you have a git commit before starting this cleanup
- **Incremental Approach**: Remove items one category at a time and test after each category
- **Search Thoroughly**: Use comprehensive search (including grep/ripgrep) to verify components are truly unused before removal
- **Keep Used Components**: When in doubt, keep the component - it's better to have unused code than broken functionality

## Notes

- This cleanup focuses on reducing bundle size and improving maintainability
- The goal is to remove truly obsolete code while preserving all current functionality
- Some components may be kept for future use even if not currently used in the main application
- Storybook components and test files should be considered part of the development workflow and maintained accordingly 