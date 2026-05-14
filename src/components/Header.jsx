import { Link, NavLink } from "react-router-dom";
import navLinks from "../data/navLinks";

export default function Header() {
  return (
    <header className="app-navbar sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container py-2">
          <Link className="navbar-brand app-brand fw-bold fs-4" to="/">
            Ludexira
          </Link>

          <button
            className="navbar-toggler border-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto gap-lg-3">
              {navLinks.map((link) => (
                <li key={link.id} className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link app-nav-link active"
                        : "nav-link app-nav-link"
                    }
                    to={link.path}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
