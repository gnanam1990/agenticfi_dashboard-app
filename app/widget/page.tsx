import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEcosystemStats } from "@/lib/aggregation";

export default async function WidgetPage() {
  const stats = await getEcosystemStats();

  return (
    <div className="p-4 font-sans">
      <Card className="max-w-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Kite Ecosystem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Data</div>
              <div className="font-bold">{stats.data_status === "connected" ? "Live" : "Pending"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Connected</div>
              <div className="font-bold">{stats.connected_products}/{stats.ecosystem_services}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Services</div>
              <div className="font-bold">{stats.ecosystem_services}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Cache</div>
              <div className="font-bold">5 min</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
