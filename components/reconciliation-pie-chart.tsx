"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Completed", value: 65, color: "#950101" },
  { name: "In Progress", value: 25, color: "#FF0000" },
  { name: "Failed", value: 10, color: "#3D0000" },
]

export function ReconciliationPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Percentage"]}
          contentStyle={{ backgroundColor: "#fff", borderColor: "#3D0000" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
