'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { diagramEdges, diagramNodes, diagramSize, subscriptionBox } from '@/lib/asc-diagram-model';
import type { createAscDiagram } from '@/lib/asc-diagram-scene';

export default function AscDiagram() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<typeof createAscDiagram> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let started = false;
    let visible = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => controller.current?.setEnabled(visible && !document.hidden && !reducedMotion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
      if (!visible || started) return;
      started = true;
      import('@/lib/asc-diagram-scene').then(({ createAscDiagram }) => {
        if (disposed) return;
        controller.current = createAscDiagram(element, () => {
          controller.current?.dispose();
          controller.current = null;
          setReady(false);
        });
        setReady(true);
        update();
        controller.current.play();
      }).catch(() => {
        // The SVG and all labels remain usable without WebGL.
        if (!disposed) setReady(false);
      });
    });
    observer.observe(element);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      disposed = true;
      observer.disconnect();
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);

  const position = (x: number, y: number) => ({
    left: `${x / diagramSize.width * 100}%`,
    top: `${y / diagramSize.height * 100}%`,
  });

  return (
    <figure className="asc-diagram" aria-labelledby="asc-diagram-caption">
      <div className="asc-diagram-scroll" role="region" aria-label="Subscription diagram, scroll horizontally on small screens" tabIndex={0}>
        <div className="asc-diagram-stage" data-ready={ready}>
          <div className="asc-diagram-drawing" ref={host} aria-hidden="true">
            <svg className="asc-diagram-fallback" viewBox="0 0 720 460" fill="none">
              <defs><marker id="asc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" fill="#708ba1" /></marker></defs>
              <rect {...subscriptionBox} fill="#f4f7fa" stroke="#c5d0db" />
              {diagramNodes.map((node) => <rect key={node.id} x={node.x} y={node.y} width={node.width} height={node.height} fill="white" stroke="#c5d0db" />)}
              {diagramEdges.map((edge) => <polyline key={edge.id} points={edge.points.map((point) => point.join(',')).join(' ')} stroke="#708ba1" markerEnd="url(#asc-arrow)" />)}
            </svg>
          </div>
          <p className="asc-diagram-scope" style={position(40, 153)}>Your subscription</p>
          {diagramNodes.map((node) => {
            const content = <><strong>{node.id === 'benchmark' ? <>Microsoft cloud<br />security benchmark</> : node.title}</strong><span>{node.detail}</span></>;
            const props = {
              className: 'asc-diagram-node',
              style: { ...position(node.x, node.y), width: `${node.width / 720 * 100}%`, height: `${node.height / 460 * 100}%` },
              onPointerEnter: () => controller.current?.play(node.id),
              onFocus: () => controller.current?.play(node.id),
            };
            return node.href ? (
              <Link key={node.id} {...props} href={node.href} aria-label={node.title}>{content}</Link>
            ) : (
              <button key={node.id} {...props} type="button" disabled={!ready} aria-label={`Show ${node.title} connections`} onClick={() => controller.current?.play(node.id)}>{content}</button>
            );
          })}
          {diagramEdges.map((edge) => <span className="asc-diagram-edge" key={edge.id} style={position(edge.x, edge.y)}>{edge.label}</span>)}
        </div>
      </div>
      <figcaption id="asc-diagram-caption">
        Simplified view: ASC Default lives at subscription scope and references the built-in benchmark. Defender for Cloud shows the findings. Paid protection is separate.
      </figcaption>
    </figure>
  );
}
