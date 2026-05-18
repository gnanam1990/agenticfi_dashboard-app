import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Products — AgenticFi",
};

const products = [
  {
    name: "AgentFi",
    description: "DEX, liquid staking, yield aggregator",
    href: "https://agentfi.xyz",
    stats: { tvl: "$0", pools: 0 },
  },
  {
    name: "Conduit-Kite",
    description: "Pay-per-call API marketplace",
    href: "https://conduit-kite.xyz",
    stats: { volume: "$0", services: 0 },
  },
  {
    name: "ShopKite",
    description: "Commerce for AI agents",
    href: "https://shopkite.xyz",
    stats: { orders: 0, gmv: "$0" },
  },
  {
    name: "AgentTreasury",
    description: "Multi-chain treasury management",
    href: "https://agenttreasury.xyz",
    stats: { aum: "$0", treasuries: 0 },
  },
  {
    name: "AgentScore",
    description: "Reputation system for agents",
    href: "https://agentscore.xyz",
    stats: { agents: 0, avgScore: 0 },
  },
  {
    name: "KiteIndex",
    description: "Production-grade indexer",
    href: "https://kiteindex.xyz",
    stats: { queries: 0, uptime: "99.9%" },
  },
];

export default function ProductsPage() {
  return (
    <div className="container max-w-screen-2xl py-6 space-y-6">
      <h1 className="text-3xl font-bold">Ecosystem Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link key={product.name} href={product.href} target="_blank">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
