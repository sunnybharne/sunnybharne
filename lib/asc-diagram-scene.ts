import {
  AmbientLight, BoxGeometry, BufferGeometry, ConeGeometry, DirectionalLight,
  EdgesGeometry, Line, LineBasicMaterial, LineSegments, Mesh,
  MeshLambertMaterial, MeshBasicMaterial, SphereGeometry, CurvePath, LineCurve3,
  OrthographicCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { diagramEdges, diagramNodes, diagramSize, subscriptionBox } from './asc-diagram-model';

export function createAscDiagram(host: HTMLElement, onContextLost: () => void) {
  const { width, height } = diagramSize;
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  const camera = new OrthographicCamera(0, width, height, 0, 0.1, 1000);
  camera.position.z = 500;
  scene.add(new AmbientLight(0xffffff, 2));
  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-100, 400, 500);
  scene.add(light);

  const geometries: BufferGeometry[] = [];
  const materials = [
    new MeshLambertMaterial({ color: 0xffffff }),
    new MeshLambertMaterial({ color: 0xf4f7fa }),
    new LineBasicMaterial({ color: 0xc5d0db }),
    new LineBasicMaterial({ color: 0x708ba1 }),
    new MeshLambertMaterial({ color: 0x708ba1 }),
  ];

  const addBox = (box: typeof subscriptionBox, depth: number, z: number, isScope = false) => {
    const geometry = new BoxGeometry(box.width, box.height, depth);
    const edges = new EdgesGeometry(geometry);
    geometries.push(geometry, edges);
    const mesh = new Mesh(geometry, materials[isScope ? 1 : 0]);
    mesh.position.set(box.x + box.width / 2, height - box.y - box.height / 2, z);
    if (!isScope) mesh.rotation.set(0.05, -0.05, 0);
    mesh.add(new LineSegments(edges, materials[2]));
    scene.add(mesh);
  };
  addBox(subscriptionBox, 1, -12, true);
  diagramNodes.forEach((node) => addBox(node, 8, 0));

  const signalGeometry = new SphereGeometry(3, 12, 8);
  geometries.push(signalGeometry);
  const signalMaterial = new MeshBasicMaterial({ color: 0x1677b8 });
  const glowMaterial = new MeshBasicMaterial({ color: 0x1677b8, transparent: true, opacity: 0.12, depthWrite: false });
  const signals = diagramEdges.map(({ id, from, to, points }) => {
    const vertices = points.map(([x, y]) => new Vector3(x, height - y, 6));
    const geometry = new BufferGeometry().setFromPoints(vertices);
    const head = new ConeGeometry(4, 10, 3);
    geometries.push(geometry, head);
    const lineMaterial = new LineBasicMaterial({ color: 0x708ba1 });
    materials.push(lineMaterial);
    scene.add(new Line(geometry, lineMaterial));
    const end = vertices.at(-1)!;
    const direction = end.clone().sub(vertices.at(-2)!).normalize();
    const arrow = new Mesh(head, materials[4]);
    arrow.position.copy(end).addScaledVector(direction, -5);
    arrow.rotation.z = Math.atan2(direction.y, direction.x) - Math.PI / 2;
    scene.add(arrow);
    const curve = new CurvePath<Vector3>();
    vertices.slice(1).forEach((vertex, index) => curve.add(new LineCurve3(vertices[index], vertex)));
    const signal = new Mesh(signalGeometry, signalMaterial);
    const glow = new Mesh(signalGeometry, glowMaterial);
    glow.scale.setScalar(2.7);
    signal.add(glow);
    signal.visible = false;
    scene.add(signal);
    return { id, from, to, curve, signal, lineMaterial };
  });

  let disposed = false;
  let enabled = false;
  let frame: number | null = null;
  let start = 0;
  let last = 0;
  let active = signals;
  const stop = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    signals.forEach(({ signal, lineMaterial }) => {
      signal.visible = false;
      lineMaterial.color.setHex(0x708ba1);
    });
    if (!disposed) renderer.render(scene, camera);
  };
  const animate = (now: number) => {
    if (!start) start = now;
    const elapsed = (now - start) / 1000;
    if (elapsed >= 4) { stop(); return; }
    frame = requestAnimationFrame(animate);
    if (now - last < 1000 / 30) return;
    last = now;
    active.forEach(({ signal, curve, lineMaterial }, index) => {
      const progress = (elapsed - index * 0.4) / 1.7;
      signal.visible = progress > 0 && progress < 1;
      lineMaterial.color.setHex(signal.visible ? 0x1677b8 : 0x708ba1);
      if (signal.visible) {
        signal.position.copy(curve.getPoint(progress));
        signal.position.z = 18;
        signal.scale.setScalar(Math.sin(progress * Math.PI) * 0.4 + 0.6);
      }
    });
    renderer.render(scene, camera);
  };
  const play = (nodeId?: string) => {
    if (disposed || !enabled) return;
    stop();
    active = signals.filter((edge) => !nodeId || edge.from === nodeId || edge.to === nodeId);
    start = 0;
    last = 0;
    frame = requestAnimationFrame(animate);
  };
  const setEnabled = (value: boolean) => {
    enabled = value;
    if (!enabled && !disposed) stop();
  };
  const resize = () => {
    if (disposed) return;
    const bounds = host.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setSize(bounds.width, bounds.height);
    renderer.render(scene, camera);
  };
  const loseContext = (event: Event) => { event.preventDefault(); onContextLost(); };
  const observer = new ResizeObserver(resize);
  const dispose = () => {
    if (disposed) return;
    stop();
    disposed = true;
    observer.disconnect();
    renderer.domElement.removeEventListener('webglcontextlost', loseContext);
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    signalMaterial.dispose();
    glowMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
  try {
    host.appendChild(renderer.domElement);
    renderer.domElement.addEventListener('webglcontextlost', loseContext);
    resize();
    observer.observe(host);
  } catch (error) {
    dispose();
    throw error;
  }
  return { dispose, play, setEnabled };
}
