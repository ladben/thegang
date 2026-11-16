import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { cards } from '../assets/cards';

const GameContext = createContext(null);

const challengeCards = cards['en-EN'].challenge.cards.map(
  (card) => card.number,
);
const specialistCards = cards['en-EN'].specialist.cards.map(
  (card) => card.number,
);

const STORAGE_KEY = 'use-game';
const DEFAULT_GAME = {
  round: 1,
  challenge: {
    available: challengeCards,
    drawn: [],
    discarded: [],
  },
  specialist: {
    available: specialistCards,
    drawn: [],
    discarded: [],
  },
};

export function GameProvider({ children }) {
  // Lazy initializer reads localStorage only once on initial mount
  const [game, setGameState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GAME));
    return DEFAULT_GAME;
  });

  // Wrapper keeps React state and localStorage in sync together
  const setGame = (newGameSetterCallback) => {
    const newGame = newGameSetterCallback({ ...game });
    setGameState(newGame);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGame));
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        setGameState(event.newValue || DEFAULT_GAME);
      } else if (event.key === null) {
        setGameState(DEFAULT_DEFAULTGAME);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const popRandom = (arr) => {
    if (arr.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr.splice(randomIndex, 1)[0];
  };

  // draw helper with fallback and simple {{variable}} replacement
  const draw = useCallback(
    (cardType) => {
      const newAvailable = [...game[cardType].available];
      const drawn = popRandom(newAvailable);
      if (!drawn) {
        throw new Error('Cannot draw from empty deck');
      }
      const newDrawn = [...game[cardType].drawn, drawn];

      setGame((prevGame) => {
        return {
          ...prevGame,
          [cardType]: {
            ...prevGame[cardType],
            available: newAvailable,
            drawn: newDrawn,
          },
        };
      });
    },
    [game],
  );

  return (
    <GameContext.Provider value={{ game, setGame, draw }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for easy reading/writing from any component
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside a GameProvider');
  }
  return context;
}
