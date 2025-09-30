import { useQuery } from "@tanstack/react-query";
import { MapPin, Beaker, TrendingUp, Layers } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import MapView from "@/components/MapView";
import PredictionCard from "@/components/PredictionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Measurement } from "@shared/schema";

export default function Dashboard() {
  const { data: measurements = [], isLoading } = useQuery<Measurement[]>({
    queryKey: ["/api/measurements"],
  });

  const mapMarkers = measurements.map((m) => ({
    id: m.id,
    latitude: m.latitude,
    longitude: m.longitude,
    grainSizeClass: m.grainSizeClass,
    confidence: m.confidence,
    imageUrl: m.imageUrl,
    uploadedAt: m.uploadedAt.toString(),
    location: m.location || undefined,
  }));

  const recentPredictions = measurements.slice(0, 3);

  const stats = {
    total: measurements.length,
    avgConfidence: measurements.length > 0 
      ? (measurements.reduce((sum, m) => sum + m.confidence, 0) / measurements.length * 100).toFixed(1)
      : "0",
    beachSites: new Set(measurements.map(m => m.location).filter(Boolean)).size,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading measurements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Coastal Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time beach sediment monitoring across Indian coastlines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Measurements"
            value={stats.total}
            icon={MapPin}
          />
          <StatsCard
            title="Beach Sites"
            value={stats.beachSites}
            icon={Beaker}
            description={stats.beachSites > 0 ? "Unique locations" : "No data yet"}
          />
          <StatsCard
            title="Avg Confidence"
            value={`${stats.avgConfidence}%`}
            icon={TrendingUp}
          />
          <StatsCard
            title="Beach Types"
            value="12"
            icon={Layers}
            description="Identified"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Coastal Map</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px] p-0">
                <MapView markers={mapMarkers} />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Predictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPredictions.length > 0 ? (
                  recentPredictions.map((prediction) => (
                    <PredictionCard 
                      key={prediction.id} 
                      {...prediction}
                      location={prediction.location || undefined}
                      uploadedAt={prediction.uploadedAt.toString()}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No predictions yet. Upload your first sand sample!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
