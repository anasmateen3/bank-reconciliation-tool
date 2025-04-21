"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    matched: 85,
    unmatched: 15,
  },
  {
    name: "Feb",
    matched: 88,
    unmatched: 12,
  },
  {
    name: "Mar",
    matched: 90,
    unmatched: 10,
  },
  {
    name: "Apr",
    matched: 92,
    unmatched: 8,
  },
  {
    name: "May",
    matched: 94,
    unmatched: 6,
  },
  {
    name: "Jun",
    matched: 95,
    unmatched: 5,
  },
]

export function MonthlyTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, ""]}
          contentStyle={{ backgroundColor: "#fff", borderColor: "#3D0000" }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="matched"
          stroke="#950101"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="Matched Transactions"
        />
        <Line type="monotone" dataKey="unmatched" stroke="#FF0000" strokeWidth={2} name="Unmatched Transactions" />
      </LineChart>
    </ResponsiveContainer>
  )
}
