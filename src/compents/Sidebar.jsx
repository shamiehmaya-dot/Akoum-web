import { useCallback, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const MIN_WIDTH = 72;
const MAX_WIDTH = 260;
const COLLAPSE_AT = 140; // below this width the labels are hidden

const icons = {
  home: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9M9 20v-6h6v6" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  ),
  services: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" />
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h8" />
    </svg>
  ),
  tutors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.2a3.5 3.5 0 0 1 0 6.6M17 14a6 6 0 0 1 4.5 5.8" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  ),
  login: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 8l4 4-4 4M18 12H8" />
      <path d="M12 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
    </svg>
  ),
  settings: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
};

const items = [
  { id: "home", label: "Home", to: "/" },
  { id: "about", label: "About", to: "/about" },
  { id: "services", label: "Services", to: "/services" },
  { id: "tutors", label: "Tutors", to: "/tutors" },
  { id: "contact", label: "Contact", to: "/contact" },
  { id: "login", label: "Login", to: "/login" },
];

export default function Sidebar({ isAdmin = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [width, setWidth] = useState(MAX_WIDTH);
  const [dragging, setDragging] = useState(false);
  const sidebarRef = useRef(null);

  const collapsed = width < COLLAPSE_AT;
  const visibleItems = isAdmin
    ? [...items, { id: "admin", label: "Admin", to: "/admin" }]
    : items;

  const startResize = useCallback((e) => {
    e.preventDefault();
    setDragging(true);

    const left = sidebarRef.current.getBoundingClientRect().left;

    const onMove = (ev) => {
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, ev.clientX - left));
      setWidth(next);
    };
    const onUp = () => {
      setDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  const toggle = () =>
    setWidth((w) => (w <= MIN_WIDTH ? MAX_WIDTH : MIN_WIDTH));

  
return (
  <>
    <button
      className="mobile-menu-toggle"
      onClick={() => setMobileOpen(!mobileOpen)}
      aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={mobileOpen}
    >
      {mobileOpen ? "✕" : "☰"}
    </button>

    {mobileOpen && (
      <button
        className="sidebar-overlay"
        onClick={() => setMobileOpen(false)}
        aria-label="Close navigation menu"
      />
    )}

    <aside
      ref={sidebarRef}
      className={`sidebar ${collapsed ? "is-collapsed" : ""} ${
        dragging ? "is-dragging" : ""
      } ${mobileOpen ? "mobile-open" : ""}`}
      style={{ width }}
    >
      <div className="sidebar-inner">
        <header className="sidebar-header">
          <img
            src="/akoum-logo.png"
            alt="Akoum Tutoring Center"
            className="brand-logo"
          />
        </header>

        <nav>
          <ul>
            {visibleItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  end={item.id === "home"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `nav-btn ${isActive ? "active" : ""}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <span className="nav-icon">{icons[item.id]}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        className="handle"
        onPointerDown={startResize}
        onDoubleClick={toggle}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
      />
    </aside>
  </>
);

}
