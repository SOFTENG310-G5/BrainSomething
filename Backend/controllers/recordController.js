const ReactionGameRecords = require("../models/reactionRecordModel");
const DinoJumpRecords = require("../models/dinoJumpRecordModel");
const ChimpTestRecords = require("../models/chimpTestRecordModel");
const ColourPuzzleRecords = require("../models/colourPuzzleRecordModel");
const OverallRecords = require("../models/overallScoreRecordModel");
const startOfDay = new Date().setHours(0, 0, 0, 0);
const endOfDay = new Date().setHours(23, 59, 59, 999);

// Utility function to get records based on screen type
const getRecordsByScreen = async (screen) => {
  switch (screen) {
    case "1":
      return await DinoJumpRecords.find({}).sort({ createdAt: -1 });
    case "2":
      return await ReactionGameRecords.find({}).sort({ createdAt: -1 });
    case "3":
      return await ColourPuzzleRecords.find({}).sort({ createdAt: -1 });
    case "4":
      return await ChimpTestRecords.find({}).sort({ createdAt: -1 });
    default:
      throw new Error("Invalid screen type");
  }
};

// Utility function to get top scores of the day based on screen type
const getTopScoresByScreen = async (screen) => {
  switch (screen) {
    case "1":
      return await DinoJumpRecords.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      })
        .sort({ score: -1 })
        .limit(5);
    case "2":
      return await ReactionGameRecords.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      })
        .sort({ score: 1 })
        .limit(5);
    case "3":
      return await ColourPuzzleRecords.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      })
        .sort({ score: -1 })
        .limit(5);
    case "4":
      return await ChimpTestRecords.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      })
        .sort({ score: -1 })
        .limit(5);
    default:
      throw new Error("Invalid screen type");
  }
};

// Utility function to save scores and update overall records
const saveScoreAndUpdateOverall = async (name, score, screen) => {
  let overallRecord = await OverallRecords.findOne({ name });

  // Create a new overall record if it doesn't exist
  if (!overallRecord) {
    overallRecord = await OverallRecords.create({
      name,
      dinoJumpScore: null,
      reactionGameScore: null,
      colourPuzzleScore: null,
      chimpTestScore: null,
    });
  }

  let record;
  switch (screen) {
    case "1":
      record = await DinoJumpRecords.create({ name, score });
      if (!overallRecord.dinoJumpScore || score > overallRecord.dinoJumpScore) {
        await OverallRecords.findOneAndUpdate(
          { name },
          { dinoJumpScore: score },
          { new: true }
        );
      }
      break;
    case "2":
      record = await ReactionGameRecords.create({ name, score });
      if (
        !overallRecord.reactionGameScore ||
        score < overallRecord.reactionGameScore
      ) {
        await OverallRecords.findOneAndUpdate(
          { name },
          { reactionGameScore: score },
          { new: true }
        );
      }
      break;
    case "3":
      record = await ColourPuzzleRecords.create({ name, score });
      if (
        !overallRecord.colourPuzzleScore ||
        score < overallRecord.colourPuzzleScore
      ) {
        await OverallRecords.findOneAndUpdate(
          { name },
          { colourPuzzleScore: score },
          { new: true }
        );
      }
      break;
    case "4":
      record = await ChimpTestRecords.create({ name, score });
      if (
        !overallRecord.chimpTestScore ||
        score > overallRecord.chimpTestScore
      ) {
        await OverallRecords.findOneAndUpdate(
          { name },
          { chimpTestScore: score },
          { new: true }
        );
      }
      break;
    default:
      throw new Error("Invalid screen type");
  }

  return record;
};

// Get all records
const getAllRecords = async (req, res) => {
  try {
    const screen = req.headers["screen"];
    const records = await getRecordsByScreen(screen);
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get top 5 scores of the day
const getTopScores = async (req, res) => {
  try {
    const screen = req.headers["screen"];
    const topScores = await getTopScoresByScreen(screen);
    res.status(200).json(topScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user scores
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
    const record = await saveScoreAndUpdateOverall(name, score, screen);
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user rank based on score
const getUserRank = async (req, res) => {
  const { score } = req.body;

  try {
    const screen = req.headers["screen"];
    let allRecords;
    let rank = 1;

    switch (screen) {
      case "1":
        allRecords = await DinoJumpRecords.find({
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        }).sort({ score: -1 });
        break;
      case "2":
        allRecords = await ReactionGameRecords.find({
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        }).sort({ score: 1 });
        break;
      case "3":
        allRecords = await ColourPuzzleRecords.find({
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        }).sort({ score: 1 });
        break;
      case "4":
        allRecords = await ChimpTestRecords.find({
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        }).sort({ score: -1 });
        break;
      default:
        throw new Error("Invalid screen type");
    }

    for (let record of allRecords) {
      if (
        screen === "2" || screen === "3"
          ? record.score <= score
          : record.score >= score
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
