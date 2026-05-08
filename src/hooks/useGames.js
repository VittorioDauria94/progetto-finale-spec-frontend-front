import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useGames() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    getGames();
  }, []);

  return {
    games,
    isLoading,
    error,
    getGames,
  };
}
