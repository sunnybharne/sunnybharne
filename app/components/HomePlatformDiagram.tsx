import azureIcon from '@/assets/azure.svg';
import devopsIcon from '@/assets/devops.svg';
import policyIcon from '@/assets/policies.svg';
import terraformIcon from '@/assets/terraform.svg';
import bicepIcon from '@/assets/bicep.svg';
import subscriptionIcon from '@/assets/subscrition.svg';
import pipelineIcon from '@/assets/pipeline.svg';
import styles from './HomePlatformDiagram.module.css';

const capabilities = [
  { label: 'Azure DevOps', icon: devopsIcon },
  { label: 'Azure Policy', icon: policyIcon },
  { label: 'Terraform', icon: terraformIcon },
  { label: 'Bicep', icon: bicepIcon },
  { label: 'Subscription vending', icon: subscriptionIcon },
  { label: 'Pipelines', icon: pipelineIcon },
];

export default function HomePlatformDiagram() {
  return (
    <figure className={styles.diagram} aria-labelledby="platform-diagram-caption">
      <div className={styles.root}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Static SVG icons need no image optimization or client code. */}
        <img src={azureIcon.src} alt="" width={32} height={32} />
        <div>
          <span className={styles.title}>Azure</span>
          <span className={styles.subtitle}>Enterprise landing zones</span>
        </div>
      </div>
      <ul className={styles.branches} aria-label="Azure platform tools and practices">
        {capabilities.map(({ label, icon }) => (
          <li className={styles.node} key={label}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Static SVG icons need no image optimization or client code. */}
            <img src={icon.src} alt="" width={26} height={26} />
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <figcaption id="platform-diagram-caption" className={styles.caption}>
        How I build and manage Azure landing zones.
      </figcaption>
    </figure>
  );
}
