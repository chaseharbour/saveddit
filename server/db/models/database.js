const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

const database = new Sequelize(process.env.DATABASE_URL);


module.exports = database;