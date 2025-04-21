"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Main",
    total: 1200,
  },
  {
    name: "Payroll",
    total: 450,
  },
  {
    name: "Savings",
    total: 320,
  },
  {
    name: "Tax",
    total: 280,
  },
  {
    name: "Expense",
    total: 580,
  },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, "Transaction Volume"]}
          contentStyle={{ backgroundColor: "#fff", borderColor: "#3D0000" }}
        />
        <Bar dataKey="total" fill="#950101" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
