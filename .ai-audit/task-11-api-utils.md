# Task 11: Review and Improve API Utility (src/lib/api.ts)

## What needs to be done

Review the new API utility in `src/lib/api.ts` and improve its maintainability, error handling, and documentation. Ensure it follows clean code and DRY principles, and is ready for use across the codebase.

## Step-by-step instructions

1. **Extract Constants:**
   - Move `BASE_URL` and `TIMEOUT_MS` to a shared config/constants file if not already done.
   - Update imports in `api.ts` accordingly.
2. **Document Interceptor Pattern:**
   - Add clear JSDoc comments to the API utility functions and interceptor registration methods.
   - Create a short markdown or code comment guide on how to use and extend the interceptor pattern.
3. **Improve Error Handling:**
   - Refactor error handling to provide more structured error objects (not just `Error` with status).
   - Optionally, add support for custom error types or error codes.
4. **Validate API Responses:**
   - Add runtime validation for API responses (e.g., using Zod or custom type guards) to ensure consumers receive expected data shapes.
5. **Add Unit Tests:**
   - Write unit tests for the API utility, covering interceptors, timeouts, error handling, and response validation.
6. **Update Usage:**
   - Refactor at least one existing API consumer in the codebase to use the improved utility and document the migration process.

## Definition of Done

- `BASE_URL` and `TIMEOUT_MS` are defined in a shared constants/config file.
- All API utility functions and interceptors are documented with JSDoc.
- Error handling is structured and provides actionable information to consumers.
- API responses are validated at runtime, and invalid data is handled gracefully.
- Unit tests cover all major utility features and edge cases.
- At least one real usage example is migrated and documented.
- This markdown file is updated with notes on what was changed and any follow-up recommendations. 