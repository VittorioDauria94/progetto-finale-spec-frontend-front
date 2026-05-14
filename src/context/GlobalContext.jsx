import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const FAVORITES_KEY = "favoriteGames";
const COMPARE_KEY = "compareGames";

function getStoredFavorites() {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);

  if (storedFavorites) {
    return JSON.parse(storedFavorites);
  }

  return [];
}

function getStoredCompareGames() {
  const storedCompareGames = localStorage.getItem(COMPARE_KEY);

  if (storedCompareGames) {
    return JSON.parse(storedCompareGames);
  }

  return [];
}

export function GlobalProvider({ children }) {
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [compareGames, setCompareGames] = useState(getStoredCompareGames);

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

  function saveCompareGames(nextCompareGames) {
    setCompareGames(nextCompareGames);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(nextCompareGames));
  }

  function isInCompare(id) {
    return compareGames.some((game) => game.id === id);
  }

  function addCompare(game) {
    if (isInCompare(game.id)) {
      return;
    }

    saveCompareGames([...compareGames, game]);
  }

  function removeCompare(id) {
    const nextCompareGames = compareGames.filter((game) => game.id !== id);

    saveCompareGames(nextCompareGames);
  }

  function toggleCompare(game) {
    if (isInCompare(game.id)) {
      removeCompare(game.id);
    } else {
      addCompare(game);
    }
  }

  function clearCompare() {
    saveCompareGames([]);
  }

  return (
    <GlobalContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        compareGames,
        isInCompare,
        addCompare,
        removeCompare,
        toggleCompare,
        clearCompare,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
