const Feed = require("../models/feeds");
const _ = require("lodash");
const feedsCltr = {};

feedsCltr.category = async (req, res) => {
  const { limit, skip, id } = req.query;
  try {
    let query = {};
    if (id) query = { category: id };
    else query = {};
    const totalPages = Math.ceil((await Feed.countDocuments(query)) / 20);
    const feeds = await Feed.find(query)
      .sort({ pubDate: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "category",
        model: "Category",
        select: { name: 1 },
      });
    res.json({ feeds, totalPages });
  } catch (e) {
    res.status(500).json(e);
  }
};

feedsCltr.one = async (req, res) => {
  try {
    const singleFeed = await Feed.findById(req.query.id).populate({
      path: "category",
      model: "Category",
      select: { name: 1 },
    });
    res.json(singleFeed);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = feedsCltr;
