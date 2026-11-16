import { Outlet } from 'react-router-dom';

import './Layout.css';

const Layout = ({ isBloom }) => {
  return (
    <div>
      <div className='dotted-bg'></div>
      {isBloom && (
        <div className='bloom'>
          <div className='bloom-el bloom-red'></div>
          <div className='bloom-el bloom-amber'></div>
        </div>
      )}
      <div className='app-wrapper'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
