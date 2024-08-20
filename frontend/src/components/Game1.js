import React, { useEffect, useState } from 'react';
import './Game1.css'; // Assuming you add custom styles for the game here

const Game1 = () => {
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const dino = document.getElementById("dino");
        const cactus = document.getElementById("cactus");

        const handleKeyDown = (event) => {
            if (!gameOver) {
                jump();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        function jump() {
            if (dino.classList != "jump") {
                dino.classList.add("jump");

                setTimeout(function() {
                    dino.classList.remove("jump");
                }, 300);
            }
        }

        let isAlive = setInterval(function() {
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

            // Adjust the collision detection logic
            if (cactusLeft < 120 && cactusLeft > 0 && dinoTop >= 140) {
                // Immediately stop cactus animation and set game over
                cactus.style.animationPlayState = "paused"; // Directly stop the cactus animation
                setGameOver(true);
            }

            // Stop checking once the game is over
            if (gameOver) {
                clearInterval(isAlive);
            }
        }, 10);

        // Cleanup the interval and event listener on component unmount
        return () => {
            clearInterval(isAlive);
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [gameOver]);

    return (
        <div className="game-container">
            <div id="dino"></div>
            <div id="cactus"></div>
            {gameOver && (
                <div className="game-over">
                    Game Over
                </div>
            )}
        </div>
    );
}

export default Game1;
