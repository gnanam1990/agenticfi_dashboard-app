# AgenticFi Dashboard

Public stats dashboard aggregating the entire Kite agentic economy.

## Features

- Real-time ecosystem stats (TVL, volume, agents)
- Per-product sections (AgentFi, Conduit, ShopKite, Treasury, Score, KiteIndex)
- Embeddable widget for partner sites
- Public API for builders
- 5-minute caching

## API

```bash
# Get ecosystem stats
curl https://agenticfi.xyz/api/stats
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
