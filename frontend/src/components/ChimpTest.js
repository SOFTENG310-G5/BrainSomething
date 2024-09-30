import React, { useEffect, useState } from 'react';
import './ChimpTest.css';

function ChimpTest({ onGameOver }) {
  // Initialize state using useState hook for managing level, required tile, and strike count.
  const [level, setLevel] = useState(4);
  const [tileNeeded, setTileNeeded] = useState(1);
  const [strikes, setStrikes] = useState(0);

  // useEffect to trigger tile generation whenever the level changes.
  useEffect(() => {
    generateRandomTiles(level);

    // Cleanup function to clear tiles on component unmount or before re-render.
    return () => {
      const tilesContainer = document.getElementById('tiles');
      if (tilesContainer) tilesContainer.innerHTML = '';
    };
  }, [level]);

  // Function to generate random tiles on the grid.
  const generateRandomTiles = (numberOfTiles) => {
    const tilesContainer = document.getElementById('tiles');
    const usedPositions = new Set();  // Set to keep track of occupied grid positions.
    tilesContainer.innerHTML = '';  // Clear existing tiles before adding new ones.
    
    const totalColumns = 10;  // Number of columns in the grid.
    const totalRows = 5;  // Number of rows in the grid.

    // Create the number of tiles equal to 'numberOfTiles'.
    for (let i = 0; i < numberOfTiles; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = i + 1;  // Assign a number to the tile.
      tile.id = `${i}`;  // Use the index as the tile's ID.

      let randomColumn, randomRow, positionKey;
      // Generate a random grid position that hasn't been used yet.
      do {
        randomColumn = Math.floor(Math.random() * totalColumns) + 1;
        randomRow = Math.floor(Math.random() * totalRows) + 1;
        positionKey = `${randomColumn}-${randomRow}`;
      } while (usedPositions.has(positionKey));  // Ensure the position is unique.
      
      usedPositions.add(positionKey);  // Mark the position as used.

      tile.style.gridColumn = randomColumn;  // Set the tile's grid column.
      tile.style.gridRow = randomRow;  // Set the tile's grid row.

      // Add click event listener to each tile.
      tile.addEventListener('click', () => onTileClick(i + 1));

      tilesContainer.appendChild(tile);  // Append tile to the grid.
    }
  };

  // Function called when a tile is clicked.
  const onTileClick = (tileNumber) => {
    // If it's the first tile (tile 1), hide all tile numbers.
    if (tileNeeded === 1) hideAllTileNumbers();

    // Handle correct tile clicks.
    if (tileNumber === tileNeeded) {
      handleCorrectTileClick(tileNumber);
    } 
    // Handle wrong tile clicks (strikes).
    else {
      handleWrongTileClick();
    }
  };

  // Helper function to hide numbers on all tiles.
  const hideAllTileNumbers = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.textContent = '';  // Clear the tile's text content.
    });
  };

  // Handles correct tile click: removes the tile or advances the level.
  const handleCorrectTileClick = (tileNumber) => {
    removeTileByID(tileNumber - 1);  // Remove tile by its ID.
    if (tileNeeded < level) {
      setTileNeeded(tileNeeded + 1);  // Move to the next tile in sequence.
    } else if (tileNeeded === level) {
      advanceLevel();  // Advance to the next level if the last tile in the level is clicked.
    }
  };

  // Handles incorrect tile clicks: adds a strike or ends the game if strikes reach 3.
  const handleWrongTileClick = () => {
    const newStrikes = strikes + 1;
    setStrikes(newStrikes);  // Update the strikes state.
    flashText();  // Flash the strike text as feedback.
    
    if (newStrikes === 3) {
      endGame();  // End the game after 3 strikes.
    } else {
      resetRound();  // Reset the round if there are fewer than 3 strikes.
    }
  };

  // Function to remove a tile from the grid by its ID.
  const removeTileByID = (tileId) => {
    const tile = document.getElementById(tileId);
    if (tile) {
      // Make the tile invisible and non-interactive.
      tile.style.backgroundColor = 'transparent';
      tile.classList.add('disabled');
      tile.style.boxShadow = 'none';
      tile.textContent = '';
    }
  };

  // Advances the player to the next level.
  const advanceLevel = () => {
    setLevel(level + 1);  // Increment the level.
    setTileNeeded(1);  // Reset the tileNeeded to 1 for the new level.
    generateRandomTiles(level + 1);  // Generate more tiles for the new level.
  };

  // Resets the current round by resetting tileNeeded and regenerating tiles.
  const resetRound = () => {
    setTileNeeded(1);
    generateRandomTiles(level);
  };

  // Ends the game by showing the game over popup and passing the final score to onGameOver.
  const endGame = () => {
    const score = (level - 3) * 24 - strikes * 4;  // Calculate the score based on level and strikes.
    onGameOver(score);  // Pass the score to the parent component.
    document.getElementById('popup').style.display = 'flex';  // Show the game over popup.
    document.getElementById('overlay').style.display = 'flex';  // Show the overlay.
  };

  // Resets the game when the "Try Again" button is clicked.
  const handleTryAgain = () => {
    setLevel(4);  // Reset level to 4.
    setTileNeeded(1);  // Reset tileNeeded to 1.
    setStrikes(0);  // Reset strikes to 0.
    generateRandomTiles(4);  // Start from level 4 with new tiles.
    hidePopup();  // Hide the game over popup.
  };

  // Hides the game over popup and overlay.
  const hidePopup = () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };

  // Function to flash the strike text (visual feedback for wrong clicks).
  const flashText = () => {
    const textElement = document.getElementById('strikes');
    textElement.classList.add('flash');  // Add the flash animation class.
    setTimeout(() => {
      textElement.classList.remove('flash');  // Remove it after 1 second.
    }, 1000); 
  };

  return (
    <div>
      {/* Game Over Popup */}
      <div id="popup" className="popup">
        <div className="popup-content">
          <h2>Game Over</h2>
          <button className="rounded-button" onClick={handleTryAgain}>
            Try Again?
          </button>
        </div>
      </div>

      {/* Scoreboard to display the current level */}
      <div>
        <h2 id="scoreboard">Level: {level}</h2>
      </div>

      {/* Display the current strikes */}
      <div>
        <h2 id="strikes">Strikes: {strikes}/3</h2>
      </div>

      {/* The grid where the tiles are displayed */}
      <div className="tiles" id="tiles"></div>

      {/* Overlay to show during the game over state */}
      <div className="overlay" id="overlay"></div>
    </div>
  );
}

export default ChimpTest;
