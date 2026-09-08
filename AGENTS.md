# Pavilion repository guide

Pavilion is OllyGarden's presentation system and talks archive. It contains a shared Reveal.js and React design system, dated talk sources, visual assets, and static PDF exports.

## Starting work

Fetch `origin/main` and ensure work starts from its latest revision. Preserve unrelated local changes. Use Bun for every package and script operation.

## Commands

```bash
bun install
bun run check
bun run build
bun run dev
bun run export --deck templates
```

Install the export browser once with `bunx playwright install chromium`.

## Structure

- `src/` owns shared slide components, deck configuration, typography, motion, and print behavior.
- `talks/<year>/<date-event-slug>/` owns one talk's entry point, source deck, and notes.
- `public/assets/` contains shared and talk-specific assets.
- `dist-pdf/` contains tracked static exports.
- `templates.html` exercises the shared layout system.

## Presentation conventions

- Build slides for a 1280×720 canvas and keep content inside the 76-pixel safe area.
- Use Space Grotesk for prose and Inconsolata only for code and tabular labels.
- Use Morning Mist, Sunflower Glow, Deep Forest, and Sprout Green as the dominant palette.
- Keep the alignment grid invisible. Use isolated pixel patterns and dithered botanical imagery as foreground compositions.
- Use motion to communicate order or change. Reduced-motion mode and PDF output must contain every necessary final state.
- Keep screenshots, diagrams, and code readable from the back of a room.
- Use numbered elements only for real sequences.

## Adding a talk

Create `talks/<year>/<date-event-slug>/index.html`, `deck.tsx`, and `README.md`. Add its HTML entry to `vite.config.ts`, add its route to `scripts/export-pdf.mjs`, and link it from the landing page. Generate and inspect the PDF before committing.

Run `bun run check`, `bun run build`, every affected PDF export, and `git diff --check` before opening a pull request.
