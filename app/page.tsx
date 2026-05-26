import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEcosystemStats } from "@/lib/aggregation";
import Link from "next/link";
import { ArrowRight, BarChart3, Boxes, Network } from "lucide-react";

export const metadata = {
  title: "AgenticFi — Kite Agentic Economy Dashboard",
};

export default async function HomePage() {
  const stats = await getEcosystemStats();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-lg border border-border bg-card/60 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
        <div className="space-y-5">
          <Badge variant={stats.data_status === "connected" ? "default" : "outline"}>
            {stats.data_status === "connectors_required" ? "Data connectors required" : stats.data_status}
          </Badge>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl font-bold text-foreground sm:text-6xl">AgenticFi</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Public command surface for the Kite agentic economy: products, connector health,
              and service readiness in one dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex h-10 items-center gap-2 rounded-sm bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              <Boxes className="size-4" />
              View products
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/widget"
              className="inline-flex h-10 items-center gap-2 rounded-sm border border-border bg-background/60 px-4 text-sm font-bold text-foreground transition-colors hover:border-primary"
            >
              <BarChart3 className="size-4" />
              Embed widget
            </Link>
          </div>
        </div>

        <Card className="bg-background/65">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="size-4 text-primary" />
              Economy status
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Connected</div>
              <div className="text-2xl font-bold">{stats.connected_products}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Services</div>
              <div className="text-2xl font-bold">{stats.ecosystem_services}</div>
            </div>
            <div className="col-span-2 rounded-md border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
              Product totals stay withheld until real API connector env vars are configured.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </div>
  );
}
