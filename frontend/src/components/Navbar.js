import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS for styling the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BrainSomething</Link> {/* Link to Home Page */}
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link> {/* Link to Home */}
        </li>
        <li>
          <Link to="/game/1">Dino Jump</Link> {/* Link to Dino Jump game */}
        </li>
        <li>
          <Link to="/game/2">Reaction Game</Link> {/* Link to Reaction Game */}
        </li>
        <li>
          <Link to="/game/3">Colour Puzzle</Link> {/* Link to Colour Puzzle */}
        </li>
        <li>
          <Link to="/game/4">Chimp Test</Link> {/* Link to Chimp Test */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;