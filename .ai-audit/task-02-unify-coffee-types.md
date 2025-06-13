# Task: Extract and Unify Coffee Interfaces into a Shared Types File

## What Needs to Be Done
Move all `Coffee` interfaces/types from individual files into a single shared types file (e.g., `src/types/coffee.ts`). Update all imports to use this shared type.

## How to Do It
- Create a new file at `src/types/coffee.ts`.
- Consolidate all `Coffee` interfaces/types from `src/components/RecommendationsPanel.tsx`, `src/pages/BeansList.tsx`, and any other relevant files.
- Ensure the unified type covers all required fields.
- Update all files that use the `Coffee` type to import it from the new shared file.
- Remove any duplicate or outdated type definitions.

## Definition of Done
- There is a single source of truth for the `Coffee` type in `src/types/coffee.ts`.
- All files use the shared type via import.
- No duplicate or conflicting `Coffee` type definitions remain in the codebase. 