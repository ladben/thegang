import { useGame } from '../../../context/GameContext';
import Homepage from '../../homepage/Homepage';
import GameCard from './GameCard';

import './FlipCard.css';

const FlipCard = ({ isAnimating, isAnimated }) => {
  const { game } = useGame();
  const cardStyle = {
    width: '100%',
    height: '100%',
    background: 'white',
    borderRadius: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const getSide = (side, sequence) => {
    // last odd index is side B
    const l = sequence.length;
    const isEvenLength = l % 2 === 0;
    if (side === 'a') {
      // last even index is side A
      if (isEvenLength) {
        return sequence[l - 1];
      } else {
        return sequence[l - 2];
      }
    }

    if (side === 'b') {
      // last odd index is side B
      if (!isEvenLength) {
        return sequence[l - 1];
      } else {
        return sequence[l - 2];
      }
    }
  };

  const renderCard = (card) => {
    if (card.type === 'cover') {
      return <Homepage isAnimating={isAnimating} isAnimated={isAnimated} />;
    } else {
      return <GameCard gameCard={card} />;
    }
  };

  return (
    <div className='flip-card-scene'>
      <div
        className='flip-card-inner'
        style={{
          transform: `rotateY(${(game.cardSequence.length - 2) * -180}deg)`,
        }}
      >
        <div
          className='flip-card-face'
          inactive={game.cardSequence.length % 2 === 0 ? null : ''}
        >
          {renderCard(getSide('a', game.cardSequence))}
        </div>
        <div
          className='flip-card-face flip-card-back'
          inactive={game.cardSequence.length % 2 === 0 ? '' : null}
        >
          {renderCard(getSide('b', game.cardSequence))}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
