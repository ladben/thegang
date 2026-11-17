import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
const SCHEMA_VERSION = 5;
const DEFAULT_GAME = {
  version: SCHEMA_VERSION,
  round: 0,
  cardSequence: [{ type: 'cover' }, { type: 'cover' }],
  maxValues: {
    lost: 3,
    won: 5,
  },
  progress: {
    lost: 0,
    won: 0,
  },
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

const popRandom = (arr) => {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr.splice(randomIndex, 1)[0];
};

export function GameProvider({ children }) {
  const [game, setGameState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.version === SCHEMA_VERSION) {
          return parsed;
        }
      }
    } catch {
      // Fallback if localStorage contains corrupted JSON
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GAME));
    return DEFAULT_GAME;
  });

  // Uses functional state updater so rapid calls never read stale state
  const setGame = useCallback((updater) => {
    setGameState((prevGame) => {
      const nextGame =
        typeof updater === 'function' ? updater(prevGame) : updater;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextGame));
      return nextGame;
    });
  }, []);

  const cleanTimeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(cleanTimeoutRef.current);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        try {
          setGameState(
            event.newValue ? JSON.parse(event.newValue) : DEFAULT_GAME,
          );
        } catch {
          setGameState(DEFAULT_GAME);
        }
      } else if (event.key === null) {
        setGameState(DEFAULT_GAME);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const draw = useCallback(
    (cardType) => {
      setGame((prevGame) => {
        if (
          prevGame.progress.won >= prevGame.maxValues.won ||
          prevGame.progress.lost >= prevGame.maxValues.lost
        ) {
          return prevGame;
        }

        const deck = prevGame[cardType];
        if (!deck || deck.available.length === 0) return prevGame;

        const newAvailable = [...deck.available];
        const drawnCard = popRandom(newAvailable);

        return {
          ...prevGame,
          cardSequence: [
            ...(prevGame.cardSequence || []),
            { type: cardType, number: drawnCard },
          ],
          [cardType]: {
            ...deck,
            available: newAvailable,
            drawn: [...deck.drawn, drawnCard],
          },
        };
      });
    },
    [setGame],
  );

  const discardLast = useCallback(() => {
    setGame((prevGame) => {
      if (
        prevGame.progress.won >= prevGame.maxValues.won ||
        prevGame.progress.lost >= prevGame.maxValues.lost
      ) {
        return prevGame;
      }

      const sequence = prevGame.cardSequence || [];
      if (sequence.length === 0) return prevGame;

      const lastIndex = sequence.length - 1;
      const lastCard = sequence[lastIndex];
      const cardType = lastCard.type;
      const deck = prevGame[cardType];

      if (!deck) return prevGame;

      const maxVal =
        cardType === 'challenge'
          ? prevGame.maxValues.won
          : prevGame.maxValues.lost;
      const currVal =
        cardType === 'challenge'
          ? prevGame.progress.won
          : prevGame.progress.lost;

      if (deck.available.length <= maxVal - currVal - 1) return prevGame;

      // 1. Mark the last card in cardSequence as discarded (immutably)
      const updatedSequence = sequence.map((item, idx) =>
        idx === lastIndex ? { ...item, discarded: true } : item,
      );

      // 2. Remove the discarded card's number from drawn and add it to discarded
      const updatedDrawn = deck.drawn.filter((num) => num !== lastCard.number);
      const updatedDiscarded = [...deck.discarded, lastCard.number];

      // 3. Draw a new card of the same type if any remain available
      const newAvailable = [...deck.available];
      const drawnCard = popRandom(newAvailable);

      const finalSequence =
        drawnCard !== undefined
          ? [...updatedSequence, { type: cardType, number: drawnCard }]
          : updatedSequence;

      const finalDrawn =
        drawnCard !== undefined ? [...updatedDrawn, drawnCard] : updatedDrawn;

      return {
        ...prevGame,
        cardSequence: finalSequence,
        [cardType]: {
          ...deck,
          available: newAvailable,
          drawn: finalDrawn,
          discarded: updatedDiscarded,
        },
      };
    });
  }, [setGame]);

  const gameResult =
    game.progress.won >= game.maxValues.won
      ? 'won'
      : game.progress.lost >= game.maxValues.lost
        ? 'lost'
        : null;

  const canDiscard = {
    specialist:
      Math.max(game.maxValues.lost - game.progress.lost - 1, 0) <
      game.specialist.available.length,
    challenge:
      Math.max(game.maxValues.won - game.progress.won - 1, 0) <
      game.challenge.available.length,
  };

  const advanceRound = useCallback(
    ({ step = 1, roundResult = '' } = {}) => {
      setGame((prevGame) => {
        // Prevent further updates if the game has already ended
        if (
          prevGame.progress.won >= prevGame.maxValues.won ||
          prevGame.progress.lost >= prevGame.maxValues.lost
        ) {
          return prevGame;
        }

        const newProgressLost =
          roundResult === 'lost'
            ? prevGame.progress.lost + 1
            : prevGame.progress.lost;
        const newProgressWon =
          roundResult === 'won'
            ? prevGame.progress.won + 1
            : prevGame.progress.won;

        const newRound = prevGame.round + step;

        return {
          ...prevGame,
          round: newRound,
          progress: {
            lost: newProgressLost,
            won: newProgressWon,
          },
        };
      });
    },
    [setGame],
  );

  const clean = useCallback(
    (delay = 0) => {
      clearTimeout(cleanTimeoutRef.current);

      if (delay > 0) {
        cleanTimeoutRef.current = setTimeout(() => {
          setGame(DEFAULT_GAME);
        }, delay);
      } else {
        setGame(DEFAULT_GAME);
      }
    },
    [setGame],
  );

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        draw,
        advanceRound,
        clean,
        discardLast,
        gameResult,
        canDiscard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside a GameProvider');
  }
  return context;
}
