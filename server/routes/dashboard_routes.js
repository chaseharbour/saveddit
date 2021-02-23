const dotenv = require('../../client/node_modules/dotenv').config();
const router = require('express').Router();
const snoowrap = require('snoowrap');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

const userServices = require('../db/services/user');


const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDDIT_USER,
  REDDIT_PASSWORD
} = process.env;

router.get('/', (req, res) => {
  //HOW GET TOKEN TO USE LATER?!?!?!?!
  //Watch videos all day tomorrow to learn more about this shit
  
  if (req.session.userName) {
    const { refresh, token } = req.session; 
    console.log(`Refresh: ${refresh} and Access Token: ${token}.`);
    //Request not working properly if you don't hit home URL first
    //Maybe not authenticating properly? Getting a weird object back
    const r = new snoowrap({
      userAgent: 'scheddit',
      accessToken: token,
    })

    const redditUserInfo = r.getMe();
    const redditSubs = r.getSubscriptions();

    const sendData = async (dataRequest) => {
      try {
       return await dataRequest;
      } catch (err) {
        console.error(err);
        return res.send({err});
      }
    } 
    
    //Get subscribed subreddit names
    sendData(redditSubs)
    .then(data => {
      const subscribed = [];
      data.forEach(sub => {
        const subName = sub.display_name;
        subscribed.push(subName);
      })
      res.json({
        success: true,
        message: "Successfully retrieved subscribed subreddits",
        subs: subscribed
      });

      res.redirect('http://localhost:3000/dashboard');

    })
    .catch(err => console.log(err));

  }

})

module.exports = router;