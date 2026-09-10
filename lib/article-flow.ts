export type FlowFlag = {
  label: string;
  posture?: 'public' | 'private' | 'restricted';
};

export type FlowProperty = {
  term: string;
  description: string;
};

export type FlowNode = {
  id: string;
  name: string;
  icon: string;
  eyebrow: string;
  badge: string;
  badgeTone?: 'hub' | 'spoke' | 'public' | 'private' | 'restricted' | 'instance' | 'vnet' | 'firewall';
  detail?: string;
  flags?: FlowFlag[];
  footerLeft?: string;
  footerRight?: string;
  x: number;
  y: number;
  reference?: boolean;
  summary?: string;
  properties?: FlowProperty[];
};

export type FlowLinkStatus = 'connected' | 'disconnected' | 'disabled' | 'identity';

export type FlowLink = {
  id: string;
  source: string;
  target: string;
  label: string;
  status?: FlowLinkStatus;
  note?: string;
};

export type FlowMetric = {
  value: string;
  label: string;
  dot?: 'connected' | 'warning';
};

export type ArticleDiagram = {
  id: string;
  ariaLabel: string;
  note: string;
  metrics: FlowMetric[];
  nodes: FlowNode[];
  links: FlowLink[];
  fallbackSrc?: string;
  fallbackAlt?: string;
};

/** Same hub-and-spoke card grid as Papliba network diagrams. */
const COL_X = 404;
const ROW_Y = 224;
const ORIGIN_X = 20;

function node(
  id: string,
  col: number,
  row: number,
  rest: Omit<FlowNode, 'id' | 'x' | 'y'>,
): FlowNode {
  return { id, x: ORIGIN_X + col * COL_X, y: row * ROW_Y, ...rest };
}

function link(
  id: string,
  source: string,
  target: string,
  label: string,
  status: FlowLinkStatus = 'connected',
  note?: string,
): FlowLink {
  return { id, source, target, label, status, note };
}

const ICON = {
  logic: '/azure-icons/logic-apps.svg',
  vnet: '/azure-icons/virtual-networks.svg',
  subnet: '/azure-icons/subnet.svg',
  pep: '/azure-icons/private-endpoint.svg',
  storage: '/azure-icons/storage-accounts.svg',
  files: '/azure-icons/storage-azure-files.svg',
  blob: '/azure-icons/storage-container.svg',
  bastion: '/azure-icons/bastion.svg',
  vm: '/azure-icons/virtual-machine.svg',
  policy: '/azure-icons/policy.svg',
  identity: '/azure-icons/managed-identities.svg',
  firewall: '/azure-icons/firewall.svg',
  subscription: '/azure-icons/subscription.svg',
  mg: '/azure-icons/management-groups.svg',
  resource: '/azure-icons/resource.svg',
  nsg: '/azure-icons/network-security-group.svg',
  app: '/azure-icons/app-service.svg',
} as const;

const diagrams: ArticleDiagram[] = [
  {
    id: 'dsc',
    ariaLabel: 'Desired State Configuration flow',
    note: 'Azure deploys the assignment. The agent runs DSC inside the VM and reports compliance. Lines are the control path, not live traffic.',
    fallbackSrc: '/learning-assets/dsc/diagram-static.svg',
    fallbackAlt: 'Azure Policy deploys a configuration assignment. Inside the Windows or Linux VM, the Machine Configuration agent reads the assignment, downloads a ZIP containing desired values and code, and runs DSC resources to read, check and, when supported and enabled, apply settings.',
    metrics: [
      { value: '4', label: 'hops' },
      { value: 'VM', label: 'runs the code', dot: 'connected' },
    ],
    nodes: [
      node('policy', 0, 0, {
        name: 'Azure Policy',
        icon: ICON.policy,
        eyebrow: 'Control plane',
        badge: 'Assigns',
        badgeTone: 'hub',
        detail: 'Guest assignment on the VM',
        flags: [{ label: 'Does not run DSC' }],
        footerLeft: 'Initiative or custom policy',
        footerRight: 'Azure',
        summary: 'Policy selects machines and deploys a Machine Configuration assignment.',
        properties: [
          { term: 'Job', description: 'Deploy the assignment resource to in-scope VMs.' },
          { term: 'Does not', description: 'Execute the DSC resources or change Windows itself.' },
        ],
      }),
      node('assignment', 1, 0, {
        name: 'Guest assignment',
        icon: ICON.resource,
        eyebrow: 'On the VM',
        badge: 'Package pointer',
        badgeTone: 'instance',
        detail: 'HTTPS URI + content hash',
        flags: [{ label: 'Mode: Audit or Apply' }],
        footerLeft: 'guestConfigurationAssignments',
        footerRight: 'Azure resource',
        summary: 'The assignment tells the agent which package to download and which mode to use.',
        properties: [
          { term: 'Content URI', description: 'HTTPS address of the ZIP the agent must fetch.' },
          { term: 'Hash', description: 'The agent verifies the ZIP before running it.' },
        ],
      }),
      node('agent', 1, 1, {
        name: 'Machine Configuration agent',
        icon: ICON.vm,
        eyebrow: 'Inside the OS',
        badge: 'Runs DSC',
        badgeTone: 'spoke',
        detail: 'Downloads ZIP, Get / Test / Set',
        flags: [{ label: 'Needs extension' }, { label: 'Needs identity' }],
        footerLeft: 'Windows or Linux',
        footerRight: 'Guest',
        summary: 'The agent inside the VM downloads the package and runs DSC resources.',
        properties: [
          { term: 'Get', description: 'Read the current setting.' },
          { term: 'Test', description: 'Compare it with the desired value.' },
          { term: 'Set', description: 'Change it when the package and mode allow.' },
        ],
      }),
      node('report', 0, 1, {
        name: 'Compliance report',
        icon: ICON.policy,
        eyebrow: 'Azure Policy',
        badge: 'Result',
        badgeTone: 'public',
        detail: 'Compliant or non-compliant',
        flags: [{ label: 'Does not fix by itself', posture: 'restricted' }],
        footerLeft: 'Policy → Compliance',
        footerRight: 'Azure',
        summary: 'The agent reports the result. Viewing compliance is separate from remediating drift.',
        properties: [
          { term: 'Where', description: 'Azure Policy compliance for the assignment.' },
          { term: 'Fix', description: 'Only if the package supports Set and the mode applies changes.' },
        ],
      }),
    ],
    links: [
      link('l1', 'policy', 'assignment', 'Deploys assignment'),
      link('l2', 'assignment', 'agent', 'Agent reads assignment'),
      link('l3', 'agent', 'report', 'Reports compliance'),
    ],
  },
  {
    id: 'asc-default',
    ariaLabel: 'ASC Default assignment',
    note: 'Illustrative checks, not live Azure activity. Reports gaps; does not fix settings. Paid Defender plans are separate.',
    metrics: [
      { value: '1', label: 'subscription assignment' },
      { value: '224', label: 'saved checks' },
    ],
    nodes: [
      node('subscription', 0, 0, {
        name: 'Your subscription',
        icon: ICON.subscription,
        eyebrow: 'Scope',
        badge: 'Onboarded',
        badgeTone: 'spoke',
        detail: 'Resources in this subscription',
        footerLeft: 'Azure subscription',
        footerRight: 'Scope',
        summary: 'ASC Default is typically assigned at subscription scope when Defender for Cloud is onboarded.',
        properties: [
          { term: 'Resource name', description: 'SecurityCenterBuiltIn' },
          { term: 'Display name', description: 'ASC Default' },
        ],
      }),
      node('assignment', 1, 0, {
        name: 'ASC Default',
        icon: ICON.policy,
        eyebrow: 'Azure Policy',
        badge: 'Initiative',
        badgeTone: 'hub',
        detail: 'Microsoft cloud security benchmark',
        flags: [{ label: 'Audit / AuditIfNotExists' }, { label: 'Does not remediate', posture: 'restricted' }],
        footerLeft: 'Policy → Compliance',
        footerRight: 'Azure',
        summary: 'A bundled set of security checks. Most effects only audit.',
        properties: [
          { term: 'What it does', description: 'Assess resources against MCSB checks.' },
          { term: 'What it does not', description: 'Turn on paid Defender plans or fix misconfiguration by itself.' },
        ],
      }),
      node('policy-view', 0, 1, {
        name: 'Policy compliance',
        icon: ICON.policy,
        eyebrow: 'Azure Policy',
        badge: 'Results',
        badgeTone: 'public',
        detail: 'Assignment compliance view',
        footerLeft: 'Does not need Defender blade',
        footerRight: 'Portal',
        summary: 'Open Policy → Compliance → ASC Default to see the assignment results.',
        properties: [
          { term: 'Source', description: 'Azure Policy evaluation of the initiative.' },
        ],
      }),
      node('defender', 1, 1, {
        name: 'Defender for Cloud',
        icon: ICON.resource,
        eyebrow: 'Separate view',
        badge: 'Recommendations',
        badgeTone: 'restricted',
        detail: 'Related, not the same list',
        flags: [{ label: 'Paid plans extra', posture: 'restricted' }],
        footerLeft: 'Security recommendations',
        footerRight: 'Portal',
        summary: 'Defender can show related recommendations. That view can differ from Policy compliance.',
        properties: [
          { term: 'Overlap', description: 'Same benchmark family, different presentation.' },
          { term: 'Paid protection', description: 'Enabling Defender plans is a separate charge and setting.' },
        ],
      }),
    ],
    links: [
      link('l1', 'subscription', 'assignment', 'Assigned here'),
      link('l2', 'assignment', 'policy-view', 'Evaluate checks'),
      link(
        'l3',
        'assignment',
        'defender',
        'Related view',
        'disconnected',
        'Defender recommendations are not a substitute for the Policy assignment view.',
      ),
    ],
  },
  {
    id: 'mcsb-central',
    ariaLabel: 'Central MCSB assignment',
    note: 'Proposed central model. This article makes no changes in Azure. Existing ASC Default assignments remain separate.',
    fallbackSrc: '/learning-assets/mcsb-managed-centrally/diagram.svg',
    fallbackAlt: 'Microsoft\'s built-in MCSB initiative is assigned once at the Papliba organization root management group. Platform, Prod, and Test subscriptions inherit coverage through child management groups, which are omitted from this diagram.',
    metrics: [
      { value: '1', label: 'central assignment' },
      { value: '3', label: 'example subscriptions' },
    ],
    nodes: [
      node('root', 0, 1, {
        name: 'Papliba',
        icon: ICON.mg,
        eyebrow: 'Management group',
        badge: 'Central MCSB',
        badgeTone: 'hub',
        detail: 'One initiative assignment',
        flags: [{ label: 'Inherited by children' }],
        footerLeft: 'Organisation root',
        footerRight: 'Policy',
        summary: 'Assign MCSB once at the organisation management group so new subscriptions inherit it.',
        properties: [
          { term: 'Benefit', description: 'One configuration, shared coverage, controlled exceptions.' },
          { term: 'Does not replace', description: 'A subscription ASC Default assignment already present.' },
        ],
      }),
      node('platform', 1, 0, {
        name: 'Platform',
        icon: ICON.subscription,
        eyebrow: 'Child scope',
        badge: 'Inherits',
        badgeTone: 'spoke',
        detail: 'Platform subscription',
        footerLeft: 'Inherited assignment',
        footerRight: 'Subscription',
        summary: 'A platform subscription under Papliba inherits the central MCSB assignment.',
      }),
      node('prod', 1, 1, {
        name: 'Prod',
        icon: ICON.subscription,
        eyebrow: 'Child scope',
        badge: 'Inherits',
        badgeTone: 'spoke',
        detail: 'Production subscription',
        footerLeft: 'Inherited assignment',
        footerRight: 'Subscription',
        summary: 'Production subscriptions inherit the same central assignment.',
      }),
      node('test', 1, 2, {
        name: 'Test',
        icon: ICON.subscription,
        eyebrow: 'Child scope',
        badge: 'Inherits',
        badgeTone: 'spoke',
        detail: 'Test subscription',
        flags: [{ label: 'Exemption is per assignment', posture: 'restricted' }],
        footerLeft: 'Inherited assignment',
        footerRight: 'Subscription',
        summary: 'Exempting Test from the central assignment does not exempt it from a separate ASC Default assignment.',
      }),
    ],
    links: [
      link('l1', 'root', 'platform', 'Inherit'),
      link('l2', 'root', 'prod', 'Inherit'),
      link('l3', 'root', 'test', 'Inherit'),
    ],
  },
  {
    id: 'windows-baseline',
    ariaLabel: 'Windows and Linux baseline prerequisites',
    note: 'The same initiative sets up Windows and Linux VMs. Each uses its own OS baseline. Lines are configuration, not live traffic.',
    metrics: [
      { value: '1', label: 'prerequisite initiative' },
      { value: '2', label: 'OS baselines' },
    ],
    nodes: [
      node('initiative', 0, 1, {
        name: 'Prerequisite initiative',
        icon: ICON.policy,
        eyebrow: 'Azure Policy',
        badge: 'Setup',
        badgeTone: 'hub',
        detail: 'Identity + Machine Configuration extension',
        flags: [{ label: 'Windows policy' }, { label: 'Linux policy' }],
        footerLeft: 'DeployIfNotExists',
        footerRight: 'Azure',
        summary: 'The initiative installs the OS extension and a system-assigned identity on in-scope VMs.',
        properties: [
          { term: 'Windows', description: 'Windows Machine Configuration extension.' },
          { term: 'Linux', description: 'Linux Machine Configuration extension.' },
          { term: 'Identity', description: 'System-assigned identity for the VM to authenticate.' },
        ],
      }),
      node('windows-vm', 1, 0, {
        name: 'Windows VM',
        icon: ICON.vm,
        eyebrow: 'Guest',
        badge: 'Baseline',
        badgeTone: 'spoke',
        detail: 'Windows baseline assignment',
        flags: [{ label: 'Extension' }, { label: 'System identity' }],
        footerLeft: 'Machine Configuration',
        footerRight: 'Windows',
        summary: 'The Windows VM gets its extension, identity, and the Windows security baseline assignment.',
      }),
      node('linux-vm', 1, 1, {
        name: 'Linux VM',
        icon: ICON.vm,
        eyebrow: 'Guest',
        badge: 'Baseline',
        badgeTone: 'spoke',
        detail: 'Linux baseline assignment',
        flags: [{ label: 'Extension' }, { label: 'System identity' }],
        footerLeft: 'Machine Configuration',
        footerRight: 'Linux',
        summary: 'Linux uses the Linux baseline. A Windows DSC resource does not run there.',
      }),
      node('compliance', 1, 2, {
        name: 'Policy compliance',
        icon: ICON.policy,
        eyebrow: 'Azure Policy',
        badge: 'Reports',
        badgeTone: 'public',
        detail: 'Per-OS baseline results',
        footerLeft: 'Audit inside the OS',
        footerRight: 'Azure',
        summary: 'Each OS baseline reports separately. The prerequisite initiative only prepares the machine.',
      }),
    ],
    links: [
      link('l1', 'initiative', 'windows-vm', 'Deploys Windows setup'),
      link('l2', 'initiative', 'linux-vm', 'Deploys Linux setup'),
      link('l3', 'windows-vm', 'compliance', 'Windows baseline report'),
      link('l4', 'linux-vm', 'compliance', 'Linux baseline report'),
    ],
  },
  {
    id: 'logic-app-storage-path',
    ariaLabel: 'Logic App outbound path to private storage',
    note: 'Read left to right for packets: Logic App, integration subnet, private endpoint subnet, then storage. There is no private endpoint on the Logic App. A service endpoint is unused while storage public access is disabled.',
    fallbackSrc: '/learning-assets/logic-app-storage-networking/path.svg',
    fallbackAlt: 'The Logic App sends outbound traffic into an integration subnet. The same VNet routes that traffic to four storage private endpoints in a second subnet. Storage public access stays off.',
    metrics: [
      { value: '1', label: 'Standard app' },
      { value: '2', label: 'subnets' },
      { value: '4', label: 'storage private endpoints', dot: 'connected' },
    ],
    nodes: [
      node('app', 0, 0, {
        name: 'logic-plb-app-test-swc-001',
        icon: ICON.logic,
        eyebrow: 'Sweden Central',
        badge: 'WS1',
        badgeTone: 'instance',
        detail: 'Standard · Workflow Service Plan',
        flags: [
          { label: 'Running', posture: 'public' },
          { label: 'Internet inbound off', posture: 'private' },
          { label: 'No workflows', posture: 'restricted' },
        ],
        footerLeft: 'VNet integration',
        footerRight: 'Sweden Central',
        summary: 'Standard Logic App. Outbound uses VNet integration. There is no private endpoint on the app.',
        properties: [
          { term: 'Plan', description: 'WS1 Workflow Service Plan' },
          { term: 'Public inbound', description: 'Disabled' },
          { term: 'App private endpoint', description: 'None' },
        ],
      }),
      node('integration', 1, 0, {
        name: 'snet-logicapp-integration-test-swc-001',
        icon: ICON.subnet,
        eyebrow: 'Outbound',
        badge: 'Delegated',
        badgeTone: 'vnet',
        detail: '10.202.1.0/24',
        flags: [
          { label: 'Microsoft.Web/serverFarms' },
          { label: 'Route all' },
          { label: 'No service endpoint', posture: 'restricted' },
        ],
        footerLeft: 'vnet-spoke-test-swc-001',
        footerRight: 'Spoke',
        summary: 'The app’s outgoing sockets are placed in this delegated subnet.',
        properties: [
          { term: 'Delegation', description: 'Microsoft.Web/serverFarms' },
          { term: 'DNS', description: '168.63.129.16' },
        ],
      }),
      node('privatelink', 1, 1, {
        name: 'snet-privatelink-test-swc-001',
        icon: ICON.pep,
        eyebrow: 'Private Link',
        badge: '4 NICs',
        badgeTone: 'private',
        detail: '10.202.2.0/27',
        flags: [
          { label: 'blob', posture: 'private' },
          { label: 'file', posture: 'private' },
          { label: 'queue', posture: 'private' },
          { label: 'table', posture: 'private' },
        ],
        footerLeft: 'Same spoke VNet',
        footerRight: 'Private IPs',
        summary: 'Four storage private endpoints. Storage does not live in this subnet; the NICs do.',
        properties: [
          { term: 'Endpoints', description: 'pep-app-blob, pep-app-file, pep-app-queue, pep-app-table' },
        ],
      }),
      node('storage', 0, 1, {
        name: 'stplbapptestswc001',
        icon: ICON.storage,
        eyebrow: 'Runtime storage',
        badge: 'Public off',
        badgeTone: 'private',
        detail: 'Job storage + content share',
        flags: [
          { label: 'Public access disabled', posture: 'private' },
          { label: 'No VNet firewall rules', posture: 'restricted' },
        ],
        footerLeft: 'Content share matches app name',
        footerRight: 'Sweden Central',
        summary: 'If these four private endpoints are removed and public access stays off, the app has no path to storage.',
        properties: [
          { term: 'Public network', description: 'Disabled' },
          { term: 'Service endpoint path', description: 'Cannot work while public access is disabled.' },
        ],
      }),
    ],
    links: [
      link('l1', 'app', 'integration', 'VNet integration'),
      link('l2', 'integration', 'privatelink', 'Same VNet routing'),
      link('l3', 'privatelink', 'storage', 'Private Link'),
    ],
  },
  {
    id: 'storage-access-checks',
    ariaLabel: 'Two checks before blob access',
    note: 'A permitted network path is not permission to read data. Both checks must pass. Managing account settings is a separate operation.',
    fallbackSrc: '/learning-assets/storage-account/access-checks.svg',
    fallbackAlt: 'A client needs both an allowed network path and data authorization before reading or writing a blob. Managing account settings is a separate operation.',
    metrics: [
      { value: '2', label: 'checks' },
      { value: 'both', label: 'must pass', dot: 'connected' },
    ],
    nodes: [
      node('client', 0, 0, {
        name: 'Client',
        icon: ICON.resource,
        eyebrow: 'Caller',
        badge: 'Request',
        badgeTone: 'instance',
        detail: 'SDK, portal, or another Azure service',
        footerLeft: 'Needs a path and a permission',
        footerRight: 'Outside or in Azure',
        summary: 'Any client that wants to read or write a blob must pass two independent checks.',
      }),
      node('network', 0, 1, {
        name: 'Allowed network path?',
        icon: ICON.firewall,
        eyebrow: 'Check 1',
        badge: 'Network',
        badgeTone: 'firewall',
        detail: 'Public, selected networks, or private endpoint',
        flags: [{ label: 'Firewall / Private Link' }],
        footerLeft: 'Does not grant data access',
        footerRight: 'Storage networking',
        summary: 'The packet must be allowed to reach the account: public endpoint, selected VNet/IP, or Private Link.',
      }),
      node('auth', 1, 0, {
        name: 'Authorized for data?',
        icon: ICON.identity,
        eyebrow: 'Check 2',
        badge: 'RBAC / key',
        badgeTone: 'instance',
        detail: 'Identity, SAS, or account key',
        flags: [{ label: 'Auth, not packets' }],
        footerLeft: 'Does not open the firewall',
        footerRight: 'Data plane',
        summary: 'A role assignment or key is required. It does not bypass network rules.',
      }),
      node('blob', 1, 1, {
        name: 'Read or write blob',
        icon: ICON.blob,
        eyebrow: 'Data plane',
        badge: 'Both passed',
        badgeTone: 'public',
        detail: 'Only after network and authorization',
        footerLeft: 'Blob service',
        footerRight: 'Storage',
        summary: 'Managing the account (control plane) is a different operation from reading a blob.',
      }),
    ],
    links: [
      link('l1', 'client', 'network', '1. Network'),
      link('l2', 'client', 'auth', '2. Authorization'),
      link('l3', 'network', 'blob', 'Path allowed'),
      link('l4', 'auth', 'blob', 'Data allowed'),
    ],
  },
  {
    id: 'storage-network-paths',
    ariaLabel: 'Service endpoint versus private endpoint',
    note: 'Both paths still need data permissions. DNS chooses the live path when both exist. A service endpoint cannot reach an account whose public access is disabled.',
    fallbackSrc: '/learning-assets/storage-account/network-paths.svg',
    fallbackAlt: 'A service endpoint uses the Storage public endpoint. A private endpoint gives Blob Storage a private IP in the client VNet. Both paths require data permissions.',
    metrics: [
      { value: '2', label: 'network models' },
      { value: 'DNS', label: 'picks the live path' },
    ],
    nodes: [
      node('subnet-se', 0, 0, {
        name: 'VNet subnet',
        icon: ICON.subnet,
        eyebrow: 'Service endpoint',
        badge: 'Microsoft.Storage',
        badgeTone: 'vnet',
        detail: 'Service endpoint enabled',
        flags: [{ label: 'Still uses public hostname', posture: 'restricted' }],
        footerLeft: 'Subnet setting',
        footerRight: 'VNet',
        summary: 'A service endpoint is a subnet setting. Traffic still targets storage’s public hostname.',
      }),
      node('public', 1, 0, {
        name: 'Storage public endpoint',
        icon: ICON.storage,
        eyebrow: 'Public hostname',
        badge: 'Firewall must allow subnet',
        badgeTone: 'public',
        detail: 'Selected virtual networks and IPs',
        flags: [{ label: 'Fails if public access is Disabled', posture: 'private' }],
        footerLeft: 'Public door',
        footerRight: 'Storage',
        summary: 'The storage firewall must allow that subnet. Public access cannot be fully disabled on this path.',
      }),
      node('pep', 0, 1, {
        name: 'Private endpoint',
        icon: ICON.pep,
        eyebrow: 'Private Link',
        badge: 'Private IP',
        badgeTone: 'private',
        detail: 'NIC in a non-delegated subnet',
        flags: [{ label: 'blob', posture: 'private' }],
        footerLeft: 'In the VNet',
        footerRight: 'Private IP',
        summary: 'A private endpoint gives Blob a private IP. The storage account itself stays outside the VNet.',
      }),
      node('blob', 1, 1, {
        name: 'Storage Blob service',
        icon: ICON.blob,
        eyebrow: 'Private Link target',
        badge: 'Account stays in Storage',
        badgeTone: 'private',
        detail: 'Works with public access disabled',
        flags: [{ label: 'Disable public access separately', posture: 'private' }],
        footerLeft: 'Private Link',
        footerRight: 'Storage',
        summary: 'Creating the endpoint does not by itself turn public access off. Set that separately.',
      }),
    ],
    links: [
      link(
        'l1',
        'subnet-se',
        'public',
        'Public hostname',
        'disconnected',
        'Service endpoint traffic still uses the public storage endpoint, restricted by the firewall.',
      ),
      link('l2', 'pep', 'blob', 'Private Link'),
    ],
  },
  {
    id: 'bastion-hub-spoke',
    ariaLabel: 'Browser to hub Bastion to a private spoke VM',
    note: 'Planned public-facing Bastion example. The VM has no public IP. The browser session does not give every app on your laptop a route into the VNet.',
    fallbackSrc: '/learning-assets/bastion/browser-hub-spoke.svg',
    fallbackAlt: 'Common public-facing Bastion path: browser connects over HTTPS to Bastion in the hub VNet, then Bastion uses VNet peering and private RDP to reach a Windows VM in a spoke VNet. The VM has no public IP.',
    metrics: [
      { value: '443', label: 'browser to Bastion' },
      { value: '3389', label: 'Bastion to VM', dot: 'connected' },
    ],
    nodes: [
      node('browser', 0, 0.5, {
        name: 'Your browser',
        icon: ICON.resource,
        eyebrow: 'Internet',
        badge: 'HTTPS',
        badgeTone: 'public',
        detail: 'Azure Portal session',
        flags: [{ label: 'TCP 443' }],
        footerLeft: 'Public client',
        footerRight: 'User',
        summary: 'The laptop reaches Bastion over the internet on 443. It does not RDP to the VM’s public IP.',
      }),
      node('bastion', 1, 0, {
        name: 'Azure Bastion',
        icon: ICON.bastion,
        eyebrow: 'Hub VNet',
        badge: 'Basic+',
        badgeTone: 'hub',
        detail: 'AzureBastionSubnet /26+',
        flags: [{ label: 'Public IP on Bastion' }, { label: 'Peering supported' }],
        footerLeft: 'Hub',
        footerRight: 'Access service',
        summary: 'Bastion in the hub accepts the browser session, then opens private RDP to the spoke VM.',
        properties: [
          { term: 'Subnet', description: 'Named AzureBastionSubnet, /26 or larger.' },
          { term: 'Developer SKU', description: 'No VNet peering. Not this hub design.' },
        ],
      }),
      node('vm', 1, 1, {
        name: 'Windows VM',
        icon: ICON.vm,
        eyebrow: 'Spoke VNet',
        badge: 'No public IP',
        badgeTone: 'private',
        detail: 'Private IP only',
        flags: [{ label: 'RDP 3389', posture: 'private' }],
        footerLeft: 'Peered spoke',
        footerRight: 'Guest OS',
        summary: 'The VM needs no public IP. NSG and Windows Firewall must still allow Bastion’s RDP.',
      }),
    ],
    links: [
      link('l1', 'browser', 'bastion', 'HTTPS · TCP 443'),
      link('l2', 'bastion', 'vm', 'Peering · RDP 3389'),
    ],
  },
  {
    id: 'vnet-peering-path',
    ariaLabel: 'Hub and spoke VNet peering for Bastion',
    note: 'Peering is not transitive. It adds a private path only. Data-transfer charges apply. A connected peering does not prove an RDP login works.',
    metrics: [
      { value: '2', label: 'peering links' },
      { value: 'private', label: 'backbone path', dot: 'connected' },
    ],
    nodes: [
      node('hub', 0, 0.5, {
        name: 'Hub VNet',
        icon: ICON.vnet,
        eyebrow: 'Platform subscription',
        badge: 'Hub',
        badgeTone: 'hub',
        detail: '10.10.0.0/16 example',
        flags: [{ label: 'Bastion here' }],
        footerLeft: 'Must not overlap spoke',
        footerRight: 'Region',
        summary: 'Create a peering on this VNet pointing at the spoke, with virtual network access enabled.',
      }),
      node('spoke', 1, 0, {
        name: 'Spoke VNet',
        icon: ICON.vnet,
        eyebrow: 'Workload subscription',
        badge: 'Spoke',
        badgeTone: 'spoke',
        detail: '10.20.0.0/16 example',
        flags: [{ label: 'VM private IP' }],
        footerLeft: 'Must not overlap hub',
        footerRight: 'Same or other region',
        summary: 'Create the reciprocal peering. Both sides should show Connected.',
      }),
      node('vm', 1, 1, {
        name: 'Windows VM',
        icon: ICON.vm,
        eyebrow: 'Spoke subnet',
        badge: 'No public IP',
        badgeTone: 'private',
        detail: 'Reached via private IP',
        footerLeft: 'Needs NSG allow',
        footerRight: 'Guest',
        summary: 'Peering permits a path. The VM firewall and your RBAC login are separate.',
      }),
    ],
    links: [
      link('l1', 'hub', 'spoke', 'Connected peering'),
      link('l2', 'spoke', 'vm', 'Private IP'),
    ],
  },
  {
    id: 'machine-configuration-flow',
    ariaLabel: 'Policy, assignment, package, and agent',
    note: 'A policy assignment is not the same object as a machine assignment. The agent inside the VM downloads and runs the package.',
    metrics: [
      { value: '4', label: 'parts' },
      { value: 'guest', label: 'runs the code', dot: 'connected' },
    ],
    nodes: [
      node('policy', 0, 0, {
        name: 'Azure Policy assignment',
        icon: ICON.policy,
        eyebrow: 'Scope',
        badge: 'Orchestrates',
        badgeTone: 'hub',
        detail: 'Management group or subscription',
        footerLeft: 'Policy assignment',
        footerRight: 'Azure',
        summary: 'Applies a policy or initiative at a scope. It can deploy machine assignments; it is not the machine assignment.',
      }),
      node('guest', 1, 0, {
        name: 'Machine assignment',
        icon: ICON.resource,
        eyebrow: 'On the VM',
        badge: 'Package + mode',
        badgeTone: 'instance',
        detail: 'guestConfigurationAssignments',
        flags: [{ label: 'URI + hash' }],
        footerLeft: 'Per machine',
        footerRight: 'Azure resource',
        summary: 'Connects one machine to a particular configuration and mode.',
      }),
      node('package', 1, 1, {
        name: 'Configuration package',
        icon: ICON.blob,
        eyebrow: 'ZIP',
        badge: 'MOF + modules',
        badgeTone: 'restricted',
        detail: 'Desired values and DSC code',
        footerLeft: 'HTTPS host',
        footerRight: 'Artifact',
        summary: 'The ZIP is an artifact. Storage or another HTTPS host does not execute it.',
      }),
      node('agent', 0, 1, {
        name: 'Agent inside the machine',
        icon: ICON.vm,
        eyebrow: 'Guest OS',
        badge: 'Get / Test / Set',
        badgeTone: 'spoke',
        detail: 'Reports compliance',
        footerLeft: 'Windows or Linux',
        footerRight: 'Guest',
        summary: 'Downloads the ZIP, verifies the hash, checks or applies settings, and reports.',
      }),
    ],
    links: [
      link('l1', 'policy', 'guest', 'Can deploy'),
      link('l2', 'guest', 'package', 'Points at ZIP'),
      link('l3', 'package', 'agent', 'Agent downloads'),
    ],
  },
  {
    id: 'windows-password-age',
    ariaLabel: 'Maximum password age policy flow',
    note: 'This changes the local maximum password age rule. It does not generate or reset account passwords.',
    fallbackSrc: '/learning-assets/windows-password-age/flow.svg',
    fallbackAlt: 'Azure Policy deploys the assignment; the VM agent downloads the package and changes Windows maximum password age.',
    metrics: [
      { value: '42', label: 'days or fewer' },
      { value: 'local', label: 'password rule', dot: 'connected' },
    ],
    nodes: [
      node('policy', 0, 0.5, {
        name: 'Azure Policy',
        icon: ICON.policy,
        eyebrow: 'DeployIfNotExists',
        badge: 'Deploys',
        badgeTone: 'hub',
        detail: 'Guest assignment on the VM',
        footerLeft: 'Custom policy',
        footerRight: 'Azure',
        summary: 'Policy deploys the Machine Configuration assignment. It does not edit secpol.msc itself.',
      }),
      node('agent', 1, 0, {
        name: 'VM agent',
        icon: ICON.vm,
        eyebrow: 'Inside Windows',
        badge: 'Downloads ZIP',
        badgeTone: 'spoke',
        detail: 'Machine Configuration',
        footerLeft: 'Needs extension + identity',
        footerRight: 'Guest',
        summary: 'The agent downloads the package and runs the DSC resource.',
      }),
      node('setting', 1, 1, {
        name: 'Maximum password age',
        icon: ICON.resource,
        eyebrow: 'secpol.msc',
        badge: '≤ 42 days',
        badgeTone: 'public',
        detail: 'Account Policies → Password Policy',
        flags: [{ label: 'Does not reset passwords', posture: 'restricted' }],
        footerLeft: 'Local policy',
        footerRight: 'Windows',
        summary: '90 or unlimited becomes 42. 30 stays 30. Domain controllers are rejected. Password never expires is left alone.',
      }),
    ],
    links: [
      link('l1', 'policy', 'agent', 'Assignment'),
      link('l2', 'agent', 'setting', 'Set when needed'),
    ],
  },
  {
    id: 'password-remediation',
    ariaLabel: 'Minimum password length remediation',
    note: 'Policy remediation deploys the assignment. The agent changes the Windows rule from 8 to 14. Existing account passwords are not rewritten.',
    fallbackSrc: '/learning-assets/windows-vm-policy-enforcement/password-remediation-flow.svg',
    fallbackAlt: 'Password remediation flow: Azure Policy deploys the guest assignment, the VM agent downloads the ZIP, DSC changes minimum password length from 8 to 14, and the agent reports the setting as Compliant.',
    metrics: [
      { value: '8 → 14', label: 'minimum length' },
      { value: 'ApplyAndAutoCorrect', label: 'mode', dot: 'connected' },
    ],
    nodes: [
      node('policy', 0, 0, {
        name: 'Azure Policy remediation',
        icon: ICON.policy,
        eyebrow: 'Control plane',
        badge: 'Deploys assignment',
        badgeTone: 'hub',
        detail: 'Guest configuration assignment',
        footerLeft: 'Does not edit Windows',
        footerRight: 'Azure',
        summary: 'Remediation creates or updates the Machine Configuration assignment on the VM.',
      }),
      node('agent', 1, 0, {
        name: 'Machine Configuration agent',
        icon: ICON.vm,
        eyebrow: 'Inside Windows',
        badge: 'Downloads ZIP',
        badgeTone: 'spoke',
        detail: 'Runs DSC Set',
        footerLeft: 'ApplyAndAutoCorrect',
        footerRight: 'Guest',
        summary: 'The agent downloads the package and can correct later drift at the next evaluation.',
      }),
      node('dsc', 1, 1, {
        name: 'DSC resource',
        icon: ICON.resource,
        eyebrow: 'Package',
        badge: '8 → 14',
        badgeTone: 'instance',
        detail: 'Minimum password length',
        flags: [{ label: 'Rule only', posture: 'restricted' }],
        footerLeft: 'Does not reset passwords',
        footerRight: 'Windows',
        summary: 'The resource changes the local minimum length setting, not existing passwords.',
      }),
      node('report', 0, 1, {
        name: 'Compliant',
        icon: ICON.policy,
        eyebrow: 'Report',
        badge: 'Result',
        badgeTone: 'public',
        detail: 'Agent reports the setting',
        footerLeft: 'Baseline still audits separately',
        footerRight: 'Azure',
        summary: 'The built-in Windows baseline continues to audit. This custom package is what changes the value.',
      }),
    ],
    links: [
      link('l1', 'policy', 'agent', 'Assignment'),
      link('l2', 'agent', 'dsc', 'Set'),
      link('l3', 'dsc', 'report', 'Report'),
    ],
  },
  {
    id: 'private-packages-hub',
    ariaLabel: 'Shared hub private endpoint for packages',
    note: 'Proposed architecture for review. Each spoke peers to the hub and downloads through the hub Blob private endpoint. Spokes do not need to peer to each other.',
    metrics: [
      { value: '1', label: 'hub endpoint' },
      { value: '3', label: 'example spokes' },
    ],
    nodes: [
      node('spoke-a', 0, 0, {
        name: 'Spoke A VM',
        icon: ICON.vm,
        eyebrow: 'Workload subscription',
        badge: 'Direct peering',
        badgeTone: 'spoke',
        detail: 'Initiates its own download',
        footerLeft: 'Private path',
        footerRight: 'Guest',
        summary: 'The VM starts the HTTPS download. Policy does not push the ZIP through the management group.',
      }),
      node('spoke-b', 0, 1, {
        name: 'Spoke B VM',
        icon: ICON.vm,
        eyebrow: 'Workload subscription',
        badge: 'Direct peering',
        badgeTone: 'spoke',
        detail: 'Own peering to hub',
        footerLeft: 'Not via spoke A',
        footerRight: 'Guest',
        summary: 'Peering is not transitive. This spoke needs its own hub peering.',
      }),
      node('spoke-c', 0, 2, {
        name: 'Spoke C VM',
        icon: ICON.vm,
        eyebrow: 'Workload subscription',
        badge: 'Direct peering',
        badgeTone: 'spoke',
        detail: 'Own peering to hub',
        footerLeft: 'Landing-zone template',
        footerRight: 'Guest',
        summary: 'New subscriptions get peering and DNS from landing-zone code.',
      }),
      node('hub', 1, 0, {
        name: 'Hub VNet',
        icon: ICON.vnet,
        eyebrow: 'Platform',
        badge: 'Hub',
        badgeTone: 'hub',
        detail: 'Shared private endpoint subnet',
        flags: [{ label: 'DNS resolver' }],
        footerLeft: 'Platform subscription',
        footerRight: 'Shared network',
        summary: 'One Blob private endpoint in the hub serves connected spokes.',
      }),
      node('pep', 1, 1, {
        name: 'Blob private endpoint',
        icon: ICON.pep,
        eyebrow: 'Hub subnet',
        badge: 'Private IP',
        badgeTone: 'private',
        detail: 'privatelink.blob.core.windows.net',
        flags: [{ label: 'Public access off', posture: 'private' }],
        footerLeft: 'Private Link',
        footerRight: 'Hub',
        summary: 'Storage can live in the platform subscription. The endpoint is the private entry.',
      }),
      node('storage', 1, 2, {
        name: 'Package storage',
        icon: ICON.storage,
        eyebrow: 'Outside the VNet',
        badge: 'Blob container',
        badgeTone: 'private',
        detail: 'Anonymous blobs off',
        flags: [{ label: 'Blob Data Reader on identity' }],
        footerLeft: 'ZIP packages',
        footerRight: 'Storage',
        summary: 'Keep packages private. The VM identity needs read permission on the container.',
      }),
    ],
    links: [
      link('l1', 'spoke-a', 'hub', 'Peering'),
      link('l2', 'spoke-b', 'hub', 'Peering'),
      link('l3', 'spoke-c', 'hub', 'Peering'),
      link('l4', 'hub', 'pep', 'Private IP'),
      link('l5', 'pep', 'storage', 'Private Link'),
    ],
  },
  {
    id: 'private-packages-download',
    ariaLabel: 'Package download on the VM',
    note: 'Policy selects the package. DNS returns the hub private IP. Identity authorises the read. The agent applies the setting and reports on a separate channel.',
    metrics: [
      { value: '4', label: 'stages' },
      { value: 'VM', label: 'pulls the ZIP', dot: 'connected' },
    ],
    nodes: [
      node('policy', 0, 0, {
        name: 'Azure Policy',
        icon: ICON.policy,
        eyebrow: 'Instruction',
        badge: 'Assignment',
        badgeTone: 'hub',
        detail: 'Which package and mode',
        footerLeft: 'Does not push the ZIP',
        footerRight: 'Azure',
        summary: 'Policy deploys the guest assignment. The ZIP is not pushed through the management group.',
      }),
      node('dns', 1, 0, {
        name: 'Private DNS',
        icon: ICON.resource,
        eyebrow: 'Name to IP',
        badge: 'Resolver',
        badgeTone: 'vnet',
        detail: 'Hub private resolver',
        flags: [{ label: 'Peering ≠ DNS', posture: 'restricted' }],
        footerLeft: 'Spoke DNS → hub resolver',
        footerRight: 'Hub',
        summary: 'The app still uses the normal storage hostname. DNS must return the hub endpoint IP.',
      }),
      node('identity', 1, 1, {
        name: 'Package-reader identity',
        icon: ICON.identity,
        eyebrow: 'Authorization',
        badge: 'Blob Data Reader',
        badgeTone: 'instance',
        detail: 'Auth, not packets',
        flags: [{ label: 'Not Owner' }],
        footerLeft: 'User-assigned or system',
        footerRight: 'Entra ID',
        summary: 'Storage checks this identity. A private IP alone does not grant Blob read.',
      }),
      node('agent', 0, 1, {
        name: 'Agent + Windows',
        icon: ICON.vm,
        eyebrow: 'Guest',
        badge: 'Apply',
        badgeTone: 'spoke',
        detail: 'Hash, then Get / Test / Set',
        footerLeft: 'Reports separately',
        footerRight: 'OS',
        summary: 'The agent downloads, verifies, applies when supported, and reports over its service connection.',
      }),
    ],
    links: [
      link('l1', 'policy', 'dns', 'VM looks up storage name'),
      link('l2', 'dns', 'identity', 'Private IP + RBAC'),
      link('l3', 'identity', 'agent', 'Download ZIP', 'identity', 'The identity presents itself to Storage. That is not the packet path.'),
    ],
  },
  {
    id: 'private-packages-onboarding',
    ariaLabel: 'Automatic spoke onboarding',
    note: 'Platform code creates the hub. Landing-zone code creates each spoke. Inherited policy prepares VMs. Checks prove the private download works.',
    metrics: [
      { value: '4', label: 'automation layers' },
      { value: 'repeat', label: 'per region as needed' },
    ],
    nodes: [
      node('platform', 0, 0, {
        name: 'Platform foundation',
        icon: ICON.mg,
        eyebrow: 'Code',
        badge: 'Hub services',
        badgeTone: 'hub',
        detail: 'Endpoint, DNS, storage IAM',
        footerLeft: 'Once per region',
        footerRight: 'Platform',
        summary: 'Creates the hub subnet, Blob endpoint, DNS resolver, private storage and reader identity.',
      }),
      node('landing', 1, 0, {
        name: 'Landing zone',
        icon: ICON.vnet,
        eyebrow: 'Code',
        badge: 'Spoke',
        badgeTone: 'spoke',
        detail: 'VNet, both peerings, DNS',
        footerLeft: 'Each subscription',
        footerRight: 'Workload',
        summary: 'Creates the spoke, both peering directions, and DNS settings so names resolve in the hub.',
      }),
      node('policy', 1, 1, {
        name: 'Inherited policy',
        icon: ICON.policy,
        eyebrow: 'Management group',
        badge: 'Prepares VMs',
        badgeTone: 'instance',
        detail: 'Extension, identity, assignment',
        footerLeft: 'No per-VM click-ops',
        footerRight: 'Azure Policy',
        summary: 'Prerequisite initiative and custom configuration policy apply to new VMs automatically.',
      }),
      node('verify', 0, 1, {
        name: 'Automated checks',
        icon: ICON.resource,
        eyebrow: 'Prove it',
        badge: 'Private download',
        badgeTone: 'public',
        detail: 'Resolve, download, apply, report',
        footerLeft: 'Repeat per region',
        footerRight: 'Pipeline',
        summary: 'A connected peering is not enough. Test private DNS, download, apply and reporting.',
      }),
    ],
    links: [
      link('l1', 'platform', 'landing', 'Shared hub'),
      link('l2', 'landing', 'policy', 'In-scope VMs'),
      link('l3', 'policy', 'verify', 'Then prove the path'),
    ],
  },
  {
    id: 'logic-apps-pricing',
    ariaLabel: 'Logic Apps hosting prices in Sweden Central',
    note: 'Pay-as-you-go USD list prices for Sweden Central from the Azure Retail Prices API on 10 September 2026. Monthly figures use 730 hours, the same convention as Microsoft’s Standard examples. EA discounts and extra resources are not included.',
    metrics: [
      { value: 'SE', label: 'Sweden Central' },
      { value: 'WS1', label: 'this lab', dot: 'connected' },
      { value: '730h', label: 'monthly convention' },
    ],
    nodes: [
      node('consumption', 0, 0, {
        name: 'Consumption',
        icon: ICON.logic,
        eyebrow: 'Multitenant',
        badge: '$0 idle',
        badgeTone: 'public',
        detail: 'Pay per operation',
        flags: [
          { label: '4,000 built-in free / month' },
          { label: 'Then $0.000025' },
          { label: 'No VNet integration', posture: 'restricted' },
        ],
        footerLeft: 'Shared infrastructure',
        footerRight: 'Sweden Central',
        summary: 'No hosting floor. You pay when triggers and actions run. Polling triggers can bill even when they skip.',
        properties: [
          { term: 'Built-in actions', description: 'First 4,000 per subscription per month free, then $0.000025.' },
          { term: 'Standard connector', description: '$0.000163 per call.' },
          { term: 'Enterprise connector', description: '$0.0013 per call.' },
          { term: 'Data retention', description: '$0.12 per GB-month.' },
          { term: 'Private VNet', description: 'Not available. ISE is retired.' },
        ],
      }),
      node('ws1', 1, 0, {
        name: 'Standard WS1',
        icon: ICON.app,
        eyebrow: 'This lab',
        badge: '~$180 / mo',
        badgeTone: 'hub',
        detail: '1 vCPU · 3.5 GB',
        flags: [
          { label: 'Always on', posture: 'restricted' },
          { label: 'Built-in actions free' },
          { label: 'VNet integration' },
        ],
        footerLeft: 'Workflow Service Plan',
        footerRight: 'Sweden Central',
        summary: 'Billed for reserved compute even with no workflows. 730 × (1 × $0.1972 + 3.5 × $0.0141) ≈ $180.',
        properties: [
          { term: 'vCPU', description: '$0.1972 per hour' },
          { term: 'Memory', description: '$0.0141 per GiB-hour' },
          { term: 'Monthly estimate', description: '$180 for one WS1 instance' },
          { term: 'Scale-out', description: 'Each extra instance repeats this charge.' },
          { term: 'Storage', description: 'Runtime storage is billed separately on your storage account.' },
        ],
      }),
      node('ws2', 2, 0, {
        name: 'Standard WS2',
        icon: ICON.app,
        eyebrow: 'Workflow Service Plan',
        badge: '~$360 / mo',
        badgeTone: 'instance',
        detail: '2 vCPU · 7 GB',
        flags: [{ label: '2 × WS1 compute' }],
        footerLeft: 'Same meters as WS1',
        footerRight: 'Sweden Central',
        summary: 'Same vCPU and memory meters at twice the capacity. About $360 per instance per month.',
        properties: [
          { term: 'Monthly estimate', description: '$360 for one WS2 instance' },
        ],
      }),
      node('ws3', 1, 1, {
        name: 'Standard WS3',
        icon: ICON.app,
        eyebrow: 'Workflow Service Plan',
        badge: '~$720 / mo',
        badgeTone: 'instance',
        detail: '4 vCPU · 14 GB',
        flags: [{ label: '4 × WS1 compute' }],
        footerLeft: 'Same meters as WS1',
        footerRight: 'Sweden Central',
        summary: 'Largest Workflow Service Plan SKU. About $720 per instance per month.',
        properties: [
          { term: 'Monthly estimate', description: '$720 for one WS3 instance' },
        ],
      }),
      node('ase', 2, 1, {
        name: 'ASE v3 · I1v2',
        icon: ICON.app,
        eyebrow: 'Isolated Windows plan',
        badge: '~$416 / instance',
        badgeTone: 'restricted',
        detail: '2 vCPU · 8 GB · $0.57 / hour',
        flags: [
          { label: 'No ASE stamp fee' },
          { label: 'I2v2 ~$832' },
          { label: 'I3v2 ~$1,664' },
        ],
        footerLeft: 'Pay for the App Service plan',
        footerRight: 'Sweden Central',
        summary: 'Logic Apps Standard on ASE v3 uses Isolated v2 Windows plans. You pay those instances, not per action. Built-in operations stay free; managed connectors still bill.',
        properties: [
          { term: 'I1v2', description: '$0.57/hour ≈ $416 in 730 hours' },
          { term: 'I2v2', description: '$1.14/hour ≈ $832' },
          { term: 'I3v2', description: '$2.28/hour ≈ $1,664' },
          { term: 'When', description: 'Many apps sharing one isolated environment, or org isolation rules.' },
        ],
      }),
      node('hybrid', 0, 2, {
        name: 'Hybrid',
        icon: ICON.vm,
        eyebrow: 'Your Kubernetes + SQL',
        badge: '$0.234 / vCPU-h',
        badgeTone: 'vnet',
        detail: '1 vCPU × 1 replica ≈ $171 / mo',
        flags: [
          { label: 'Plus cluster you run', posture: 'restricted' },
          { label: 'Plus SQL license', posture: 'restricted' },
        ],
        footerLeft: 'Logic Apps runtime fee',
        footerRight: 'Sweden Central',
        summary: 'Azure bills vCPU usage while the app is enabled. You also pay the Arc Kubernetes cluster and SQL. East US list price is $0.18; Sweden Central is $0.234.',
        properties: [
          { term: 'Formula', description: 'vCPU usage = allocated vCPUs × replicas' },
          { term: 'Allocation', description: '0.25 to 2 vCPU per replica' },
          { term: 'Managed connectors', description: 'Still billed at Standard connector rates.' },
        ],
      }),
      node('automation', 1, 2, {
        name: 'Automation Project',
        icon: ICON.logic,
        eyebrow: 'Preview meters',
        badge: '~$40 / mo base',
        badgeTone: 'restricted',
        detail: 'Environment $0.0546 / hour',
        flags: [
          { label: 'Plus vCPU-seconds' },
          { label: 'Preview can change', posture: 'restricted' },
        ],
        footerLeft: 'Portal: scale to zero',
        footerRight: 'Sweden Central',
        summary: 'Retail meters for the preview Automation SKU: environment management, core execution per second, and connector actions. Confirm current portal terms before adopting it.',
        properties: [
          { term: 'Environment', description: '$0.0546/hour ≈ $40 in 730 hours if always on' },
          { term: 'Core execution', description: '$0.000104 per second' },
          { term: 'Standard connector', description: '$0.000163 per action' },
        ],
      }),
      node('connectors', 0, 1, {
        name: 'Managed connectors',
        icon: ICON.resource,
        eyebrow: 'Same on Consumption and Standard',
        badge: 'Per call',
        badgeTone: 'firewall',
        detail: 'Standard $0.000163 · Enterprise $0.0013',
        flags: [
          { label: 'Standard built-in versions are free' },
          { label: 'Integration account $300–$1,000', posture: 'restricted' },
        ],
        footerLeft: 'Extra bill next to hosting',
        footerRight: 'Sweden Central',
        summary: 'Managed connector calls cost the same on Consumption and Standard. Standard wins at scale when you switch those calls to built-in connectors. Integration accounts are a separate monthly SKU; Standard can use maps without one.',
        properties: [
          { term: 'Standard connector', description: '$0.000163 per call in Sweden Central' },
          { term: 'Enterprise connector', description: '$0.0013 per call' },
          { term: 'Break-even vs WS1', description: 'About 1.1 million Standard connector calls/month if Standard uses built-in instead.' },
          { term: 'Integration Account Basic', description: '$300 / month' },
          { term: 'Integration Account Standard / Premium', description: '$1,000 / month' },
        ],
      }),
    ],
    links: [
      link(
        'c1',
        'consumption',
        'connectors',
        'Connector calls bill',
        'disconnected',
        'Consumption bills managed connectors on every call. Built-in actions are cheap after the 4,000 free grant.',
      ),
      link('c2', 'ws1', 'ws2', 'Scale up'),
      link('c3', 'ws2', 'ws3', 'Scale up'),
      link(
        'c4',
        'ws1',
        'connectors',
        'Built-in can replace these',
        'identity',
        'Standard still bills managed connectors. Use built-in Service Bus, Blob, SQL and similar to avoid that meter.',
      ),
      link(
        'c5',
        'ws1',
        'ase',
        'Isolation option',
        'disconnected',
        'ASE is for isolation and many apps in one environment, not a cheaper WS1.',
      ),
      link(
        'c6',
        'ws1',
        'hybrid',
        'Run elsewhere',
        'disconnected',
        'Hybrid adds a runtime vCPU fee on top of infrastructure you operate.',
      ),
      link(
        'c7',
        'consumption',
        'automation',
        'Preview alternative',
        'disabled',
        'Preview meters. Check availability and limits before replacing Consumption or Standard.',
      ),
    ],
  },
];

const byId = new Map(diagrams.map((diagram) => [diagram.id, diagram]));

export const diagramSrcById: Record<string, string> = {
  'logic-app-storage-path': '/learning-assets/logic-app-storage-networking/path.svg',
  'storage-access-checks': '/learning-assets/storage-account/access-checks.svg',
  'storage-network-paths': '/learning-assets/storage-account/network-paths.svg',
  'bastion-hub-spoke': '/learning-assets/bastion/browser-hub-spoke.svg',
  'vnet-peering-path': '/learning-assets/vnet-peering/path.svg',
  'machine-configuration-flow': '/learning-assets/machine-configuration/flow.svg',
  'windows-password-age': '/learning-assets/windows-password-age/flow.svg',
  'password-remediation': '/learning-assets/windows-vm-policy-enforcement/password-remediation-flow.svg',
  'private-packages-hub': '/learning-assets/private-packages-through-hub/shared-hub.svg',
  'private-packages-download': '/learning-assets/private-packages-through-hub/vm-download.svg',
  'private-packages-onboarding': '/learning-assets/private-packages-through-hub/automatic-onboarding.svg',
  'logic-apps-pricing': '/learning-assets/logic-apps-pricing/hosting.svg',
};

const srcToId = new Map(
  Object.entries(diagramSrcById).map(([id, src]) => [src, id]),
);

export const introDiagramBySlug: Record<string, string> = {
  dsc: 'dsc',
  'asc-default-policy-guide': 'asc-default',
  'mcsb-managed-centrally': 'mcsb-central',
  'azure-windows-baseline': 'windows-baseline',
};

export function diagramIdForSrc(src: string): string | undefined {
  return srcToId.get(src);
}

export function getArticleDiagram(id: string): ArticleDiagram | undefined {
  return byId.get(id);
}

export function introDiagramIdForSlug(slug: string): string | undefined {
  return introDiagramBySlug[slug];
}

export type ArticleSegment =
  | { type: 'html'; html: string }
  | { type: 'diagram'; id: string };

export function splitArticleHtml(html: string): ArticleSegment[] {
  const parts = html.split(/<div data-article-diagram="([^"]+)"><\/div>/);
  const segments: ArticleSegment[] = [];
  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (index % 2 === 1) {
      segments.push({ type: 'diagram', id: part });
      continue;
    }
    if (part.trim()) segments.push({ type: 'html', html: part });
  }
  return segments;
}
