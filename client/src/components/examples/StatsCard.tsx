import StatsCard from "../StatsCard";
import { MapPin, Beaker, TrendingUp } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
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
    </div>
  );
}
