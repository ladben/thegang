import { useGame } from '../../../context/GameContext';
import { useLanguage } from '../../../context/LanguageContext';

import './Controls.css';

const Controls = () => {
  const { draw, advanceRound } = useGame();
  const { translate } = useLanguage();

  return (
    <div className='game-controls'>
      <div
        className='game-control defeat'
        onClick={() => {
          draw('specialist');
          advanceRound({ roundResult: 'lost' });
        }}
      >
        {translate('gameControlButton.defeat')}
      </div>
      <div
        className='game-control victory'
        onClick={() => {
          draw('challenge');
          advanceRound({ roundResult: 'won' });
        }}
      >
        {translate('gameControlButton.victory')}
      </div>
    </div>
  );
};

export default Controls;
