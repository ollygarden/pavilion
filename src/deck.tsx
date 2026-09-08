import type { ReactNode } from 'react';
import { Deck } from '@revealjs/react';
import RevealHighlight from 'reveal.js/plugin/highlight';
import RevealNotes from 'reveal.js/plugin/notes';
import RevealSearch from 'reveal.js/plugin/search';
import 'reveal.js/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource/inconsolata/400.css';
import '@fontsource/inconsolata/700.css';
import './theme.css';

export function PresentationDeck({ children }: { children: ReactNode }) {
  return (
    <Deck
      plugins={[RevealHighlight, RevealNotes, RevealSearch]}
      config={{
        width: 1280,
        height: 720,
        margin: 0,
        hash: true,
        history: true,
        controls: 'speaker',
        progress: true,
        center: false,
        transition: 'fade',
        backgroundTransition: 'fade',
        pdfMaxPagesPerSlide: 1,
        pdfSeparateFragments: false,
      }}
      onReady={() => {
        document.documentElement.dataset.deckReady = 'true';
      }}
    >
      {children}
    </Deck>
  );
}
