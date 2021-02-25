const Sequelize = require('sequelize');
const database = require('./database');

const TextPost = database.define(
    'text_post',
    {
        post_id: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.TEXT
        },
        body: {
            type: Sequelize.TEXT
        }
    },
    { timestamps: false }
);


module.exports = TextPost;