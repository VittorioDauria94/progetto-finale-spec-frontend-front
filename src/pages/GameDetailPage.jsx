import { Link } from "react-router-dom";
import useGames from "../hooks/useGames";
import NotFoundPage from "./NotFoundPage";

export default function GameDetailPage() {
  const { game, isLoading, error, notFound } = useGames();

  if (isLoading) {
    return <p>Loading game...</p>;
  }

  if (notFound) {
    return <NotFoundPage />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!game) {
    return <NotFoundPage />;
  }

  return (
    <section>
      <Link className="btn btn-outline-light mb-4" to="/games">
        Back to games
      </Link>

      <div className="app-card p-4">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-6">
            {game.image && (
              <img src={game.image} alt={game.title} className="game-image" />
            )}
          </div>

          <div className="col-12 col-lg-6">
            <span className="hero-badge mb-3">{game.category}</span>

            <h1 className="app-section-title mb-3">{game.title}</h1>

            {game.description && (
              <p className="app-section-subtitle fs-5">{game.description}</p>
            )}

            <div className="row g-3 mt-3">
              {game.platform && (
                <div className="col-12 col-md-6">
                  <div className="app-detail-box">
                    <span>Platform: </span>
                    <strong>{game.platform}</strong>
                  </div>
                </div>
              )}

              {game.developer && (
                <div className="col-12 col-md-6">
                  <div className="app-detail-box">
                    <span>Developer: </span>
                    <strong>{game.developer}</strong>
                  </div>
                </div>
              )}

              {game.releaseYear && (
                <div className="col-12 col-md-6">
                  <div className="app-detail-box">
                    <span>Release year: </span>
                    <strong>{game.releaseYear}</strong>
                  </div>
                </div>
              )}

              {game.price !== undefined && (
                <div className="col-12 col-md-6">
                  <div className="app-detail-box">
                    <span>Price: </span>
                    <strong>{game.price}€</strong>
                  </div>
                </div>
              )}

              {game.rating && (
                <div className="col-12 col-md-6">
                  <div className="app-detail-box">
                    <span>Rating: </span>
                    <strong>{game.rating}/10</strong>
                  </div>
                </div>
              )}

              {game.multiplayer !== undefined && (
                <div className="col-12 col-md-6">
                  <div className="app-detail-box">
                    <span>Multiplayer: </span>
                    <strong>{game.multiplayer ? "Yes" : "No"}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
