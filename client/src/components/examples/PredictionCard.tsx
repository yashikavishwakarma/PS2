import PredictionCard from "../PredictionCard";
import fineSandImg from "@assets/generated_images/Fine_sand_grain_microscope_1d351d8b.png";
import mediumSandImg from "@assets/generated_images/Medium_sand_grain_microscope_348dfaf8.png";

export default function PredictionCardExample() {
  return (
    <div className="space-y-4 p-6 max-w-2xl">
      <PredictionCard
        id="1"
        imageUrl={fineSandImg}
        grainSizeClass="fine"
        confidence={0.95}
        location="Mumbai Beach, Maharashtra"
        latitude={19.0760}
        longitude={72.8777}
        uploadedAt={new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()}
      />
      <PredictionCard
        id="2"
        imageUrl={mediumSandImg}
        grainSizeClass="medium"
        confidence={0.88}
        location="Goa Coastline"
        latitude={15.2993}
        longitude={74.1240}
        uploadedAt={new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}
      />
    </div>
  );
}
