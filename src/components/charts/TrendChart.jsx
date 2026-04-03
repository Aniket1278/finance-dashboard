import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function TrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Line dataKey="income" stroke="#3A7D5C" />
        <Line dataKey="expense" stroke="#C0402A" />
      </LineChart>
    </ResponsiveContainer>
  );
}