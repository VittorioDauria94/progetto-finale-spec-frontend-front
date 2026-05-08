import { Link } from "react-router-dom";
import useGames from "../hooks/useGames";

export default function GameDetailPage() {
  const { game, isLoading, error } = useGames();
  
  if (isLoading) {
    return <p>Loading game...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  return (
    <section>
      <Link className="btn btn-outline-secondary mb-4" to="/games">
        Back to games
      </Link>

      <h1>{game.title}</h1>
      <p className="text-secondary">{game.category}</p>

      {game.image && (
        <img src={game.image} alt={game.title} className="img-fluid mb-4" />
      )}

      {game.description && <p>{game.description}</p>}

      <ul className="list-group">
        {game.platform && (
          <li className="list-group-item">
            <strong>Platform:</strong> {game.platform}
          </li>
        )}

        {game.developer && (
          <li className="list-group-item">
            <strong>Developer:</strong> {game.developer}
          </li>
        )}

        {game.releaseYear && (
          <li className="list-group-item">
            <strong>Release year:</strong> {game.releaseYear}
          </li>
        )}

        {game.price !== undefined && (
          <li className="list-group-item">
            <strong>Price:</strong> {game.price}€
          </li>
        )}

        {game.rating && (
          <li className="list-group-item">
            <strong>Rating:</strong> {game.rating}/10
          </li>
        )}

        {game.multiplayer !== undefined && (
          <li className="list-group-item">
            <strong>Multiplayer:</strong> {game.multiplayer ? "Yes" : "No"}
          </li>
        )}
      </ul>
    </section>
  );
}
