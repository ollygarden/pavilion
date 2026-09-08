import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-chromium';
import { createServer } from 'vite';

const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const deck = valueAfter('--deck') ?? 'templates';
const output = resolve(valueAfter('--output') ?? `dist-pdf/${deck}.pdf`);
const deckPaths = new Map([
  ['templates', '/templates.html'],
  ['otel-mistakes', '/talks/2026/2026-07-09-wearedevelopers-otel-mistakes/'],
]);

if (!deckPaths.has(deck)) {
  throw new Error(`Unknown deck "${deck}". Choose templates or otel-mistakes.`);
}

await mkdir(resolve(output, '..'), { recursive: true });
const server = await createServer({ server: { host: '127.0.0.1' }, logLevel: 'error' });
await server.listen();
const address = server.httpServer?.address();
if (!address || typeof address === 'string') throw new Error('Vite did not expose a local port.');

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(`http://127.0.0.1:${address.port}${deckPaths.get(deck)}?print-pdf`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.documentElement.dataset.deckReady === 'true');
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: output, printBackground: true, preferCSSPageSize: true, width: '13.333333in', height: '7.5in', margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  console.log(output);
} finally {
  await browser.close();
  await server.close();
}
