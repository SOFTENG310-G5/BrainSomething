import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Game1 from "./components/DinoJump";
import Games from './pages/Games';
import ReactionGame from './components/ReactionGame';
import ChimpTest from "./components/ChimpTest";

import ColourPuzzle from "./components/ColourPuzzle";
import ColourPuzzleInfo from "./components/ColourPuzzleInfo";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dino-jump" element={<Game1 />} />
            <Route path="/colour-puzzle" element={<ColourPuzzleInfo/>}/>
            <Route path="/colour-puzzle/start" element={<ColourPuzzle/>}/>
            <Route path="/game/:screen" element={<Games />} />
            <Route path="/chimp-test" element={<ChimpTest />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
