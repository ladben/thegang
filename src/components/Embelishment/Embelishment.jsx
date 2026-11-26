import TopLeft from '../../assets/graphics/Corner_top_left.svg?react';
import TopRight from '../../assets/graphics/Corner_top_right.svg?react';
import BottomLeft from '../../assets/graphics/Corner_bottom_left.svg?react';
import BottomRight from '../../assets/graphics/Corner_bottom_right.svg?react';

const Embelishment = ({ position }) => {
  const embelishmentDictionary = {
    topleft: <TopLeft />,
    topright: <TopRight />,
    bottomleft: <BottomLeft />,
    bottomright: <BottomRight />,
  };

  return embelishmentDictionary[position] || null;
};

export default Embelishment;
