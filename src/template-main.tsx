import { createRoot } from 'react-dom/client';
import { Code } from '@revealjs/react';
import { PresentationDeck } from './deck';
import { BaseSlide, Card, Cards, ChapterSlide, ClosingSlide, ContentSlide, CoverSlide, FragmentCard, Metric, StatementSlide } from './components';

function TemplateGallery() {
  return (
    <PresentationDeck>
      <CoverSlide title="A presentation system for trustworthy telemetry" subtitle="HTML when presenting, one static page per slide in PDF" meta="Template gallery · 2026" image="/assets/source/plant-cover.jpg" />
      <ChapterSlide number="01" title="Section divider" detail="A numbered chapter only when the deck has a real sequence." image="/assets/source/plant-section.jpg" />
      <StatementSlide>One idea fills the room. Everything else gets out of its way.</StatementSlide>
      <ContentSlide title="Concept comparison">
        <Cards columns={3}>
          <FragmentCard title="Collect" accent="var(--og-sprout)"><p>Gather the signals needed to answer a defined question.</p></FragmentCard>
          <FragmentCard title="Understand" accent="var(--og-highlight)"><p>Keep context that explains behavior across service boundaries.</p></FragmentCard>
          <FragmentCard title="Act" accent="var(--og-sprout)"><p>Make the next diagnostic step clear to the operator.</p></FragmentCard>
        </Cards>
      </ContentSlide>
      <ContentSlide title="A small set of meaningful numbers">
        <div className="metric-row"><Metric value="85%" label="Noise removed" detail="After route and severity filters" /><Metric value="42" label="Services checked" detail="Across production namespaces" /><Metric value="3" label="Issues to fix first" detail="Ranked by impact" /></div>
      </ContentSlide>
      <ContentSlide title="Code with room to read">
        <Code language="yaml" lineNumbers="1-4|6-10">{`processors:
  filter/drop-health-checks:
    error_mode: ignore
    traces:
      span:
        - IsMatch(name, "^(GET|HEAD) /healthz$")

service:
  pipelines:
    traces:
      processors: [filter/drop-health-checks]`}</Code>
      </ContentSlide>
      <ContentSlide title="Petal depth without dashboard chrome" tone="section">
        <Cards columns={2}><Card title="Context"><p>A flush region explains what the audience needs to know.</p></Card><Card title="Action" accent="var(--og-highlight)"><p>The brighter slab carries the decision or the concrete next step.</p></Card></Cards>
      </ContentSlide>
      <BaseSlide tone="light" className="layout-statement"><blockquote>Light slides reset attention and keep a long technical deck from feeling monotonous.</blockquote></BaseSlide>
      <ContentSlide title="Five takeaways fit when the hierarchy is clear"><ol className="takeaway-list"><li>Start with the operational question.</li><li>Keep the signal that helps answer it.</li><li>Show evidence at a readable size.</li><li>Use motion to explain change.</li><li>Resolve every animation for print.</li></ol></ContentSlide>
      <ClosingSlide name="Juraci Paixão Kröhling" role="Founder and CEO, OllyGarden" url="https://ollygarden.com" />
    </PresentationDeck>
  );
}

createRoot(document.getElementById('root')!).render(<TemplateGallery />);
