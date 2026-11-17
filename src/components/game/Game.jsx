import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';
import GameHeader from './GameHeader/GameHeader';
import Progress from './Progress/Progress';
import Controls from './Controls/Controls';
import FlipCard from './FlipCard/FlipCard';
import EndModal from './EndModal/EndModal';
import HandRankingModal from './HandRankingModal/HandRankingModal';

import './Game.css';

const Game = () => {
  const { gameResult } = useGame();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHandRankingModalOpen, setIsHandRankingModalOpen] = useState(false);

  const timeoutRef = useRef(null);

  const ANIMATION_DURATION = 1500;

  useEffect(() => {
    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setIsAnimated(true);
      setIsAnimating(false);
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const wrapperStyle = {
    '--animation-duration': `${ANIMATION_DURATION}ms`,
    '--animation-duration-2': `${ANIMATION_DURATION / 2}ms`,
    '--animation-duration-4': `${ANIMATION_DURATION / 4}ms`,
  };

  return (
    <div
      className='content-wrapper'
      game-animating={isAnimating ? '' : null}
      game-animated={isAnimated ? '' : null}
      style={wrapperStyle}
    >
      <GameHeader toggleHandRanking={setIsHandRankingModalOpen} />
      <main>
        <div className='controls-and-progress'>
          <Progress />
          <Controls />
        </div>
        <FlipCard isAnimating={isAnimating} isAnimated={isAnimated} />
      </main>
      <HandRankingModal
        isOpen={isHandRankingModalOpen}
        toggleHandRanking={setIsHandRankingModalOpen}
      />
      {gameResult && <EndModal result={gameResult} />}
    </div>
  );
};

export default Game;
