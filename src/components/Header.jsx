// src/components/Header.jsx
import "../styles/Header.css";

export default function Header({ city, currentPage = "home", onNavigate }) {
  const handleNavigate = (page) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page);
    }
  };

  return (
    <header className="app-header">
      <h1 className="app-title">CLOUD-9</h1>

      <div className="location-title">{city}</div>

      <nav className="nav-buttons">
        <button
          onClick={() => handleNavigate("home")}
          className={currentPage === "home" ? "active" : ""}
        >
          Home
        </button>
        <button
          onClick={() => handleNavigate("maps")}
          className={currentPage === "maps" ? "active" : ""}
        >
          Maps
        </button>
        <button
          onClick={() => handleNavigate("settings")}
          className={currentPage === "settings" ? "active" : ""}
        >
          Settings
        </button>
      </nav>
    </header>
  );
}
