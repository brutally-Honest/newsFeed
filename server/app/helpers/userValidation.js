const User = require("../models/users");
const userRegisterSchema = {
  username: {
    notEmpty: { errorMessage: "Name should not be empty" },
  },
  email: {
    notEmpty: { errorMessage: "Email is required", bail: true },
    isEmail: { errorMessage: "Invalid Email format", bail: true },
    custom: {
      options: async (value) => {
        const user = await User.findOne({ email: value });
        if (!user) return true;
        throw new Error("Oops! Email already taken!");
      },
    },
  },
  password: {
    notEmpty: { errorMessage: "Password should not be empty", bail: true },
    isStrongPassword: {
      errorMessage: "Password is weak!",
      options: {
        minLength: 8,
      },
    },
  },
};

const userLoginSchema = {
  email: {
    notEmpty: { errorMessage: "Email should not be empty", bail: true },
    isEmail: { errorMessage: "Invalid email format" },
  },
  password: { notEmpty: { errorMessage: "Password is required" } },
};

module.exports = {
  registerSchema: userRegisterSchema,
  loginSchema: userLoginSchema,
};
