import { useGame } from '../../../context/GameContext';
import Alarm from '../../../assets/icons/alarm.svg?react';
import Gold from '../../../assets/icons/gold.svg?react';
import AlarmDisabled from '../../../assets/icons/alarm_disabled.svg?react';
import GoldDisabled from '../../../assets/icons/gold_disabled.svg?react';

import './Progress.css';

const Progress = () => {
  const { game } = useGame();

  const constructIconArray = (length, element) => {
    return Array.from({ length }, () => element);
  };

  const enabledAlarmArr = constructIconArray(game.progress.lost, <Alarm />);
  const disabledAlarmArr = constructIconArray(
    game.maxValues.lost - game.progress.lost,
    <AlarmDisabled />,
  );
  const alarmArr = [...enabledAlarmArr, ...disabledAlarmArr];

  const enabledGoldArr = constructIconArray(game.progress.won, <Gold />);
  const disabledGoldArr = constructIconArray(
    game.maxValues.won - game.progress.won,
    <GoldDisabled />,
  );
  const goldArr = [...enabledGoldArr, ...disabledGoldArr];

  return (
    <div className='game-progress'>
      <div className='progress-icons alarm'>
        {alarmArr.map((el, index) => (
          <div className='svg-wrapper' key={`alarm-index-${index}`}>
            {el}
          </div>
        ))}
      </div>
      <div className='divider'></div>
      <div className='progress-icons gold'>
        {goldArr.map((el, index) => (
          <div className='svg-wrapper' key={`gold-index-${index}`}>
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
