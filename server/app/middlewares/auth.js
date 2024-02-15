const jwt = require("jsonwebtoken");
const User = require("../models/users");
const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const tokenData = jwt.verify(token, process.env.JWT_KEY || "yourJwtKey");
    req.user = tokenData;
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};
const authorizeUser = (roles) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (roles.includes(user.role)) next();
    else res.status(403).json({ msg: "Access Forbidden", userRole: user.role });
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  authenticateUser,
  authorizeUser,
};
