"use client";

import { NoData } from "@/components/NoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchATPSinglesRankings } from "@/services";
import { flagEmoji } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function StatsPage() {
  const [isTop100, toggleIsTop100] = useReducer((prev) => !prev, false);
  const { data, isFetching } = useQuery({
    queryKey: ["ranking", "all"],
    queryFn: () => fetchATPSinglesRankings("all"),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <NoData>No data available.</NoData>;
  }

  const chartData: { country: string; count: number }[] = data
    .filter((player) => (isTop100 ? player.ranking <= 100 : true))
    .reduce((acc: { country: string; count: number }[], player) => {
      const existingCountry = acc.find((c) => c.country === player.country);
      if (existingCountry) {
        existingCountry.count += 1;
      } else {
        acc.push({
          country: player.country,
          count: 1,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count)
    .splice(0, 35);

  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <div className="px-4">
        <Tabs defaultValue="all" className="w-[400px] mb-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => toggleIsTop100()}>
              Show all
            </TabsTrigger>
            <TabsTrigger value="top100" onClick={() => toggleIsTop100()}>
              Top 100
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Card className="m-4 max-w-6xl">
        <CardHeader>
          <CardTitle>Stats - {isTop100 ? "Top 100" : "All Players"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              width={600}
              height={300}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="country"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <Bar
                dataKey="count"
                fill={chartConfig.count.color}
                name={chartConfig.count.label}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value: string) => (
                      <div className="flex items-center gap-2">
                        {flagEmoji(value) + " " + value}
                      </div>
                    )}
                    className="w-[150px]"
                  />
                }
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
