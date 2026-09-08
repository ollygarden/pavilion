import { createRoot } from 'react-dom/client';
import type { ReactNode } from 'react';
import { BaseSlide, OllyMark, PixelBloom } from '../../../src/components';
import { PresentationDeck } from '../../../src/deck';
import './talk.css';

const repositoryUrl = 'https://github.com/ollygarden/opentelemetry-agent-skills';

function Notes({ children }: { children: ReactNode }) {
  return <aside className="notes">{children}</aside>;
}

function Heading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return <header className="ce-heading">{eyebrow && <span>{eyebrow}</span>}<h2>{children}</h2></header>;
}

function SectionSlide({ number, title, detail }: { number: string; title: string; detail: string }) {
  return (
    <BaseSlide tone="section" className="ce-section" mark={false}>
      <div className="ce-section__copy"><span>{number}</span><h2>{title}</h2><p>{detail}</p></div>
      <div className="ce-section__visual"><img src="/assets/code-europe-2026/code-to-trace.png" alt="" /><PixelBloom quiet /></div>
    </BaseSlide>
  );
}

function Status({ children, tone = 'good' }: { children: ReactNode; tone?: 'good' | 'muted' }) {
  return <span className={`status status--${tone}`}>{children}</span>;
}

function CodeEuropeDeck() {
  return (
    <PresentationDeck>
      <BaseSlide className="ce-cover" mark={false}>
        <img className="ce-cover__image" src="/assets/code-europe-2026/code-to-trace.png" alt="Source code connected to a distributed trace" />
        <div className="ce-cover__shade" />
        <div className="ce-cover__copy">
          <OllyMark />
          <h1>I know <span>OTel</span></h1>
          <p>Giving your coding agents expert-level OpenTelemetry knowledge</p>
          <small>Juraci Paixão Kröhling · Code Europe 2026</small>
        </div>
        <Notes>Introduce yourself as an OpenTelemetry maintainer. Set the expectation that this is a practical talk built around real agent output and real telemetry.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-map">
        <Heading eyebrow="The trust test">Where we are going</Heading>
        <ol className="ce-map__steps">
          <li><span>01</span><strong>The hidden failure</strong></li>
          <li><span>02</span><strong>The knowledge layer</strong></li>
          <li><span>03</span><strong>The comparison</strong></li>
          <li><span>04</span><strong>The demonstration</strong></li>
          <li><span>05</span><strong>The mental model</strong></li>
        </ol>
        <Notes>Use this as a ten-second map. Every section answers one question: can you trust the telemetry an agent creates?</Notes>
      </BaseSlide>

      <BaseSlide tone="light" className="ce-statement">
        <blockquote>The code worked.<br /><span>The telemetry lied.</span></blockquote>
        <p>The pull request compiled, passed its tests, and produced traces. It was still wrong.</p>
        <Notes>Let the sentence land. Create the gap between software correctness and telemetry correctness before revealing the failures.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-reveal">
        <Heading>Working is not trustworthy</Heading>
        <div className="ce-reveal__body">
          <div className="ce-build"><span>CI / build</span><strong>PASS</strong><code>go test ./...  ✓</code><code>otelc build   ✓</code><code>service start ✓</code></div>
          <div className="ce-hidden">
            <span>What the build cannot tell you</span>
            <ul><li>Dependencies came from 2024</li><li>HTTP and database spans split apart</li><li>Span names ignored current conventions</li><li>Sensitive values entered the pipeline</li></ul>
          </div>
        </div>
        <Notes>The agent instrumented the application in five minutes. The build passed and spans arrived. Walk from apparent success to the four hidden failures. These are common failure modes, not a trick against one model.</Notes>
      </BaseSlide>

      <SectionSlide number="01" title="Models learn yesterday's OpenTelemetry" detail="The problem starts before the prompt." />

      <BaseSlide className="ce-pace">
        <Heading>Training cannot follow release velocity</Heading>
        <div className="ce-pace__body">
          <div className="ce-pace__list"><p>Models freeze a moving ecosystem into their training data.</p><ul><li>SDK versions become stale.</li><li>Semantic conventions evolve separately.</li><li>New instrumentation approaches appear.</li></ul></div>
          <div className="ce-stats"><div><strong>1–2</strong><span>weeks between Collector releases</span></div><div><strong>2024</strong><span>version chosen in one test</span></div><div><strong>v1.1.0</strong><span>current <code>otelc</code> target</span></div></div>
        </div>
        <Notes>Use the numbers to show why this is structurally difficult for a base model. Connect release velocity to incorrect code suggestions without giving a release-history lesson.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-failures">
        <Heading>Four failures hide behind green builds</Heading>
        <div className="ce-grid ce-grid--four">
          <article><span>01</span><h3>Stale versions</h3><p>Old packages compile while missing current fixes and capabilities.</p></article>
          <article><span>02</span><h3>Wrong conventions</h3><p>Plausible attribute names break standard queries and dashboards.</p></article>
          <article><span>03</span><h3>Broken context</h3><p>Valid spans become disconnected traces at service boundaries.</p></article>
          <article><span>04</span><h3>Leaked values</h3><p>Useful-looking attributes expose personal or sensitive information.</p></article>
        </div>
        <Notes>Give one concrete consequence for each failure. These become the evaluation criteria used later.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-statement">
        <blockquote>A longer prompt is not a <span>knowledge source.</span></blockquote>
        <p>More instructions cannot supply facts the model does not have.</p>
        <Notes>Prompts define intent. Knowledge sources supply current facts. Do not claim that prompting is useless.</Notes>
      </BaseSlide>

      <SectionSlide number="02" title="Give the agent a maintained knowledge layer" detail="Current facts enter when the task needs them." />

      <BaseSlide className="ce-anatomy">
        <Heading>What an Agent Skill provides</Heading>
        <div className="ce-anatomy__stack">
          <div><span>ENTRY</span><strong>A small instruction surface for one domain</strong></div>
          <div><span>REFERENCES</span><strong>Focused material selected for a specific task</strong></div>
          <div><span>TOOLS</span><strong>Precise lookups against upstream information</strong></div>
          <div><span>WORKFLOW</span><strong>Repeatable steps with explicit verification</strong></div>
        </div>
        <Notes>Define a skill as a maintained package of instructions and tools, not a large prompt. Distinguish reusable domain context from model training.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-layers">
        <Heading>Good instrumentation needs<br />three knowledge layers</Heading>
        <div className="ce-layers__body">
          <article><span>UPSTREAM</span><h3>Facts</h3><p>Released versions, supported configuration, semantic conventions, and current APIs.</p></article>
          <article><span>ENGINEERING</span><h3>Judgment</h3><p>Which operations deserve spans, metrics, or logs, and which details create noise.</p></article>
          <article><span>YOUR SYSTEM</span><h3>Context</h3><p>Architecture, privacy rules, service boundaries, and the questions operators ask.</p></article>
        </div>
        <Notes>Land the distinction between facts, judgment, and organizational context. Public skills cannot make every instrumentation decision.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-disclosure">
        <Heading>Retrieve only what the task needs</Heading>
        <div className="ce-flow">
          <div><span>01</span><strong>Task</strong><p>Instrument this Go service</p></div>
          <i />
          <div><span>02</span><strong>Skill</strong><p>Select compile-time guidance</p></div>
          <i />
          <div><span>03</span><strong>Source</strong><p>Check the current release</p></div>
          <i />
          <div><span>04</span><strong>Evidence</strong><p>Build and inspect telemetry</p></div>
        </div>
        <p className="ce-flow__caption">Small retrieval keeps context focused and makes the recommendation traceable.</p>
        <Notes>Walk through progressive disclosure as a context-management technique. Smaller targeted retrieval can improve accuracy and token use.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-collection">
        <Heading>Fourteen skills cover the working surface</Heading>
        <div className="ce-collection__matrix">
          <article><span>LANGUAGES</span><p>Go · Java · Node.js<br />Python · .NET · Browser</p></article>
          <article><span>PIPELINE</span><p>Collector · OTTL<br />Telemetry generation</p></article>
          <article><span>CORRECTNESS</span><p>SDK versions · Conventions<br />Breaking changes</p></article>
          <article><span>EMERGING</span><p>Weaver · Declarative config<br />Span-event migration</p></article>
        </div>
        <Notes>Show the breadth without reading fourteen names. The collection follows upstream OpenTelemetry boundaries. Point to Go and semantic conventions as examples used later.</Notes>
      </BaseSlide>

      <SectionSlide number="03" title="Hold everything else constant" detail="Same repository. Same model. Same task." />

      <BaseSlide className="ce-conditions">
        <Heading>One task, two knowledge conditions</Heading>
        <div className="ce-conditions__prompt"><span>THE TASK</span><code>Instrument this Go + Gin application with OpenTelemetry Go Compile-Time Instrumentation. Produce a runnable result.</code></div>
        <div className="ce-conditions__pair">
          <article><span>BARE</span><strong>Model knowledge</strong><p>Web and terminal tools</p></article>
          <div><b>SAME</b><span>repository</span><span>model</span><span>prompt</span></div>
          <article><span>SKILLED</span><strong>Model + <code>otel-go</code></strong><p>Web, terminal, and skill reader</p></article>
        </div>
        <Notes>Present this as an experiment, not a model ranking. We evaluate the repository and emitted telemetry, not the confidence of the answer.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-correctness">
        <Heading>Compare outcomes, not confidence</Heading>
        <div className="ce-correctness__body">
          <table><thead><tr><th>CHECK</th><th>BARE</th><th>SKILLED</th></tr></thead><tbody>
            <tr><td><code>otelc</code> version</td><td>v1.1.0</td><td>v1.1.0</td></tr>
            <tr><td>Tests + build</td><td><Status>Pass</Status></td><td><Status>Pass</Status></td></tr>
            <tr><td>HTTP trace captured</td><td><Status>Yes</Status></td><td><Status>Yes</Status></td></tr>
            <tr><td>Database spans captured</td><td><Status tone="muted">Not checked</Status></td><td><Status>Yes</Status></td></tr>
            <tr><td>Repeatable workflow</td><td>Makefile + docs</td><td>Tool pin + script + CI</td></tr>
          </tbody></table>
          <div className="ce-time"><div><span>BARE</span><strong>11:07</strong></div><div><span>SKILLED</span><strong>9:46</strong></div><p>Both produced valid instrumented builds.</p></div>
        </div>
        <small className="ce-source">GPT-5.6 Sol pair · September 7, 2026 · one run per condition</small>
        <Notes>Both implementations worked. The skilled result integrated the tool pin and build into the repository more deeply. Keep the database distinction precise: the separate runtime check captured database spans only for the skilled result.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-cost">
        <Heading>Better context cost less in this run</Heading>
        <div className="ce-cost__compare">
          <div><span>BARE</span><strong>1,910,954</strong><small>total token traffic</small></div>
          <div><span>WITH OTEL-GO</span><strong>1,160,192</strong><small>total token traffic</small></div>
          <aside><strong>39.3%</strong><span>fewer tokens</span><small>750,762 fewer</small></aside>
        </div>
        <p className="ce-cost__detail">Web discovery calls fell from 8 to 3. Tool calls fell from 47 to 34.</p>
        <small className="ce-source">GPT-5.6 Sol pair · Hermes v0.20.6 · OpenRouter · medium reasoning</small>
        <Notes>Present this as one reproducible task, not a universal savings percentage. Most of the reduction came from cache reads.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-verify">
        <Heading>Verification happens outside the model</Heading>
        <div className="ce-verify__rail">
          <div><span>01</span><strong>Clean build</strong><code>go test ./...</code></div>
          <div><span>02</span><strong>Fixed runtime</strong><code>otelc build ./...</code></div>
          <div><span>03</span><strong>One request</strong><code>GET /api/articles</code></div>
          <div><span>04</span><strong>Real signals</strong><code>trace · metrics · logs</code></div>
        </div>
        <p className="ce-verify__line">The model does not grade its own work.</p>
        <Notes>Runtime telemetry is the final evidence. The build proves software validity. The backend proves whether the instrumentation tells the truth.</Notes>
      </BaseSlide>

      <SectionSlide number="04" title="Now inspect what actually runs" detail="The backend gets the final vote." />

      <BaseSlide className="ce-demo-checks">
        <Heading>The demonstration has three checks</Heading>
        <ol><li><span>01</span><strong>Build with <code>otelc</code></strong><p>The repository retains a version-pinned command.</p></li><li><span>02</span><strong>Send one request</strong><p>HTTP and database work follow one deterministic path.</p></li><li><span>03</span><strong>Inspect the result</strong><p>One connected trace and correlated logs reach the backend.</p></li></ol>
        <p className="ce-backup">A captured run follows the same sequence if the live environment fails.</p>
        <Notes>Set expectations before opening the terminal. State the checks and keep this setup under one minute.</Notes>
      </BaseSlide>

      <BaseSlide tone="light" className="ce-live-demo">
        <div className="ce-live-demo__copy"><span>LIVE DEMO</span><h2>Instrument the application</h2><p>One prompt. One repository. One request.</p></div>
        <div className="ce-live-demo__terminal"><code>$ ./scripts/build-instrumented.sh</code><code>$ ./realworld</code><code>$ curl localhost:8080/api/articles</code><span>expected: 200 OK</span></div>
        <Notes>Replay the skilled instrumentation run, show the exact changes, build the service, and generate one deterministic request. Keep the agent portion under six minutes.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-trace">
        <Heading>One request tells one connected story</Heading>
        <div className="ce-trace__body">
          <div className="ce-trace__waterfall"><div className="span span--root"><span>HTTP SERVER</span><strong>GET /api/articles</strong></div><div className="span span--child"><span>HANDLER</span><strong>listArticles</strong></div><div className="span span--db"><span>DATABASE</span><strong>SELECT articles</strong></div><div className="span span--client"><span>HTTP CLIENT</span><strong>GET /profiles</strong></div></div>
          <div className="ce-trace__stats"><div><strong>1</strong><span>request</span></div><div><strong>1</strong><span>trace</span></div><div><strong>0</strong><span>orphans</span></div><code>trace_id=7f3a…91c2</code></div>
        </div>
        <Notes>Use the backend to verify each claim. Follow one request across its spans and one correlated log line. Do not tour the interface.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-privacy">
        <Heading>Skills can review existing instrumentation</Heading>
        <div className="ce-privacy__panels">
          <article><span>TELEMETRY</span><code>user.email=<b>jo•••@example.com</b></code><small>Finding: sensitive value</small></article>
          <article><span>SOURCE</span><code>span.SetAttributes(<br /> attribute.String(<b>"user.email"</b>, email),<br />)</code><small>Trace the value to one statement</small></article>
          <article><span>CHANGE</span><code>span.SetAttributes(<br /> attribute.String(<b>"user.id"</b>, opaqueID),<br />)</code><small>Keep the useful, non-sensitive key</small></article>
        </div>
        <Notes>Use one prepared sensitive-data example. Show the finding, source, and smallest safe correction rather than running another open-ended agent session.</Notes>
      </BaseSlide>

      <BaseSlide tone="highlight" className="ce-statement ce-statement--final">
        <blockquote>Supply current facts,<br />then <span>verify reality.</span></blockquote>
        <p>Skills improve the starting point. Running telemetry decides whether the result is trustworthy.</p>
        <Notes>Pause after the first sentence. This is the mental model the audience should remember the next morning.</Notes>
      </BaseSlide>

      <BaseSlide className="ce-next">
        <Heading>Try one task next week</Heading>
        <ol><li><span>01</span><div><strong>Install the skills</strong><p>Add the open source repository to your coding agent.</p></div></li><li><span>02</span><div><strong>Repeat one task</strong><p>Run the same OpenTelemetry request with and without skills.</p></div></li><li><span>03</span><div><strong>Inspect the telemetry</strong><p>Judge traces, metrics, and logs in a real backend.</p></div></li></ol>
        <a href={repositoryUrl}>{repositoryUrl.replace('https://', '')}</a>
        <Notes>Offer a small experiment rather than asking the audience to adopt everything. Mention the installation link.</Notes>
      </BaseSlide>

      <BaseSlide tone="highlight" className="ce-closing" mark={false}>
        <div className="ce-closing__copy"><OllyMark inverse /><h2>Questions?</h2><p>Juraci Paixão Kröhling<br />Founder and CEO, OllyGarden</p><a href={repositoryUrl}>github.com/ollygarden/<br />opentelemetry-agent-skills</a><small>talks.kroehling.de</small></div>
        <div className="ce-closing__qr"><img src="/assets/code-europe-2026/agent-skills-qr.svg" alt="QR code for the OpenTelemetry Agent Skills repository" /><span>Open source · Vendor neutral</span></div>
        <Notes>Leave this slide visible for questions. Invite people to compare an instrumentation task from their own codebase after the session.</Notes>
      </BaseSlide>
    </PresentationDeck>
  );
}

createRoot(document.getElementById('root')!).render(<CodeEuropeDeck />);
