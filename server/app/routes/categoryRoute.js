const { Router } = require("express");
const router = Router();
const categoriesCltr = require("../controllers/categoriesCltr");
const validate = require("../middlewares/validate");
const { authenticateUser, authorizeUser } = require("../middlewares/auth");
const { checkSchema } = require("express-validator");
const categoryValidation = require("../helpers/categoriesValidation");

router.post(
  "/new",
  authenticateUser,
  authorizeUser(["admin"]),
  checkSchema(categoryValidation),
  validate,
  categoriesCltr.new
);

router.get("/all", authenticateUser, categoriesCltr.list);
router.delete("/delete", authenticateUser, categoriesCltr.delete);

module.exports = router;
