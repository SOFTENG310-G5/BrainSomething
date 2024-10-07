import React, { useEffect } from 'react';
import '../styles/ChimpTest.css';

function ChimpTest({onGameOver}) {

    // Set initial game state.
  let level = 4;
  let tileNeeded = 1;
  let strikes = 0;

  useEffect(() => {
    generateRandomTiles(level);

    return () => {
      const tilesContainer = document.getElementById('tiles');
      if (tilesContainer) tilesContainer.innerHTML = '';
    };
  }, [level]);

  const generateRandomTiles = (numberOfTiles) => {
    const tilesContainer = document.getElementById('tiles');
    const usedPositions = new Set();
    tilesContainer.innerHTML = ''; 
    const totalColumns = 10; 
    const totalRows = 5; 

    // Create tiles depending on the numberofTiles needed. The Text content will be from 1 to the number of tiles needed.
    for (let i = 0; i < numberOfTiles; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = i + 1;
      tile.id = `${i}`;

      let randomColumn, randomRow, positionKey;

      // Generates random position inside the tile grid to place the tiles.
      do {
        randomColumn = Math.floor(Math.random() * totalColumns) + 1;
        randomRow = Math.floor(Math.random() * totalRows) + 1;
        positionKey = `${randomColumn}-${randomRow}`;
      } while (usedPositions.has(positionKey));
      // Ensures that a tile does not already exist in that position.
      usedPositions.add(positionKey);

      tile.style.gridColumn = randomColumn;
      tile.style.gridRow = randomRow;

      tile.addEventListener('click', () => onTileClick(i + 1));

      tilesContainer.appendChild(tile);
    }
  };

  const onTileClick = (tileNumber) => {
    // If the tile is clicked and it is a 1, hide the numbers for all tiles
    if (tileNeeded === 1) {
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach(tile => {
        tile.textContent = '';
      });
    }
    // If the tile clicked is the correct tile in the sequence, hide the tile and make it not clickable.
    if (tileNumber === tileNeeded) {
      removeTileByID(document.getElementById(tileNumber - 1));
      if (tileNeeded < level) {
        tileNeeded = tileNeeded + 1;
      } 
      // If the tile clicked is the max tile, go to the next level.
      else if (tileNeeded === level) {
        level++;
        document.getElementById('scoreboard').textContent = `Level: ${level}`;
        tileNeeded = 1;
        generateRandomTiles(level);
      }
    } 
    // If the tile clicked is the wrong tile, give the player a strike and either refresh game board if they have more available or go into game over state if they have 3 strikes.
    else {
      strikes++;
      flashText();
      document.getElementById('strikes').textContent = `Strikes: ${strikes}/3`;
      if (strikes === 3) {

        //the formula for the score is (level-3)*24 - (strikes*4)
        const finalScore = (level-3)*24 - (strikes*4);
    onGameOver(finalScore);
    
    document.getElementById('final-score').textContent = finalScore;
        
        
        document.getElementById('popup').style.display = 'flex';
        document.getElementById('overlay').style.display = 'flex';
      } else {
        tileNeeded = 1;
        generateRandomTiles(level);
      }
    }
  };
  // Function to remove a tile from the grid.
  const removeTileByID = (tile) => {
    tile.style.backgroundColor = 'transparent';
    tile.classList.add('disabled');
    tile.style.boxShadow = 'none';
    tile.textContent = '';
  };

  // Function to reset game state for try again button.
  const handleTryAgain = () => {
    level = 4;
    tileNeeded = 1;
    strikes = 0;
    document.getElementById('strikes').textContent = `Strikes: 0/3`;
    document.getElementById('scoreboard').textContent = `Level: 4`;
    generateRandomTiles(4);
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };

  // Flash text animation for when the player gets a strike.
  const flashText = () => {
    const textElement = document.getElementById('strikes');
    textElement.classList.add('flash');

    setTimeout(() => {
      textElement.classList.remove('flash');
    }, 1000); 
  };

  return (
    <div>
      <div id="popup" className="popup">
        <div className="popup-content">
          <h2>Game Over</h2>
          <p>Your score: <span id="final-score"></span></p>
          <button className="rounded-button" id="rounded-button" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      </div>
      <div>
        <h2 id="scoreboard">Level: {level}</h2>
      </div>
      <div>
        <h2 id="strikes">Strikes: {strikes}/3</h2>
      </div>
      <div className="tiles" id="tiles"></div>
      <div className="overlay" id="overlay"></div>
    </div>
  );
}

export default ChimpTest;