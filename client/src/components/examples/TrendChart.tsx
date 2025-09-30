import TrendChart from "../TrendChart";

export default function TrendChartExample() {
  const mockData = [
    { date: "Jan", fine: 45, medium: 52, coarse: 28 },
    { date: "Feb", fine: 52, medium: 48, coarse: 35 },
    { date: "Mar", fine: 48, medium: 55, coarse: 30 },
    { date: "Apr", fine: 58, medium: 50, coarse: 25 },
    { date: "May", fine: 62, medium: 58, coarse: 32 },
    { date: "Jun", fine: 55, medium: 62, coarse: 38 },
  ];

  return (
    <div className="p-6">
      <TrendChart data={mockData} />
    </div>
  );
}
