import { buttonConstants } from '../../../constants/buttonConstants';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';

import './GameHeader.css';

const GameHeader = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const { game, clean } = useGame();
  return (
    <header>
      <Button
        type={buttonConstants.TYPE.AMBER}
        icon={buttonConstants.ICON.CARDS}
        style={{ width: '40px', height: '40px' }}
      />
      <h1>{translate('vault_active', { number: game.round })}</h1>
      <Button
        clickHandler={() => {
          navigate('/');
          clean(200);
        }}
        type={buttonConstants.TYPE.RED}
        icon={buttonConstants.ICON.XICON}
        style={{ width: '40px', height: '40px' }}
      />
    </header>
  );
};

export default GameHeader;
