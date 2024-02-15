const User = require("../models/users");
const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersCltr = {};

usersCltr.register = async (req, res) => {
  const body = _.pick(req.body, ["email", "password", "userName"]);
  try {
    const user = new User(body);
    const usersCount = await User.countDocuments();
    if (usersCount == 0) user.role = "admin";
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

usersCltr.login = async (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) return res.status(404).json("Invalid email/password");
    const compare = await bcryptjs.compare(body.password, user.password);
    if (!compare) return res.status(404).json("Invalid email/password");
    const tokenData = { id: user._id, role: user.role };
    const token = jwt.sign(tokenData, process.env.JWT_KEY || "yourJwtKey", {
      expiresIn: "1d",
    });
    return res.json(token);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = usersCltr;
