# Task: Create Data Service and Add Loading/Error States

## What Needs to Be Done
Abstract all data fetching logic for coffee recommendations into a dedicated data service (e.g., `src/lib/api.ts`). Update UI components to use this service and handle loading and error states.

## How to Do It
- Create a new file (e.g., `src/lib/api.ts`) to encapsulate all API calls for coffee data.
- Refactor components to use this service instead of direct data fetching or mock data.
- Implement loading and error state handling in all relevant UI components.
- Display appropriate UI feedback (spinners, error messages) during loading or on failure.
- Add tests for the data service and UI state handling.

## Definition of Done
- All coffee data is fetched via a centralized data service.
- UI components display loading and error states as appropriate.
- No direct data fetching or mock data remains in UI components.
- Tests cover data service and UI state transitions. 