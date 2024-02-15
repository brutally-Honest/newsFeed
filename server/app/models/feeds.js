const { Schema, model } = require("mongoose");
const feedSchema = new Schema({
  title: String,
  link: String,
  pubDate: Date,
  image: String,
  description: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});
const Feed = model("Feed", feedSchema);
module.exports = Feed;
