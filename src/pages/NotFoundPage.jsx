import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Page not found.</p>

      <Link className="btn btn-primary" to="/">
        Back to home
      </Link>
    </section>
  );
}
