const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const validate = require("../middlewares/validate");
const { loginSchema, registerSchema } = require("../helpers/userValidation");
const usersCltr = require("../controllers/usersCltr");

router.post(
  "/register",
  checkSchema(registerSchema),
  validate,
  usersCltr.register
);
router.post("/login", checkSchema(loginSchema), validate, usersCltr.login);

module.exports = router;
