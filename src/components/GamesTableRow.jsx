import { Link } from "react-router-dom";
import { memo } from "react";

export default memo(function GamesTableRow({
  game,
  isFavorite,
  toggleFavorite,
  isInCompare,
  toggleCompare,
}) {
  const favorite = isFavorite(game.id);
  const inCompare = isInCompare(game.id);

  return (
    <tr>
      <td>
        <strong>{game.title}</strong>
      </td>

      <td>
        <span className="badge rounded-pill text-bg-dark border border-secondary">
          {game.category}
        </span>
      </td>

      <td className="text-center">
        <button
          type="button"
          className={`btn btn-sm ${favorite ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => toggleFavorite(game)}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </td>

      <td className="text-center">
        <button
          type="button"
          className={`btn btn-sm ${
            inCompare ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => toggleCompare(game)}
          aria-label={inCompare ? "Remove from compare" : "Add to compare"}
        >
          {inCompare ? "Added" : "Compare"}
        </button>
      </td>

      <td className="text-end">
        <Link className="btn btn-primary btn-sm" to={`/games/${game.id}`}>
          Details
        </Link>
      </td>
    </tr>
  );
});
