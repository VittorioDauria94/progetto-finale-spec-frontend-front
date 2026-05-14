import { Link } from "react-router-dom";
import useGames from "../hooks/useGames";
import { useState } from "react";

export default function GamesPage() {
  const { games, isLoading, error } = useGames();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(games.map((game) => game.category))];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === "" || game.category === selectedCategory;

    return matchesSearch && matchesCategory;
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {filteredGames.length === 0 && (
        <p className="text-secondary">No games found.</p>
      )}

      <div className="row g-4">
        {filteredGames.map((game) => (
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
