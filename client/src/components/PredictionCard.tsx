import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PredictionCardProps {
  id: string;
  imageUrl: string;
  grainSizeClass: string;
  confidence: number;
  location?: string;
  latitude: number;
  longitude: number;
  uploadedAt: string;
}

export default function PredictionCard({
  id,
  imageUrl,
  grainSizeClass,
  confidence,
  location,
  latitude,
  longitude,
  uploadedAt,
}: PredictionCardProps) {
  const getGrainColor = (grain: string) => {
    switch (grain.toLowerCase()) {
      case "fine":
        return "bg-[hsl(40,85%,65%)] text-[hsl(40,85%,20%)]";
      case "medium":
        return "bg-[hsl(35,80%,55%)] text-[hsl(35,80%,15%)]";
      case "coarse":
        return "bg-[hsl(25,75%,50%)] text-[hsl(25,75%,10%)]";
      default:
        return "";
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`card-prediction-${id}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={imageUrl}
            alt="Sand sample"
            className="w-24 h-24 rounded-md object-cover flex-shrink-0"
            data-testid={`img-sample-${id}`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg" data-testid={`text-grain-${id}`}>
                {grainSizeClass.charAt(0).toUpperCase() + grainSizeClass.slice(1)} Sand
              </h3>
              <Badge className={getGrainColor(grainSizeClass)}>
                {(confidence * 100).toFixed(0)}%
              </Badge>
            </div>
            {location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground font-mono">
              {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(uploadedAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
