import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="py-5">
      <div
        className="app-card p-5 text-center mx-auto"
        style={{ maxWidth: "720px" }}
      >
        <span className="hero-badge mb-4">404</span>

        <h1 className="app-section-title display-4 mb-3">Page not found</h1>

        <p className="app-section-subtitle fs-5 mb-4">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link className="btn btn-primary btn-lg" to="/">
            Back to home
          </Link>

          <Link className="btn btn-outline-light btn-lg" to="/games">
            Browse games
          </Link>
        </div>
      </div>
    </section>
  );
}
