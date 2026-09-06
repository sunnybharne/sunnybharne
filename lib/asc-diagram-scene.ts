import {
  AmbientLight, BoxGeometry, BufferGeometry, ConeGeometry, DirectionalLight,
  EdgesGeometry, Line, LineBasicMaterial, LineSegments, Mesh,
  MeshLambertMaterial, OrthographicCamera, Scene, Vector3, WebGLRenderer,
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

  diagramEdges.forEach(({ points }) => {
    const vertices = points.map(([x, y]) => new Vector3(x, height - y, 6));
    const geometry = new BufferGeometry().setFromPoints(vertices);
    const head = new ConeGeometry(4, 10, 3);
    geometries.push(geometry, head);
    scene.add(new Line(geometry, materials[3]));
    const end = vertices.at(-1)!;
    const direction = end.clone().sub(vertices.at(-2)!).normalize();
    const arrow = new Mesh(head, materials[4]);
    arrow.position.copy(end).addScaledVector(direction, -5);
    arrow.rotation.z = Math.atan2(direction.y, direction.x) - Math.PI / 2;
    scene.add(arrow);
  });

  let disposed = false;
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
    disposed = true;
    observer.disconnect();
    renderer.domElement.removeEventListener('webglcontextlost', loseContext);
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
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
  return { dispose };
}
