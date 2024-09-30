import "./HackPuzzle.css";
import HackPuzzle from "./HackPuzzle";
import OrderCards from "./OrderCards";
import React, { useState, useEffect, useRef } from "react";
import ColourPuzzleHelper from "./ColourPuzzleHelper";
import ColourPuzzleInfo from "./ColourPuzzleInfo";
import { Link, useLocation } from "react-router-dom";

const ColourPuzzle = ({ onGameOver }) => {
  // State variables for managing puzzle settings and gameplay
  const [startNewGame, setStartNewGame] = useState(null);
  const [timeLimit, setTimeLimit] = useState(60);
  const [showInstruction, setShowInstruction] = useState(true);

  // Puzzle display time based on the time limit (in milliseconds)
  let PUZZLE_DISPLAY_TIME = 1000 * timeLimit;

  // States for game status tracking
  const [showOrderCards, setShowOrderCards] = useState(true);
  const [timeOver, setTimeOver] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [solution, setSolution] = useState("");

  // Timer references to manage timeouts and intervals
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Random order array for puzzle
  const [randomOrderArray, setRandomOrderArray] = useState([]);
  const [remainingTime, setRemainingTime] = useState(
    PUZZLE_DISPLAY_TIME / 1000
  );
  const [startTime, setStartTime] = useState(null);
  const [showPuzzle, setShowPuzzle] = useState(false);

  // Update remaining time when the time limit changes
  useEffect(() => {
    PUZZLE_DISPLAY_TIME = 1000 * timeLimit;
    setRemainingTime(PUZZLE_DISPLAY_TIME / 1000);
  }, [timeLimit]);

  // Handles the game flow after the instructions are hidden
  useEffect(() => {
    if (showInstruction) return;

    const helper = new ColourPuzzleHelper();
    const orderArray = helper.getRandomOrderArray();
    setRandomOrderArray(orderArray);

    // Delay the start of the puzzle for 3 seconds
    const hideOrderCardsTimer = setTimeout(() => {
      setShowOrderCards(false);
      setShowPuzzle(true);
      setStartTime(Date.now());

      // Set up timer for the puzzle duration
      timerRef.current = setTimeout(gameLost, PUZZLE_DISPLAY_TIME);

      // Countdown interval for updating the remaining time
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }, 3000);

    // Clean up timers on unmount or restart
    return () => {
      clearTimeout(hideOrderCardsTimer);
      clearTimeout(timerRef.current);
    };
  }, [startNewGame, showInstruction]);

  // Handles user input for puzzle solution
  const handleInputChange = (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    setUserInput(inputValue);

    // Check if user input matches the solution
    if (inputValue === solution) {
      setUserInput("");
      gameWon();
    }
  };

  // Function to handle when the puzzle is lost (time over)
  const gameLost = () => {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    setTimeOver(true);
  };

  // Function to handle when the puzzle is won (correct solution)
  const gameWon = () => {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    const timeTaken = (Date.now() - startTime) / 1000;
    onGameOver(timeTaken); // Notify parent component of the game outcome
    setPuzzleSolved(true);
  };

  // Function to restart the game
  const restartGame = () => {
    setPuzzleSolved(false);
    setTimeOver(false);
    setShowPuzzle(false);
    setShowOrderCards(true);
    setStartNewGame((prev) => !prev);
    setRemainingTime(timeLimit);
  };

  // Render the instruction screen if it is currently displayed
  if (showInstruction) {
    return (
      <div>
        <ColourPuzzleInfo
          setShowInstruction={setShowInstruction}
          setTimeLimit={setTimeLimit}
          restartGame={restartGame}
        />
      </div>
    );
  }

  // Render the "Time Over" screen if time runs out
  if (timeOver) {
    return (
      <div className="end-screen">
        <div className="end-text">Time ran out. You lost.</div>
        <button onClick={restartGame} className="restart-button">
          Play again
        </button>
        <button
          onClick={() => setShowInstruction(true)}
          className="restart-button"
        >
          Instructions
        </button>
      </div>
    );
  }

  // Render the "Puzzle Solved" screen if the user wins
  if (puzzleSolved) {
    return (
      <div className="end-screen">
        <div className="end-text">You Won!</div>
        <button onClick={restartGame} className="restart-button">
          Play again
        </button>
        <button
          onClick={() => setShowInstruction(true)}
          className="restart-button"
        >
          Instructions
        </button>
      </div>
    );
  }

  // Render the order cards if the puzzle hasn't started yet
  if (showOrderCards) {
    return (
      <OrderCards
        first={randomOrderArray[0]}
        second={randomOrderArray[1]}
        third={randomOrderArray[2]}
        fourth={randomOrderArray[3]}
      />
    );
  }

  // Render the puzzle input area during the game
  return (
    <div>
      {showPuzzle && (
        <div className="input-area">
          <HackPuzzle
            onSolutionCalculated={setSolution}
            randomOrderArray={randomOrderArray}
          />
          <input
            value={userInput}
            type="text"
            id="answerBox"
            placeholder="eg. blue square..."
            onChange={handleInputChange}
            autoComplete="off"
          />
          <div className="timer">{remainingTime}</div>
        </div>
      )}
    </div>
  );
};

export default ColourPuzzle;
