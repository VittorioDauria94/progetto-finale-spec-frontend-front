import { Link } from "react-router-dom";
import useGames from "../hooks/useGames";

export default function GamesPage() {
  const { games, isLoading, error } = useGames();

  if (isLoading) {
    return <p>Loading games...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <section>
      <div className="mb-4">
        <h1>Games</h1>
        <p className="text-secondary">
          Browse, search and compare your favorite videogames.
        </p>
      </div>

      <div className="row g-4">
        {games.map((game) => (
          <div key={game.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>

                <p className="card-text text-secondary">{game.category}</p>

                <Link className="btn btn-primary" to={`/games/${game.id}`}>
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
