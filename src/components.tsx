import type { CSSProperties, ReactNode } from 'react';
import { Fragment, Slide } from '@revealjs/react';

type Tone = 'page' | 'section' | 'light' | 'highlight';

export function OllyMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`olly-mark${inverse ? ' olly-mark--inverse' : ''}`}>
      <img src={inverse ? '/assets/ollygarden-symbol-dark.png' : '/assets/ollygarden-symbol.png'} alt="" />
      <span>OllyGarden</span>
    </div>
  );
}

export function PixelBloom({ quiet = false }: { quiet?: boolean }) {
  const pattern = [0, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 2, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 3, 0, 1, 0, 2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 3, 0];
  return (
    <div className={`pixel-bloom${quiet ? ' pixel-bloom--quiet' : ''}`} aria-hidden="true">
      {pattern.map((tone, index) => <i key={index} data-tone={tone} />)}
    </div>
  );
}

export function BaseSlide({
  children,
  tone = 'page',
  className = '',
  mark = true,
  ...props
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  mark?: boolean;
  [key: string]: unknown;
}) {
  return (
    <Slide className={`og-slide og-slide--${tone} ${className}`} {...props}>
      <div className="slide-canvas">
        {mark && <OllyMark inverse={tone === 'light' || tone === 'highlight'} />}
        {children}
      </div>
    </Slide>
  );
}

export function CoverSlide({ title, subtitle, meta, image }: { title: string; subtitle?: string; meta?: string; image?: string }) {
  const style = image ? ({ '--cover-image': `url(${image})` } as CSSProperties) : undefined;
  return (
    <BaseSlide className="layout-cover" mark={false} style={style}>
      <div className="cover-copy">
        <OllyMark inverse />
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {meta && <small>{meta}</small>}
      </div>
      <div className="cover-visual" aria-hidden="true"><PixelBloom /></div>
    </BaseSlide>
  );
}

export function ChapterSlide({ number, title, detail, image }: { number: string; title: string; detail?: string; image?: string }) {
  return (
    <BaseSlide className="layout-chapter" mark={false}>
      <div className="chapter-copy">
        <span className="chapter-number">{number}</span>
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
      </div>
      <div className="chapter-visual" style={image ? { backgroundImage: `linear-gradient(90deg, rgba(9,11,10,.05), rgba(9,11,10,.55)), url(${image})` } : undefined}>
        <PixelBloom quiet />
      </div>
    </BaseSlide>
  );
}

export function StatementSlide({ children, detail, tone = 'page' }: { children: ReactNode; detail?: string; tone?: Tone }) {
  return (
    <BaseSlide tone={tone} className="layout-statement">
      <blockquote>{children}</blockquote>
      {detail && <p>{detail}</p>}
      <PixelBloom quiet />
    </BaseSlide>
  );
}

export function ContentSlide({ title, children, tone = 'page', className = '' }: { title: string; children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <BaseSlide tone={tone} className={`layout-content ${className}`}>
      <header className="slide-header"><h2>{title}</h2></header>
      <div className="slide-body">{children}</div>
    </BaseSlide>
  );
}

export function Cards({ children, columns = 3 }: { children: ReactNode; columns?: 2 | 3 | 4 }) {
  return <div className={`cards cards--${columns}`}>{children}</div>;
}

export function Card({ title, children, accent }: { title: string; children: ReactNode; accent?: string }) {
  return <article className="content-card" style={accent ? { '--card-accent': accent } as CSSProperties : undefined}><h3>{title}</h3><div>{children}</div></article>;
}

export function FragmentCard({ title, children, accent }: { title: string; children: ReactNode; accent?: string }) {
  return <Fragment as="article" className="content-card" style={accent ? { '--card-accent': accent } as CSSProperties : undefined}><h3>{title}</h3><div>{children}</div></Fragment>;
}

export function EvidenceSlide({ title, image, note }: { title: string; image: string; note?: string }) {
  return (
    <ContentSlide title={title} className="layout-evidence">
      <figure><img src={image} alt="" />{note && <figcaption>{note}</figcaption>}</figure>
    </ContentSlide>
  );
}

export function Metric({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return <div className="metric"><strong>{value}</strong><span>{label}</span>{detail && <small>{detail}</small>}</div>;
}

export function ClosingSlide({ name, role, url }: { name: string; role: string; url: string }) {
  return (
    <BaseSlide tone="highlight" className="layout-closing" mark={false}>
      <div><OllyMark inverse /><h2>Thank you</h2><p>{name}<br />{role}</p><a href={url}>{url.replace(/^https?:\/\//, '')}</a></div>
      <PixelBloom />
    </BaseSlide>
  );
}
