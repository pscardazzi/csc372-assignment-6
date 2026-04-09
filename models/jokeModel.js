//jokeModel.js
"use strict";
const pool = require('./dbConnection');

//Selects all data from jokes, then returns rows
async function getAllJokes() {
    const queryText = "SELECT * FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

//Selects distinct categories from jokes, then returns rows
async function getCategs(){
    const queryText = "SELECT DISTINCT category FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

//Selects 1 joke in random order, then returns row
async function getRandomFunction() {
    const queryText = "SELECT * FROM jokes ORDER BY random() LIMIT 1";
    const result = await pool.query(queryText);
    return result.rows;
}

//Select all jokes in a user-specified category, then returns rows 
async function getJokesByType(params, limit) {
    let queryText = "SELECT * FROM jokes where category= $1";

    if (limit){
        queryText += " LIMIT $2";
    }

    const result = await pool.query(queryText, params);
    return result.rows;
}

//Insert user-specified category, setup, and delivery into jokes, then returns the added joke
async function addJoke(category, setup, delivery) {
    let queryText = "INSERT INTO jokes (category, setup, delivery) VALUES ($1, $2, $3) RETURNING *";
    let values = [category, setup, delivery];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

//exports all functions
module.exports = {
    getAllJokes,
    getCategs,
    getRandomFunction,
    getJokesByType,
    addJoke
};