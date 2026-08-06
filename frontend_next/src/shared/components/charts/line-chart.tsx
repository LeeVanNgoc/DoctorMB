"use client";

import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export function LineChart({
  data,
}: LineChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <RechartsLineChart data={data}>
        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}