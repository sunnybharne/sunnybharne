'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import {
  Background,
  BackgroundVariant,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  getSmoothStepPath,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  getArticleDiagram,
  type ArticleDiagram,
  type FlowLink,
  type FlowNode,
} from '@/lib/article-flow';

import styles from './ArticleFlow.module.css';

type FlowCardNode = Node<{ entry: FlowNode; inspect: (id: string) => void }, 'article'>;
type FlowCardEdge = Edge<{
  link: FlowLink;
  inspect: (id: string) => void;
  isAnimating: boolean;
}, 'articleLink'>;

const positions = [Position.Top, Position.Right, Position.Bottom, Position.Left];
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}

function getMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function ArticleCard({ data, selected }: NodeProps<FlowCardNode>) {
  const { entry } = data;
  return (
    <>
      {positions.map((position) => (
        <span key={position}>
          <Handle className={styles.handle} id={`source-${position}`} position={position} type="source" />
          <Handle className={styles.handle} id={`target-${position}`} position={position} type="target" />
        </span>
      ))}
      <button
        aria-label={`Inspect ${entry.name}, ${entry.badge}`}
        aria-pressed={selected}
        className={`${styles.card} ${entry.reference ? styles.referenceCard : ''}`}
        onClick={() => data.inspect(entry.id)}
        type="button"
      >
        <span className={styles.cardTop}>
          <span className={styles.subscription} title={entry.eyebrow}>
            <Image alt="" height={14} src="/azure-icons/subscription.svg" unoptimized width={14} />
            <span>{entry.eyebrow}</span>
          </span>
          <span className={styles.role} data-role={entry.badgeTone ?? 'instance'}>{entry.badge}</span>
        </span>
        <span className={styles.cardTitle}>
          <Image alt="" height={30} src={entry.icon} unoptimized width={30} />
          <strong>{entry.name}</strong>
        </span>
        {entry.detail ? <span className={styles.address}>{entry.detail}</span> : null}
        {entry.flags && entry.flags.length > 0 ? (
          <span className={styles.flags}>
            {entry.flags.map((flag) => (
              <span data-posture={flag.posture} key={flag.label}>{flag.label}</span>
            ))}
          </span>
        ) : null}
        {entry.footerLeft || entry.footerRight ? (
          <span className={styles.cardBottom}>
            <span>
              {entry.footerLeft ? (
                <>
                  <Image alt="" height={13} src={entry.icon} unoptimized width={13} />
                  {entry.footerLeft}
                </>
              ) : null}
            </span>
            <span>{entry.footerRight}</span>
          </span>
        ) : null}
      </button>
    </>
  );
}

function ArticleLinkLine(props: EdgeProps<FlowCardEdge>) {
  const { data } = props;
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    borderRadius: 18,
  });
  if (!data) return null;
  const connected = data.link.status === 'connected' || !data.link.status;
  const identityLink = data.link.status === 'identity';
  const disabled = data.link.status === 'disabled';
  return (
    <>
      <BaseEdge
        id={props.id}
        interactionWidth={24}
        path={path}
        style={{
          stroke: identityLink
            ? 'var(--accent)'
            : connected ? 'var(--network-connected)' : 'var(--network-warning)',
          strokeWidth: props.selected ? 3 : 2,
          strokeDasharray: identityLink ? '2 7' : connected ? undefined : '6 5',
          opacity: disabled ? 0.55 : 1,
        }}
      />
      {connected && !identityLink ? (
        <path
          aria-hidden="true"
          className={styles.peeringPulse}
          d={path}
          data-animating={data.isAnimating}
          data-edge-pulse="true"
          fill="none"
        />
      ) : null}
      <EdgeLabelRenderer>
        <button
          aria-label={`Inspect ${data.link.label}`}
          aria-pressed={props.selected}
          className={`${styles.edgeLabel} nodrag nopan`}
          data-status={identityLink ? 'identity' : connected ? 'connected' : 'disconnected'}
          onClick={() => data.inspect(data.link.id)}
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}
          type="button"
        >
          <span />
          {data.link.label}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

const nodeTypes = { article: ArticleCard };
const edgeTypes = { articleLink: ArticleLinkLine };

function layoutNodes(diagram: ArticleDiagram, inspect: (id: string) => void): FlowCardNode[] {
  return diagram.nodes.map((entry) => ({
    id: entry.id,
    type: 'article',
    data: { entry, inspect },
    position: { x: entry.x, y: entry.y },
    style: { width: 264 },
    focusable: false,
    deletable: false,
  }));
}

function FitToDiagram() {
  const initialized = useNodesInitialized();
  const { fitView } = useReactFlow();
  useEffect(() => {
    if (!initialized) return;
    void fitView({ padding: 0.1 });
  }, [initialized, fitView]);
  return null;
}

function linkHandles(source: FlowCardNode | undefined, target: FlowCardNode | undefined) {
  const dx = (target?.position.x ?? 0) - (source?.position.x ?? 0);
  const dy = (target?.position.y ?? 0) - (source?.position.y ?? 0);
  if (Math.abs(dx) > 100) {
    return dx > 0
      ? { sourceHandle: 'source-right', targetHandle: 'target-left' }
      : { sourceHandle: 'source-left', targetHandle: 'target-right' };
  }
  return dy >= 0
    ? { sourceHandle: 'source-bottom', targetHandle: 'target-top' }
    : { sourceHandle: 'source-top', targetHandle: 'target-bottom' };
}

function NodeDetails({ entry }: { entry: FlowNode }) {
  return (
    <>
      <div className={styles.detailTitle}>
        <Image alt="" height={30} src={entry.icon} unoptimized width={30} />
        <div>
          <span>{entry.badge}</span>
          <h3>{entry.name}</h3>
        </div>
      </div>
      <p className={styles.connectionStatus} data-status={entry.badgeTone === 'restricted' ? 'pending' : 'connected'}>
        {entry.summary || entry.detail}
        <span>{entry.eyebrow}</span>
      </p>
      {entry.properties && entry.properties.length > 0 ? (
        <dl className={styles.properties}>
          {entry.properties.map((property) => (
            <div key={property.term}>
              <dt>{property.term}</dt>
              <dd>{property.description}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </>
  );
}

function LinkDetails({ link, diagram }: { link: FlowLink; diagram: ArticleDiagram }) {
  const source = diagram.nodes.find((item) => item.id === link.source);
  const target = diagram.nodes.find((item) => item.id === link.target);
  return (
    <>
      <div className={styles.detailTitle}>
        <span className={styles.linkIcon} aria-hidden="true">⇄</span>
        <div>
          <span>{link.status === 'identity' ? 'Authentication' : 'Relationship'}</span>
          <h3>{link.label}</h3>
        </div>
      </div>
      <p className={styles.connectionStatus} data-status={link.status === 'connected' || !link.status ? 'connected' : 'pending'}>
        {source?.name} <span aria-hidden="true">→</span> {target?.name}
        <span>{link.label}</span>
      </p>
      {link.note ? <p className={styles.referenceNotice}>{link.note}</p> : null}
    </>
  );
}

function DiagramMap({ diagram, isAnimating }: { diagram: ArticleDiagram; isAnimating: boolean }) {
  const [selection, setSelection] = useState<{ kind: 'node' | 'link'; id: string }>(() => ({
    kind: 'node',
    id: diagram.nodes[0]?.id ?? '',
  }));
  const flow = useReactFlow<FlowCardNode, FlowCardEdge>();
  const inspectNode = useCallback((id: string) => setSelection({ kind: 'node', id }), []);
  const inspectLink = useCallback((id: string) => setSelection({ kind: 'link', id }), []);
  const inspectorRef = useRef<HTMLElement>(null);
  useEffect(() => {
    inspectorRef.current?.scrollTo({ top: 0 });
  }, [selection.id]);
  const initialNodes = useMemo(() => layoutNodes(diagram, inspectNode), [diagram, inspectNode]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  useEffect(() => {
    setNodes(layoutNodes(diagram, inspectNode));
  }, [diagram, inspectNode, setNodes]);
  const visibleNodes = useMemo(
    () => nodes.map((item) => ({
      ...item,
      selected: selection.kind === 'node' && selection.id === item.id,
    })),
    [nodes, selection],
  );
  const edges: FlowCardEdge[] = useMemo(() => diagram.links.map((item) => ({
    id: item.id,
    source: item.source,
    target: item.target,
    type: 'articleLink',
    data: { link: item, inspect: inspectLink, isAnimating },
    ariaLabel: `${diagram.nodes.find((node) => node.id === item.source)?.name} to ${diagram.nodes.find((node) => node.id === item.target)?.name}, ${item.label}`,
    selected: selection.kind === 'link' && selection.id === item.id,
    ...linkHandles(
      nodes.find((node) => node.id === item.source),
      nodes.find((node) => node.id === item.target),
    ),
    focusable: false,
    deletable: false,
  })), [diagram, inspectLink, isAnimating, nodes, selection]);
  const selectedNode = selection.kind === 'node'
    ? diagram.nodes.find((item) => item.id === selection.id)
    : undefined;
  const selectedLink = selection.kind === 'link'
    ? diagram.links.find((item) => item.id === selection.id)
    : undefined;

  return (
    <section aria-label={diagram.ariaLabel} className={styles.diagram}>
      <div className={styles.metrics}>
        {diagram.metrics.map((metric) => (
          <span key={metric.label}>
            {metric.dot === 'connected' ? <i className={styles.connectedDot} /> : null}
            {metric.dot === 'warning' ? <i className={styles.warningDot} /> : null}
            <strong>{metric.value}</strong> {metric.label}
          </span>
        ))}
        <div className={styles.mapActions}>
          <button className={styles.fitButton} onClick={() => void flow.fitView({ padding: 0.1 })} type="button">
            Fit view
          </button>
        </div>
      </div>
      <div className={styles.canvas}>
        <ReactFlow<FlowCardNode, FlowCardEdge>
          nodes={visibleNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={(_, item) => inspectNode(item.id)}
          onEdgeClick={(_, edge) => inspectLink(edge.id)}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.45}
          maxZoom={1.8}
          nodesConnectable={false}
          edgesReconnectable={false}
          deleteKeyCode={null}
          zoomOnDoubleClick={false}
          aria-label={diagram.ariaLabel}
        >
          <FitToDiagram />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
          <Controls position="bottom-left" showInteractive={false} />
        </ReactFlow>
        <span className={styles.canvasHint}>Drag to pan · Scroll to zoom</span>
      </div>
      <p className={styles.mapNote}>{diagram.note}</p>
      <section aria-label="Diagram details" className={styles.inspector} ref={inspectorRef}>
        <label className={styles.inspectControl}>
          <span>Inspect</span>
          <select
            aria-label="Inspect diagram item"
            onChange={(event) => {
              const value = event.target.value;
              const id = value.slice(value.indexOf(':') + 1);
              if (value.startsWith('link:')) inspectLink(id);
              else inspectNode(id);
            }}
            value={`${selection.kind}:${selection.id}`}
          >
            <optgroup label="Nodes">
              {diagram.nodes.map((item) => (
                <option key={item.id} value={`node:${item.id}`}>
                  {item.name} · {item.badge}
                </option>
              ))}
            </optgroup>
            {diagram.links.length > 0 ? (
              <optgroup label="Paths">
                {diagram.links.map((item) => (
                  <option key={item.id} value={`link:${item.id}`}>
                    {diagram.nodes.find((node) => node.id === item.source)?.name} → {diagram.nodes.find((node) => node.id === item.target)?.name} · {item.label}
                  </option>
                ))}
              </optgroup>
            ) : null}
          </select>
        </label>
        {selectedNode ? <NodeDetails entry={selectedNode} /> : null}
        {selectedLink ? <LinkDetails diagram={diagram} link={selectedLink} /> : null}
      </section>
    </section>
  );
}

function Fallback({ diagram }: { diagram: ArticleDiagram }) {
  if (diagram.fallbackSrc) {
    return (
      <figure className={styles.wrap}>
        <Image
          alt={diagram.fallbackAlt ?? diagram.ariaLabel}
          className={styles.fallbackImage}
          height={520}
          src={diagram.fallbackSrc}
          unoptimized
          width={960}
        />
        <figcaption className={styles.caption}>{diagram.note}</figcaption>
      </figure>
    );
  }
  return (
    <figure className={styles.wrap}>
      <ol className={styles.fallbackList}>
        {diagram.nodes.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            {item.detail || item.badge}
          </li>
        ))}
      </ol>
      <figcaption className={styles.caption}>{diagram.note}</figcaption>
    </figure>
  );
}

function LiveDiagram({ diagram }: { diagram: ArticleDiagram }) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => true,
  );
  return (
    <div className={styles.wrap}>
      <ReactFlowProvider>
        <DiagramMap diagram={diagram} isAnimating={!prefersReducedMotion} />
      </ReactFlowProvider>
    </div>
  );
}

export default function ArticleFlow({ diagramId }: { diagramId: string }) {
  const diagram = getArticleDiagram(diagramId);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!diagram) return null;
  if (!mounted) return <Fallback diagram={diagram} />;
  return <LiveDiagram diagram={diagram} />;
}
