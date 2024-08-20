import "./HackPuzzle.css";
import HackPuzzle from "./HackPuzzle";
import OrderCards from "./OrderCards";
import React, {useState, useEffect} from 'react';
import ColourPuzzleHelper from './ColourPuzzleHelper';  // Assuming you have this in a separate file

const ColourPuzzle = () => {
    const [showOrderCards, setShowOrderCards] = useState(true);

    const helper = new ColourPuzzleHelper();

    const randomOrderArray = helper.getRandomOrderArray();
    //timer for the initial order of the puzzle, should be new order everytime the game is played.
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOrderCards(false);
        },1000);

        return () => clearTimeout(timer);
    })
    return(
        <div>
            {showOrderCards ? (
                <OrderCards
                first={randomOrderArray[0]}
                second={randomOrderArray[1]}
                third={randomOrderArray[2]}
                fourth={randomOrderArray[3]}
                />
            ) : (
                <HackPuzzle/>
            )}
        </div>
        
    )
}

export default ColourPuzzle;