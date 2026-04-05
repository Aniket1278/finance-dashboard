import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { useApp } from "../context/AppContext";


function getMonthlyData(txns) {
  const map = {};

  txns.forEach(t => {
    const month = t.date.slice(0, 7);

    if (!map[month]) {
      map[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") map[month].income += t.amount;
    else map[month].expense += t.amount;
  });

  return Object.values(map);
}

function getCategoryData(txns) {
  const map = {};

  txns.forEach(t => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export default function Charts() {
  const { txns } = useApp();

  const monthly = getMonthlyData(txns);
  const category = getCategoryData(txns);

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      
      
      <div>
        <h3>Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" />
            <Line type="monotone" dataKey="expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
      <div>
        <h3>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" />
            <Bar dataKey="expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div>
        <h3>Spending by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={category} dataKey="value" outerRadius={80}>
              {category.map((_, i) => (
                <Cell key={i} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}