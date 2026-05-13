export type CompetitionType = 'Benchmark' | 'Hackathon' | 'Academic';
export type EvaluationMode = 'Automated' | 'Human' | 'Hybrid';
export type CompetitionStatus = 'Open' | 'Closing Soon' | 'TBD Deadline' | 'Ended';

export interface CompetitionTrack {
  name: string;
  description: string;
  metrics?: string[];
  constraints?: string;
}

export interface CompetitionPhase {
  name: string;
  deadline: string;
  description?: string;
}

export interface Competition {
  id: string;
  title: string;
  subtitle?: string;
  type: CompetitionType;
  evaluationMode: EvaluationMode;
  platform: string;
  location: string;
  deadline: string;
  prizePool: string;
  theme: string[];
  description: string;
  extendedDescription?: string;
  status: CompetitionStatus;
  tracks?: CompetitionTrack[];
  phases: CompetitionPhase[];
  submissionType?: string;
  modelConstraints?: string[];
  allowedFrameworks?: string[];
  eligibility?: string;
  organizer?: string;
  contact?: string;
  websiteUrl?: string;
  tags: string[];
}

export const competitions: Competition[] = [
  {
    id: 'google-cloud-rapid-agent',
    title: 'Google Cloud Rapid Agent Hackathon',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'Google Cloud',
    location: 'Online',
    deadline: '2026-06-11T23:59:59Z',
    prizePool: '$60,000',
    theme: ['AI Agents', 'Google Cloud'],
    description: 'Build AI agents on Google Cloud Platform. Create intelligent agents that leverage Google Cloud services to solve real-world problems.',
    status: 'Open',
    phases: [
      { name: 'Registration', deadline: '2026-06-01T23:59:59Z', description: 'Register your team' },
      { name: 'Development', deadline: '2026-06-10T23:59:59Z', description: 'Build your agent' },
      { name: 'Submission', deadline: '2026-06-11T23:59:59Z', description: 'Submit your project' },
    ],
    submissionType: 'Code + Demo',
    modelConstraints: ['Any Model'],
    tags: ['AI Agents', 'Google Cloud', 'Any Model'],
  },
  {
    id: 'agents-assemble-healthcare',
    title: 'Agents Assemble - Healthcare AI',
    type: 'Hackathon',
    evaluationMode: 'Hybrid',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-05-11T23:59:59Z',
    prizePool: '$25,000',
    theme: ['Healthcare', 'MCP', 'A2A', 'FHIR'],
    description: 'Build healthcare AI agents using MCP and A2A protocols. Create agents that can interoperate with healthcare systems using FHIR standards.',
    status: 'Closing Soon',
    phases: [
      { name: 'Registration', deadline: '2026-05-01T23:59:59Z' },
      { name: 'Submission', deadline: '2026-05-11T23:59:59Z' },
    ],
    submissionType: 'Code + Documentation',
    tags: ['Healthcare', 'MCP', 'A2A', 'FHIR'],
  },
  {
    id: 'splunk-agentic-ops',
    title: 'Splunk Agentic Ops Hackathon',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-06-15T23:59:59Z',
    prizePool: '$20,000',
    theme: ['Splunk AI', 'Operations'],
    description: 'Build AI agents for IT operations using Splunk. Create agentic workflows that automate incident response and system monitoring.',
    status: 'Open',
    phases: [
      { name: 'Registration', deadline: '2026-06-05T23:59:59Z' },
      { name: 'Submission', deadline: '2026-06-15T23:59:59Z' },
    ],
    submissionType: 'Code + Demo Video',
    tags: ['Splunk AI', 'Operations'],
  },
  {
    id: 'car-bench-ijcai',
    title: 'CAR-bench IJCAI 2026',
    subtitle: 'LLM Agent Reliability Benchmark for Automotive Voice Assistants',
    type: 'Academic',
    evaluationMode: 'Automated',
    platform: 'IJCAI',
    location: 'Multi-track',
    deadline: '2026-07-31T23:59:59Z',
    prizePool: 'N/A',
    theme: ['LLM', 'Automotive', 'Uncertainty Quantification'],
    description: 'CAR-bench (Conversational Agent Reliability Benchmark) is a novel benchmark designed to evaluate the reliability of Large Language Model (LLM) agents functioning as automotive voice assistants. These agents operate in inherently uncertain environments, requiring robust uncertainty quantification (UQ) and calibrated confidence estimation to ensure safe and dependable interactions.',
    extendedDescription: 'As LLMs are increasingly deployed as autonomous agents, understanding when they "know what they don\'t know" becomes critical — especially in safety-sensitive automotive contexts. CAR-bench provides a rigorous testbed for measuring these capabilities.',
    status: 'Open',
    organizer: 'IJCAI 2026 Competition Track',
    contact: 'carbench@ijcai2026.org',
    tracks: [
      {
        name: 'Open Track',
        description: 'General-purpose track open to all approaches. Participants may use any model architecture, training method, or inference strategy. The goal is maximum benchmark score without constraints.',
        metrics: ['UQ-Score (Uncertainty Quantification composite)', 'Calibration Error (ECE)', 'Selective Accuracy, Brier Score, AUROC'],
        constraints: 'No restrictions',
      },
      {
        name: 'Cerebras Fast-Reasoning Track',
        description: 'Optimized for speed and efficiency on Cerebras Wafer-Scale Engine. Participants must achieve high benchmark scores while meeting strict inference latency requirements.',
        metrics: ['UQ-Score x Throughput', 'Calibration Error (ECE)', 'Tokens/second, Latency P99'],
        constraints: 'Max 1B parameters, <100ms latency',
      },
    ],
    phases: [
      { name: 'Registration Opens', deadline: '2026-05-01T23:59:59Z' },
      { name: 'Mid-Submission Check-in', deadline: '2026-06-15T23:59:59Z', description: 'Optional progress submission' },
      { name: 'Final Submission Deadline', deadline: '2026-07-31T23:59:59Z' },
      { name: 'Evaluation Period', deadline: '2026-08-07T23:59:59Z' },
      { name: 'Results Announced', deadline: '2026-08-15T23:59:59Z' },
      { name: 'IJCAI 2026 Workshop', deadline: '2026-08-25T23:59:59Z' },
    ],
    submissionType: 'Model Weights + Inference API',
    modelConstraints: ['Any Open-Source LLM', 'Proprietary models via API (Open Track only)', 'Fine-tuned variants', 'Ensemble methods', 'Custom architectures'],
    allowedFrameworks: ['PyTorch', 'TensorFlow', 'JAX', 'HuggingFace Transformers', 'vLLM', 'LangChain', 'AutoGen', 'CrewAI'],
    eligibility: 'Open to all',
    tags: ['LLM', 'Automotive', 'Benchmark'],
  },
  {
    id: 'vertex-swarm-2026',
    title: 'Vertex Swarm Challenge 2026',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'DoraHacks',
    location: 'Online',
    deadline: '2026-08-01T23:59:59Z',
    prizePool: '$27,000+',
    theme: ['Multi-Agent', 'IoT', 'Robotics', 'P2P'],
    description: 'Build multi-agent systems for IoT and robotics. Explore peer-to-peer agent coordination in distributed environments.',
    status: 'TBD Deadline',
    phases: [
      { name: 'Registration', deadline: '2026-08-01T23:59:59Z' },
      { name: 'Submission', deadline: '2026-08-01T23:59:59Z' },
    ],
    tags: ['Multi-Agent', 'IoT', 'Robotics'],
  },
  {
    id: 'find-evil-security',
    title: 'FIND EVIL! AI Security',
    type: 'Benchmark',
    evaluationMode: 'Automated',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-06-15T23:59:59Z',
    prizePool: '$22,000',
    theme: ['Cybersecurity', 'Threat Detection'],
    description: 'Benchmark your AI agent\'s ability to detect security threats and vulnerabilities. Automated evaluation on a comprehensive cybersecurity test suite.',
    status: 'Open',
    phases: [
      { name: 'Registration', deadline: '2026-06-01T23:59:59Z' },
      { name: 'Submission', deadline: '2026-06-15T23:59:59Z' },
    ],
    submissionType: 'Automated API endpoint',
    tags: ['Cybersecurity', 'Threat Detection'],
  },
  {
    id: 'usaii-global-hackathon',
    title: 'USAII Global Hackathon 2026',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-06-21T23:59:59Z',
    prizePool: '$15,000',
    theme: ['AI for Social Good', 'Student'],
    description: 'A global hackathon focused on using AI agents for social good. Open to students and professionals worldwide.',
    status: 'Open',
    phases: [
      { name: 'Registration', deadline: '2026-06-10T23:59:59Z' },
      { name: 'Submission', deadline: '2026-06-21T23:59:59Z' },
    ],
    tags: ['AI for Social Good', 'Student'],
  },
  {
    id: 'freuid-challenge',
    title: 'FREUID Challenge 2026',
    type: 'Academic',
    evaluationMode: 'Automated',
    platform: 'Academic',
    location: 'Online',
    deadline: '2026-08-10T23:59:59Z',
    prizePool: 'N/A',
    theme: ['Document Fraud', 'GenAI', 'Multimodal'],
    description: 'Document fraud detection benchmark for generative AI systems. Evaluate your model\'s ability to detect forged and manipulated documents.',
    status: 'Open',
    phases: [
      { name: 'Registration', deadline: '2026-07-01T23:59:59Z' },
      { name: 'Submission', deadline: '2026-08-10T23:59:59Z' },
    ],
    submissionType: 'Model checkpoint + API',
    tags: ['Document Fraud', 'GenAI', 'Multimodal'],
  },
  {
    id: 'industrial-automation-ijcai',
    title: 'Industrial Automation Challenge IJCAI',
    type: 'Academic',
    evaluationMode: 'Automated',
    platform: 'IJCAI',
    location: 'Online',
    deadline: '2026-08-01T23:59:59Z',
    prizePool: 'N/A',
    theme: ['Physics LLM', 'Industrial'],
    description: 'Physics-aware LLM benchmark for industrial automation. Test your agent\'s ability to reason about physical systems and manufacturing processes.',
    status: 'Open',
    phases: [
      { name: 'Registration', deadline: '2026-07-01T23:59:59Z' },
      { name: 'Submission', deadline: '2026-08-01T23:59:59Z' },
    ],
    tracks: [
      { name: 'Physics Reasoning Track', description: 'Benchmark LLM reasoning on physical systems and dynamics.' },
      { name: 'Industrial Control Track', description: 'Evaluate agent performance on industrial control tasks.' },
    ],
    tags: ['Physics LLM', 'Industrial', 'Benchmark'],
  },
  {
    id: 'mega-agent-a-thon',
    title: 'Mega Agent-A-Thon',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-06-14T23:59:59Z',
    prizePool: 'TBD',
    theme: ['AI Agents', 'Real-World'],
    description: 'The mega hackathon for AI agent builders. Create agents that solve real-world problems across any domain.',
    status: 'Open',
    phases: [
      { name: 'Registration', deadline: '2026-06-05T23:59:59Z' },
      { name: 'Submission', deadline: '2026-06-14T23:59:59Z' },
    ],
    tags: ['AI Agents', 'Real-World'],
  },
  {
    id: 'zervehack',
    title: 'ZerveHack',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-04-30T23:59:59Z',
    prizePool: '$10,000',
    theme: ['AI Agents', 'Automation'],
    description: 'Build automation agents using the Zerve platform. Create intelligent workflows that streamline business processes.',
    status: 'Ended',
    phases: [
      { name: 'Hackathon', deadline: '2026-04-30T23:59:59Z' },
    ],
    tags: ['AI Agents', 'Automation'],
  },
  {
    id: 'hackmars-3-neon',
    title: 'HackMars 3.0: NEON',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-06-09T23:59:59Z',
    prizePool: 'TBD',
    theme: ['Student', 'Innovation'],
    description: 'Student innovation hackathon focused on next-generation AI agents. Push the boundaries of what agents can do.',
    status: 'Closing Soon',
    phases: [
      { name: 'Registration', deadline: '2026-06-01T23:59:59Z' },
      { name: 'Submission', deadline: '2026-06-09T23:59:59Z' },
    ],
    tags: ['Student', 'Innovation'],
  },
  {
    id: 'developerweek-ny',
    title: 'DeveloperWeek New York',
    type: 'Hackathon',
    evaluationMode: 'Hybrid',
    platform: 'Devpost',
    location: 'New York, NY',
    deadline: '2026-06-10T23:59:59Z',
    prizePool: 'TBD',
    theme: ['Challenge-Driven', 'Enterprise'],
    description: 'The largest challenge-driven hackathon in DeveloperWeek New York. Build AI agents for enterprise applications.',
    status: 'Closing Soon',
    phases: [
      { name: 'Registration', deadline: '2026-06-05T23:59:59Z' },
      { name: 'Submission', deadline: '2026-06-10T23:59:59Z' },
    ],
    tags: ['Challenge-Driven', 'Enterprise'],
  },
  {
    id: 'ml-empowerment-build',
    title: 'ML Empowerment Build Challenge',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'Devpost',
    location: 'Online',
    deadline: '2026-05-13T23:59:59Z',
    prizePool: 'TBD',
    theme: ['Student', 'AI Education'],
    description: 'Build AI-powered educational tools and agents. Empower learners through intelligent tutoring systems and automated feedback.',
    status: 'Closing Soon',
    phases: [
      { name: 'Registration', deadline: '2026-05-05T23:59:59Z' },
      { name: 'Submission', deadline: '2026-05-13T23:59:59Z' },
    ],
    tags: ['Student', 'AI Education'],
  },
  {
    id: 'vertex-2-p2p-swarm',
    title: 'Vertex 2.0 Peer-to-Peer Swarm',
    type: 'Hackathon',
    evaluationMode: 'Human',
    platform: 'DoraHacks',
    location: 'Online',
    deadline: '2026-08-01T23:59:59Z',
    prizePool: '$27,000+',
    theme: ['Autonomous', 'Machine Coordination'],
    description: 'Build autonomous peer-to-peer agent swarms. Explore decentralized machine coordination and emergent collective intelligence.',
    status: 'TBD Deadline',
    phases: [
      { name: 'Registration', deadline: '2026-07-15T23:59:59Z' },
      { name: 'Submission', deadline: '2026-08-01T23:59:59Z' },
    ],
    tags: ['Autonomous', 'Machine Coordination'],
  },
];

export function getCompetitionById(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}

export function getRelatedCompetitions(competition: Competition, limit = 3): Competition[] {
  return competitions
    .filter((c) => c.id !== competition.id && c.type === competition.type)
    .slice(0, limit);
}
