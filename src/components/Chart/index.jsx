/* eslint-disable react/prop-types */
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { countDatasetsPerDay } from "@/lib/countDatasetsPerDay";

const ChartOverview = ({ datasets }) => {
  // Processa os datasets para contar os uploads por dia da semana
  const chartData = countDatasetsPerDay(datasets);

  const chartConfig = {
    Upload: {
      label: "Upload",
      color: "#2563eb",
    },
  };

  return (
    <Card className="w-full md:w-1/2 md:max-w-[600px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-foreground select-none">
            Uploads por Dia da Semana
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full"
        >
          <BarChart data={chartData} width={500} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="Upload"
              fill="var(--color-Upload)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartOverview;