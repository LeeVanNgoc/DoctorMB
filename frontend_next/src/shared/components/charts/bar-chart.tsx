"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export function BarChart({
  data,
}: BarChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="value" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}