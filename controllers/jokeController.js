"use strict";
const model = require('../models/jokeModel');

async function fetchAllJokes(req, res) {
    try {
        const jokes = await model.getAllJokes();
        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchCategs(req, res) {
    try {
        const cat = await model.getCategs();
        res.json(cat);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchRandomFunction(req, res) {
        try {
            const product = await model.getRandomFunction();
            res.json(product);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
}

async function fetchJokesByType(req, res) {
    const type = req.params.category;
    const limit = req.query.limit;
    let params;
    if (type) {
        try {
            params = [type];
            let limitNumber = null;
            if (limit !== undefined) {
                limitNumber = parseInt(limit, 10);
                if (isNaN(limitNumber) || limitNumber <= 0) {
                    return res.status(400).send("Limit must be a positive integer");
                }
                params.push(limitNumber);
            }
            
            const products = await model.getJokesByType(params, limitNumber);
            res.json(products);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required type param!");
    }
}

async function createJoke(req, res) {
    const { category, setup, delivery } = req.body;
    if (category && setup && delivery) {
        try {
            const newJoke = await model.addJoke(category, setup, delivery);
            res.status(201).json(newJoke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required product fields!");
    }
}

module.exports = {
    fetchAllJokes,
    fetchCategs,
    fetchRandomFunction,
    fetchJokesByType,
    createJoke
};