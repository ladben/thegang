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
          advanceRound({ roundResult: 'lost' });
          draw('specialist');
        }}
      >
        {translate('gameControlButton.defeat')}
      </div>
      <div
        className='game-control victory'
        onClick={() => {
          advanceRound({ roundResult: 'won' });
          draw('challenge');
        }}
      >
        {translate('gameControlButton.victory')}
      </div>
    </div>
  );
};

export default Controls;
