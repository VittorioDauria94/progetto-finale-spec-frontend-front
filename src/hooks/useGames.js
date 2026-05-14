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

  // GET games
  async function getGames() {
    setIsLoading(true);
    setError("");

    try {
      const resp = await fetch(`${API_URL}/games`);

      if (!resp.ok) {
        throw new Error("Errore nel caricamento dei giochi");
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

    try {
      const resp = await fetch(`${API_URL}/games/${id}`);

      if (!resp.ok) {
        throw new Error("Errore nel caricamento del gioco");
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
        throw new Error("Errore nel caricamento dei giochi da confrontare");
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
  };
}
