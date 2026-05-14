import { Link } from "react-router-dom";
import useCompare from "../hooks/useCompare";
import useGames from "../hooks/useGames";

export default function ComparePage() {
  const { compareGames, removeCompare, clearCompare } = useCompare();
  const { gamesDetails, isLoading, error } = useGames(compareGames);

  if (isLoading) {
    return <p>Loading compare...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <section>
      <div className="mb-4">
        <h1>Compare</h1>
        <p className="text-secondary">
          Select 2 games from the games list and compare their details.
        </p>
      </div>

      {compareGames.length === 0 && (
        <div>
          <p className="text-secondary">No games selected for comparison.</p>

          <Link className="btn btn-primary" to="/games">
            Go to games
          </Link>
        </div>
      )}

      {compareGames.length === 1 && (
        <div>
          <p className="text-secondary">
            Select one more game to start the comparison.
          </p>

          <Link className="btn btn-primary" to="/games">
            Add another game
          </Link>
        </div>
      )}

      {gamesDetails.length === 2 && (
        <>
          <div className="mb-3 d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={clearCompare}
            >
              Clear comparison
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead>
                <tr>
                  <th>Title</th>

                  {gamesDetails.map((game) => (
                    <th key={game.id}>
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <span>{game.title}</span>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeCompare(game.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Image</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>
                      {game.image && (
                        <img
                          src={game.image}
                          alt={game.title}
                          className="img-fluid"
                        />
                      )}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Category</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.category}</td>
                  ))}
                </tr>

                <tr>
                  <td>Platform</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.platform}</td>
                  ))}
                </tr>

                <tr>
                  <td>Developer</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.developer}</td>
                  ))}
                </tr>

                <tr>
                  <td>Release year</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.releaseYear}</td>
                  ))}
                </tr>

                <tr>
                  <td>Price</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.price}€</td>
                  ))}
                </tr>

                <tr>
                  <td>Rating</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.rating}/10</td>
                  ))}
                </tr>

                <tr>
                  <td>Multiplayer</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.multiplayer ? "Yes" : "No"}</td>
                  ))}
                </tr>

                <tr>
                  <td>Description</td>
                  {gamesDetails.map((game) => (
                    <td key={game.id}>{game.description}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
