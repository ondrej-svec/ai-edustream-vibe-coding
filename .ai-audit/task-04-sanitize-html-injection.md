# Task: Audit and Sanitize All Values Passed to dangerouslySetInnerHTML in ChartStyle

## What Needs to Be Done
Review and sanitize all values interpolated into the `dangerouslySetInnerHTML` prop in `src/components/ui/chart.tsx` to prevent XSS vulnerabilities.

## How to Do It
- Locate all uses of `dangerouslySetInnerHTML` in the codebase, especially in `ChartStyle`.
- Ensure that no user-controlled or untrusted data is ever interpolated into the HTML string.
- If any dynamic values are used, sanitize them using a library like `dompurify` or by strict whitelisting.
- Add comments explaining why the usage is safe, or refactor to avoid `dangerouslySetInnerHTML` if possible.
- Add tests to verify that unsafe input cannot result in XSS.

## Definition of Done
- All uses of `dangerouslySetInnerHTML` are reviewed and safe.
- No user-controlled data is injected unsafely.
- Comments or documentation explain the safety of the implementation.
- Tests verify that XSS is not possible via this vector. 