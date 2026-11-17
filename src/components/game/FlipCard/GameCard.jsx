import { useLanguage } from '../../../context/LanguageContext';
import { useGame } from '../../../context/GameContext';
import { cards } from '../../../assets/cards';
import CardIcon from '../../CardIcon/CardIcon';
import Underline from './Underline';
import Button from '../../Button/Button';

import { buttonConstants } from '../../../constants/buttonConstants';
import './GameCard.css';

const GameCard = ({ gameCard }) => {
  const { lang, translate } = useLanguage();
  const { discardLast } = useGame();

  const selectedCard = cards[lang][gameCard.type].cards.find(
    (el) => el.number === gameCard.number,
  );

  console.log(selectedCard);
  return (
    <div className='game-card' card-type={gameCard.type}>
      <div className='card-header'>
        <div className='card-header-row'>
          <CardIcon type={gameCard.type} number={gameCard.number} />
          <h2>{selectedCard.title}</h2>
          <CardIcon
            type={gameCard.type}
            number={gameCard.number}
            placement='topright'
          />
        </div>
        <Underline title={gameCard.type} />
      </div>
      <div className='card-body-wrapper'>
        <div
          className='card-body'
          dangerouslySetInnerHTML={{ __html: selectedCard.description }}
        />
      </div>
      <div className='card-footer'>
        <CardIcon
          type={gameCard.type}
          number={gameCard.number}
          placement='bottomleft'
        />
        <div className='discard-btn-wrapper'>
          <Button
            type={buttonConstants.TYPE.NEUTRAL}
            icon={buttonConstants.ICON.TRASH}
            text={translate('discard_redraw')}
            layout={buttonConstants.LAYOUT.ICON_TEXT}
            style={{
              color:
                gameCard.type === 'challenge'
                  ? 'var(--color-amber-400)'
                  : 'var(--color-red-400',
            }}
            clickHandler={() => {
              discardLast();
            }}
          />
        </div>
        <CardIcon
          type={gameCard.type}
          number={gameCard.number}
          placement='bottomright'
        />
      </div>
    </div>
  );
};

export default GameCard;
