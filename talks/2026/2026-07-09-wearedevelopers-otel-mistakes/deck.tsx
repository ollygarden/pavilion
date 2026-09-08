import { createRoot } from 'react-dom/client';
import { PresentationDeck } from '../../../src/deck';
import { Card, Cards, ChapterSlide, ClosingSlide, ContentSlide, CoverSlide, EvidenceSlide, FragmentCard, StatementSlide } from '../../../src/components';

const source = (name: string) => `/assets/source/${name}`;

function OtelMistakesDeck() {
  return (
    <PresentationDeck>
      <CoverSlide title="The OpenTelemetry mistakes I keep seeing" subtitle="And how to stop making them" meta="Juraci Paixão Kröhling · WeAreDevelopers 2026" image={source('plant-cover.jpg')} />
      <ContentSlide title="Juraci Paixão Kröhling"><Cards columns={2}><Card title="OpenTelemetry"><p>Governance Committee member and long-time project contributor.</p></Card><Card title="OllyGarden"><p>Founder and CEO. Helping teams build telemetry they can trust.</p></Card></Cards></ContentSlide>
      <StatementSlide>I’ll help you and your agents have telemetry you can trust.</StatementSlide>
      <ContentSlide title="Agenda"><Cards columns={3}><FragmentCard title="Telemetry primer"><p>The terms and boundaries we need for the examples.</p></FragmentCard><FragmentCard title="Four mistakes"><p>Real, anonymized failures found in production telemetry.</p></FragmentCard><FragmentCard title="Key takeaways"><p>A practical way to find and prevent the same problems.</p></FragmentCard></Cards></ContentSlide>
      <StatementSlide detail="Anonymized, but real." tone="section">All examples are real.</StatementSlide>
      <ChapterSlide number="01" title="Observability primer" detail="Telemetry, monitoring, observability, and OpenTelemetry" image={source('plant-section.jpg')} />
      <ContentSlide title="Telemetry, monitoring, and observability"><Cards columns={3}><Card title="Telemetry"><p>The monitoring data you collect from an application.</p></Card><Card title="Monitoring"><p>Dashboards and alerts answer questions you know you will have.</p></Card><Card title="Observability"><p>Queries against telemetry help answer questions you did not predict.</p></Card></Cards></ContentSlide>
      <ContentSlide title="OpenTelemetry"><Cards columns={3}><Card title="Instrumentation"><p>Application code generates logs, metrics, and traces.</p></Card><Card title="Collection"><p>Infrastructure receives telemetry and sends it to a backend.</p></Card><Card title="Standards and protocols"><p>OTLP and semantic conventions keep the parts interoperable.</p></Card></Cards></ContentSlide>
      <ChapterSlide number="02" title="Mistake 1: leaking sensitive data" detail="Telemetry can cross more trust boundaries than application data." image={source('plant-section.jpg')} />
      <ContentSlide title="Sources of sensitive data leaks"><Cards columns={4}><Card title="Tools"><p>Auto-instrumentation can capture more than the team expects.</p></Card><Card title="Admins"><p>A small configuration mistake can disclose secrets to a vendor.</p></Card><Card title="Developers"><p>Opaque identifiers are safer than email addresses and names.</p></Card><Card title="Users"><p>User-generated content needs filtering before it becomes telemetry.</p></Card></Cards></ContentSlide>
      <EvidenceSlide title="Personally identifiable information in telemetry" image={source('slide-11-evidence.jpg')} />
      <EvidenceSlide title="The same leak repeated across log records" image={source('slide-12-evidence.jpg')} />
      <EvidenceSlide title="A search makes the repeated leak visible" image={source('slide-13-evidence.jpg')} />
      <EvidenceSlide title="Personal data arrives through ordinary application fields" image={source('slide-14-evidence.jpg')} note="Example courtesy of Elena Kovalenko" />
      <EvidenceSlide title="Signed URLs disclose credentials in attributes" image={source('slide-15-evidence.jpg')} />
      <EvidenceSlide title="The credential is easy to miss inside a large payload" image={source('slide-16-evidence.jpg')} />
      <EvidenceSlide title="A JVM trust store password appears in process arguments" image={source('slide-17-evidence.jpg')} />
      <EvidenceSlide title="Process metadata keeps the full command line" image={source('slide-18-evidence.jpg')} />
      <EvidenceSlide title="The password is visible to anyone who can query the span" image={source('slide-19-evidence.jpg')} />
      <ChapterSlide number="03" title="Mistake 2: over-instrumentation" detail="More telemetry can reduce the chance of finding the useful signal." image={source('plant-section.jpg')} />
      <ContentSlide title="Sources of over-instrumentation"><Cards columns={3}><Card title="Traces"><p>Function-level spans, health checks, and static assets create volume without context.</p></Card><Card title="Metrics"><p>Unbounded attributes and aggressive intervals multiply time series.</p></Card><Card title="Logs"><p>Debug statements in production hot paths generate repetitive records.</p></Card></Cards></ContentSlide>
      <EvidenceSlide title="One operation can produce a huge trace" image={source('slide-22-evidence.jpg')} />
      <EvidenceSlide title="This example trace contains 1,024 spans" image={source('slide-23-evidence.jpg')} />
      <EvidenceSlide title="A debug statement in the hot path becomes a volume problem" image={source('slide-24-evidence.jpg')} />
      <ChapterSlide number="04" title="Mistake 3: instrumenting only the happy path" detail="The failure path needs enough context for a tired operator." image={source('plant-section.jpg')} />
      <StatementSlide>What do I need to know at 2 a.m. when I have not had enough caffeine?</StatementSlide>
      <ChapterSlide number="05" title="Mistake 4: using the wrong signal" detail="Choose the telemetry type that matches the question." image={source('plant-section.jpg')} />
      <EvidenceSlide title="A counter answers this question better than repeated logs" image={source('slide-28-evidence.jpg')} />
      <EvidenceSlide title="A trace explains causality better than a list of log lines" image={source('slide-29-evidence.jpg')} />
      <ChapterSlide number="06" title="Key takeaways" detail="A short review before telemetry reaches production" image={source('plant-section.jpg')} />
      <ContentSlide title="Better telemetry starts with deliberate questions"><ol className="takeaway-list"><li>OpenTelemetry provides the signals needed to understand code.</li><li>Automation handles routine instrumentation, but it also creates noise.</li><li>Some automated output carries sensitive or expensive data.</li><li>Review the telemetry before acting on it.</li><li>Keep each signal only when it answers a useful question.</li></ol></ContentSlide>
      <ClosingSlide name="Juraci Paixão Kröhling" role="Software engineer and CEO" url="https://olly.garden/jpkroehling/linkedin" />
    </PresentationDeck>
  );
}

createRoot(document.getElementById('root')!).render(<OtelMistakesDeck />);
