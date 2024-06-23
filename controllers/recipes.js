const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");

router.get("/new", async (req, res) => {
  res.render("recipes/new.ejs");
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("owner");

    res.render("recipes/show.ejs", {
      recipe: recipe,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/recipes");
  }
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({}).populate("owner");
    res.render("recipes/index.ejs", { recipes: recipes });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id;
    await newRecipe.save();
    res.redirect("/recipes");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.owner.equals(req.session.user._id)) {
      await recipe.deleteOne();
      res.redirect("/recipes");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
