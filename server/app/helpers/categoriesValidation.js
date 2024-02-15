const Category = require("../models/categories");

const categoryValidation = {
  name: {
    notEmpty: { errorMessage: "Category name is required", bail: true },
    custom: {
      options: async (value) => {
        const category = await Category.findOne({
          name: { $regex: value, $options: "i" },
        });
        if (category) throw new Error("Category already present");
        return true;
      },
    },
  },
  url: {
    notEmpty: { errorMessage: "Category URL is required", bail: true },
    isURL: { errorMessage: "Invalid URL" },
  },
};

module.exports = categoryValidation;
