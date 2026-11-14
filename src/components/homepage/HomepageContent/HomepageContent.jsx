import LanguagePicker from './LanguagePicker/LanguagePicker';
import { useLanguage } from '../../../context/LanguageContext';

import './HomepageContent.css';
import HomepageHero from '../../../assets/graphics/Main_Icon.svg?react';

const HomepageContent = () => {
  const { translate } = useLanguage();
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
          alert('START');
        }}
        className='start-game-btn'
      >
        {translate('start_game')}
      </div>
    </div>
  );
};

export default HomepageContent;
