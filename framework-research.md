# Web presentation framework research

Research checked on September 7, 2026. The comparison uses official project documentation and repositories.

| Framework | Authoring model | Rich HTML | Static export | Fit for this system |
|---|---|---|---|---|
| [reveal.js 6](https://revealjs.com/) | HTML, Markdown, or React | Full browser platform, plugins, fragments, Auto-Animate, speaker notes, and an API | Native Chromium print mode and Decktape support | Selected. It keeps the source close to HTML while the official React wrapper gives us reusable layouts that resemble Petal components. |
| [Slidev](https://sli.dev/) | Markdown with Vue components | Strong interactivity, code, diagrams, drawing, recording, and presenter tools | Built-in PDF, PNG, and image-based PPTX export | Strong alternative for Markdown-first talks. It adds Vue and UnoCSS to a team whose current interface components use React. |
| [Marp](https://marp.app/) | Markdown with CSS themes | Intentionally constrained | Direct HTML, PDF, PPTX, and image conversion | A good fit for simple, static decks. The constraints work against the richer HTML and animation goal. |
| [Spectacle](https://github.com/FormidableLabs/spectacle) | React and JSX | Full React component model and live demos | Browser export mode | Familiar to Petal contributors, but its presentation and print tooling are less complete than reveal.js for this requirement. |

## Decision

Use reveal.js 6.0.1 with `@revealjs/react`. Reveal.js provides first-class HTML presentation behavior, speaker notes, fragments, code highlighting, and PDF export. The official wrapper, added with reveal.js 6, lets the slide system expose typed React components without hiding the resulting HTML.

The static export sets `pdfSeparateFragments: false`, which resolves all fragments onto one PDF page per slide. Print CSS removes the remaining motion. The browser version retains fragments, transitions, code steps, and any deck-specific interactions.

## Design sources

The visual audit included these recent decks from the sibling `talks` repository:

- `2026-07-09-wearedevelopers-otel-mistakes/slides.pdf`, selected for conversion
- `2026-04-16-mastering-obs-hidden-cost-bad-telemetry/slides.pdf`
- `2026-03-26-kubecon-eu-taming-wasteful-telemetry/slides.pdf`
- `2025-11-11-kubecon-na-instrumentation-score/slides.pdf`

The older decks consistently use 16:9 pages, large chapter breaks, botanical imagery, high-contrast green and yellow, and example-heavy evidence slides. The new system keeps those useful traits while reducing decorative repetition and increasing the size of screenshots and code.

Petal contributes the current dark depth model, Space Grotesk and Inconsolata, rounded 20-pixel content surfaces, restrained hairlines, semantic data colors, reduced-motion behavior, and a grid that separates context from action. Slides use those ideas as a visual language instead of reproducing application screens.
