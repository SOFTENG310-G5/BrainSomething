import './HackPuzzle.css';
import PuzzleCard from "../components/PuzzleCard"
import OrderCard from './OrderCards';

const HackPuzzle  = () =>{
    //these dummy arrays should be replaced once we have the ranomiser for these
    const dummyCardColours = ["#f700b1", "#990e99", "#372dfc", "#00bf3d"];
    const dummyShapeColours = ["#00bf3d", "white", "#fbd906", "red"];
    const dummyShapeType = ["triangle", "rectangle", "square", "circle"];
    const dummyShapeText = ["square", "triangle", "circle", "rectangle"];
    const dummyColourText = ["red", "yellow", "blue", "purple"];
    const dummyNumber = ["2","4","1","3"];
    const dummyNumberColours = ["#990e99", "#fbd906", "white", "blue"];
    const dummyShapeTextColour = ["#372dfc", "red", "#f700b1", "black"];
    const dummyColourTextColour = ["red", "#372dfc", "#990e99", "white"];
    //for the randomiser
    //white = #ffffff
    //black = #000000
    //green = #00bf3d
    //yellow = #fbd906
    //blue = #0e04e4
    //purple = #990e99
    //red = #e9040d
    //pink = #f700b1
    

    return (
        <div className="background">
            <div className="input-area">
            <div className="card-collection">
            <PuzzleCard 
                cardColour={dummyCardColours[0]}
                shapeColour={dummyShapeColours[0]}
                shapeType={dummyShapeType[0]}
                shapeText={dummyShapeText[0]}
                colourText={dummyColourText[0]}
                number={dummyNumber[0]}
                numberColour={dummyNumberColours[0]}
                shapeTextColour={dummyShapeTextColour[0]}
                colourTextColour={dummyColourTextColour[0]}
            />
            <PuzzleCard 
                cardColour={dummyCardColours[1]}
                shapeColour={dummyShapeColours[1]}
                shapeType={dummyShapeType[1]}
                shapeText={dummyShapeText[1]}
                colourText={dummyColourText[1]}
                number={dummyNumber[1]}
                numberColour={dummyNumberColours[1]}
                shapeTextColour={dummyShapeTextColour[1]}
                colourTextColour={dummyColourTextColour[1]}
            />
            <PuzzleCard 
                cardColour={dummyCardColours[2]}
                shapeColour={dummyShapeColours[2]}
                shapeType={dummyShapeType[2]}
                shapeText={dummyShapeText[2]}
                colourText={dummyColourText[2]}
                number={dummyNumber[2]}
                numberColour={dummyNumberColours[2]}
                shapeTextColour={dummyShapeTextColour[2]}
                colourTextColour={dummyColourTextColour[2]}
            />
            <PuzzleCard 
                cardColour={dummyCardColours[3]}
                shapeColour={dummyShapeColours[3]}
                shapeType={dummyShapeType[3]}
                shapeText={dummyShapeText[3]}
                colourText={dummyColourText[3]}
                number={dummyNumber[3]}
                numberColour={dummyNumberColours[3]}
                shapeTextColour={dummyShapeTextColour[3]}
                colourTextColour={dummyColourTextColour[3]}
            />
            </div>
            <input type="text" id="answerBox" placeholder="eg. blue square..."></input>
            </div>
        </div>
        
    )
}

export default HackPuzzle;