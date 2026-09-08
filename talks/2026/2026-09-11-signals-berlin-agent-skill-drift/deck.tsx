import { createRoot } from 'react-dom/client';
import { BaseSlide, OllyMark } from '../../../src/components';
import { PresentationDeck } from '../../../src/deck';
import './talk.css';

const repositoryUrl = 'https://github.com/ollygarden/opentelemetry-agent-skills';

function SpeakerNotes({ children }: { children: string }) {
  return <aside className="notes">{children}</aside>;
}

function SignalsBerlinDeck() {
  return (
    <PresentationDeck>
      <BaseSlide className="signals-cover" mark={false}>
        <div className="signals-cover__copy">
          <OllyMark inverse />
          <h1>Your agent skill was right in <span>March</span></h1>
          <p>Then the world changed.</p>
          <small>Juraci Paixão Kröhling · Signals Berlin 2026</small>
        </div>
        <div className="signals-cover__drift" aria-hidden="true">
          <pre>{`processors:
  logdedup:
    interval: 10s

service:
  pipelines:
    logs:
      processors:
        - logdedup`}</pre>
          <div className="signals-cover__seam"><span>MAR</span><span>NOW</span></div>
        </div>
        <SpeakerNotes>Define a skill as packaged domain knowledge that helps an agent apply expertise. Say that your OpenTelemetry skill gave the correct Collector guidance in March. Then ask: “What happens when the project changes, but the skill does not?”</SpeakerNotes>
      </BaseSlide>

      <BaseSlide className="model-recall-slide">
        <header className="talk-heading"><h2>What the models remembered</h2></header>
        <div className="model-recall">
          <div className="model-recall__ground-truth"><span>Verified release</span><strong>v0.160.0</strong><small>September 2, 2026</small></div>
          <table>
            <thead><tr><th>Model</th><th>Recalled distribution</th><th>Drift</th></tr></thead>
            <tbody>
              <tr><td>GPT-5.6 Sol Pro</td><td>v0.103.0</td><td>57 releases</td></tr>
              <tr><td>Gemini 3.7 Flash</td><td>v0.118.0</td><td>42 releases</td></tr>
              <tr><td>Grok 4.6</td><td>Declined to guess</td><td>n/a</td></tr>
              <tr><td>Claude Opus 5</td><td>v0.120.0</td><td>40 releases</td></tr>
              <tr><td>GLM 5.3</td><td>about v0.128.0</td><td>32 releases</td></tr>
              <tr><td>DeepSeek V4 Pro</td><td>about v0.120.x</td><td>about 40</td></tr>
            </tbody>
          </table>
          <p>Internal knowledge only · tested September 7, 2026</p>
        </div>
        <SpeakerNotes>Six current model families answered from internal knowledge only, without tools. None named the current Collector distribution. The closest numerical answer was 32 releases behind. Grok declined to guess, which was safer than stale precision. This isolates model recall; a tool-enabled agent can still recover.</SpeakerNotes>
      </BaseSlide>

      <BaseSlide className="rename-slide">
        <header className="talk-heading"><h2>The stale answer still starts</h2></header>
        <div className="rename-comparison">
          <div className="rename-option rename-option--stale">
            <p>March</p>
            <pre>processors:{'\n'}  <strong>logdedup</strong>:</pre>
            <span>deprecated alias</span>
          </div>
          <div className="rename-option rename-option--current">
            <p>Current guidance</p>
            <pre>processors:{'\n'}  <strong>log<span>_</span>dedup</strong>:</pre>
            <span>canonical name</span>
          </div>
        </div>
        <p className="rename-slide__warning">Shallow validation passes while the guidance is already aging.</p>
        <SpeakerNotes>Explain that Collector Contrib renamed logdedup to log_dedup in v0.151.0, released on April 28. A March skill snapshot can still generate the legacy name because the deprecated alias starts with a warning instead of a hard failure. Pause after: “The stale answer still starts.”</SpeakerNotes>
      </BaseSlide>

      <BaseSlide className="recovery-slide">
        <header className="talk-heading"><h2>Capable agents can recover</h2></header>
        <div className="recovery-loop" aria-label="A loop from search through test, inspect, and retry, then back to search">
          <div className="recovery-step"><span>01</span><strong>Search</strong><p>Docs, releases, GitHub, forums</p></div>
          <i aria-hidden="true">→</i>
          <div className="recovery-step"><span>02</span><strong>Test</strong><p>Try the plausible answer</p></div>
          <i aria-hidden="true">→</i>
          <div className="recovery-step"><span>03</span><strong>Inspect</strong><p>Read the warning or failure</p></div>
          <i aria-hidden="true">→</i>
          <div className="recovery-step recovery-step--retry"><span>04</span><strong>Retry</strong><p>Spend more tools, tokens, and time</p></div>
          <div className="recovery-return" aria-hidden="true"><span>↳</span><b>repeat discovery</b><span>↲</span></div>
        </div>
        <SpeakerNotes>Stale model knowledge is not the same as agent incapability. With tools and enough budget, a competent coding agent can recover. In the verified GPT-5.6 Sol pair, both agents succeeded, while the skill-guided path used 39% less total token traffic. Keep that to one sentence: this is evidence for the discovery cost, not a benchmark presentation.</SpeakerNotes>
      </BaseSlide>

      <BaseSlide className="maintenance-slide">
        <header className="talk-heading"><h2>Maintenance keeps the <span>advantage</span></h2></header>
        <div className="maintenance-rail">
          <div>
            <strong>A source</strong>
            <p>Resolve facts from the authoritative upstream project instead of freezing copied documentation.</p>
          </div>
          <div>
            <strong>A freshness signal</strong>
            <p>Detect releases, renames, and structural changes since the last reconciliation.</p>
          </div>
          <div>
            <strong>A test</strong>
            <p>Compare with the baseline, then verify both results against ground truth.</p>
          </div>
        </div>
        <SpeakerNotes>Walk left to right. The source shortens discovery, the freshness signal tells you when the domain moved, and the test proves that the skill still earns its context. Tests must check output quality before time or token savings. Say: “The skill does not replace research. It lets agents reuse a researched path.”</SpeakerNotes>
      </BaseSlide>

      <BaseSlide tone="highlight" className="snapshot-slide" mark={false}>
        <OllyMark inverse />
        <blockquote>“An unmaintained skill becomes another <span>stale snapshot</span>.”</blockquote>
        <div className="snapshot-link">
          <a href={repositoryUrl}>github.com/ollygarden/<br />opentelemetry-agent-skills</a>
          <img src="/assets/signals-berlin-2026/agent-skills-qr.svg" alt="QR code for the OpenTelemetry Agent Skills repository" />
        </div>
        <SpeakerNotes>Close with: “Skills give us a place to manage drift. If we do not maintain the skill, we have not fixed the baseline. We have only delayed when we become it.” Then stop. Do not add a verbal thank-you.</SpeakerNotes>
      </BaseSlide>
    </PresentationDeck>
  );
}

createRoot(document.getElementById('root')!).render(<SignalsBerlinDeck />);
