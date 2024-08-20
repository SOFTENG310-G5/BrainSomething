import "./HackPuzzle.css";
import HackPuzzle from "./HackPuzzle";
import OrderCards from "./OrderCards";
import React, {useState, useEffect} from 'react';
import ColourPuzzleHelper from './ColourPuzzleHelper';  // Assuming you have this in a separate file

const PUZZLE_DISPLAY_TIME = 5000;

const ColourPuzzle = () => {
    const [showOrderCards, setShowOrderCards] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const helper = new ColourPuzzleHelper();

    const randomOrderArray = helper.getRandomOrderArray();
    // timer for the initial order of the puzzle, should be new order everytime the game is played.
    useEffect(() => {
        // wait 1 second, then show the puzzle and start the 5-second timer
        const hideOrderCardsTimer = setTimeout(() => {
            setShowOrderCards(false);

            // hide the puzzle after 5 seconds
            helper.startTimer(PUZZLE_DISPLAY_TIME / 1000, () => {
                setShowOrderCards(true);
                setGameOver(true);
            });
        }, 1000);

        // clean up timers when the component unmounts
        return () => {
            clearTimeout(hideOrderCardsTimer);
        };
    }, []);

    if (gameOver) {
        return <div>loss</div>;
    }

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

    return <HackPuzzle />;
};

export default ColourPuzzle;