const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // ingredients: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "Ingredient",
  //   required: false,
  // },
});

module.exports = mongoose.model("Recipe", recipeSchema);
