import '../styles/HackPuzzle.css';
import PuzzleCard from "../components/PuzzleCard"
import ColourPuzzleHelper from './ColourPuzzleHelper';
import React, {useState, useEffect} from 'react';

const HackPuzzle  = ({ onSolutionCalculated, randomOrderArray }) =>{

    const helper = new ColourPuzzleHelper();

    const [randomCardColours, setRandomCardColours] = useState([]);
    const [randomShapeColours, setRandomShapeColours] = useState([]);
    const [randomShapeTypes, setRandomShapeTypes] = useState([]);
    const [randomShapeText, setRandomShapeText] = useState([]);
    const [randomColourText, setRandomColourText] = useState([]);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [randomNumberColours, setRandomNumberColours] = useState([]);
    const [randomShapeTextColours, setRandomShapeTextColours] = useState([]);
    const [randomColourTextColours, setRandomColourTextColours] = useState([]);
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [questionCards, setQuestionCards] = useState([]);
    

    useEffect(() =>{
        let cardColours = helper.getRandomShades();
        let shapeColours = helper.getRandomShades();
        let shapeTypes = helper.getRandomShapes();
        let shapeText = helper.getRandomShapes();
        let colourText = helper.getRandomColours();
        let numbers = helper.getRandomOrderArray();
        let numberColours = helper.getRandomShades();
        let shapeTextColours = helper.getRandomShades();
        let colourTextColours = helper.getRandomShades();
        let questions = helper.getRandomQuestions();
        let cards = helper.getRandomOrderArray();

        setRandomCardColours(cardColours);
        setRandomShapeColours(shapeColours);
        setRandomShapeTypes(shapeTypes);
        setRandomShapeText(shapeText);
        setRandomColourText(colourText);
        setRandomNumbers(numbers);
        setRandomNumberColours(numberColours);
        setRandomShapeTextColours(shapeTextColours);
        setRandomColourTextColours(colourTextColours);
        setRandomQuestions(questions);
        setQuestionCards(cards);
        const updatedShapeColours = shapeColours.map((shapeColour, index) => {
            let newShapeColour = shapeColour;
            while (cardColours[index] === newShapeColour) {
                newShapeColour = helper.getRandomShades()[0];
            }
            return newShapeColour;
        });

        setRandomShapeColours(updatedShapeColours);
    },[]);
    
    let answer1;
    let answer2;
    let place1 = questionCards[0];
    let place2 = questionCards[1];
    const index1 = randomOrderArray.indexOf(place1);
    const index2 = randomOrderArray.indexOf(place2);

    switch (randomQuestions[0]) {
        case "background-colour":
            answer1 = helper.getColorName(randomCardColours[index1]);
            break;
        case "shape-colour":
            answer1 = helper.getColorName(randomShapeColours[index1]);
            break;
        case "shape-type":
            answer1 = randomShapeTypes[index1];
            break;
        case "shape-text":
            answer1 = randomShapeText[index1];
            break;
        case "colour-text":
            answer1 = randomColourText[index1];
            break;
        case "shape-text-colour":
            answer1 = helper.getColorName(randomShapeTextColours[index1]);
            break;
        case "colour-text-colour":
            answer1 = helper.getColorName(randomColourTextColours[index1]);
            break;
        case "number-colour":
            answer1 = helper.getColorName(randomNumberColours[index1]);
            break;
        default:
            break;
    }

    switch (randomQuestions[1]) {
        case "background-colour":
            answer2 = helper.getColorName(randomCardColours[index2]);
            break;
        case "shape-colour":
            answer2 = helper.getColorName(randomShapeColours[index2]);
            break;
        case "shape-type":
            answer2 = randomShapeTypes[index2];
            break;
        case "shape-text":
            answer2 = randomShapeText[index2];
            break;
        case "colour-text":
            answer2 = randomColourText[index2];
            break;
        case "shape-text-colour":
            answer2 = helper.getColorName(randomShapeTextColours[index2]);
            break;
        case "colour-text-colour":
            answer2 = helper.getColorName(randomColourTextColours[index2]);
            break;
        case "number-colour":
            answer2 = helper.getColorName(randomNumberColours[index2]);
            break;
        default:
            break;
    }

    let solution = answer1 + " " + answer2;
    console.log(index1, index2)
    console.log(place1,place2)
    console.log(solution)
    useEffect(() => {
        if (solution) {
            onSolutionCalculated(solution);
        }
    }, [solution, onSolutionCalculated]);
    


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
                        <div className="qna-box">
                            <div className="questions">{randomQuestions[0]}({questionCards[0]}) and {randomQuestions[1]}({questionCards[1]})</div>
                        </div>
                    </div>
        </div>
        
    )
}

export default HackPuzzle;