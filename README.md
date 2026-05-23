# AgenticFi Dashboard

Public stats dashboard aggregating the entire Kite agentic economy.

## Features

- Real-time ecosystem stats (TVL, volume, agents)
- Per-product sections (AgentFi, Conduit, ShopKite, Treasury, Score, KiteIndex)
- Embeddable widget for partner sites
- Public API for builders
- 5-minute caching

## Deployment

- **Production:** https://agenticfi-dashboard-app.vercel.app
- **Host:** Vercel project `agenticfi-dashboard-app`
- **Status:** dashboard, `/products`, `/widget`, and `/api/stats` build verified on 2026-05-23.
- **Data:** live product totals require connector env vars: `AGENTFI_STATS_URL`, `CONDUIT_STATS_URL`, `SHOPKITE_STATS_URL`, `AGENTTREASURY_STATS_URL`, `AGENTSCORE_STATS_URL`, and `KITEINDEX_STATS_URL`.

## API

```bash
# Get ecosystem stats
curl https://agenticfi-dashboard-app.vercel.app/api/stats
```

## Products Tracked

| Product | Stats |
|---|---|
| AgentFi | TVL, pools |
| Conduit-Kite | Volume, services |
| ShopKite | Orders, GMV |
| AgentTreasury | AUM, treasuries |
| AgentScore | Agents, average score |
| KiteIndex | Queries, uptime |

## Development

```bash
pnpm install
pnpm dev
```
