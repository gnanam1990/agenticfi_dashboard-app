# AgenticFi Dashboard

> Public stats dashboard aggregating connector health and metrics across the Kite agentic economy.

## Overview

AgenticFi Dashboard is a Next.js application that presents a single public surface for the Kite agentic economy. It tracks a fixed set of ecosystem products, fetches their stats from per-product API endpoints, and reports both live metrics and connector health. Product totals stay withheld until the matching connector environment variables are configured, so the dashboard is honest about which data is real versus pending.

## Features

- Ecosystem overview page with summary metrics (data status, tracked services, refresh policy, missing connectors).
- Per-product cards for six ecosystem products, showing two key metrics each and a connector status badge.
- Dedicated `/products` page linking out to each product with its current metrics.
- Embeddable `/widget` page with a compact ecosystem summary card for partner sites.
- Public JSON API at `/api/stats` returning aggregated ecosystem stats.
- Responses are cached for 5 minutes using `Cache-Control` with stale-while-revalidate.
- Connector-aware data model: metrics resolve to "Needs API", "API error", or live values depending on each connector's state.

## Tech stack

- Next.js 16 (App Router) with React 19 and TypeScript
- Tailwind CSS v4 with shadcn/ui components
- Recharts for charting primitives
- lucide-react icons
- pnpm for package management

## Getting started

### Prerequisites

- Node.js (Next.js 16 / React 19 compatible runtime)
- pnpm

### Installation

```bash
pnpm install
```

### Configuration

The dashboard reads one connector URL per tracked product. Each variable should point at a product's stats endpoint that returns JSON. When a variable is unset, that product is marked as not configured and its metrics are withheld. Set the variables you need in a `.env.local` file or your hosting provider's environment settings.

| Variable | Product | Purpose |
|---|---|---|
| `AGENTFI_STATS_URL` | AgentFi | Stats endpoint (TVL, pools) |
| `CONDUIT_STATS_URL` | Conduit-Kite | Stats endpoint (volume, services) |
| `SHOPKITE_STATS_URL` | ShopKite | Stats endpoint (orders, GMV) |
| `AGENTTREASURY_STATS_URL` | AgentTreasury | Stats endpoint (AUM, treasuries) |
| `AGENTSCORE_STATS_URL` | AgentScore | Stats endpoint (agents, average score) |
| `KITEINDEX_STATS_URL` | KiteIndex | Stats endpoint (queries, uptime) |

Never commit real secret values; only the variable names above are required to be set in your environment.

### Running

```bash
# Start the dev server
pnpm dev

# Production build and start
pnpm build
pnpm start

# Lint
pnpm lint
```

The dev server runs on http://localhost:3000 by default.

## Usage

Routes:

| Path | Description |
|---|---|
| `/` | Ecosystem overview with summary and per-product cards |
| `/products` | Product directory with outbound links and metrics |
| `/widget` | Compact embeddable summary card |
| `/api/stats` | Aggregated ecosystem stats as JSON |

Fetch ecosystem stats from the API:

```bash
curl http://localhost:3000/api/stats
```

The response includes `data_status` (`connectors_required` / `partial` / `connected`), `connected_products`, `ecosystem_services`, a `summary` array, a `products` array with per-product metrics and status, `missing_integrations`, and `last_checked_at`.

## Products tracked

| Product | Metrics | Connector variable |
|---|---|---|
| AgentFi | TVL, pools | `AGENTFI_STATS_URL` |
| Conduit-Kite | Volume, services | `CONDUIT_STATS_URL` |
| ShopKite | Orders, GMV | `SHOPKITE_STATS_URL` |
| AgentTreasury | AUM, treasuries | `AGENTTREASURY_STATS_URL` |
| AgentScore | Agents, average score | `AGENTSCORE_STATS_URL` |
| KiteIndex | Queries, uptime | `KITEINDEX_STATS_URL` |

## Project structure

```
app/
  page.tsx            # Ecosystem overview
  products/page.tsx   # Product directory
  widget/page.tsx     # Embeddable summary widget
  api/stats/route.ts  # JSON stats API
  layout.tsx          # Root layout, header, footer
lib/
  aggregation.ts      # Product config + connector fetch/aggregation
  utils.ts            # Shared helpers
components/ui/        # shadcn/ui primitives
public/               # Static assets and branding
```

## Status

Functional dashboard. The UI, the `/products` and `/widget` pages, and the `/api/stats` endpoint are implemented. Live product metrics depend on the connector environment variables above being set and the corresponding product stats endpoints being reachable; until then, the dashboard reports a connectors-required state and withholds product totals.

## License

No license specified.
