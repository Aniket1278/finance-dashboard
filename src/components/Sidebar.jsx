export default function Sidebar({ page, setPage, role, setRole }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        Fintrack
        <span>Personal Finance</span>
      </div>

      <button
        className={`nav-item ${page === "dashboard" ? "active" : ""}`}
        onClick={() => setPage("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={`nav-item ${page === "transactions" ? "active" : ""}`}
        onClick={() => setPage("transactions")}
      >
        Transactions
      </button>

      <button
        className={`nav-item ${page === "insights" ? "active" : ""}`}
        onClick={() => setPage("insights")}
      >
        Insights
      </button>

      <div className="role-box">
        <div>Role</div>
        <select
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </aside>
  );
}