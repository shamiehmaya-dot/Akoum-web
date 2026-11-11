import { Link } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="home">
            {children}

            <footer className="footer">
                <span>© {new Date().getFullYear()} AKOUM Tutoring Center</span>
                <nav>
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </footer>
        </div>
    );
}