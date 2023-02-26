const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  author: { type: String, required: true },
  answer: { type: String, required: true },
  questionId: { type: String, required: true },
  likeCount: { type: Number, required: true },
  usersThatLiked: { type: Array },
  usersThatDisliked: { type: Array },
});

module.exports = mongoose.model("Answers", AnswerSchema);
