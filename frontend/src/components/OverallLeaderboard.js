import '../pages/Games.css'; // Import CSS for styling the page
import React,{ useState,useEffect } from "react";

const OverallLeaderboard = () => {
    
  
    
    useEffect(() => {
      
      
    }, []);


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
       
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>overall</td>
                            <td>100</td>
                            <td>200</td>
                            <td>300</td>
                            <td>400</td>
                        
                           
                        </tr>
                    
        </tbody>
    </table>
    </div>
 
</div>
    )
            
            
            };
            export default OverallLeaderboard;
