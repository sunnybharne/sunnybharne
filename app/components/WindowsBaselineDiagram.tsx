import Image from 'next/image';
import styles from './DscDiagram.module.css';

export default function WindowsBaselineDiagram() {
  return (
    <figure className={styles.figure} aria-labelledby="windows-baseline-caption">
      <div className={styles.scroll} role="region" aria-label="Windows baseline diagram, scroll horizontally on small screens" tabIndex={0}>
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/learning-assets/windows-baseline/diagram-static.svg" />
          <Image className={styles.image} src="/learning-assets/windows-baseline/diagram.svg"
            width={880} height={473} unoptimized
            alt="The prerequisite initiative includes Windows and Linux extension deployment policies and two managed identity policies. Each VM receives its OS extension and system-assigned identity. Machine Configuration checks settings inside the OS and sends a report for the applicable Windows or Linux baseline policy. Azure Policy Compliance shows results." />
        </picture>
      </div>
      <p className={styles.hint}>Scroll sideways to see the full diagram.</p>
      <figcaption id="windows-baseline-caption">The same initiative sets up Windows and Linux VMs. Each uses its own OS baseline.</figcaption>
    </figure>
  );
}
