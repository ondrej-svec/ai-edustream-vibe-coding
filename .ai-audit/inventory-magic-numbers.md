# Magic Numbers and Constants Inventory

This document lists all magic numbers and hardcoded constants found in the codebase, with suggestions for extraction.

---

## 1. src/pages/BeansList.tsx
- **Lines 41-122**: Hardcoded values for coffee IDs, prices, water temperatures, brew times, and recipe steps in the baseRecommendations array.
  - **Suggestion:** Extract these values to a constants file or fetch from an API.

## 2. src/pages/NotFound.tsx
- **Lines 14-18**: Hardcoded class names, error messages, and status codes (e.g., "404", "Oops! Page not found").
  - **Suggestion:** Extract user-facing strings and status codes to a constants/messages file.

## 3. src/components/ui/* and other UI files
- **Throughout**: Hardcoded class names, placeholder text, and color codes in component definitions (e.g., input, select, textarea, button, sidebar).
  - **Suggestion:** Extract repeated class names and display values to a UI constants file for maintainability.

## 4. src/lib/api.ts
- **Lines 1-2**: Hardcoded constants for BASE_URL ('/api') and TIMEOUT_MS (10000 ms).
  - **Suggestion:** Extract these values to a shared config/constants file for consistency and maintainability.

---

**Note:** This is a sample; a full codebase scan may reveal additional magic numbers/constants, especially as new features are added. 