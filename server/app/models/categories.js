const { Schema, model } = require("mongoose");
const categoriesSchema = new Schema(
  {
    name: String,
    url: String,
    feeds: [
      {
        feedId: {
          type: Schema.Types.ObjectId,
          ref: "Feed",
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

const Category = model("Category", categoriesSchema);
module.exports = Category;
