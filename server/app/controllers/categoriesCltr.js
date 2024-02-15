const Category = require("../models/categories");
const Feed = require("../models/feeds");
const _ = require("lodash");
const categoriesCltr = {};
categoriesCltr.new = async (req, res) => {
  const body = _.pick(req.body, ["name", "url"]);
  try {
    console.log(body);
    const myCategory = new Category(body);
    await myCategory.save();
    res.json(myCategory);
  } catch (e) {
    res.status(500).json(e);
  }
};

categoriesCltr.list = async (req, res) => {
  try {
    const allCategories = await Category.find({}).sort({ createdAt: -1 });
    res.json(allCategories);
  } catch (e) {
    console.log(e);
  }
};

categoriesCltr.delete = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.query.id, {
      new: true,
    });
    const feeds = await Feed.deleteMany({ category: req.query.id });
    res.json({ category, feeds });
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = categoriesCltr;
