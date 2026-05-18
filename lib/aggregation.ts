export interface EcosystemStats {
  total_tvl: string;
  volume_24h: string;
  active_agents: number;
  ecosystem_services: number;
  products: {
    agentfi: { tvl: string; pools: number };
    conduit: { volume: string; services: number };
    shopkite: { orders: number; gmv: string };
    treasury: { aum: string; treasuries: number };
    agentscore: { agents: number; average_score: number };
    kiteindex: { queries: number; uptime: string };
  };
}

export async function getEcosystemStats(): Promise<EcosystemStats> {
  // In production, aggregate from all product APIs
  return {
    total_tvl: "0",
    volume_24h: "0",
    active_agents: 0,
    ecosystem_services: 6,
    products: {
      agentfi: { tvl: "0", pools: 0 },
      conduit: { volume: "0", services: 0 },
      shopkite: { orders: 0, gmv: "0" },
      treasury: { aum: "0", treasuries: 0 },
      agentscore: { agents: 0, average_score: 0 },
      kiteindex: { queries: 0, uptime: "99.9%" },
    },
  };
}
