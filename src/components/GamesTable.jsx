import GamesTableRow from "./GamesTableRow";
import { memo } from "react";

export default memo(function GamesTable({
  games,
  sortBy,
  sortOrder,
  onSort,
  isFavorite,
  toggleFavorite,
  isInCompare,
  toggleCompare,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle app-table mb-0">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none fw-bold app-sort-btn"
                onClick={() => onSort("title")}
              >
                Title {sortBy === "title" && (sortOrder === 1 ? "A-Z" : "Z-A")}
              </button>
            </th>

            <th>
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none fw-bold app-sort-btn"
                onClick={() => onSort("category")}
              >
                Category{" "}
                {sortBy === "category" && (sortOrder === 1 ? "A-Z" : "Z-A")}
              </button>
            </th>

            <th className="text-center" style={{ width: "100px" }}>
              Favorite
            </th>
            <th className="text-center" style={{ width: "130px" }}>
              Compare
            </th>
            <th className="text-end" style={{ width: "100px" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {games.map((game) => (
            <GamesTableRow
              key={game.id}
              game={game}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              isInCompare={isInCompare}
              toggleCompare={toggleCompare}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
