import XIcon from '../../../assets/icons/x_icon.svg?react';
import { useHandRanking } from '../../../hooks/useHandRanking';

import './HandRankingModal.css';

const HandRankingModal = ({ isOpen, toggleHandRanking }) => {
  const HandRankingSvg = useHandRanking();

  const ANIMATION_DURATION = 1000;
  const modalStyle = {
    '--animation-duration': `${ANIMATION_DURATION}ms`,
    '--animation-duration-2': `${ANIMATION_DURATION / 2}ms`,
  };

  return (
    <div is-open={isOpen ? '' : null} className='handmodal' style={modalStyle}>
      <div
        className='handmodal-backdrop'
        onClick={() => {
          toggleHandRanking((prevState) => {
            const newState = !prevState;
            return newState;
          });
        }}
      ></div>
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
            <HandRankingSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandRankingModal;
