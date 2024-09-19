import React, { useState, useEffect } from 'react';
import ReactionGame from '../components/ReactionGame'; // Import the ReactionGame component
import './Reaction.css'; // Import CSS for styling the page
import { useParams } from 'react-router-dom';
import DinoJump from '../components/DinoJump'; // Import the DinoJump component
import ChimpTest from '../components/Chimptest'; // Import the ChimpTest component
import ColourPuzzle from '../components/ColourPuzzleInfo';

const Reaction = () => {
    const { screen } = useParams();

    // State to hold the reaction times for each attempt
    const [reactionTimes, setReactionTimes] = useState([]);
    // State to hold the calculated average reaction time after three attempts
    const [averageTime, setAverageTime] = useState(null);
    // State to hold the user's rank based on their average time
    const [rank, setRank] = useState(null);
    // State to hold the top 5 scores of the day
    const [topScores, setTopScores] = useState([]);
    // State to hold the user's name for saving their score
    const [name, setName] = useState('');
    // State to indicate if the score has been successfully saved
    const [scoreSaved, setScoreSaved] = useState(false);
    //define the units, decimal points and game name of the game scores
    const[units, setUnits] = useState("s");
    const[dp, setDp] = useState(2);
    const[gameName, setGameName] = useState(null);

    // useEffect hook to fetch the top scores as soon as the component mounts
    useEffect(() => {
        defineUnits();
        defineDp();
        defineGameName();
        getTopScores(); // Automatically fetch top scores when the page loads
    }, []);

    // Function to handle completion of a game 
    const onGameOver = (time) => {
        const newTimes = [...reactionTimes, time]; // Add the new time to the array of reaction times

        // If there are 3 attempts, calculate the average and determine the rank
        if (newTimes.length === 3) {
            const average = newTimes.reduce((acc, cur) => acc + cur, 0) / 3;
            setAverageTime(average);
            getRank(average); // Get the rank based on the average time
        }

        setReactionTimes(newTimes); // Update the state with the new reaction times array
    };

    // Function to get the user's rank based on their average reaction time
    const getRank = async (average) => {
        try {
            const response = await fetch('/api/reaction/rank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'screen': screen },
                body: JSON.stringify({ score: average }) // Send the average score to the backend
            });
            const data = await response.json();
            setRank(data.rank); // Update the rank state with the response data
        } catch (error) {
            console.error('Error fetching rank:', error);
        }
    };

    // Function to fetch the top 5 scores of the day from the backend
    const getTopScores = async () => {
        try {
            const response = await fetch('/api/reaction/top-scores',{ headers: { 'screen': screen }});
            if (!response.ok) {
                throw new Error('Failed to fetch top scores');
            }
            const data = await response.json();
            console.log('Fetched top scores:', data); // Debugging line to log the fetched scores
            setTopScores(data); // Update the topScores state with the fetched data
        } catch (error) {
            console.error('Error fetching top scores:', error);
        }
    };

    // Function to save the user's score to the backend
    const saveScore = async () => {
        try {
            await fetch('/api/reaction/save-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'screen': screen  },
                body: JSON.stringify({ name, score: averageTime }) // Send the user's name and average score to the backend
            });
            setScoreSaved(true); // Set the scoreSaved state to true upon successful save
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };
    const defineUnits = () => {
        switch(screen){
            case "1":
                setUnits("s");
                break;
            case "2":
                setUnits("ms");
                break;
            case "3":
                setUnits("s");
                break;
            case "4":
                setUnits("points");
                break;
            default:
                setUnits("ms");
                break;
        }}
    const defineDp = () => {    
        switch(screen){
            case "1":
                setDp(2);
                break;
            case "2":
                setDp(2);
                break;
            case "3":
                setDp(2);
                break;
            case "4":
                setDp(0);
                break;
            default:
                setDp(2);
    }}

    const defineGameName = () => {    
        switch(screen){
            case "1":
                setGameName("Dino Jump");
                break;
            case "2":
                setGameName("Reaction Game");
                break;
           
            case "3":
                setGameName("Colour Puzzle");
                break;
                case "4":
                    setGameName("Chimp Test");
                    break;
            default:
                setGameName("Game");
                break;

        }}

    const renderScreenComponent = () => {
        switch (screen) {
          case "1":
          
            return <DinoJump onGameOver={onGameOver} />;
          case "2":
            
            return <ReactionGame onGameOver={onGameOver}/>;
            case "3":
                return <ColourPuzzle />;

            case "4":
                
                return <ChimpTest onGameOver={onGameOver}/>;
        
          default:
            return <div>Invalid screen parameter</div>; // Optional fallback for invalid screens
        }
      };

    return (
        <div className="reaction-page">
            <h1>{gameName}</h1>

            {/* Include the Game component  */}
           {renderScreenComponent()}

            <div className="stats-and-leaderboard">
                <div className="statistics">
                    <h2>Statistics</h2>
                    {reactionTimes.length > 0 ? (
                        <ul>
                            {/* Display each reaction time in the list */}
                            {reactionTimes.map((time, index) => (
                                <li key={index}>Attempt {index + 1}: {time.toFixed(dp)} {units}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No attempts yet.</p> // Display this message if there are no attempts yet
                    )}

                    {averageTime && (
                        <div>
                            <p>The average of your last 3 attempts: {averageTime.toFixed(dp)} {units}</p>
                            <p>Your rank: {rank}</p>
                            {/* Button to save the user's score */}
                            <button onClick={saveScore}>Save your score</button>
                            {/* Input field for the user to enter their name */}
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {/* Display a confirmation message if the score is saved */}
                            {scoreSaved && <p>Score saved, {name}!</p>}
                        </div>
                    )}
                </div>

                {/* Leaderboard displaying the top 5 scores of the day */}
                <div className="leaderboard">
                    <h2>Top 5 Scores of the Day</h2>
                    <ul>
                        {topScores.length > 0 ? (
                            topScores.map((score, index) => (
                                <li key={score._id}>{score.name}: {score.score.toFixed(dp)} {units}</li>
                            ))
                        ) : (
                            <li>No scores available</li> // Display this message if no scores are available
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Reaction;
