import { useState, useEffect } from "react";
import { AppCtx } from "./context/AppContext";
import { SEED } from "./data/seed";

import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

export default function App() {
  const [txns, setTxns] = useState(() => {
    const saved = localStorage.getItem("txns");
    return saved ? JSON.parse(saved) : SEED;
  });

  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("viewer");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("txns", JSON.stringify(txns));
  }, [txns]);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const addTx = (tx) => setTxns(prev => [tx, ...prev]);
  const deleteTx = (id) => setTxns(prev => prev.filter(t => t.id !== id));
  const updateTx = (updatedTx) =>
    setTxns(prev => prev.map(t => (t.id === updatedTx.id ? updatedTx : t)));

  return (
    <AppCtx.Provider value={{ txns, role, addTx, deleteTx, updateTx }}>
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">
            FinTrack
            <span>Finance Dashboard</span>
          </div>
        </div>

        <div className="nav-center">
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={page === "transactions" ? "active" : ""}
            onClick={() => setPage("transactions")}
          >
            Transactions
          </button>

          <button
            className={page === "insights" ? "active" : ""}
            onClick={() => setPage("insights")}
          >
            Insights
          </button>
        </div>

        <div className="nav-right">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          
        </div>
      </div>

      <div className="main">
        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}
      </div>
    </AppCtx.Provider>
  );
}