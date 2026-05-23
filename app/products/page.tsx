import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEcosystemStats } from "@/lib/aggregation";
import Link from "next/link";

export const metadata = {
  title: "Products — AgenticFi",
};

export default async function ProductsPage() {
  const stats = await getEcosystemStats();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Ecosystem Products</h1>
        <p className="text-muted-foreground">
          Product links are live. Metrics require each product to expose a stats endpoint and the
          matching connector env var to be set.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.products.map((product) => (
          <Link key={product.name} href={product.href} target="_blank">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
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
