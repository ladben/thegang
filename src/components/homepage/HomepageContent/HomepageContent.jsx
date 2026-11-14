import './HomepageContent.css';

const HomepageContent = () => {
  return (
    <div className='homepage-content'>
      <div className='homepage-header'>
        <p className='homepage-subtitle'>The Cooperative Poker Game</p>
        <div className='homepage-title-outer-golden'>
          <div className='homepage-title-dark-border'>
            <p className='homepage-title'>The Gang</p>
          </div>
        </div>
        <div style={{ color: 'white' }}>{window.innerWidth}</div>
      </div>
    </div>
  );
};

export default HomepageContent;
