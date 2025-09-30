import { useState } from "react";
import PredictionCard from "@/components/PredictionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import fineSandImg from "@assets/generated_images/Fine_sand_grain_microscope_1d351d8b.png";
import mediumSandImg from "@assets/generated_images/Medium_sand_grain_microscope_348dfaf8.png";
import coarseSandImg from "@assets/generated_images/Coarse_sand_grain_microscope_08ca6d71.png";

export default function LiveFeed() {
  const [filter, setFilter] = useState<string>("all");

  // todo: remove mock functionality - replace with real data from API
  const mockPredictions = [
    {
      id: "1",
      imageUrl: fineSandImg,
      grainSizeClass: "fine",
      confidence: 0.95,
      location: "Mumbai Beach, Maharashtra",
      latitude: 19.0760,
      longitude: 72.8777,
      uploadedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      imageUrl: mediumSandImg,
      grainSizeClass: "medium",
      confidence: 0.89,
      location: "Goa Coastline",
      latitude: 15.2993,
      longitude: 74.1240,
      uploadedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      imageUrl: coarseSandImg,
      grainSizeClass: "coarse",
      confidence: 0.92,
      location: "Chennai Marina Beach",
      latitude: 13.0827,
      longitude: 80.2707,
      uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      imageUrl: fineSandImg,
      grainSizeClass: "fine",
      confidence: 0.88,
      location: "Pondicherry Beach",
      latitude: 11.9416,
      longitude: 79.8083,
      uploadedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      imageUrl: mediumSandImg,
      grainSizeClass: "medium",
      confidence: 0.91,
      location: "Kovalam Beach, Kerala",
      latitude: 8.4004,
      longitude: 76.9786,
      uploadedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "6",
      imageUrl: coarseSandImg,
      grainSizeClass: "coarse",
      confidence: 0.87,
      location: "Puri Beach, Odisha",
      latitude: 19.8135,
      longitude: 85.8312,
      uploadedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const filteredPredictions =
    filter === "all"
      ? mockPredictions
      : mockPredictions.filter((p) => p.grainSizeClass === filter);

  const filters = [
    { value: "all", label: "All", count: mockPredictions.length },
    {
      value: "fine",
      label: "Fine",
      count: mockPredictions.filter((p) => p.grainSizeClass === "fine").length,
    },
    {
      value: "medium",
      label: "Medium",
      count: mockPredictions.filter((p) => p.grainSizeClass === "medium").length,
    },
    {
      value: "coarse",
      label: "Coarse",
      count: mockPredictions.filter((p) => p.grainSizeClass === "coarse").length,
    },
  ];

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
            <PredictionCard key={prediction.id} {...prediction} />
          ))}
        </div>

        {filteredPredictions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No predictions found for this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
