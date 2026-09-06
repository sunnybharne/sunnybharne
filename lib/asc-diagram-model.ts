export const diagramSize = { width: 720, height: 460 };
export const subscriptionBox = { x: 20, y: 140, width: 680, height: 174 };

export const diagramNodes = [
  { id: 'defender', x: 220, y: 18, width: 280, height: 64, title: 'Defender for Cloud', detail: 'Security service', href: '/articles/defender-for-cloud/' },
  { id: 'assignment', x: 60, y: 204, width: 250, height: 66, title: 'ASC Default', detail: 'Azure Policy assignment' },
  { id: 'resources', x: 442, y: 204, width: 218, height: 66, title: 'Azure resources', detail: 'VMs, storage, databases' },
  { id: 'benchmark', x: 60, y: 362, width: 250, height: 78, title: 'Microsoft cloud security benchmark', detail: 'Built-in initiative' },
];

export const diagramEdges = [
  { id: 'baseline', points: [[360, 82], [360, 114], [185, 114], [185, 204]], label: 'configures baseline', x: 225, y: 114 },
  { id: 'checks', points: [[310, 237], [442, 237]], label: 'checks', x: 376, y: 219 },
  { id: 'findings', points: [[551, 204], [551, 50], [500, 50]], label: 'findings', x: 551, y: 114 },
  { id: 'reference', points: [[185, 270], [185, 362]], label: 'references', x: 185, y: 336 },
];
