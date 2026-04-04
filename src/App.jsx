import { useState, useEffect } from "react";
import { AppCtx } from "./context/AppContext";
import { SEED } from "./data/seed";

import Sidebar from "./components/Sidebar";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("txns", JSON.stringify(txns));
  }, [txns]);

  const addTx = (tx) => {
    setTxns(prev => [tx, ...prev]);
  };

  const deleteTx = (id) => {
    setTxns(prev => prev.filter(t => t.id !== id));
  };

  const updateTx = (updatedTx) => {
    setTxns(prev =>
      prev.map(t => (t.id === updatedTx.id ? updatedTx : t))
    );
  };

  return (
    <AppCtx.Provider value={{ txns, role, addTx, deleteTx, updateTx }}>
      <div className="shell">
        <Sidebar
          page={page}
          setPage={setPage}
          role={role}
          setRole={setRole}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <div className="main">
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>
            ☰ Menu
          </button>

          {page === "dashboard" && <Dashboard />}
          {page === "transactions" && <Transactions />}
          {page === "insights" && <Insights />}
        </div>
      </div>
    </AppCtx.Provider>
  );
}