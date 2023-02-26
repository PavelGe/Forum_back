const jwt = require("jsonwebtoken");
const AnswerSchema = require("../models/AnswerModel");
const QuestionsSchema = require("../models/QuestionsModel");

module.exports.POST_ANSWER = async (req, res) => {
  const answer = new AnswerSchema({
    author: req.body.author,
    answer: req.body.answer,
    questionId: req.params.id,
    likeCount: 0,
  });

  answer
    .save()
    .then((result) => {
      return res.status(200).json({
        response: "Answer was posted successfully",
        question: result,
      });
    })
    .then(() => {
      QuestionsSchema.updateOne(
        { _id: req.params.id },
        { $inc: { commentCount: +1 } }
      ).then((question) => {
        console.log(question);
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ response: "Failed" });
    });
};

module.exports.GET_ANSWERS = async (req, res) => {
  AnswerSchema.find({ questionId: req.params.id }).then((results) => {
    return res.status(200).json({ answers: results });
  });
};

module.exports.DELETE_ANSWER = async function (req, res) {
  try {
    const answer = await AnswerSchema.findOne({ _id: req.body.id });

    console.log(req.body);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    await AnswerSchema.deleteOne({ _id: req.body.id }).then(() => {
      QuestionsSchema.updateOne(
        { _id: req.params.id },
        { $inc: { commentCount: -1 } }
      ).exec();
    });
    return res.status(200).json("Answer deleted successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.LIKE_ANSWER = async (req, res) => {
  try {
    const answer = await AnswerSchema.findById(req.body.id);

    if (answer.usersThatDisliked.includes(req.userId)) {
      await AnswerSchema.updateOne(
        { _id: req.body.id },
        { $inc: { likeCount: +1 }, $pull: { usersThatDisliked: req.userId } }
      ).then(() => {
        return res.status(201);
      });
    } else if (answer.usersThatLiked.includes(req.userId)) {
      return res.status(202).json({ success: true });
    } else
      await AnswerSchema.updateOne(
        { _id: req.body.id },
        {
          $inc: { likeCount: +1 },
          $addToSet: { usersThatLiked: req.userId },
          $pull: { usersThatDisliked: req.userId },
        }
      );
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update answer" });
  }
};

module.exports.DISLIKE_ANSWER = async (req, res) => {
  try {
    const answer = await AnswerSchema.findById(req.body.id);

    if (answer.usersThatLiked.includes(req.userId)) {
      await AnswerSchema.updateOne(
        { _id: req.body.id },
        {
          $inc: { likeCount: -1 },
          $pull: { usersThatLiked: req.userId },
        }
      ).then(() => {
        return res.status(201);
      });
    } else if (answer.usersThatDisliked.includes(req.userId)) {
      return res.status(202).json({ success: true });
    } else
      await AnswerSchema.updateOne(
        { _id: req.body.id },
        {
          $inc: { likeCount: -1 },
          $addToSet: { usersThatDisliked: req.userId },
          $pull: { usersThatLiked: req.userId },
        }
      );
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update answer" });
  }
};
