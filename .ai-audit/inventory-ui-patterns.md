# Repeated UI Patterns Inventory

This document catalogs repeated UI patterns and opportunities for reusable components.

---

## 1. src/pages/BeansList.tsx
- **Lines 195-394**: Multiple card layouts for displaying coffee recommendations, including repeated use of Card, CardHeader, CardContent, and Badge components.
  - **Suggestion:** Extract a reusable CoffeeCard component (if not already present) and consider further abstraction for repeated info sections (e.g., brewing method, shop info).

## 2. src/components/RecommendationsPanel.tsx
- **Lines 60-120**: Repeated rendering of CoffeeCard components for each recommendation.
  - **Suggestion:** Ensure CoffeeCard is fully reusable and consider extracting shared UI for empty state messages.

---

**Note:** Other UI components (inputs, buttons, forms) are already abstracted, but review for further DRY opportunities as the codebase evolves. 