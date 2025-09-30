import GrainDistributionChart from "@/components/GrainDistributionChart";
import TrendChart from "@/components/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Analytics() {
  const { toast } = useToast();

  // todo: remove mock functionality - replace with real data from API
  const grainData = [
    { name: "Fine Sand", value: 450, color: "hsl(40, 85%, 65%)" },
    { name: "Medium Sand", value: 520, color: "hsl(35, 80%, 55%)" },
    { name: "Coarse Sand", value: 277, color: "hsl(25, 75%, 50%)" },
  ];

  const trendData = [
    { date: "Jan", fine: 45, medium: 52, coarse: 28 },
    { date: "Feb", fine: 52, medium: 48, coarse: 35 },
    { date: "Mar", fine: 48, medium: 55, coarse: 30 },
    { date: "Apr", fine: 58, medium: 50, coarse: 25 },
    { date: "May", fine: 62, medium: 58, coarse: 32 },
    { date: "Jun", fine: 55, medium: 62, coarse: 38 },
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting data as ${format}`);
    toast({
      title: "Export started",
      description: `Downloading data in ${format.toUpperCase()} format`,
    });
  };

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Samples</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">1,247</p>
              <p className="text-sm text-muted-foreground mt-1">
                Collected across all sites
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Grain Size</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">Medium</p>
              <p className="text-sm text-muted-foreground mt-1">
                Most common classification
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">94.2%</p>
              <p className="text-sm text-muted-foreground mt-1">
                ML prediction confidence
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GrainDistributionChart data={grainData} />
          <TrendChart data={trendData} />
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: "Maharashtra", fine: 35, medium: 42, coarse: 23 },
                  { region: "Goa", fine: 28, medium: 48, coarse: 24 },
                  { region: "Tamil Nadu", fine: 45, medium: 32, coarse: 23 },
                  { region: "Kerala", fine: 38, medium: 38, coarse: 24 },
                ].map((item) => (
                  <div key={item.region} className="flex items-center gap-4">
                    <div className="w-32 font-medium">{item.region}</div>
                    <div className="flex-1 h-8 flex rounded-md overflow-hidden">
                      <div
                        className="bg-[hsl(40,85%,65%)] flex items-center justify-center text-xs font-medium"
                        style={{ width: `${item.fine}%` }}
                      >
                        {item.fine}%
                      </div>
                      <div
                        className="bg-[hsl(35,80%,55%)] flex items-center justify-center text-xs font-medium"
                        style={{ width: `${item.medium}%` }}
                      >
                        {item.medium}%
                      </div>
                      <div
                        className="bg-[hsl(25,75%,50%)] flex items-center justify-center text-xs font-medium text-white"
                        style={{ width: `${item.coarse}%` }}
                      >
                        {item.coarse}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
