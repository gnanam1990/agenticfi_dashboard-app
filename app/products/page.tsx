import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEcosystemStats } from "@/lib/aggregation";
import Link from "next/link";
import { Boxes } from "lucide-react";

export const metadata = {
  title: "Products — AgenticFi",
};

export default async function ProductsPage() {
  const stats = await getEcosystemStats();

  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-border bg-card/60 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary">
          <Boxes className="size-4" />
          Kite products
        </div>
        <h1 className="mt-2 text-4xl font-bold">Ecosystem Products</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Product links are live. Metrics require each product to expose a stats endpoint and the
          matching connector env var to be set.
        </p>
      </section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.products.map((product) => (
          <Link key={product.name} href={product.href} target="_blank">
            <Card className="h-full cursor-pointer transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{product.name}</CardTitle>
                  <Badge variant={product.status === "connected" ? "default" : "outline"}>
                    {product.status === "connected" ? "Live stats" : product.connector_env}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {product.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      <div className="font-semibold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
