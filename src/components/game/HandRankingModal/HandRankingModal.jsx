import { useEffect, useRef, useState } from 'react';
import XIcon from '../../../assets/icons/x_icon.svg?react';
import HandRanking from '../../../assets/graphics/Hand_Ranking.svg?react';

import './HandRankingModal.css';

const HandRankingModal = ({ isOpen, toggleHandRanking }) => {
  const ANIMATION_DURATION = 1000;
  const modalStyle = {
    '--animation-duration': `${ANIMATION_DURATION}ms`,
    '--animation-duration-2': `${ANIMATION_DURATION / 2}ms`,
  };

  return (
    <div is-open={isOpen ? '' : null} className='handmodal' style={modalStyle}>
      <div className='handmodal-backdrop'></div>
      <div className='handmodal-content'>
        <div
          onClick={() => {
            toggleHandRanking((prevState) => {
              const newState = !prevState;
              return newState;
            });
          }}
          className='svg-wrapper close-modal'
        >
          <XIcon />
        </div>
        <div className='handmodal-graphics'>
          <div className='svg-wrapper ranking-graphics'>
            <HandRanking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandRankingModal;
