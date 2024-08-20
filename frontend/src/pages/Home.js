import React from "react";
import { Link } from "react-router-dom";

//resources
import dinosaurIcon from "../resources/images/dinosaur.png";

// components

// import Game1 from "../components/Game1"
import ColourPuzzle from "../components/ColourPuzzle"

const Home = () => {
  return (
    <div className="home">
      <div className="cards-container">
        {/* Card for Game 1 */}
        <div className="card">
          <h3>Game 1</h3>
          <img src={dinosaurIcon} alt="Dinosaur" className="card-icon" />
          <p>A fun jumping game</p>
          <Link to="/ColourPuzzle" className="play-link">
            Play Game 1
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
