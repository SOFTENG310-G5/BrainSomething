import React from "react";
import { Link } from "react-router-dom";

// components
import Game1 from "../components/Game1";

const Home = () => {
  return (
    <div className="home">
      <div className="cards-container">
        {/* Card for Game 1 */}
        <div className="card">
          <h3>Game 1</h3>
          <p>A fun jumping game</p>
          <Link to="/Game1" className="play-link">
            Play Game 1
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
