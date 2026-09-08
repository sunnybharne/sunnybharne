import Image from 'next/image';

export default function McsbCentralDiagram() {
  return (
    <figure className="asc-diagram" aria-labelledby="mcsb-central-diagram-caption">
      <div
        className="asc-diagram-scroll"
        role="region"
        aria-label="Central MCSB assignment diagram, scroll horizontally on small screens"
        tabIndex={0}
      >
        <Image
          className="asc-diagram-image"
          src="/learning-assets/mcsb-managed-centrally/diagram.svg"
          width={880}
          height={566}
          unoptimized
          alt="Microsoft's built-in MCSB initiative is assigned once at the Papliba organization root management group. Platform, Prod, and Test subscriptions inherit coverage through child management groups, which are omitted from this diagram."
        />
      </div>
      <p className="asc-scroll-hint">Scroll sideways to see the full diagram.</p>
      <figcaption id="mcsb-central-diagram-caption">
        Proposed central model. This article makes no changes in Azure. Existing ASC Default assignments remain separate.
      </figcaption>
    </figure>
  );
}
