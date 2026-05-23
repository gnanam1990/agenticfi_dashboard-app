import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEcosystemStats } from "@/lib/aggregation";
import Link from "next/link";

export const metadata = {
  title: "AgenticFi — Kite Agentic Economy Dashboard",
};

export default async function HomePage() {
  const stats = await getEcosystemStats();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-4">
        <Badge variant={stats.data_status === "connected" ? "default" : "outline"}>
          {stats.data_status === "connectors_required" ? "Data connectors required" : stats.data_status}
        </Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl font-bold">AgenticFi</h1>
          <p className="text-xl text-muted-foreground">
            Public stats dashboard for the Kite agentic economy. This deployment is live, but
            product totals are withheld until real product API connectors are configured.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.summary.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{product.name}</CardTitle>
                <Badge variant={product.status === "connected" ? "default" : "outline"}>
                  {product.status === "connected" ? "Live" : "Connector needed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {product.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                    <div className="font-semibold">{metric.value}</div>
                  </div>
                ))}
              </div>
              <Link href={product.href} target="_blank" className="text-sm font-medium underline underline-offset-4">
                Open product
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
