import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section>
      <h1>GameVault</h1>
      <p>Browse, search, compare and save your favorite videogames.</p>

      <Link className="btn btn-primary" to="/games">
        Browse games
      </Link>
    </section>
  );
}
