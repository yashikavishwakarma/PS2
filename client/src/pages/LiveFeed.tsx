import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PredictionCard from "@/components/PredictionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Measurement } from "@shared/schema";

export default function LiveFeed() {
  const [filter, setFilter] = useState<string>("all");
  const { data: measurements = [], isLoading, isError, refetch } = useQuery<Measurement[]>({
    queryKey: ["/api/measurements"],
  });

  // Sort by most recent first, then filter
  const sortedMeasurements = [...measurements].sort((a, b) => 
    new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  const filteredPredictions =
    filter === "all"
      ? sortedMeasurements
      : sortedMeasurements.filter((p) => p.grainSizeClass === filter);

  const filters = [
    { value: "all", label: "All", count: measurements.length },
    {
      value: "fine",
      label: "Fine",
      count: measurements.filter((p) => p.grainSizeClass === "fine").length,
    },
    {
      value: "medium",
      label: "Medium",
      count: measurements.filter((p) => p.grainSizeClass === "medium").length,
    },
    {
      value: "coarse",
      label: "Coarse",
      count: measurements.filter((p) => p.grainSizeClass === "coarse").length,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading feed...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load live feed</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Live Feed</h1>
          <p className="text-muted-foreground">
            Real-time stream of sand sample predictions
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <Badge
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              className="cursor-pointer hover-elevate px-4 py-2"
              onClick={() => setFilter(f.value)}
              data-testid={`filter-${f.value}`}
            >
              {f.label} ({f.count})
            </Badge>
          ))}
        </div>

        <div className="space-y-4 max-w-4xl">
          {filteredPredictions.map((prediction) => (
            <PredictionCard 
              key={prediction.id} 
              {...prediction}
              location={prediction.location || undefined}
              uploadedAt={prediction.uploadedAt.toString()}
            />
          ))}
        </div>

        {filteredPredictions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {measurements.length === 0 
                ? "No predictions yet. Upload your first sand sample!"
                : "No predictions found for this filter"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
