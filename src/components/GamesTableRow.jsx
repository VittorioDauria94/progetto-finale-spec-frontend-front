import { Link } from "react-router-dom";
import { memo } from "react";

export default memo(function GamesTableRow({
  game,
  isFavorite,
  toggleFavorite,
  isInCompare,
  toggleCompare,
}) {
  return (
    <tr>
      <td>{game.title}</td>
      <td>{game.category}</td>

      <td>
        <button
          type="button"
          className={`btn btn-sm ${
            isFavorite(game.id) ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => toggleFavorite(game)}
        >
          {isFavorite(game.id) ? "★" : "☆"}
        </button>
      </td>

      <td>
        <button
          type="button"
          className={`btn btn-sm ${
            isInCompare(game.id) ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => toggleCompare(game)}
        >
          {isInCompare(game.id) ? "Added" : "Compare"}
        </button>
      </td>

      <td>
        <Link className="btn btn-primary btn-sm" to={`/games/${game.id}`}>
          Details
        </Link>
      </td>
    </tr>
  );
});
