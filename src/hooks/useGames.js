import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function useGames(compareGames = null) {
  const { id } = useParams();

  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [gamesDetails, setGamesDetails] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // GET games
  async function getGames() {
    setIsLoading(true);
    setError("");

    try {
      const resp = await fetch(`${API_URL}/games`);

      if (!resp.ok) {
        throw new Error("Failed to load games");
      }

      const data = await resp.json();

      setGames(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // GET single game
  async function getGame() {
    setIsLoading(true);
    setError("");
    setNotFound(false);

    try {
      const resp = await fetch(`${API_URL}/games/${id}`);

      if (resp.status === 404) {
        setGame(null);
        setNotFound(true);
        return;
      }

      if (!resp.ok) {
        throw new Error("Failed to load game");
      }

      const data = await resp.json();

      setGame(data.game);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // GET compare games details
  async function getCompareGamesDetails() {
    setIsLoading(true);
    setError("");

    try {
      const requests = compareGames.map((game) =>
        fetch(`${API_URL}/games/${game.id}`),
      );

      const responses = await Promise.all(requests);

      if (responses.some((resp) => !resp.ok)) {
        throw new Error("Failed to load games comparison");
      }

      const data = await Promise.all(responses.map((resp) => resp.json()));

      setGamesDetails(data.map((item) => item.game));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getGame();
    } else if (compareGames) {
      if (compareGames.length > 0) {
        getCompareGamesDetails();
      } else {
        setGamesDetails([]);
        setIsLoading(false);
      }
    } else {
      getGames();
    }
  }, [id, compareGames]);

  return {
    games,
    game,
    gamesDetails,
    isLoading,
    error,
    notFound,
  };
}
