import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryPie({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={index} fill="#8884d8" />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}