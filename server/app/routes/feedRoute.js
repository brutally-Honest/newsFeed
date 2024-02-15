const { Router } = require("express");
const router = Router();
const feedsCltr = require("../controllers/feedsCltr");
const { authenticateUser } = require("../middlewares/auth");
router.get("/category", authenticateUser, feedsCltr.category);
router.get("/one", authenticateUser, feedsCltr.one);
module.exports = router;
