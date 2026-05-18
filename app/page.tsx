import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "AgenticFi — Kite Agentic Economy Dashboard",
};

export default function HomePage() {
  return (
    <div className="container max-w-screen-2xl py-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">AgenticFi</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Public stats dashboard aggregating the entire Kite agentic economy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total TVL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Ecosystem Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "AgentFi", desc: "DEX, liquid staking, yield", tvl: "$0" },
          { name: "Conduit-Kite", desc: "API marketplace", volume: "$0" },
          { name: "ShopKite", desc: "Commerce for agents", orders: "0" },
          { name: "AgentTreasury", desc: "Multi-chain treasury", aum: "$0" },
          { name: "AgentScore", desc: "Reputation system", agents: "0" },
          { name: "KiteIndex", desc: "Data indexer", queries: "0" },
        ].map((product) => (
          <Card key={product.name}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{product.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
