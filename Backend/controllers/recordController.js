const ReactionGameRecords = require("../models/reactionRecordModel");
const DinoJumpRecords = require("../models/dinoJumpRecordModel");
const ChimpTestRecords = require("../models/chimpTestRecordModel");
const ColourPuzzleRecords = require("../models/colourPuzzleRecordModel");
const OverallRecords = require("../models/overallScoreRecordModel");

// Function to get records based on the screen type
const getRecordsByScreen = async (screen) => {
  switch (screen) {
    case "1":
      return DinoJumpRecords.find({}).sort({ createdAt: -1 });
    case "2":
      return ReactionGameRecords.find({}).sort({ createdAt: -1 });
    case "3":
      return ColourPuzzleRecords.find({}).sort({ createdAt: -1 });
    case "4":
      return ChimpTestRecords.find({}).sort({ createdAt: -1 });
    default:
      throw new Error("Invalid screen type");
  }
};

// Function to get top scores based on the screen type
const getTopScoresByScreen = async (screen) => {
  switch (screen) {
    case "1":
      return DinoJumpRecords.find({}).sort({ score: -1 }).limit(5);
    case "2":
      return ReactionGameRecords.find({}).sort({ score: 1 }).limit(5);
    case "3":
      return ColourPuzzleRecords.find({}).sort({ score: -1 }).limit(5);
    case "4":
      return ChimpTestRecords.find({}).sort({ score: -1 }).limit(5);
    default:
      throw new Error("Invalid screen type");
  }
};

// Function to update overall records
const updateOverallScore = async (name, screen, score, existingRecord) => {
  let updateData = {};
  if (
    screen === "1" &&
    (existingRecord.dinoJumpScore == null ||
      score > existingRecord.dinoJumpScore)
  ) {
    updateData.dinoJumpScore = score;
  } else if (
    screen === "2" &&
    (existingRecord.reactionGameScore == null ||
      score < existingRecord.reactionGameScore)
  ) {
    updateData.reactionGameScore = score;
  } else if (
    screen === "3" &&
    (existingRecord.colourPuzzleScore == null ||
      score < existingRecord.colourPuzzleScore)
  ) {
    updateData.colourPuzzleScore = score;
  } else if (
    screen === "4" &&
    (existingRecord.chimpTestScore == null ||
      score > existingRecord.chimpTestScore)
  ) {
    updateData.chimpTestScore = score;
  }

  if (Object.keys(updateData).length > 0) {
    return OverallRecords.findOneAndUpdate({ name }, updateData, { new: true });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await getRecordsByScreen(req.headers["screen"]);
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get top 5 scores of the day
const getTopScores = async (req, res) => {
  try {
    const topScores = await getTopScoresByScreen(req.headers["screen"]);
    res.status(200).json(topScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserScores = async (req, res) => {
  try {
    const records = await OverallRecords.find({}).sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Save a new score
const saveScore = async (req, res) => {
  const { name, score } = req.body;
  const screen = req.headers["screen"];

  try {
    let nameRecordExists =
      (await OverallRecords.findOne({ name })) ||
      (await OverallRecords.create({
        name,
        dinoJumpScore: null,
        reactionGameScore: null,
        colourPuzzleScore: null,
        chimpTestScore: null,
      }));

    let record;
    if (screen === "1") {
      record = await DinoJumpRecords.create({ name, score });
    } else if (screen === "2") {
      record = await ReactionGameRecords.create({ name, score });
    } else if (screen === "3") {
      record = await ColourPuzzleRecords.create({ name, score });
    } else if (screen === "4") {
      record = await ChimpTestRecords.create({ name, score });
    }

    await updateOverallScore(name, screen, score, nameRecordExists);

    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user rank based on score
const getUserRank = async (req, res) => {
  const { score } = req.body;
  const screen = req.headers["screen"];

  try {
    let allRecords;
    let rank = 1;

    allRecords = await getRecordsByScreen(screen);

    for (let i = 0; i < allRecords.length; i++) {
      if (
        screen === "2" || screen === "3"
          ? allRecords[i].score <= score
          : allRecords[i].score >= score
      ) {
        rank++;
      } else {
        break;
      }
    }

    res.status(200).json({ rank });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllRecords,
  getTopScores,
  getUserScores,
  saveScore,
  getUserRank,
};
