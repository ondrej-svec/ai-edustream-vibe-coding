# Task: Replace Mock Coffee Data with Real API Integration

## What Needs to Be Done
Replace all hardcoded/mock coffee data in `src/components/RecommendationsPanel.tsx` and `src/pages/BeansList.tsx` with real data fetched from an API or backend service.

## How to Do It
- Identify all locations where coffee data is currently hardcoded (arrays, objects, etc.).
- Design or use an existing API endpoint that returns coffee recommendations and details.
- Replace the mock data with asynchronous data fetching logic (e.g., using `fetch`, `axios`, or a custom data service).
- Update the UI to handle loading and error states while data is being fetched.
- Ensure the data structure from the API matches the expected structure in the UI components.
- Remove all mock data and placeholder logic.

## Definition of Done
- No hardcoded/mock coffee data remains in the codebase.
- All coffee recommendations and details are fetched from a real API.
- UI displays loading and error states appropriately.
- Code is tested and verified to work with the real data source. 