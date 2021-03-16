const dotenv = require('dotenv').config();
const router = require('express').Router();
const snoowrap = require('snoowrap');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDDIT_USER,
  REDDIT_PASSWORD
} = process.env;

const authCheck = (req, res, next) => {
  if (!req.session.userName) {
    res.status(401).json({
      authenticated: false,
      message: "User has not been authenticated."
    });
  } else {
    next();
  }
}


router.get('/:getFrom', authCheck, (req, res) => {  
  if (req.session.userName) {
    const { token } = req.session; 
    const { getFrom } = req.params;

    const r = new snoowrap({
      userAgent: 'scheddit',
      accessToken: token,
    })

    //Gets urls from saved posts on reddit account
    async function getSavedPosts() {
      try{
        let urls;
        let urlsCleaned;
        let queryOptions = { t: "all", limit: 10, type: "links" };

        if (getFrom !== 1) {
          queryOptions = { t: "all", limit: 10, type: "links", after: `${getFrom}` };
        }
        let savedContent = await r.getMe().getSavedContent(queryOptions);

        urls = savedContent.map(item => {
            //If post doesn't fit criteria then it's sent as 'undefined'
            if (!item.is_self && item.url && !item.is_video && item.preview && item.post_hint === "image") {
              return {
                title: item.title,
                postHint: item.post_hint,
                domain: item.domain,
                mediaEmbed: item.media_embed,
                postFullname: item.name,
                isLink: !item.is_self, 
                isVideo: item.is_video,
                nsfw: item.over_18, 
                imgFull: item.url, 
                imgSmall: item.preview ? item.preview.images[0].resolutions[0].url : null, 
                imgMed: item.preview ? item.preview.images[0].resolutions[1].url : null,
              }
            }
          })
          //Filters through saved posts that were returned as 'undefined'
          urlsCleaned = urls.filter(Boolean);
          res.json(urlsCleaned);
      }
      catch(error) {
        console.error(error);
        res.status(500).send({error});
      }
    }

    getSavedPosts();
  }

})

module.exports = router;