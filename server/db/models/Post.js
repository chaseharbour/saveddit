const Sequelize = require('sequelize');
const database = require('./database');


//Create general post table
//Consists of:
//Type (text = 0 or link = 1)
//Post ID
//User Id
//Created At

//Determine structure specifics based on breejs documentation
//General idea:
//1. User creates a post on front end
//2. Post saved to database with user_id and a scheduled date
//3. Breejs workers query database to check if any posts are scheduled
//4. If it's time to post, noowrap object created with post information 
//5. Post sent through reddit api to specified subreddit
const Post = database.define(
    'posts',
    {
        post_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        post_type: {
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.DATE
        }, send_at: {

        }
    },
    { timestamps: true }
);


module.exports = Post;