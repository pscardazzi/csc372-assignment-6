//jokeController.js
"use strict";
const model = require('../models/jokeModel');

/* 
fetchAllJokes/fetchCategs/fetchRandomFunction here attempts
to take the functions inside the jokeModel, and returns the
result as a JSON if successful. If not successful, returns error 500
and a message.
*/ 
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
/* fetchJokesByType is a little different. it grabs the category and limit specifically,
then checks if the limit is not undefined. If so, it parses the data as an int, and throws
an error if the result is not a number or less than or equal to 0. Once that's checked, then
the limit is pushed, and getJokesByType is called. */
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

/*
createJoke is similar to the previous functions. The main few differences is 
the three constants taking req.body, and it returns server code 201 if 
addJoke is successful.
*/
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

//This exports all functions
module.exports = {
    fetchAllJokes,
    fetchCategs,
    fetchRandomFunction,
    fetchJokesByType,
    createJoke
};