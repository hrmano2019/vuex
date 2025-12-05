import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ProductData } from "./ProductForm";

interface ProfitChartProps {
  data: ProductData | null;
}

export const ProfitChart = ({ data }: ProfitChartProps) => {
  if (!data) return null;

  // Generate data points for profit at different production volumes
  const breakEvenUnits = Math.ceil(
    data.fixedCosts / (data.sellingPrice - data.variableCostPerUnit)
  );

  const chartData = [];
  const maxVolume = Math.max(data.productionVolume * 1.5, breakEvenUnits * 2);
  const step = Math.ceil(maxVolume / 10);

  for (let volume = 0; volume <= maxVolume; volume += step) {
    const revenue = data.sellingPrice * volume;
    const totalCost = data.fixedCosts + data.variableCostPerUnit * volume;
    const profit = revenue - totalCost;

    chartData.push({
      volume,
      revenue,
      cost: totalCost,
      profit,
    });
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Profit Analysis Chart</CardTitle>
        <CardDescription>
          Revenue, cost, and profit projections at different production volumes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="volume"
              label={{ value: "Production Volume (units)", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis
              label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
              className="text-xs"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => `$${value.toFixed(0)}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="Revenue"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="Total Cost"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Profit"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
