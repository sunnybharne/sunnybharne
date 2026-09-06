'use client';

import { useEffect, useRef, useState } from 'react';
import type { createNotebookWireframe } from '@/lib/notebook-wireframe';

type Wireframe = ReturnType<typeof createNotebookWireframe>;

export default function NotebookMotion() {
  const host = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const sync = useRef<() => void>(() => {});
  const [isPaused, setIsPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let drawing: Wireframe | null = null;
    let visible = false;
    let loading = false;
    let failed = false;
    let disposed = false;

    const showFallback = () => {
      drawing?.dispose();
      drawing = null;
      setReady(false);
    };
    const update = () => {
      if (disposed) return;
      if (reducedMotion.matches) {
        showFallback();
        return;
      }
      const playing = visible && !document.hidden && !paused.current;
      if (drawing) {
        drawing.setPlaying(playing);
        return;
      }
      if (!playing || loading || failed) return;

      // Keep Three.js out of the initial bundle and skip it for reduced motion.
      loading = true;
      import('@/lib/notebook-wireframe')
        .then(({ createNotebookWireframe }) => {
          if (disposed || reducedMotion.matches || !visible || document.hidden) return;
          drawing = createNotebookWireframe(element, () => {
            failed = true;
            showFallback();
          });
          setReady(true);
          drawing.setPlaying(!paused.current);
        })
        .catch(() => {
          // The quiet SVG remains if WebGL or the lazy-loaded chunk is unavailable.
          failed = true;
          if (!disposed) showFallback();
        })
        .finally(() => { loading = false; });
    };

    sync.current = update;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);

    return () => {
      disposed = true;
      sync.current = () => {};
      observer.disconnect();
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      drawing?.dispose();
    };
  }, []);

  const toggleMotion = () => {
    paused.current = !paused.current;
    setIsPaused(paused.current);
    sync.current();
  };

  return (
    <div className="notebook-motion" data-ready={ready}>
      <div className="notebook-motion-drawing" ref={host} aria-hidden="true">
        <svg className="notebook-motion-fallback" viewBox="0 0 112 112" fill="none">
          <path d="M56 18 88 38 88 74 56 94 24 74 24 38Z M56 18 40 48 24 38 M56 18 72 48 88 38 M24 74 40 48 72 48 88 74 M24 74 56 70 88 74 M40 48 56 70 72 48 M56 70V94 M24 38 56 34 88 38 M56 34 40 48 M56 34 72 48" />
        </svg>
      </div>
      {ready ? (
        <button
          type="button"
          className="notebook-motion-toggle"
          aria-label={isPaused ? 'Play animation' : 'Pause animation'}
          title={isPaused ? 'Play animation' : 'Pause animation'}
          onClick={toggleMotion}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            {isPaused ? <path d="m5 3 8 5-8 5Z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
          </svg>
        </button>
      ) : null}
    </div>
  );
}
