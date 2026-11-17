import { useEffect, useRef, useState } from 'react';
import GameHeader from './GameHeader/GameHeader';
import Progress from './Progress/Progress';
import Controls from './Controls/Controls';
import FlipCard from './FlipCard/FlipCard';

import './Game.css';

const Game = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const timeoutRef = useRef(null);

  const ANIMATION_DURATION = 2000;

  useEffect(() => {
    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setIsAnimated(true);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
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
      <GameHeader />
      <main>
        <div className='controls-and-progress'>
          <Progress />
          <Controls />
        </div>
        <FlipCard isAnimating={isAnimating} isAnimated={isAnimated} />
      </main>
    </div>
  );
};

export default Game;
