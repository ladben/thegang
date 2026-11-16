import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';
import LanguagePicker from './LanguagePicker/LanguagePicker';
import { appRoutes } from '../../../constants/appRoutes';

import './HomepageContent.css';
import HomepageHero from '../../../assets/graphics/Main_Icon.svg?react';

const HomepageContent = ({ isAnimating, isAnimated }) => {
  const { translate } = useLanguage();
  const { game, advanceRound } = useGame();
  const navigate = useNavigate();

  const { GAME_ROUTE } = appRoutes;

  return (
    <div className='homepage-content'>
      <div className='homepage-header'>
        <p className='homepage-subtitle'>The Cooperative Poker Game</p>
        <div className='homepage-title-outer-golden'>
          <div className='homepage-title-dark-border'>
            <p className='homepage-title'>The Gang</p>
          </div>
        </div>
      </div>
      <div className='homepage-graphics'>
        <HomepageHero />
      </div>
      <LanguagePicker />
      <div
        onClick={() => {
          if (game.round === 0) {
            advanceRound();
          }
          navigate(GAME_ROUTE);
        }}
        className='start-game-btn'
      >
        {!isAnimating &&
          !isAnimated &&
          translate(game.round === 0 ? 'start_game' : 'continue_game')}
        {(isAnimating || isAnimated) && translate('loading')}
      </div>
    </div>
  );
};

export default HomepageContent;
