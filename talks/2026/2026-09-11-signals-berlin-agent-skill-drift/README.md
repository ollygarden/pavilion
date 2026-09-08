# Your agent skill was right in March

Presented by Juraci Paixão Kröhling at Signals Berlin on September 11, 2026.

The five-minute lightning talk shows how agent skills silently drift as their source projects change. It compares six models' recalled OpenTelemetry Collector versions, uses a component rename to show how stale guidance can keep working, then gives skills a maintenance contract: a source, a freshness signal, and a test.

## Files

- `index.html` is the Vite and browser entry point.
- `deck.tsx` contains the six-slide sequence and speaker notes.
- `talk.css` contains the talk-specific comparison, recovery-loop, and closing layouts.
- The static export is `../../../dist-pdf/signals-berlin-agent-skill-drift.pdf`.

## Run and export

From the repository root:

```bash
bun run dev
bun run export --deck signals-berlin-agent-skill-drift
```
