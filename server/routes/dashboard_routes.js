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
  
  if (req.session.userName) {
    const { refresh, token } = req.session; 
    //console.log(`Refresh: ${refresh} and Access Token: ${token}.`);
   
    const r = new snoowrap({
      userAgent: 'scheddit',
      accessToken: token,
    })

    const redditUserInfo = r.getMe();
    const redditSubs = r.getSubscriptions();

    //Gets urls from saved posts
    //TODO:
    //Get different image sizes
    //Only get image urls
    //Get post title
    //How to handle albums???

    //Pagination: "after" option in getSavedContent method. use item.name
    async function getSavedPosts() {
      try{
        let urls;
        const savedContent = await r.getMe().getSavedContent({ t: "all", limit: 30, type: "links" });

        urls = savedContent.map(item => {
            if (!item.is_self && item.url && !item.is_video) {
              return {
                title: item.title,
                postFullname: item.name,
                isLink: !item.is_self, 
                nsfw: item.over_18, 
                imgFull: item.url, 
                imgSmall: item.preview ? item.preview.images[0].resolutions[0].url : null, 
                imgMed: item.preview ? item.preview.images[0].resolutions[2].url : null,
              }
            }
          })
        
        res.send(urls);
      }
      catch(error) {
        res.status(500).send({error});
      }
    }

    const sendData = async (dataRequest) => {
      try {
       return await dataRequest;
      } catch (err) {
        //console.error(err);
        return res.send({err});
      }
    } 

    //Get saved content from Reddit account
    // sendData(redditSubs)
    // .then(data => {
    //   res.json({data})
    // })
    // .catch(err => console.error(err));
    getSavedPosts();


    //Get subscribed subreddit names
    // sendData(redditSubs)
    // .then(data => {
    //   const subscribed = [];
    //   data.forEach(sub => {
    //     const subName = sub.display_name;
    //     subscribed.push(subName);
    //   })
    //   res.json({
    //     success: true,
    //     message: "Successfully retrieved subscribed subreddits",
    //     subs: subscribed
    //   });
    // })
    // .catch(err => console.error(err));


  }

})

module.exports = router;