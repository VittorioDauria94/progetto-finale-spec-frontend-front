import { Link } from "react-router-dom";
import useGames from "../hooks/useGames";
import { useCallback, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import useCompare from "../hooks/useCompare";
import { debounce } from "../utils/debounce";

export default function GamesPage() {
  const { games, isLoading, error } = useGames();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare } = useCompare();
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [...new Set(games.map((game) => game.category))];

  const handleSearch = useCallback(
    debounce(function (value) {
      setSearchQuery(value.trim().toLowerCase());
    }, 500),
    [],
  );

  function handleSort(field) {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  }

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery);

    const matchesCategory =
      selectedCategory === "" || game.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    return a[sortBy].localeCompare(b[sortBy]) * sortOrder;
  });

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

      <form
        role="search"
        className="mb-4 d-flex gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search by title"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch(e.target.value);
          }}
        />

        <select
          name="category"
          id="category"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>

      {sortedGames.length === 0 ? (
        <p className="text-secondary">No games found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>
                  <button
                    className="btn btn-link p-0 text-decoration-none fw-bold"
                    type="button"
                    onClick={() => handleSort("title")}
                  >
                    Title{" "}
                    {sortBy === "title" && (sortOrder === 1 ? "A-Z" : "Z-A")}
                  </button>
                </th>

                <th>
                  <button
                    className="btn btn-link p-0 text-decoration-none fw-bold"
                    type="button"
                    onClick={() => handleSort("category")}
                  >
                    Category{" "}
                    {sortBy === "category" && (sortOrder === 1 ? "A-Z" : "Z-A")}
                  </button>
                </th>

                <th>Actions</th>
                <th>Favorite</th>
                <th>Compare</th>
              </tr>
            </thead>

            <tbody>
              {sortedGames.map((game) => (
                <tr key={game.id}>
                  <td>{game.title}</td>
                  <td>{game.category}</td>
                  <td>
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/games/${game.id}`}
                    >
                      Details
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`btn btn-sm ${
                        isFavorite(game.id)
                          ? "btn-warning"
                          : "btn-outline-warning"
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
                        isInCompare(game.id)
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => toggleCompare(game)}
                    >
                      {isInCompare(game.id) ? "Added" : "Compare"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
