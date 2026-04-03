import { useApp } from "../context/AppContext";
import { fmt } from "../utils/helpers";
import TrendChart from "./charts/TrendChart";
import CategoryPie from "./charts/CategoryPie";
import { buildTrendData, buildCategoryData } from "../utils/chartHelpers";

export default function Dashboard() {
  const { txns } = useApp();

  const income = txns
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = txns
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const trendData = buildTrendData(txns);
  const categoryData = buildCategoryData(txns);

  const recent = txns.slice(0, 5);

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">Financial overview</p>

      {/* 💳 CARDS */}
      <div className="card-grid" style={{ marginBottom: "30px" }}>
        <div className="card hover-card">
          <div className="card-label">💰 Total Balance</div>
          <div className={`card-value ${balance >= 0 ? "green" : "red"}`}>
            {fmt(balance)}
          </div>
        </div>

        <div className="card hover-card">
          <div className="card-label">📈 Income</div>
          <div className="card-value green">{fmt(income)}</div>
        </div>

        <div className="card hover-card">
          <div className="card-label">📉 Expenses</div>
          <div className="card-value red">{fmt(expense)}</div>
        </div>
      </div>

      {/* 📈 GRAPH */}
      <div className="panel" style={{ marginBottom: "30px" }}>
        <div className="panel-title">Monthly Trend</div>
        <TrendChart data={trendData} />
      </div>

      {/* 🥧 PIE */}
      <div className="panel" style={{ marginBottom: "30px" }}>
        <div className="panel-title">Spending Breakdown</div>
        <CategoryPie data={categoryData} />
      </div>

      {/* 📋 RECENT TRANSACTIONS */}
      <div className="panel">
        <div className="panel-title">Recent Transactions</div>

        {recent.length === 0 ? (
          <p>No transactions available</p>
        ) : (
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {recent.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.desc}</td>
                  <td
                    className={`amount ${
                      t.type === "income" ? "pos" : "neg"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"} {fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}