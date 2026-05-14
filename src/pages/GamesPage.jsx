import useGames from "../hooks/useGames";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "../utils/debounce";
import { useGlobalContext } from "../context/GlobalContext";
import GamesTable from "../components/GamesTable";

export default function GamesPage() {
  const { games, isLoading, error } = useGames();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);
  const { isFavorite, toggleFavorite, isInCompare, toggleCompare } =
    useGlobalContext();
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    return [...new Set(games.map((game) => game.category))];
  }, [games]);

  const handleSearch = useCallback(
    debounce(function (value) {
      setSearchQuery(value.trim().toLowerCase());
    }, 500),
    [],
  );

  const handleSort = useCallback(
    function handleSort(field) {
      if (sortBy === field) {
        setSortOrder((prev) => prev * -1);
      } else {
        setSortBy(field);
        setSortOrder(1);
      }
    },
    [sortBy],
  );

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategory === "" || game.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]) * sortOrder;
    });
  }, [filteredGames, sortBy, sortOrder]);

  const handleSearchInputChange = useCallback(
    function handleSearchInputChange(e) {
      const value = e.target.value;

      setSearchInput(value);
      handleSearch(value);
    },
    [handleSearch],
  );

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
          onChange={handleSearchInputChange}
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
        <GamesTable
          games={sortedGames}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          isInCompare={isInCompare}
          toggleCompare={toggleCompare}
        />
      )}
    </section>
  );
}
