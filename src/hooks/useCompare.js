import { useState } from "react";

const COMPARE_KEY = "compareGames";

function getStoredCompareGames() {
  const storedCompareGames = localStorage.getItem(COMPARE_KEY);

  if (storedCompareGames) {
    return JSON.parse(storedCompareGames);
  }

  return [];
}

export default function useCompare() {
  const [compareGames, setCompareGames] = useState(getStoredCompareGames);

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

    if (compareGames.length >= 2) {
      alert("You can compare only 2 games at a time.");
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

  return {
    compareGames,
    isInCompare,
    addCompare,
    removeCompare,
    toggleCompare,
    clearCompare,
  };
}
