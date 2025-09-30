import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TrendDataPoint {
  date: string;
  fine: number;
  medium: number;
  coarse: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  title?: string;
}

export default function TrendChart({ data, title = "Sediment Trends Over Time" }: TrendChartProps) {
  return (
    <Card data-testid="card-trend-chart">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="fine" 
              stroke="hsl(40, 85%, 65%)" 
              strokeWidth={2}
              name="Fine Sand"
            />
            <Line 
              type="monotone" 
              dataKey="medium" 
              stroke="hsl(35, 80%, 55%)" 
              strokeWidth={2}
              name="Medium Sand"
            />
            <Line 
              type="monotone" 
              dataKey="coarse" 
              stroke="hsl(25, 75%, 50%)" 
              strokeWidth={2}
              name="Coarse Sand"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
