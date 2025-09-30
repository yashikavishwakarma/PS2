import { useQuery } from "@tanstack/react-query";
import GrainDistributionChart from "@/components/GrainDistributionChart";
import TrendChart from "@/components/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileJson, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Measurement } from "@shared/schema";

export default function Analytics() {
  const { toast } = useToast();
  const { data: measurements = [], isLoading, isError, refetch } = useQuery<Measurement[]>({
    queryKey: ["/api/measurements"],
  });

  const grainCounts = measurements.reduce(
    (acc, m) => {
      acc[m.grainSizeClass] = (acc[m.grainSizeClass] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const grainData = [
    { name: "Fine Sand", value: grainCounts.fine || 0, color: "hsl(40, 85%, 65%)" },
    { name: "Medium Sand", value: grainCounts.medium || 0, color: "hsl(35, 80%, 55%)" },
    { name: "Coarse Sand", value: grainCounts.coarse || 0, color: "hsl(25, 75%, 50%)" },
  ];

  const avgConfidence = measurements.length > 0
    ? (measurements.reduce((sum, m) => sum + m.confidence, 0) / measurements.length * 100).toFixed(1)
    : "0";

  const mostCommon = grainData.reduce((max, item) => 
    item.value > max.value ? item : max, grainData[0]
  );

  const handleExport = (format: string) => {
    const data = measurements.map(m => ({
      id: m.id,
      latitude: m.latitude,
      longitude: m.longitude,
      grainSizeClass: m.grainSizeClass,
      confidence: m.confidence,
      location: m.location,
      uploadedAt: m.uploadedAt,
    }));

    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `measurements-${new Date().toISOString()}.json`;
      a.click();
    } else if (format === "csv") {
      const headers = Object.keys(data[0] || {}).join(",");
      const rows = data.map(row => Object.values(row).join(","));
      const csv = [headers, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `measurements-${new Date().toISOString()}.csv`;
      a.click();
    }

    toast({
      title: "Export complete",
      description: `Downloaded ${measurements.length} measurements as ${format.toUpperCase()}`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load analytics data</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive sediment analysis and trends
            </p>
          </div>
          {measurements.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleExport("csv")}
                data-testid="button-export-csv"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("json")}
                data-testid="button-export-json"
              >
                <FileJson className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Samples</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{measurements.length}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Collected across all sites
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Most Common</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold capitalize">{mostCommon.name.split(' ')[0]}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {mostCommon.value} samples
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{avgConfidence}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Average confidence
              </p>
            </CardContent>
          </Card>
        </div>

        {measurements.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GrainDistributionChart data={grainData} />
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...measurements]
                    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
                    .slice(0, 5)
                    .map((m) => (
                      <div key={m.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium capitalize">{m.grainSizeClass} Sand</p>
                          <p className="text-sm text-muted-foreground">{m.location || 'Unknown location'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{(m.confidence * 100).toFixed(1)}%</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(m.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No data available yet. Upload sand samples to see analytics.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
