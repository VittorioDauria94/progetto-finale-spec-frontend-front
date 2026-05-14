import { useState } from "react";

const FAVORITES_KEY = "favoriteGames";

function getStoredFavorites() {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);

  if (storedFavorites) {
    return JSON.parse(storedFavorites);
  }

  return [];
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(getStoredFavorites);

  function saveFavorites(nextFavorites) {
    setFavorites(nextFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
  }

  function isFavorite(id) {
    return favorites.some((game) => game.id === id);
  }

  function addFavorite(game) {
    if (isFavorite(game.id)) {
      return;
    }

    saveFavorites([...favorites, game]);
  }

  function removeFavorite(id) {
    const nextFavorites = favorites.filter((game) => game.id !== id);

    saveFavorites(nextFavorites);
  }

  function toggleFavorite(game) {
    if (isFavorite(game.id)) {
      removeFavorite(game.id);
    } else {
      addFavorite(game);
    }
  }

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
