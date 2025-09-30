import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export interface MapMarkerData {
  id: string;
  latitude: number;
  longitude: number;
  grainSizeClass: string;
  confidence: number;
  imageUrl: string;
  uploadedAt: string;
  location?: string;
}

interface MapViewProps {
  markers: MapMarkerData[];
  center?: [number, number];
  zoom?: number;
}

const getMarkerColor = (grainSize: string) => {
  switch (grainSize.toLowerCase()) {
    case "fine":
      return "hsl(40, 85%, 65%)";
    case "medium":
      return "hsl(35, 80%, 55%)";
    case "coarse":
      return "hsl(25, 75%, 50%)";
    default:
      return "hsl(200, 90%, 45%)";
  }
};

export default function MapView({ markers, center = [20.5937, 78.9629], zoom = 5 }: MapViewProps) {
  const createCustomIcon = (grainSize: string) => {
    const color = getMarkerColor(grainSize);
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
        <path d="M12 0C7.03 0 3 4.03 3 9c0 7.5 9 18 9 18s9-10.5 9-18c0-4.97-4.03-9-9-9z" fill="${color}" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="9" r="4" fill="white"/>
      </svg>
    `;
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize: [32, 48],
      iconAnchor: [16, 48],
      popupAnchor: [0, -48],
    });
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden" data-testid="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={createCustomIcon(marker.grainSizeClass)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]" data-testid={`popup-${marker.id}`}>
                <img
                  src={marker.imageUrl}
                  alt="Sand sample"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Grain Size</span>
                    <Badge variant={marker.grainSizeClass === "fine" ? "secondary" : "default"}>
                      {marker.grainSizeClass}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="text-sm font-medium">{(marker.confidence * 100).toFixed(1)}%</span>
                  </div>
                  {marker.location && (
                    <div className="text-sm text-muted-foreground">{marker.location}</div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(marker.uploadedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
