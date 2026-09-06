'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { diagramEdges, diagramNodes, diagramSize, subscriptionBox } from '@/lib/asc-diagram-model';


export default function AscDiagram() {
  const host = useRef<HTMLDivElement>(null);
  const play = useRef<(nodeId?: string) => void>(() => {});
  const [ready, setReady] = useState(false);
  const [motion, setMotion] = useState<{ run: number; edges: string[] } | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let started = false;
    let visible = false;
    let run = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => { clearTimeout(timer); setMotion(null); };
    play.current = (nodeId) => {
      if (!visible || document.hidden || reducedMotion.matches) return;
      clearTimeout(timer);
      const edges = diagramEdges.filter((edge) => !nodeId || edge.from === nodeId || edge.to === nodeId).map((edge) => edge.id);
      setMotion({ run: ++run, edges });
      timer = setTimeout(stop, 4000);
    };
    const update = () => {
      if (!visible || document.hidden || reducedMotion.matches) stop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
      if (!visible || started) return;
      started = true;
      setReady(true);
      play.current();
    });
    observer.observe(element);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearTimeout(timer);
      play.current = () => {};
      observer.disconnect();
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
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
            <svg className="asc-diagram-svg" viewBox="0 0 720 460" fill="none">
              <defs><marker id="asc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" fill="#708ba1" /></marker></defs>
              <rect {...subscriptionBox} fill="#f4f7fa" stroke="#c5d0db" />
              {diagramNodes.map((node) => <rect key={node.id} x={node.x} y={node.y} width={node.width} height={node.height} fill="white" stroke="#c5d0db" />)}
              {diagramEdges.map((edge) => <polyline key={edge.id} points={edge.points.map((point) => point.join(',')).join(' ')} stroke="#708ba1" markerEnd="url(#asc-arrow)" />)}
              {motion ? diagramEdges.filter((edge) => motion.edges.includes(edge.id)).map((edge, index) => (
                <polyline key={`${motion.run}-${edge.id}`} className="asc-diagram-signal" points={edge.points.map((point) => point.join(',')).join(' ')} pathLength="100" style={{ animationDelay: `${index * 0.4}s` }} />
              )) : null}
            </svg>
          </div>
          <p className="asc-diagram-scope" style={position(40, 153)}>Your subscription</p>
          {diagramNodes.map((node) => {
            const content = <><strong>{node.id === 'benchmark' ? <>Microsoft cloud<br />security benchmark</> : node.title}</strong><span>{node.detail}</span></>;
            const props = {
              className: 'asc-diagram-node',
              style: { ...position(node.x, node.y), width: `${node.width / 720 * 100}%`, height: `${node.height / 460 * 100}%` },
              onPointerEnter: () => play.current(node.id),
              onFocus: () => play.current(node.id),
            };
            return node.href ? (
              <Link key={node.id} {...props} href={node.href} aria-label={node.title}>{content}</Link>
            ) : (
              <button key={node.id} {...props} type="button" disabled={!ready} aria-label={`Show ${node.title} connections`} onClick={() => play.current(node.id)}>{content}</button>
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
