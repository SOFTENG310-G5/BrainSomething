import React from "react";
import './HackPuzzle.css';

//should take in all the "answers" as the   
const PuzzleCard = ({cardColour, shapeColour, shapeType, shapeText, shapeTextColour, colourText, colourTextColour, number, numberColour}) => {

    return (
        <div className="puzzle-card" style={{backgroundColor: cardColour}}>
            <div className={shapeType} style={{borderBottomColor: shapeType == "triangle" ? shapeColour : "transparent", backgroundColor: shapeType != "triangle" ? shapeColour : "transparent"}}>
                <div className="puzzle-text" style={{color: shapeTextColour}}>{shapeText}</div>
                <div className="number" style={{color: numberColour}}>{number}</div>
                <div className="puzzle-text" style={{color: colourTextColour}}>{colourText}</div>
            </div>
        </div>

    )

}

export default PuzzleCard;