import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';
import Homepage from './components/homepage/Homepage';
import Game from './components/game/Game';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Homepage />} />
            </Route>
            <Route element={<Layout isBloom />}>
              <Route path='/game' element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </LanguageProvider>
  );
}

export default App;
