import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './components/homepage/Homepage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
