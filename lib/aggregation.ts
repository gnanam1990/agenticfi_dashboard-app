export interface EcosystemStats {
  data_status: "connectors_required" | "partial" | "connected";
  connected_products: number;
  ecosystem_services: number;
  summary: SummaryMetric[];
  products: ProductStats[];
  missing_integrations: string[];
  last_checked_at: string;
}

export interface SummaryMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProductStats {
  id: string;
  name: string;
  description: string;
  href: string;
  connector_env: string;
  status: "connected" | "not_configured" | "error";
  metrics: SummaryMetric[];
  error?: string;
}

interface ProductConfig {
  id: string;
  name: string;
  description: string;
  href: string;
  connector_env: string;
  metrics: Array<{ label: string; key: string }>;
}

const PRODUCTS: ProductConfig[] = [
  {
    id: "agentfi",
    name: "AgentFi",
    description: "DEX, liquid staking, and yield surfaces",
    href: "https://agentfi-app.vercel.app",
    connector_env: "AGENTFI_STATS_URL",
    metrics: [
      { label: "TVL", key: "tvl" },
      { label: "Pools", key: "pools" },
    ],
  },
  {
    id: "conduit",
    name: "Conduit-Kite",
    description: "Pay-per-call API marketplace",
    href: "https://conduit-kite.vercel.app",
    connector_env: "CONDUIT_STATS_URL",
    metrics: [
      { label: "Volume", key: "volume" },
      { label: "Services", key: "services" },
    ],
  },
  {
    id: "shopkite",
    name: "ShopKite",
    description: "Commerce for agents and digital goods",
    href: "https://kiteshop.vercel.app",
    connector_env: "SHOPKITE_STATS_URL",
    metrics: [
      { label: "Orders", key: "orders" },
      { label: "GMV", key: "gmv" },
    ],
  },
  {
    id: "treasury",
    name: "AgentTreasury",
    description: "Multi-chain treasury management",
    href: "https://agenttreasury-app.vercel.app",
    connector_env: "AGENTTREASURY_STATS_URL",
    metrics: [
      { label: "AUM", key: "aum" },
      { label: "Treasuries", key: "treasuries" },
    ],
  },
  {
    id: "agentscore",
    name: "AgentScore",
    description: "Reputation system for agents",
    href: "https://agentscore-app.vercel.app",
    connector_env: "AGENTSCORE_STATS_URL",
    metrics: [
      { label: "Agents", key: "agents" },
      { label: "Average score", key: "average_score" },
    ],
  },
  {
    id: "kiteindex",
    name: "KiteIndex",
    description: "Indexer and data API",
    href: "https://kiteindex-lite.vercel.app",
    connector_env: "KITEINDEX_STATS_URL",
    metrics: [
      { label: "Queries", key: "queries" },
      { label: "Uptime", key: "uptime" },
    ],
  },
];

export async function getEcosystemStats(): Promise<EcosystemStats> {
  const products = await Promise.all(PRODUCTS.map(loadProductStats));
  const connected = products.filter((product) => product.status === "connected");
  const missing = products
    .filter((product) => product.status !== "connected")
    .map((product) => product.connector_env);

  return {
    data_status:
      connected.length === PRODUCTS.length
        ? "connected"
        : connected.length > 0
          ? "partial"
          : "connectors_required",
    connected_products: connected.length,
    ecosystem_services: PRODUCTS.length,
    summary: [
      {
        label: "Data status",
        value: connected.length > 0 ? `${connected.length}/${PRODUCTS.length} connected` : "Connectors required",
        detail: "Live stats are shown only after product API URLs are configured.",
      },
      {
        label: "Tracked services",
        value: String(PRODUCTS.length),
        detail: "AgentFi, Conduit, ShopKite, Treasury, Score, and KiteIndex.",
      },
      {
        label: "Refresh policy",
        value: "5 min",
        detail: "API responses are cached with stale-while-revalidate headers.",
      },
      {
        label: "Missing envs",
        value: String(missing.length),
        detail: missing.length ? missing.join(", ") : "All product connectors are configured.",
      },
    ],
    products,
    missing_integrations: missing,
    last_checked_at: new Date().toISOString(),
  };
}

async function loadProductStats(config: ProductConfig): Promise<ProductStats> {
  const url = process.env[config.connector_env];
  if (!url) {
    return {
      ...config,
      status: "not_configured",
      metrics: config.metrics.map((metric) => ({
        label: metric.label,
        value: "Needs API",
        detail: config.connector_env,
      })),
    };
  }

  try {
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = (await response.json()) as Record<string, unknown>;
    return {
      ...config,
      status: "connected",
      metrics: config.metrics.map((metric) => ({
        label: metric.label,
        value: formatValue(data[metric.key]),
        detail: config.connector_env,
      })),
    };
  } catch (error) {
    return {
      ...config,
      status: "error",
      error: (error as Error).message,
      metrics: config.metrics.map((metric) => ({
        label: metric.label,
        value: "API error",
        detail: config.connector_env,
      })),
    };
  }
}

function formatValue(value: unknown) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value.toLocaleString() : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  if (typeof value === "string" && value.trim()) {
    return value;
  }
  return "n/a";
}
