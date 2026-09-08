# The OpenTelemetry mistakes I keep seeing

Presented by Juraci Paixão Kröhling at WeAreDevelopers in Berlin on July 9, 2026.

The talk covers four recurring OpenTelemetry problems found in production telemetry: sensitive-data leakage, over-instrumentation, missing failure-path context, and choosing the wrong signal for a question.

## Files

- `index.html` is the Vite and browser entry point.
- `deck.tsx` contains the slide sequence.
- The static export is `../../../dist-pdf/otel-mistakes.pdf`.

## Run and export

From the repository root:

```bash
bun run dev
bun run export --deck otel-mistakes
```
