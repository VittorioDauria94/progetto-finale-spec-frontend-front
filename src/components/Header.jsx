import { NavLink } from "react-router-dom";
import navLinks from "../data/navLinks";

export default function Header() {
  return (
    <header className="border-bottom">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            Ludexira
          </NavLink>

          <div className="d-flex gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                className={({ isActive }) =>
                  isActive ? "nav-link fw-bold text-primary" : "nav-link"
                }
                to={link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
