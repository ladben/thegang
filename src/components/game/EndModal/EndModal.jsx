import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import GoldIcon from '../../../assets/icons/gold.svg?react';
import AlarmIcon from '../../../assets/icons/alarm.svg?react';

import './EndModal.css';

const EndModal = ({ result }) => {
  const { translate } = useLanguage();
  const { game, clean } = useGame();
  const navigate = useNavigate();

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const timeoutRef = useRef(null);
  const ANIMATION_DURATION = 1000;
  const modalStyle = {
    '--animation-duration': `${ANIMATION_DURATION}ms`,
    '--animation-duration-2': `${ANIMATION_DURATION / 2}ms`,
  };

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

  const isWon = result === 'won';
  return (
    <div
      className='endmodal'
      game-result={result}
      style={modalStyle}
      modal-animating={isAnimating ? '' : null}
      modal-animated={isAnimated ? '' : null}
    >
      <div className='endmodal-backdrop'></div>
      <div className='endmodal-content-wrapper'>
        <div className='endmodal-content'>
          <div className='svg-wrapper'>
            {isWon ? <GoldIcon /> : <AlarmIcon />}
          </div>
          <div className='endmodal-text'>
            <h3>{translate(`endResult.${result}.title`)}</h3>
            <p>{translate(`endResult.${result}.text`)}</p>
          </div>
          <div className='endmodal-controls'>
            <div className='endmodal-game-result'>
              <div className='endmodal-game-result-text alarms'>
                <p>{translate('endResult.alarms')}</p>
                <p className='alarm-count'>
                  {game.progress.lost} / {game.maxValues.lost}
                </p>
              </div>
              <div className='divider'></div>
              <div className='endmodal-game-result-text goldbars'>
                <p>{translate('endResult.goldbars')}</p>
                <p className='gold-count'>
                  {game.progress.won} / {game.maxValues.won}
                </p>
              </div>
            </div>
            <div
              className='endmodal-continue-game-button'
              onClick={() => {
                navigate('/');
                clean(200);
              }}
            >
              {translate('endResult.start_new_heist')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
