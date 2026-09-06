import {
  EdgesGeometry,
  Fog,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export function createNotebookWireframe(host: HTMLElement, onContextLost: () => void) {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0xffffff, 0);

  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 3.5, 6);
  const camera = new OrthographicCamera(-1.4, 1.4, 1.4, -1.4, 0.1, 10);
  camera.position.z = 4.5;

  const shape = new IcosahedronGeometry(1, 1);
  const geometry = new EdgesGeometry(shape);
  shape.dispose();
  const material = new LineBasicMaterial({ color: 0x849aaf, transparent: true, opacity: 0.65 });
  const wireframe = new LineSegments(geometry, material);
  wireframe.rotation.set(0.35, -0.6, 0.12);
  scene.add(wireframe);

  let frame: number | null = null;
  let previous = 0;
  let elapsed = 0;
  let disposed = false;

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (disposed || !width || !height) return;
    const aspect = width / height;
    camera.left = -1.4 * aspect;
    camera.right = 1.4 * aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  };

  const animate = (now: number) => {
    frame = requestAnimationFrame(animate);
    if (!previous) previous = now;
    const delta = now - previous;
    // A small drawing does not need to render at the screen's full refresh rate.
    if (delta < 1000 / 30) return;
    elapsed = Math.min(4, elapsed + delta / 1000);
    previous = now;
    // Ease to rest within four seconds; no persistent motion or control needed.
    const progress = 1 - (1 - elapsed / 4) ** 3;
    wireframe.rotation.x = 0.35 + progress * 0.04;
    wireframe.rotation.y = -0.6 + progress * 0.3;
    renderer.render(scene, camera);
    if (elapsed >= 4) setPlaying(false);
  };

  const setPlaying = (playing: boolean) => {
    if (disposed) return;
    if (playing && elapsed < 4 && frame === null) {
      previous = 0;
      frame = requestAnimationFrame(animate);
    } else if (!playing && frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  };

  const loseContext = (event: Event) => {
    event.preventDefault();
    setPlaying(false);
    onContextLost();
  };
  const observer = new ResizeObserver(resize);
  const dispose = () => {
    if (disposed) return;
    setPlaying(false);
    disposed = true;
    observer.disconnect();
    renderer.domElement.removeEventListener('webglcontextlost', loseContext);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };

  try {
    renderer.domElement.addEventListener('webglcontextlost', loseContext);
    host.appendChild(renderer.domElement);
    resize();
    observer.observe(host);
  } catch (error) {
    dispose();
    throw error;
  }

  return { setPlaying, dispose };
}
