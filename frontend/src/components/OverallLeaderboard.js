import '../pages/Home.css'; // Import CSS for styling the page
import React,{ useState,useEffect } from "react";

const OverallLeaderboard = () => {
    
    const[userScoresArray, setUserScoresArray] = useState([[]]);
    
    useEffect(() => {
       getUserScores();
      
    }, []);

    const getUserScores = async () => {
        try {
            const response = await fetch('/api/reaction/get-user-scores');
            if (!response.ok) {
                throw new Error('Failed to fetch name scores');
            }
            const data = await response.json();
           
           
            const updatedUserScoresArray = data.map(item => [
                item.name,
                item.dinoJumpScore,
                item.reactionGameScore,
                item.colourPuzzleScore,
                item.chimpTestScore,
            
                (item.dinoJumpScore!=null && item.reactionGameScore!=null && item.colourPuzzleScore!=null && item.chimpTestScore!=null) ? 0.25 * item.dinoJumpScore + 0.1 * item.reactionGameScore + 0.15 * item.colourPuzzleScore + 0.5 * item.chimpTestScore : "N/A"
                   
            ]);
            setUserScoresArray(updatedUserScoresArray);
            
        } catch (error) {
            console.error('Error fetching top scores:', error);
        }
    };
    
  
   
    return (
 <div>
    <div>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Overall Score</th>
                <th>Dino Jump Score</th>
                <th>Reaction Game Score</th>
                <th>Colour Puzzle Score</th>
                <th>Chimp Test Score</th>
            </tr>
        </thead>
        <tbody>
        {userScoresArray.length > 0 ? (
                        userScoresArray.map((subArray, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Rank */}
                                <td>{subArray[0]}</td> {/* Name */}
                                <td>{ subArray[5]}</td> {/* Overall Score */}
                                    
                                <td>{(subArray[1])} (s)</td> {/* Dino Jump Score */}
                                <td>{(subArray[2])} (ms)</td> {/* Reaction Game Score */}
                                <td>{(subArray[3])} (s)</td> {/* Colour Puzzle Score */}
                                <td>{subArray[4]} (points)</td> {/* Chimp Test Score */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>overall</td>
                            <td>100</td>
                            <td>200</td>
                            <td>300</td>
                            <td>400</td>
                        
                           
                        </tr>
                    )}
        </tbody>
    </table>
    </div>
 
</div>
    )
            
            
            };
            export default OverallLeaderboard;
