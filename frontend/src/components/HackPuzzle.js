import "./HackPuzzle.css";
import PuzzleCard from "../components/PuzzleCard";
import ColourPuzzleHelper from "./ColourPuzzleHelper";
import React, { useState, useEffect, useMemo } from "react";

const HackPuzzle = ({ onSolutionCalculated, randomOrderArray }) => {
  const helper = useMemo(() => new ColourPuzzleHelper(), []);

  const [puzzleState, setPuzzleState] = useState({
    randomCardColours: [],
    randomShapeColours: [],
    randomShapeTypes: [],
    randomShapeText: [],
    randomColourText: [],
    randomNumbers: [],
    randomNumberColours: [],
    randomShapeTextColours: [],
    randomColourTextColours: [],
    randomQuestions: [],
    questionCards: [],
  });

  // Generate puzzle data and set state
  useEffect(() => {
    const cardColours = helper.getRandomShades();
    const shapeColours = helper.getRandomShades();
    const shapeTypes = helper.getRandomShapes();
    const shapeText = helper.getRandomShapes();
    const colourText = helper.getRandomColours();
    const numbers = helper.getRandomOrderArray();
    const numberColours = helper.getRandomShades();
    const shapeTextColours = helper.getRandomShades();
    const colourTextColours = helper.getRandomShades();
    const questions = helper.getRandomQuestions();
    const cards = helper.getRandomOrderArray();

    // Ensure shape colours are different from card colours
    const updatedShapeColours = shapeColours.map((shapeColour, index) => {
      let newShapeColour = shapeColour;
      while (cardColours[index] === newShapeColour) {
        newShapeColour = helper.getRandomShades()[0];
      }
      return newShapeColour;
    });

    setPuzzleState({
      randomCardColours: cardColours,
      randomShapeColours: updatedShapeColours,
      randomShapeTypes: shapeTypes,
      randomShapeText: shapeText,
      randomColourText: colourText,
      randomNumbers: numbers,
      randomNumberColours: numberColours,
      randomShapeTextColours: shapeTextColours,
      randomColourTextColours: colourTextColours,
      randomQuestions: questions,
      questionCards: cards,
    });
  }, [helper]);

  // Helper function to get the answer based on the question type
  const getAnswer = (question, index) => {
    const {
      randomCardColours,
      randomShapeColours,
      randomShapeTypes,
      randomShapeText,
      randomColourText,
      randomShapeTextColours,
      randomColourTextColours,
      randomNumberColours,
    } = puzzleState;

    switch (question) {
      case "background-colour":
        return helper.getColorName(randomCardColours[index]);
      case "shape-colour":
        return helper.getColorName(randomShapeColours[index]);
      case "shape-type":
        return randomShapeTypes[index];
      case "shape-text":
        return randomShapeText[index];
      case "colour-text":
        return randomColourText[index];
      case "shape-text-colour":
        return helper.getColorName(randomShapeTextColours[index]);
      case "colour-text-colour":
        return helper.getColorName(randomColourTextColours[index]);
      case "number-colour":
        return helper.getColorName(randomNumberColours[index]);
      default:
        return "";
    }
  };

  // Calculate the solution based on random questions
  const calculateSolution = () => {
    const { randomQuestions, questionCards } = puzzleState;
    const index1 = randomOrderArray.indexOf(questionCards[0]);
    const index2 = randomOrderArray.indexOf(questionCards[1]);

    const answer1 = getAnswer(randomQuestions[0], index1);
    const answer2 = getAnswer(randomQuestions[1], index2);

    return `${answer1} ${answer2}`;
  };

  // Calculate the solution and send it back via callback
  useEffect(() => {
    const solution = calculateSolution();
    if (solution) {
      onSolutionCalculated(solution);
    }
  }, [puzzleState, randomOrderArray, onSolutionCalculated]);

  // Destructure state for cleaner JSX rendering
  const {
    randomCardColours,
    randomShapeColours,
    randomShapeTypes,
    randomShapeText,
    randomColourText,
    randomNumbers,
    randomNumberColours,
    randomShapeTextColours,
    randomColourTextColours,
    randomQuestions,
    questionCards,
  } = puzzleState;

  return (
    <div className="background">
      <div className="input-area">
        <div className="card-collection">
          {randomCardColours.map((_, index) => (
            <PuzzleCard
              key={index}
              cardColour={randomCardColours[index]}
              shapeColour={randomShapeColours[index]}
              shapeType={randomShapeTypes[index]}
              shapeText={randomShapeText[index]}
              colourText={randomColourText[index]}
              number={randomNumbers[index]}
              numberColour={randomNumberColours[index]}
              shapeTextColour={randomShapeTextColours[index]}
              colourTextColour={randomColourTextColours[index]}
            />
          ))}
        </div>
        <div className="qna-box">
          <div className="questions">
            {randomQuestions[0]}({questionCards[0]}) and {randomQuestions[1]}(
            {questionCards[1]})
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackPuzzle;
