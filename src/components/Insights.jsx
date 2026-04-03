import { useApp } from "../context/AppContext";
import { fmt } from "../utils/helpers";

export default function Insights() {
  const { txns } = useApp();

  const income = txns
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = txns
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const savings = income - expense;

  const savingsRate = income
    ? ((savings / income) * 100).toFixed(1)
    : 0;

  const categoryMap = {};
  txns.forEach(t => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const highestTx = txns.reduce((max, t) =>
    t.amount > max.amount ? t : max,
    txns[0] || {}
  );

  const months = {};

  txns.forEach(t => {
    const month = t.date.slice(0, 7);

    if (!months[month]) {
      months[month] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      months[month].income += t.amount;
    } else {
      months[month].expense += t.amount;
    }
  });

  const monthKeys = Object.keys(months).sort();
  const lastMonth = months[monthKeys[monthKeys.length - 1]] || {};
  const prevMonth = months[monthKeys[monthKeys.length - 2]] || {};

  const expenseChange =
    (lastMonth.expense || 0) - (prevMonth.expense || 0);

  return (
    <div>
      <h1 className="page-title">Insights</h1>

      <div className="insight-grid">

        <div className="insight-card">
          <h3>Total Income</h3>
          <p>{fmt(income)}</p>
        </div>

        <div className="insight-card">
          <h3>Total Expense</h3>
          <p>{fmt(expense)}</p>
        </div>

        <div className="insight-card">
          <h3>Savings</h3>
          <p>{fmt(savings)}</p>
        </div>

        <div className="insight-card">
          <h3>Savings Rate</h3>
          <p>{savingsRate}%</p>
        </div>

        {topCategory && (
          <div className="insight-card">
            <h3>Top Spending Category</h3>
            <p>{topCategory[0]}</p>
            <p>{fmt(topCategory[1])}</p>
          </div>
        )}

        {highestTx && (
          <div className="insight-card">
            <h3>Highest Transaction</h3>
            <p>{highestTx.desc}</p>
            <p>{fmt(highestTx.amount)}</p>
          </div>
        )}

        <div className="insight-card">
          <h3>Monthly Expense Change</h3>
          <p style={{ color: expenseChange > 0 ? "red" : "green" }}>
            {expenseChange > 0 ? "+" : ""}
            {fmt(expenseChange)}
          </p>
        </div>

        <div className="insight-card">
          <h3>Insight</h3>
          <p>
            {savings > 0
              ? "You are saving money. Keep it up."
              : "You are overspending. Try to reduce expenses."}
          </p>
        </div>

      </div>
    </div>
  );
}