import { MapPin, Beaker, TrendingUp, Layers } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import MapView from "@/components/MapView";
import PredictionCard from "@/components/PredictionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import fineSandImg from "@assets/generated_images/Fine_sand_grain_microscope_1d351d8b.png";
import mediumSandImg from "@assets/generated_images/Medium_sand_grain_microscope_348dfaf8.png";
import coarseSandImg from "@assets/generated_images/Coarse_sand_grain_microscope_08ca6d71.png";

export default function Dashboard() {
  // todo: remove mock functionality - replace with real data from API
  const mockMarkers = [
    {
      id: "1",
      latitude: 19.0760,
      longitude: 72.8777,
      grainSizeClass: "fine",
      confidence: 0.95,
      imageUrl: fineSandImg,
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      location: "Mumbai Beach",
    },
    {
      id: "2",
      latitude: 15.2993,
      longitude: 74.1240,
      grainSizeClass: "medium",
      confidence: 0.89,
      imageUrl: mediumSandImg,
      uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      location: "Goa Coastline",
    },
    {
      id: "3",
      latitude: 13.0827,
      longitude: 80.2707,
      grainSizeClass: "coarse",
      confidence: 0.92,
      imageUrl: coarseSandImg,
      uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      location: "Chennai Marina",
    },
    {
      id: "4",
      latitude: 11.9416,
      longitude: 79.8083,
      grainSizeClass: "fine",
      confidence: 0.88,
      imageUrl: fineSandImg,
      uploadedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      location: "Pondicherry Beach",
    },
  ];

  const recentPredictions = mockMarkers.slice(0, 3);

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
            value="1,247"
            icon={MapPin}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Beach Sites"
            value="48"
            icon={Beaker}
            description="Across 5 states"
          />
          <StatsCard
            title="Avg Confidence"
            value="94.2%"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
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
                <MapView markers={mockMarkers} />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Predictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPredictions.map((prediction) => (
                  <PredictionCard key={prediction.id} {...prediction} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
