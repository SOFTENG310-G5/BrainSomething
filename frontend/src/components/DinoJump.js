import React, { useEffect, useState } from 'react';
import './DinoJump.css'; // Assuming you add custom styles for the game here

const Game1 = ({onGameOver}) => {
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [gameLength, setGameLength] = useState(null);

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


        let $rand = 0;

        cactus.addEventListener('animationed', function(){
            
            $rand = (Math.random() * 2) + 1;
            console.log(this);
            this.style.animationDuration = $rand + `s`;
        }); 
        

        let isAlive = setInterval(function() {
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

            // Adjust the collision detection logic
            if (cactusLeft < 120 && cactusLeft > 0 && dinoTop >= 140) {
                // Calculate the game length 
                setGameLength(Date.now() - startTime);
                // Immediately stop cactus animation and set game over
                cactus.style.animationPlayState = "paused"; // Directly stop the cactus animation
                setGameOver(true);
            }

            // Stop checking once the game is over, and pass the length of the game in seconds to the parent component
            if (gameOver) {
                onGameOver(gameLength/1000); 
                clearInterval(isAlive);
            }
        }, 10);

        // Cleanup the interval and event listener on component unmount
        return () => {
            clearInterval(isAlive);
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [gameOver]);

    const restartGame = () => {
        // Reset the game state
        setGameOver(false);

        const cactus = document.getElementById("cactus");
         // Stop the current animation
        cactus.style.animation = "none";
        // This forces reflow without triggering lint warnings
        cactus.getBoundingClientRect();  
        // Generate a random duration
        const randomDuration = (Math.random() * 2) + 1;
        //restart the animation
        cactus.style.animation = `moveCactus ${randomDuration}s linear infinite`;
        setStartTime(Date.now());
    }



    return (
        <div className="game-container">
            <div id="dino"></div>
            <div id="cactus" class="run-animation"></div>
            {gameOver && (
                <button className="game-over" onClick={restartGame}>
                    Game Over. Play again.
                </button>
            )}
        </div>
    );
}

export default Game1;
