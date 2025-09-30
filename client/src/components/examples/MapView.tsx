import MapView from "../MapView";
import fineSandImg from "@assets/generated_images/Fine_sand_grain_microscope_1d351d8b.png";
import mediumSandImg from "@assets/generated_images/Medium_sand_grain_microscope_348dfaf8.png";
import coarseSandImg from "@assets/generated_images/Coarse_sand_grain_microscope_08ca6d71.png";

export default function MapViewExample() {
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
  ];

  return (
    <div className="h-96 p-6">
      <MapView markers={mockMarkers} />
    </div>
  );
}
