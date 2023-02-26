const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/UserModel");

module.exports.CREATE_USER = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new UserSchema({
    username: req.body.username,
    password: hashedPassword,
  });

  user
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ response: "User was created successfully", user: result });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ response: "Failed" });
    });
};

module.exports.USER_LOGIN = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ username: req.body.username });

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(user);

    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          username: user.username,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        { algorythm: "RS256" }
      );

      return res
        .status(200)
        .json({ status: "login successfull", jwt_token: token });
    }
  } catch (err) {
    console.log("req.body", req.body);
    console.log("err", err);
    return res.status(401).json({ status: "login failed" });
  }
};
