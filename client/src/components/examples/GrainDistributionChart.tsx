import GrainDistributionChart from "../GrainDistributionChart";

export default function GrainDistributionChartExample() {
  const mockData = [
    { name: "Fine Sand", value: 450, color: "hsl(40, 85%, 65%)" },
    { name: "Medium Sand", value: 520, color: "hsl(35, 80%, 55%)" },
    { name: "Coarse Sand", value: 277, color: "hsl(25, 75%, 50%)" },
  ];

  return (
    <div className="p-6">
      <GrainDistributionChart data={mockData} />
    </div>
  );
}
