import { Link } from 'react-router-dom';

import GradientBorder from '../gradients/GradientBorder/GradientBorder';
import Embelishment from '../Embelishment/Embelishment';
import HomepageContent from './HomepageContent/HomepageContent';

import './Homepage.css';

const Homepage = () => {
  return (
    <div className='hp-wrapper'>
      <GradientBorder
        colorVariant={'linearGoldenO80'}
        coverColor={'var(--color-dark)'}
        borderWidth={4}
        borderRadius={16}
      >
        <div className='homepage-body'>
          <div className='corners'>
            <Embelishment position={'topleft'} />
            <Embelishment position={'topright'} />
          </div>
          <HomepageContent />
          <div className='corners'>
            <Embelishment position={'bottomleft'} />
            <Embelishment position={'bottomright'} />
          </div>
        </div>
      </GradientBorder>
    </div>
  );
};

export default Homepage;
