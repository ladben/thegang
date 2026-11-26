import C1 from '../../assets/icons/cards/challenge/1.svg?react';
import C2 from '../../assets/icons/cards/challenge/2.svg?react';
import C3 from '../../assets/icons/cards/challenge/3.svg?react';
import C4 from '../../assets/icons/cards/challenge/4.svg?react';
import C5 from '../../assets/icons/cards/challenge/5.svg?react';
import C6 from '../../assets/icons/cards/challenge/6.svg?react';
import C7 from '../../assets/icons/cards/challenge/7.svg?react';
import C8 from '../../assets/icons/cards/challenge/8.svg?react';
import C9 from '../../assets/icons/cards/challenge/9.svg?react';
import C10 from '../../assets/icons/cards/challenge/10.svg?react';
import S1 from '../../assets/icons/cards/specialist/1.svg?react';
import S2 from '../../assets/icons/cards/specialist/2.svg?react';
import S3 from '../../assets/icons/cards/specialist/3.svg?react';
import S4 from '../../assets/icons/cards/specialist/4.svg?react';
import S5 from '../../assets/icons/cards/specialist/5.svg?react';
import S6 from '../../assets/icons/cards/specialist/6.svg?react';
import S7 from '../../assets/icons/cards/specialist/7.svg?react';
import S8 from '../../assets/icons/cards/specialist/8.svg?react';
import S9 from '../../assets/icons/cards/specialist/9.svg?react';
import S10 from '../../assets/icons/cards/specialist/10.svg?react';

import './CardIcon.css';

const CardIcon = ({ type, number, placement = 'topleft' }) => {
  const challenge = [
    <C1 />,
    <C2 />,
    <C3 />,
    <C4 />,
    <C5 />,
    <C6 />,
    <C7 />,
    <C8 />,
    <C9 />,
    <C10 />,
  ];

  const specialist = [
    <S1 />,
    <S2 />,
    <S3 />,
    <S4 />,
    <S5 />,
    <S6 />,
    <S7 />,
    <S8 />,
    <S9 />,
    <S10 />,
  ];

  const icons = { challenge, specialist };

  return (
    <div className='svg-wrapper card-icon' icon-placement={placement}>
      {icons[type][number - 1]}
    </div>
  );
};

export default CardIcon;
