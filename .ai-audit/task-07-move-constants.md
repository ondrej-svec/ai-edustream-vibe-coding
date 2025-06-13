# Task: Move Magic Numbers and Constants to a Dedicated Constants File

## What Needs to Be Done
Identify all magic numbers and hardcoded constants in the codebase and move them to a dedicated constants file (e.g., `src/constants/index.ts`).

## How to Do It
- Search for all hardcoded values (numbers, strings, etc.) that are not self-explanatory.
- Create a new file at `src/constants/index.ts` (or similar).
- Move all relevant constants to this file with descriptive names.
- Replace usages in the codebase with imports from the constants file.
- Document the purpose of each constant.

## Definition of Done
- No unexplained magic numbers or hardcoded values remain in the codebase.
- All constants are defined in a dedicated file and imported where needed.
- Code is more readable and maintainable. 