# dangerouslySetInnerHTML Usage Inventory

This document lists all locations in the codebase where `dangerouslySetInnerHTML` is used, with context and risk notes.

---

## 1. src/components/ui/chart.tsx
- **Line 78**: `dangerouslySetInnerHTML={{ ... }}`
  - Used in the ChartStyle component to inject dynamic CSS for chart theming.
  - **Data Source:** Chart configuration object (not user-controlled, but should be reviewed for safety).
  - **Risk:** Low, as long as only trusted theme data is injected. Should still be sanitized and reviewed.

---

**Note:** No other usages of `dangerouslySetInnerHTML` were found in the codebase. 