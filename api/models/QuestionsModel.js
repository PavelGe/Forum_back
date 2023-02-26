const mongoose = require("mongoose");

const QuestionsSchema = mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  postDate: { type: Object, required: true },
  commentCount: { type: Number, required: true },
});

module.exports = mongoose.model("Questions", QuestionsSchema);
