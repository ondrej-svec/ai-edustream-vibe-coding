# Mock Data Inventory

This document lists all locations in the codebase where mock data, placeholder, or sample data is used.

---

## 1. src/components/RecommendationsPanel.tsx
- **Line 24**: `// Mock AI recommendations based on preferences`
  - Hardcoded array of coffee recommendations used for demo/testing purposes.

## 2. src/pages/BeansList.tsx
- **Lines 41-122**: Multiple hardcoded coffee objects in the `baseRecommendations` array.
  - Used to generate coffee recommendations and recipes for the UI.

---

**Note:** No dedicated `mock`, `fixtures`, or `sample` data files were found, but hardcoded arrays/objects are present in the above files. These should be replaced with real API integration as part of the refactor plan. 