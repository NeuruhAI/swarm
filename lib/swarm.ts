export type AgentStatus = "active" | "idle" | "busy";

export interface LegionDef {
  id: string;
  name: string;
  prefix: string;
  color: string;
  description: string;
  capabilities: string[];
  roles: string[];
}

export interface CityDef {
  name: string;
  state: string;
  x: number;
  y: number;
}

export interface SwarmAgent {
  id: string;
  callsign: string;
  legionId: string;
  color: string;
  role: string;
  status: AgentStatus;
  lastSeenMin: number;
  performance: number;
  city: string;
  state: string;
  x: number;
  y: number;
}

export interface SwarmActivity {
  id: string;
  timestamp: Date;
  legion: string;
  legionColor: string;
  action: string;
  target: string;
  status: "success" | "pending" | "failed";
}

export const LEGIONS: LegionDef[] = [
  {
    id: "acquisition",
    name: "Acquisition",
    prefix: "ACQ",
    color: "#00d4ff",
    description: "Finds the asset before the market does.",
    capabilities: ["signal scan", "lead qualify", "outreach draft", "list build"],
    roles: ["signal scout", "lead qualifier", "outreach drafter", "list builder"],
  },
  {
    id: "capital",
    name: "Capital",
    prefix: "CAP",
    color: "#22c55e",
    description: "Prices the deal and moves the money.",
    capabilities: ["offer model", "underwrite", "fund route", "risk screen"],
    roles: ["offer modeler", "underwriter", "fund router", "risk analyst"],
  },
  {
    id: "development",
    name: "Development",
    prefix: "DEV",
    color: "#f59e0b",
    description: "Turns paper into property.",
    capabilities: ["permit pull", "crew schedule", "timeline", "cost track"],
    roles: ["permit runner", "crew scheduler", "timeline keeper", "cost tracker"],
  },
  {
    id: "exit",
    name: "Exit",
    prefix: "EXT",
    color: "#ec4899",
    description: "Sells at the top of the thesis.",
    capabilities: ["list asset", "negotiate", "close", "buyer match"],
    roles: ["listing agent", "negotiator", "closer", "buyer matcher"],
  },
  {
    id: "counterintel",
    name: "Counter-Intel",
    prefix: "CI",
    color: "#ef4444",
    description: "Kills bad data before it kills you.",
    capabilities: ["anomaly scan", "receipt verify", "fraud screen", "dedupe"],
    roles: ["anomaly hunter", "receipt verifier", "fraud screener", "dedupe warden"],
  },
  {
    id: "tokenization",
    name: "Tokenization",
    prefix: "TKN",
    color: "#8b5cf6",
    description: "Hashes every action into proof.",
    capabilities: ["receipt mint", "batch hash", "custody", "audit trail"],
    roles: ["receipt minter", "batch hasher", "custodian", "auditor"],
  },
  {
    id: "meta",
    name: "Meta",
    prefix: "META",
    color: "#06b6d4",
    description: "Rewrites the playbook from the receipts.",
    capabilities: ["route tune", "recipe promote", "learn loop", "quality rank"],
    roles: ["route tuner", "recipe curator", "learning loop", "quality ranker"],
  },
];

export const CITIES: CityDef[] = [
  { name: "Seattle", state: "WA", x: 110, y: 90 },
  { name: "Portland", state: "OR", x: 100, y: 150 },
  { name: "San Francisco", state: "CA", x: 70, y: 250 },
  { name: "Los Angeles", state: "CA", x: 90, y: 310 },
  { name: "Phoenix", state: "AZ", x: 200, y: 350 },
  { name: "Salt Lake City", state: "UT", x: 230, y: 270 },
  { name: "Denver", state: "CO", x: 320, y: 290 },
  { name: "Dallas", state: "TX", x: 440, y: 420 },
  { name: "Houston", state: "TX", x: 460, y: 460 },
  { name: "Austin", state: "TX", x: 420, y: 450 },
  { name: "Minneapolis", state: "MN", x: 520, y: 160 },
  { name: "Kansas City", state: "MO", x: 510, y: 290 },
  { name: "St Louis", state: "MO", x: 570, y: 290 },
  { name: "Chicago", state: "IL", x: 600, y: 240 },
  { name: "Detroit", state: "MI", x: 660, y: 220 },
  { name: "Indianapolis", state: "IN", x: 640, y: 270 },
  { name: "Nashville", state: "TN", x: 640, y: 330 },
  { name: "New Orleans", state: "LA", x: 550, y: 440 },
  { name: "Atlanta", state: "GA", x: 670, y: 370 },
  { name: "Charlotte", state: "NC", x: 740, y: 350 },
  { name: "Miami", state: "FL", x: 720, y: 490 },
  { name: "Philadelphia", state: "PA", x: 800, y: 240 },
  { name: "New York", state: "NY", x: 830, y: 200 },
  { name: "Boston", state: "MA", x: 870, y: 170 },
];

const ACTIVITY_SCRIPTS: Record<string, Array<[string, string[]]>> = {
  acquisition: [
    ["screened listing", ["parcel #4821", "estate thread", "tax sale batch", "market scan"]],
    ["messaged seller", ["owner thread", "estate contact", "absentee owner"]],
    ["qualified lead", ["distressed parcel", "infill lot", "river corridor"]],
    ["built buyer list", ["cash buyer pool", "investor segment"]],
  ],
  capital: [
    ["modeled offer", ["parcel #4821", "duplex package", "infill lot"]],
    ["underwrote deal", ["estate portfolio", "distressed asset"]],
    ["routed funds", ["acquisition escrow", "rehab draw"]],
    ["screened risk", ["title chain", "lien stack"]],
  ],
  development: [
    ["pulled permit", ["rehab scope", "new build"]],
    ["scheduled crew", ["demo team", "framing crew"]],
    ["tracked cost", ["rehab budget", "draw schedule"]],
    ["set timeline", ["90-day flip", "build phase 2"]],
  ],
  exit: [
    ["listed asset", ["renovated duplex", "infill lot"]],
    ["matched buyer", ["cash buyer pool", "investor segment"]],
    ["negotiated terms", ["offer #117", "counter #3"]],
    ["closed deal", ["parcel #4821", "duplex package"]],
  ],
  counterintel: [
    ["flagged anomaly", ["data feed", "lead batch"]],
    ["verified receipt", ["batch 0x3fa2", "mission log"]],
    ["screened fraud", ["seller identity", "title claim"]],
    ["deduped records", ["owner list", "parcel set"]],
  ],
  tokenization: [
    ["minted receipt", ["mission #1284", "offer batch"]],
    ["hashed batch", ["0x3fa2", "0x9c11", "0x77be"]],
    ["sealed custody", ["evidence locker", "audit trail"]],
    ["published proof", ["proof board", "public ledger"]],
  ],
  meta: [
    ["tuned route", ["outreach weight", "scan priority"]],
    ["promoted recipe", ["estate playbook", "flip pattern"]],
    ["ranked quality", ["lead source", "agent cohort"]],
    ["closed loop", ["mission #1284", "campaign delta"]],
  ],
};

let seq = 0;
const nid = (p: string) => `${p}-${Date.now().toString(36)}-${seq++}`;

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function makeAgent(legion: LegionDef, index: number): SwarmAgent {
  const city = pick(CITIES);
  const statusRoll = Math.random();
  return {
    id: nid("ag"),
    callsign: `${legion.prefix}-${String(index).padStart(4, "0")}`,
    legionId: legion.id,
    color: legion.color,
    role: pick(legion.roles),
    status: statusRoll < 0.62 ? "active" : statusRoll < 0.85 ? "busy" : "idle",
    lastSeenMin: rand(0, 14),
    performance: rand(58, 99),
    city: city.name,
    state: city.state,
    x: city.x + rand(-8, 8),
    y: city.y + rand(-8, 8),
  };
}

export function seedAgents(): SwarmAgent[] {
  const agents: SwarmAgent[] = [];
  LEGIONS.forEach((legion, li) => {
    const n = 14 + ((li * 5) % 9);
    for (let i = 0; i < n; i++) agents.push(makeAgent(legion, i + 1));
  });
  return agents;
}

export function makeActivity(legion?: LegionDef): SwarmActivity {
  const l = legion ?? pick(LEGIONS);
  const [action, targets] = pick(ACTIVITY_SCRIPTS[l.id]);
  const roll = Math.random();
  return {
    id: nid("ac"),
    timestamp: new Date(),
    legion: l.name,
    legionColor: l.color,
    action,
    target: pick(targets),
    status: roll < 0.8 ? "success" : roll < 0.94 ? "pending" : "failed",
  };
}

export function seedActivities(n = 18): SwarmActivity[] {
  const out: SwarmActivity[] = [];
  for (let i = 0; i < n; i++) {
    const a = makeActivity();
    a.timestamp = new Date(Date.now() - i * rand(20, 90) * 1000);
    out.push(a);
  }
  return out;
}

export function lastSeenLabel(min: number): string {
  if (min <= 0) return "now";
  if (min === 1) return "1m ago";
  return `${min}m ago`;
}
