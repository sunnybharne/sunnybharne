import Image from 'next/image';
import styles from './DscDiagram.module.css';

export default function DscDiagram() {
  return (
    <figure className={styles.figure} aria-labelledby="dsc-caption">
      <div className={styles.scroll} role="region" aria-label="DSC diagram, scroll horizontally on small screens" tabIndex={0}>
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/learning-assets/dsc/diagram-static.svg" />
          <Image className={styles.image} src="/learning-assets/dsc/diagram.svg" width={890} height={445} unoptimized
            alt="Azure Policy deploys a configuration assignment. Inside the Windows or Linux VM, the Machine Configuration agent reads the assignment, downloads a ZIP containing desired values and code, and runs DSC resources to read, check and, when supported and enabled, apply settings." />
        </picture>
      </div>
      <p className={styles.hint}>Scroll sideways to see the full diagram.</p>
      <figcaption id="dsc-caption">Azure deploys the assignment. The agent runs DSC inside the VM and reports compliance.</figcaption>
    </figure>
  );
}
