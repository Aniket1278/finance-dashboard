import { useState } from "react";
import { useApp } from "../context/AppContext";
import { fmt } from "../utils/helpers";
import AddModal from "./AddModal";

export default function Transactions() {
  const { txns, role, addTx, deleteTx, updateTx } = useApp();

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const exportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];

    const rows = txns.map(t => [
      t.date,
      t.desc,
      t.category,
      t.type,
      t.amount
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    link.click();
  };

  const filtered = txns.filter(t =>
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortAsc ? a.amount - b.amount : b.amount - a.amount
  );

  const handleSave = (tx) => {
    if (editData) {
      updateTx(tx);
      setEditData(null);
    } else {
      addTx(tx);
    }
  };

  return (
    <div>
      <h1 className="page-title">Transactions</h1>

      <input
        className="search-input"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        {role === "admin" && (
          <button onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>
        )}

        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort ({sortAsc ? "Asc" : "Desc"})
        </button>

        <button onClick={exportCSV}>
          Download Excel
        </button>
      </div>

      <table className="tx-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {sorted.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.desc}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>

              <td className={`amount ${t.type === "income" ? "pos" : "neg"}`}>
                {t.type === "income" ? "+" : "-"} {fmt(t.amount)}
              </td>

              {role === "admin" && (
                <td>
                  <button
                    onClick={() => {
                      setEditData(t);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteTx(t.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddModal
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
          onSave={handleSave}
          editData={editData}
        />
      )}
    </div>
  );
}