import { Outlet } from 'react-router-dom';

import './Layout.css';

const Layout = () => {
  return (
    <div>
      <div className='dotted-bg'></div>
      <div className='app-wrapper'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
