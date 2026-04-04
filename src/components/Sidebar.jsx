export default function Sidebar(props) {
  const { page, setPage, role, setRole, menuOpen, setMenuOpen } = props;

  return (
    <>
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      <div className={`sidebar ${menuOpen ? "show" : ""}`}>
        
        <button
          className="close-btn"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
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
            setMenuOpen(false);
          }}
        >
          Dashboard
        </button>

        <button
          className={`nav-item ${page === "transactions" ? "active" : ""}`}
          onClick={() => {
            setPage("transactions");
            setMenuOpen(false);
          }}
        >
          Transactions
        </button>

        <button
          className={`nav-item ${page === "insights" ? "active" : ""}`}
          onClick={() => {
            setPage("insights");
            setMenuOpen(false);
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
        </div>

      </div>
    </>
  );
}