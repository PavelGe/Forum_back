const jwt = require("jsonwebtoken");
const QuestionsSchema = require("../models/QuestionsModel");
const AnswerSchema = require("../models/AnswerModel");

module.exports.POST_QUESTION = async (req, res) => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const question = new QuestionsSchema({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    isAnswered: req.body.isAnswered,
    commentCount: req.body.commentCount,
    postDate: `${day}-${month}-${year}`,
  });

  question
    .save()
    .then((result) => {
      return res.status(200).json({
        response: "Question was posted successfully",
        question: result,
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ response: "Failed" });
    });
};

module.exports.GET_QUESTIONS = async (req, res) => {
  QuestionsSchema.find().then((results) => {
    return res.status(200).json({ questions: results });
  });
};

module.exports.GET_QUESTION = async (req, res) => {
  QuestionsSchema.find({ _id: req.params.id }).then((results) => {
    return res.status(200).json({ question: results });
  });
};

module.exports.DELETE_QUESTION = async function (req, res) {
  await QuestionsSchema.deleteOne({ _id: req.params.id }).then(() => {
    AnswerSchema.deleteMany({ questionId: req.params.id }).exec();
  });

  return res.status(200).json("Question deleted successfully");
};
