import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <section>
      <div className="mb-4">
        <h1>Favorites</h1>
        <p className="text-secondary">Your favorite games.</p>
      </div>

      {favorites.length === 0 && (
        <p className="text-secondary">You have no favorite games yet.</p>
      )}

      <div className="row g-4">
        {favorites.map((game) => (
          <div key={game.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>

                <p className="card-text text-secondary">{game.category}</p>

                <div className="d-flex gap-2">
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/games/${game.id}`}
                  >
                    Details
                  </Link>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFavorite(game.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
