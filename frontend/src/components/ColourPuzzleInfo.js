import "./HackPuzzle.css";
import React, {useState} from 'react';
//image resources
import examplePuzzle from "../resources/images/examplepuzzle.png";
import exampleOrder from "../resources/images/exampleorder.png";


const ColourPuzzleInfo = ({setShowInstructions, setTimeLimit}) => {
    const [selectedTime, setSelectedTime] = useState(10);// default is 10 sec
    const[playClicked, setPlayClicked] = useState(false);
    
    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };
    //url will end with colour-puzzle/start?time=[however long they choose]
    const link = `start?time=${encodeURIComponent(selectedTime)}`;

    const exitInstructions = () => {
        setPlayClicked(true);
        setShowInstructions(false);
      
        setTimeLimit(selectedTime);
        
    }

    return (
        <div>
        {!playClicked && (
    <div className="information-slides">
        <div className="example-layout">
            <img src={exampleOrder} alt="examplePuzzle" className="example-image"/>
            <div>Order</div>
            <img src={examplePuzzle} alt="examplePuzzle" className="example-image"/>
            <div>Puzzle</div>
        </div>
        <div className="example-layout">
            <p>You will be first be given a set of number 1 to 4 in random order. Then a set of puzzles will appear with 2 questions. The order will disappear after 3 seconds.</p>
            <p>The answer to shape-text(3) and background-colour(4) is triangle green. From the order, (3) refers to the puzzle indicated with 3 (second from the left), and (4) refers to the rightmost card. Note the numbers in the center of the puzzle serve as just a distraction.</p>
            <p>Type the answers with a space in between.</p>
            <button
                        className={" "}
                        onClick={() => exitInstructions()

                        }
                    >
                        play
                    </button>
            <div className="time-selector">
                <div>Select Puzzle Display Time:</div>
                <div className="time-buttons">
                    <button
                        className={selectedTime === 10 ? "selected" : ""}
                        onClick={() => handleTimeSelect(10)}
                    >
                        10s
                    </button>
                    <button
                        className={selectedTime === 30 ? "selected" : ""}
                        onClick={() => handleTimeSelect(30)}
                    >
                        30s
                    </button>
                    <button
                        className={selectedTime === 60 ? "selected" : ""}
                        onClick={() => handleTimeSelect(60)}
                    >
                        60s
                    </button>
                </div>
            </div>
            
        </div>
    </div>)}
   
    </div>
    )
}

export default ColourPuzzleInfo;