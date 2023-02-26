const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userRoutes = require("../controllers/Users");
const questionRoutes = require("../controllers/Questions");
const answerRoutes = require("../controllers/Answers");

//User Routes
router.post("/register", userRoutes.CREATE_USER);
router.post("/login", userRoutes.USER_LOGIN);

// Question Routes
router.post("/question", auth, questionRoutes.POST_QUESTION);
router.get("/questions", questionRoutes.GET_QUESTIONS);
router.get("/question/:id", questionRoutes.GET_QUESTION);
router.delete("/question/:id", questionRoutes.DELETE_QUESTION); //auth

// Answer Routes
router.post("/question/:id/answer", auth, answerRoutes.POST_ANSWER);
router.get("/question/:id/answers", answerRoutes.GET_ANSWERS);
router.post("/answer/:id", auth, answerRoutes.DELETE_ANSWER);
router.post("/like/answer", auth, answerRoutes.LIKE_ANSWER);
router.post("/dislike/answer", auth, answerRoutes.DISLIKE_ANSWER);

module.exports = router;
