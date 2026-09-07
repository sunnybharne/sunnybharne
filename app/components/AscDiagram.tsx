import Image from 'next/image';

export default function AscDiagram() {
  return (
    <figure className="asc-diagram" aria-labelledby="asc-diagram-caption">
      <div className="asc-diagram-scroll" role="region" aria-label="Subscription diagram, scroll horizontally on small screens" tabIndex={0}>
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/learning-assets/asc-default/diagram-static.svg" />
          <Image
          className="asc-diagram-image"
          src="/learning-assets/asc-default/diagram.svg"
          width={843}
          height={583}
          unoptimized
          alt="Within your Azure subscription, the ASC Default Azure Policy initiative assignment uses the Microsoft cloud security benchmark checks to assess Azure resources. View assignment compliance in Azure Policy. Defender for Cloud provides another security view with related recommendations."
          />
        </picture>
      </div>
      <p className="asc-scroll-hint">Scroll sideways to see the full diagram.</p>
      <figcaption id="asc-diagram-caption">
        Illustrative checks, not live Azure activity. Reports gaps; does not fix settings. Paid protection is separate.
      </figcaption>
    </figure>
  );
}
