# 🎙️ Pavilion

Pavilion is OllyGarden's presentation system and talks archive. It contains reusable HTML slide templates, source decks, assets, and static PDF exports.

Like a garden pavilion, this is where people gather to share ideas. The browser deck can use fragments, transitions, live HTML, and speaker notes. The PDF export resolves motion into one static page per slide.

## Quick start

```bash
bun install
bun run dev
```

Open the deck index shown by Vite. The repository currently includes a template gallery, a conversion of the July 2026 “The OpenTelemetry mistakes I keep seeing” talk, and the September 2026 Signals Berlin lightning talk “Your agent skill was right in March.”

## Repository structure

- `src/` contains the shared Reveal.js wrapper, slide primitives, and OllyGarden theme.
- `talks/<year>/<date-event-slug>/` contains each talk's HTML entry point, deck source, and notes.
- `public/assets/` contains shared and talk-specific visual assets.
- `dist-pdf/` contains the static exports that accompany talks.
- `templates.html` is the living gallery for reusable slide patterns.

## Export

Install the Chromium runtime once after installing dependencies:

```bash
bunx playwright install chromium
```

Export a deck:

```bash
bun run export --deck templates
bun run export --deck otel-mistakes
bun run export --deck signals-berlin-agent-skill-drift
```

PDF files go to `dist-pdf/` by default. Pass `--output path/to/deck.pdf` to choose another destination.

## Layouts

`src/components.tsx` contains the reusable slide primitives:

- `CoverSlide` for the opening title and event details
- `ChapterSlide` for a real numbered sequence
- `StatementSlide` for one idea that needs the full slide
- `ContentSlide` for comparisons, evidence, code, and takeaways
- `EvidenceSlide` for screenshots and other source material
- `ClosingSlide` for the final contact slide

`src/theme.css` owns tokens, typography, alignment, layout styles, motion, and print behavior. New decks should compose these primitives and add a deck-specific class only when the content needs a layout that the shared set cannot express.

## Design rules

Slides use a 1280×720 canvas and a 76-pixel safe area. Space Grotesk carries all prose, while Inconsolata is reserved for code and tabular labels. The default background follows Petal’s dark depth model. The yellow highlight marks the strongest idea, and sprout green carries structure.

Use the pixel bloom once per composition, normally at an edge. Use cards only when content represents parallel units. Screenshots and code must remain large enough to read from the back of a room. Browser motion should explain order or change, and every animated state must have a complete static PDF state.

The visual direction is **cultivated signal**: structured telemetry meeting a botanical system. Use Morning Mist, Sunflower Glow, Deep Forest, and Sprout Green as the dominant palette. Dithered botanical images and discrete square signal patterns provide the recognizable visual signature. Extended colors are reserved for semantic distinctions that the core palette cannot express.

Keep the layout grid invisible. Full-slide pixel grids overload the composition and are not part of the slide background. Use an isolated 8×8 or 16×16 pixel pattern at an edge, with roughly 75% of its visible tiles in one color. Text always sits on a solid field and aligns to the pattern’s tile boundaries.

Spend visual emphasis in one place per slide. Prefer open fields, shared rules, and asymmetrical negative space over collections of floating rounded cards. Numbering represents a real sequence, never decoration. Keep labels in sentence case, keep lines short, and let typography carry the hierarchy.

Motion is an orchestrated signal, not ambient decoration. Covers use one image reveal and signal scan. Pixel patterns assemble as a slide becomes active. Content fragments resolve in place instead of repeatedly sliding upward. Reduced-motion mode and print remove all animation.

See [framework-research.md](framework-research.md) for the framework decision and source-deck audit.
