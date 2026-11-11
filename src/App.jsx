import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./compents/Sidebar.jsx";
import Layout from "./compents/Layout.jsx";
import Admin from "./Page/Admin.jsx";
import About from "./Page/About.jsx";
import Contact from "./Page/Contact.jsx";
import Home from "./Page/Home.jsx";
import Services from "./Page/Services.jsx";
import Tutors from "./Page/Tutors.jsx";

function NotFound() {
  return (
    <section className="panel glass not-found">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </section>
  );
}

function Login({ onLogin }) {
  const navigate = useNavigate();

  return (
    <section className="panel glass login-page">
      <span className="pill">Admin demo access</span>
      <h1>Login</h1>
      <p>Enter any username and password to preview the admin dashboard.</p>
      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          onLogin();
          navigate("/admin");
        }}
      >
        <label htmlFor="login-username">Username</label>
        <input id="login-username" name="username" type="text" autoComplete="username" required />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" name="password" type="password" autoComplete="current-password" required />
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
      <p className="login-demo-notice">
        Demo only: this form does not verify credentials or protect real data.
      </p>
    </section>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(
    () => window.sessionStorage.getItem("akoum-demo-admin") === "true",
  );

  useEffect(() => {
    const loader = document.getElementById("startup-loader");
    if (!loader) return undefined;

    const hideTimer = window.setTimeout(() => {
      loader.classList.add("is-hidden");
      window.setTimeout(() => loader.remove(), 400);
    }, 550);

    return () => window.clearTimeout(hideTimer);
  }, []);

  const handleLogin = () => {
    window.sessionStorage.setItem("akoum-demo-admin", "true");
    setIsAdmin(true);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem("akoum-demo-admin");
    setIsAdmin(false);
  };

  return (
    <div className="app">
      <Sidebar isAdmin={isAdmin} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Layout><Login onLogin={handleLogin} /></Layout>} />
          <Route
            path="/admin"
            element={
              isAdmin
                ? <Layout><Admin onLogout={handleLogout} /></Layout>
                : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </main>
    </div>
  );
}
