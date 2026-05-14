import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="py-5">
      <div className="row align-items-center g-5">
        <div className="col-12 col-lg-7">
          <span className="hero-badge mb-3">Final React Project</span>

          <h1 className="display-3 app-section-title mb-3">
            Discover, save and compare your next favorite game.
          </h1>

          <p className="app-section-subtitle fs-5 mb-4">
            Ludexira helps you browse videogames, filter them by category, save
            your favorites and compare their details side by side.
          </p>

          <div className="d-flex gap-3 flex-wrap">
            <Link className="btn btn-primary btn-lg" to="/games">
              Browse games
            </Link>

            <Link className="btn btn-outline-light btn-lg" to="/compare">
              Compare games
            </Link>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="app-card p-4">
            <h2 className="h4 mb-4">What you can do</h2>

            <div className="d-grid gap-3">
              <div className="p-3 rounded-4 bg-dark border border-secondary">
                <strong>Search</strong>
                <p className="app-card-muted mb-0">
                  Find games quickly by title.
                </p>
              </div>

              <div className="p-3 rounded-4 bg-dark border border-secondary">
                <strong>Save favorites</strong>
                <p className="app-card-muted mb-0">
                  Keep your favorite games available after refresh.
                </p>
              </div>

              <div className="p-3 rounded-4 bg-dark border border-secondary">
                <strong>Compare</strong>
                <p className="app-card-muted mb-0">
                  Compare multiple games side by side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
