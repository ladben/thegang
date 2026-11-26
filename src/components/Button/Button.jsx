import { buttonConstants } from '../../constants/buttonConstants';
import XIcon from '../../assets/icons/x_icon.svg?react';
import CardsIcon from '../../assets/icons/cards.svg?react';
import TrashIcon from '../../assets/icons/trash.svg?react';

import './Button.css';

const { ICON, LAYOUT } = buttonConstants;
const { ICON_TEXT, TEXT_ICON } = LAYOUT;
const { XICON, CARDS, TRASH } = ICON;

const ICONS = {
  [XICON]: XIcon,
  [CARDS]: CardsIcon,
  [TRASH]: TrashIcon,
};

const Button = ({
  type,
  icon,
  text,
  layout,
  style,
  disabled = false,
  gradient = false,
  clickHandler = () => {},
}) => {
  const IconComponent = icon ? ICONS[icon] : null;

  return (
    <div
      className='button'
      onClick={clickHandler}
      button-type={type}
      style={style}
      discard-disabled={disabled ? '' : null}
      bg-gradient={gradient ? '' : null}
    >
      {text && layout === TEXT_ICON && <p>{text}</p>}
      <div className='svg-wrapper'>
        <IconComponent />
      </div>
      {text && layout === ICON_TEXT && <p>{text}</p>}
    </div>
  );
};

export default Button;
