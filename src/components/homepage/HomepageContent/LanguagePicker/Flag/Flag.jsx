import ENEN from '../../../../../assets/flags/en_EN.svg?react';
import ENENH from '../../../../../assets/flags/en_EN_highlight.svg?react';
import HUHU from '../../../../../assets/flags/hu_HU.svg?react';
import HUHUH from '../../../../../assets/flags/hu_HU_highlight.svg?react';

import './Flag.css';

const Flag = ({ lang, text, highlighted = false }) => {
  return (
    <div className='flag-wrapper' flag-faded={highlighted ? null : ''}>
      <div className='flag-icon'>
        {lang === 'en-EN' && !highlighted && <ENEN />}
        {lang === 'en-EN' && highlighted && <ENENH />}
        {lang === 'hu-HU' && !highlighted && <HUHU />}
        {lang === 'hu-HU' && highlighted && <HUHUH />}
      </div>
      <p className='flag-name'>{text}</p>
    </div>
  );
};

export default Flag;
