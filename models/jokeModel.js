"use strict";
const pool = require('./dbConnection');

async function getAllJokes() {
    const queryText = "SELECT * FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getCategs(){
    const queryText = "SELECT DISTINCT category FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}


async function getRandomFunction() {
    const queryText = "SELECT * FROM jokes ORDER BY random() LIMIT 1";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getJokesByType(params, limit) {
    let queryText = "SELECT * FROM jokes where category= $1";

    if (limit){
        queryText += " LIMIT $2";
    }

    const result = await pool.query(queryText, params);
    return result.rows;
}

async function addJoke(category, setup, delivery) {
    let queryText = "INSERT INTO jokes (category, setup, delivery) VALUES ($1, $2, $3) RETURNING *";
    let values = [category, setup, delivery];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}
module.exports = {
    getAllJokes,
    getCategs,
    getRandomFunction,
    getJokesByType,
    addJoke
};