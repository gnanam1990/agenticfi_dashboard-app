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
  status: ProductStatus;
  metrics: SummaryMetric[];
  error?: string;
}

/**
 * connected      – the product's stats API returned at least one real value
 * no_data        – the stats API answered, but the product has no live data yet
 * not_configured – no stats URL is known for the product
 * error          – the stats API could not be reached or answered unexpectedly
 */
export type ProductStatus = "connected" | "no_data" | "not_configured" | "error";

export const PRODUCT_STATUS_LABEL: Record<ProductStatus, string> = {
  connected: "Live",
  no_data: "No live data yet",
  not_configured: "Connector needed",
  error: "API error",
};

export const DATA_STATUS_LABEL: Record<EcosystemStats["data_status"], string> = {
  connected: "All products live",
  partial: "Partially live",
  connectors_required: "No live product data yet",
};

interface ProductConfig {
  id: string;
  name: string;
  description: string;
  href: string;
  connector_env: string;
  /** Used when the connector env var is unset. */
  default_url?: string;
  metrics: Array<{ label: string; key: string }>;
}

const PRODUCTS: ProductConfig[] = [
  {
    id: "agentfi",
    name: "AgentFi",
    description: "DEX, liquid staking, and yield surfaces",
    href: "https://agentfi-app.vercel.app",
    connector_env: "AGENTFI_STATS_URL",
    default_url: "https://agentfi-app.vercel.app/api/stats",
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
    default_url: "https://conduit-kite.vercel.app/api/stats",
    metrics: [
      { label: "Volume", key: "volume" },
      { label: "Services", key: "services" },
    ],
  },
  {
    id: "shopkite",
    name: "ShopKite",
    description: "Commerce for agents and digital goods",
    href: "https://shopkite-app.vercel.app",
    connector_env: "SHOPKITE_STATS_URL",
    default_url: "https://shopkite-app.vercel.app/api/stats",
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
    default_url: "https://agenttreasury-app.vercel.app/api/stats",
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
    default_url: "https://agentscore-app.vercel.app/api/stats",
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
  const notLive = products.filter((product) => product.status !== "connected");
  const missing = notLive.map((product) => product.connector_env);

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
        value: `${connected.length}/${PRODUCTS.length} live`,
        detail: "Numbers are shown only when a product's /api/stats returns real data.",
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
        label: "Not live yet",
        value: String(notLive.length),
        detail: notLive.length
          ? notLive.map((p) => `${p.name} (${PRODUCT_STATUS_LABEL[p.status].toLowerCase()})`).join(", ")
          : "Every product reports live data.",
      },
    ],
    products,
    missing_integrations: missing,
    last_checked_at: new Date().toISOString(),
  };
}

async function loadProductStats(config: ProductConfig): Promise<ProductStats> {
  const url = process.env[config.connector_env] || config.default_url;
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
    // Product stats APIs answer 503 { error: "no live data source", reason } while
    // the product has nothing real to report. That is honest, not an outage.
    if (response.status === 503) {
      const body = (await response.json().catch(() => null)) as { reason?: string } | null;
      return noData(config, body?.reason ?? "The product reports no live data source yet.");
    }
    if (response.status === 404) {
      throw new Error("Stats endpoint not deployed yet");
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = (await response.json()) as Record<string, unknown>;
    if (config.metrics.every((metric) => data[metric.key] === null || data[metric.key] === undefined)) {
      return noData(config, "The stats API returned no values.");
    }
    return {
      ...config,
      status: "connected",
      metrics: config.metrics.map((metric) => ({
        label: metric.label,
        value: formatValue(data[metric.key]),
        detail: url,
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
        detail: (error as Error).message,
      })),
    };
  }
}

function noData(config: ProductConfig, reason: string): ProductStats {
  return {
    ...config,
    status: "no_data",
    error: reason,
    metrics: config.metrics.map((metric) => ({
      label: metric.label,
      value: "No live data",
      detail: reason,
    })),
  };
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
