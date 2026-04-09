"use strict";
const express = require("express");
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.get("/", jokeController.fetchAllJokes);
router.get("/categories", jokeController.fetchCategs);
router.get("/random", jokeController.fetchRandomFunction);
router.get("/category/:category", jokeController.fetchJokesByType);
router.post("/add", jokeController.createJoke);
module.exports = router;