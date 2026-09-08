# I know OTel

Presented by Juraci Paixão Kröhling at Code Europe in Warsaw on September 15, 2026.

The talk shows why coding agents need maintained OpenTelemetry knowledge, compares the same Go instrumentation task with and without the `otel-go` skill, and verifies the result in running telemetry. The comparison uses the September 7, 2026 Hermes benchmark documented in the adjacent content repository.

## Files

- `index.html` is the Vite and browser entry point.
- `deck.tsx` contains the 26-slide sequence and speaker notes.
- `talk.css` contains the talk-specific layouts.
- The static export is `../../../dist-pdf/code-europe-i-know-otel.pdf`.

## Run and export

From the repository root:

```bash
bun run dev
bun run export --deck code-europe-i-know-otel
```

The live demonstration uses a separate prepared repository and recording. Slide 21 holds the transition while switching away from the deck.
