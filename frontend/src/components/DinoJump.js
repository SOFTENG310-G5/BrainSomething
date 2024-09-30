import React, { useEffect, useState } from "react";
import "./DinoJump.css"; // Assuming you have custom styles for the game here

const DinoJump = ({ onGameOver }) => {
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [gameLength, setGameLength] = useState(null);

  useEffect(() => {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");

    // Handle jumping when the spacebar or arrow keys are pressed
    const handleKeyDown = () => {
      if (!gameOver) jump();
    };

    const jump = () => {
      if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        setTimeout(() => {
          dino.classList.remove("jump");
        }, 300); // Jump duration is 300ms
      }
    };

    const checkCollision = () => {
      const dinoTop = parseInt(
        window.getComputedStyle(dino).getPropertyValue("top")
      );
      const cactusLeft = parseInt(
        window.getComputedStyle(cactus).getPropertyValue("left")
      );

      // Check if the dino hits the cactus
      if (cactusLeft < 120 && cactusLeft > 0 && dinoTop >= 140) {
        setGameLength(Date.now() - startTime); // Calculate game duration
        setGameOver(true);
        cactus.style.animationPlayState = "paused"; // Stop the cactus animation
      }
    };

    const isAlive = setInterval(() => {
      if (!gameOver) {
        checkCollision();
      } else {
        onGameOver(gameLength / 1000); // Pass game length in seconds to the parent
        clearInterval(isAlive); // Stop the collision check loop
      }
    }, 10); // Check for collision every 10ms

    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listener and interval on component unmount
    return () => {
      clearInterval(isAlive);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver, gameLength, startTime, onGameOver]);

  // Restart the game by resetting state and cactus animation
  const restartGame = () => {
    setGameOver(false);
    setStartTime(Date.now());

    const cactus = document.getElementById("cactus");
    cactus.style.animation = "none"; // Stop the current animation
    cactus.getBoundingClientRect(); // Force a reflow to reset animation
    cactus.style.animation = "moveCactus 1.5s infinite linear"; // Restart animation
  };

  return (
    <div className="game-container">
      <div id="dino" className="dino"></div>
      <div id="cactus" className="cactus"></div>
      {gameOver && (
        <button className="game-over" onClick={restartGame}>
          Game Over. Play again.
        </button>
      )}
    </div>
  );
};

export default DinoJump;
