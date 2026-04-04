export default function Sidebar({
  page,
  setPage,
  role,
  setRole,
  showSidebar,
  setShowSidebar,
  dark,
  setDark
}) {
  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <button className="close-btn" onClick={() => setShowSidebar(false)}>
        ✕
      </button>

      <div className="logo">
        FinTrack
        <span>Finance Dashboard</span>
      </div>

      <button
        className={`nav-item ${page === "dashboard" ? "active" : ""}`}
        onClick={() => {
          setPage("dashboard");
          setShowSidebar(false);
        }}
      >
        Dashboard
      </button>

      <button
        className={`nav-item ${page === "transactions" ? "active" : ""}`}
        onClick={() => {
          setPage("transactions");
          setShowSidebar(false);
        }}
      >
        Transactions
      </button>

      <button
        className={`nav-item ${page === "insights" ? "active" : ""}`}
        onClick={() => {
          setPage("insights");
          setShowSidebar(false);
        }}
      >
        Insights
      </button>

      <div className="role-box">
        <select
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}