# Task: Add Input Validation to TasteQuiz and Index

## What Needs to Be Done
Implement input validation for all user-provided data in `src/components/TasteQuiz.tsx` and `src/pages/Index.tsx` before processing or sending preferences.

## How to Do It
- Identify all user input fields in TasteQuiz and Index.
- Define validation rules for each field (e.g., required fields, value ranges, allowed formats).
- Implement validation logic (can use a library like `yup` or custom validation functions).
- Display user-friendly error messages for invalid input.
- Prevent form submission or navigation if validation fails.
- Add tests to cover validation logic and edge cases.

## Definition of Done
- All user input is validated before being processed or sent.
- Users receive clear feedback on invalid input.
- No invalid data can be submitted through the UI.
- Tests cover validation logic and edge cases. 