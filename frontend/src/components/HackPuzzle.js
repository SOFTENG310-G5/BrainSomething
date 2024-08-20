import './HackPuzzle.css';
import PuzzleCard from "../components/PuzzleCard"
import ColourPuzzleHelper from './ColourPuzzleHelper';

const HackPuzzle  = () =>{

    const helper = new ColourPuzzleHelper();

    let randomCardColours = helper.getRandomShades();
    let randomShapeColours = helper.getRandomShades();
    const randomShapeTypes = helper.getRandomShapes();
    const randomShapeText = helper.getRandomShapes();
    const randomColourText = helper.getRandomColours();
    const randomNumbers = helper.getRandomOrderArray();
    let randomNumberColours = helper.getRandomShades();
    let randomShapeTextColours = helper.getRandomShades();
    let randomColourTextColours = helper.getRandomShades();

    randomCardColours = randomCardColours.map((cardColour, index) => {
        while (cardColour === randomShapeColours[index]) {
            randomShapeColours[index] = helper.getRandomItems(helper.colours, 1)[0];
        }
        return cardColour;
    });

    return (
        <div className="background">
            <div className="input-area">
            <div className="card-collection">
            <PuzzleCard 
                cardColour={randomCardColours[0]}
                shapeColour={randomShapeColours[0]}
                shapeType={randomShapeTypes[0]}
                shapeText={randomShapeText[0]}
                colourText={randomColourText[0]}
                number={randomNumbers[0]}
                numberColour={randomNumberColours[0]}
                shapeTextColour={randomShapeTextColours[0]}
                colourTextColour={randomColourTextColours[0]}
            />
            <PuzzleCard 
                cardColour={randomCardColours[1]}
                shapeColour={randomShapeColours[1]}
                shapeType={randomShapeTypes[1]}
                shapeText={randomShapeText[1]}
                colourText={randomColourText[1]}
                number={randomNumbers[1]}
                numberColour={randomNumberColours[1]}
                shapeTextColour={randomShapeTextColours[1]}
                colourTextColour={randomColourTextColours[1]}
            />
            <PuzzleCard 
                cardColour={randomCardColours[2]}
                shapeColour={randomShapeColours[2]}
                shapeType={randomShapeTypes[2]}
                shapeText={randomShapeText[2]}
                colourText={randomColourText[2]}
                number={randomNumbers[2]}
                numberColour={randomNumberColours[2]}
                shapeTextColour={randomShapeTextColours[2]}
                colourTextColour={randomColourTextColours[2]}
            />
            <PuzzleCard 
                cardColour={randomCardColours[3]}
                shapeColour={randomShapeColours[3]}
                shapeType={randomShapeTypes[3]}
                shapeText={randomShapeText[3]}
                colourText={randomColourText[3]}
                number={randomNumbers[3]}
                numberColour={randomNumberColours[3]}
                shapeTextColour={randomShapeTextColours[3]}
                colourTextColour={randomColourTextColours[3]}
            />
            </div>
            <input type="text" id="answerBox" placeholder="eg. blue square..."></input>
            </div>
        </div>
        
    )
}

export default HackPuzzle;