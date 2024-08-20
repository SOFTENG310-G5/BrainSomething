import "./HackPuzzle.css";
import HackPuzzle from "./HackPuzzle";
import OrderCards from "./OrderCards";
import React, {useState, useEffect} from 'react';

const ColourPuzzle = () => {
    const [showOrderCards, setShowOrderCards] = useState(true);
    const dummyCardOrder = ["2","3","1","4"];
    //timer for the initial order of the puzzle, should be new order everytime the game is played.
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOrderCards(false);
        },5000);

        return () => clearTimeout(timer);
    })
    return(
        <div>
            {showOrderCards ? (
                <OrderCards
                first={dummyCardOrder[0]}
                second={dummyCardOrder[1]}
                third={dummyCardOrder[2]}
                fourth={dummyCardOrder[3]}
                />
            ) : (
                <HackPuzzle/>
            )}
        </div>
        
    )
}

export default ColourPuzzle;