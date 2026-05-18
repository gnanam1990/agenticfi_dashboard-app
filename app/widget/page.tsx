import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WidgetPage() {
  return (
    <div className="p-4">
      <Card className="max-w-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Kite Ecosystem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">TVL</div>
              <div className="font-bold">$0</div>
            </div>
            <div>
              <div className="text-muted-foreground">Volume 24h</div>
              <div className="font-bold">$0</div>
            </div>
            <div>
              <div className="text-muted-foreground">Agents</div>
              <div className="font-bold">0</div>
            </div>
            <div>
              <div className="text-muted-foreground">Services</div>
              <div className="font-bold">6</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
