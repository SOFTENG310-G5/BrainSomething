import "./HackPuzzle.css";
import HackPuzzle from "./HackPuzzle";
import OrderCards from "./OrderCards";
import React, {useState, useEffect, useRef} from 'react';
import ColourPuzzleHelper from './ColourPuzzleHelper';
import { Link, useLocation } from "react-router-dom";


const ColourPuzzle = ({onGameOver}) => {
    const [timeLimit, setTimeLimit] = useState(80);
   const [startNewGame, setStartNewGame] = useState(null);

    const initialDisplayTime = timeLimit;
    const PUZZLE_DISPLAY_TIME = 1000*initialDisplayTime;
    
    const [showOrderCards, setShowOrderCards] = useState(true);
    const [timeOver, setTimeOver] = useState(false);
    const [puzzleSolved, setPuzzleSolved] = useState(false);
    const [userInput, setUserInput] = useState();
    const [solution, setSolution] = useState();
    const timerRef = useRef(null);
    const intervalRef = useRef(null);
    const [randomOrderArray, setRandomOrderArray] = useState([]);
    const [remainingTime, setRemainingTime] = useState(PUZZLE_DISPLAY_TIME / 1000);
    const [startTime, setStartTime] = useState(null);
    const [show, setShow] = useState(false);
    
   
    
    // timer for the initial order of the puzzle, should be new order everytime the game is played.
    useEffect(() => {
       
        const helper = new ColourPuzzleHelper();
        const orderArray = helper.getRandomOrderArray();
        setRandomOrderArray(orderArray);
        // wait 3 seconds, then show the puzzle and start the timer
        const hideOrderCardsTimer = setTimeout(() => {
            setShowOrderCards(false);
            setShow(true);
            setStartTime(Date.now());

            // Timer to show end screen if time runs out
            timerRef.current = setTimeout(() => {
                setShowOrderCards(true);
                setTimeOver(true);
            }, PUZZLE_DISPLAY_TIME);

            intervalRef.current = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(intervalRef.current);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

        }, 3000);

        // clean up timers when the component unmounts
        return () => {
            if (hideOrderCardsTimer) {
                clearTimeout(hideOrderCardsTimer);
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
 } , [startNewGame]);
    

    
    const getSolution = (sol) => {
        setSolution(sol);
    };

 //change is called whenever the user types into the input box
    const change = event => {
        const inputValue = event.target.value;
        setUserInput(inputValue);
        if (inputValue.trim().toLowerCase() === solution) {
setUserInput("");
            gameWon();
             // Set puzzleSolved to true when the input matches the solution
             
        }
    }

  

    const gameWon = () => {
        
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
          const timeTaken = Date.now()-startTime;
        onGameOver(timeTaken/1000);
        clearTimeout(timerRef.current);
        clearInterval(intervalRef.current);
        setPuzzleSolved(true);
      
     

    }
    const restartGame = () => {
        
        setPuzzleSolved(false);
      setShow(false);   
      setShowOrderCards(true);
        setStartNewGame(startNewGame => !startNewGame);
       setRemainingTime(initialDisplayTime);

    }

    if (timeOver) {

        return(
            <div className="end-screen">
                <div className="end-text">Time ran out. You lost.</div>
                <button onClick={restartGame} className="restart-button">Play again</button>
                <Link to="/colour-puzzle" className="restart-button">
                    <div className="info-text">Instructions</div>
                </Link>
            </div>
        )
    }

    if (puzzleSolved) {
       

        return(
            <div className="end-screen">
                <div className="end-text">You Won</div>
                <button onClick={restartGame} className="restart-button">Play again</button>
               
            </div>
        )
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

   

    return (
        <div>
       {show && (<div className="input-area">
            <HackPuzzle onSolutionCalculated={getSolution} randomOrderArray={randomOrderArray}/>
            <input 
                value={userInput} 
                type="text" 
                id="answerBox" 
                placeholder="eg. blue square..."
                onChange={change}
                autoComplete="off"
            />
                       

            <div className="timer">{remainingTime}
          
            </div>
        </div>)}
        </div>
    );
};

export default ColourPuzzle;