"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchPlayersByCountry } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  name: {
    label: "Name",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartPage() {
  const country = "FRA"; // Example country code, replace with actual value

  const { data: players, isLoading } = useQuery({
    queryKey: ["ranking", country],
    queryFn: () => fetchPlayersByCountry(country),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!players) {
    return <div>No data available.</div>;
  }

  const chartData = [
    { ranking: 0, name: "" },
    ...players.map((player) => ({
      ranking: player.ranking,
      name: player.name,
    })),
  ];

  return (
    <Card className="m-4 max-w-6xl">
      <CardHeader>
        <CardTitle>Line Chart - Dots</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="ranking"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="name"
              type="natural"
              stroke="var(--color-name)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-name)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
