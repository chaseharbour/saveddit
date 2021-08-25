const dotenv = require("dotenv").config();
const router = require("express").Router();
const snoowrap = require("snoowrap");
const cors = require("cors");
const { USER_AGENT, CLIENT_HOST_ADDRESS, CLIENT_PORT } = process.env;

const CLIENT_HOME_PAGE =
  NODE_ENV === "development"
    ? `http://${CLIENT_HOST_ADDRESS}:${CLIENT_PORT}`
    : CLIENT_HOST_ADDRESS;

const authCheck = (req, res, next) => {
  if (!req.session.userName) {
    res.status(401).json({
      authenticated: false,
      message: "User has not been authenticated.",
    });
  } else {
    next();
  }
};

router.use(
  cors({
    // origin: `${CLIENT_HOST_ADDRESS}`,
    origin: CLIENT_HOME_PAGE,
    credentials: true,
    allowedHeaders: ["Content-Type", "Credentials"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
  })
);

router.get("/:getFrom", authCheck, (req, res) => {
  if (req.session.userName) {
    const { token } = req.session;
    const { getFrom } = req.params;

    const r = new snoowrap({
      userAgent: USER_AGENT,
      accessToken: token,
    });

    r.config({ requestDelay: 1000 });

    //Gets urls from saved posts on reddit account
    async function getSavedPosts() {
      try {
        let urls;
        let urlsCleaned;
        let queryOptions = { t: "all", limit: 80, type: "links" };

        if (getFrom !== 1) {
          queryOptions = {
            t: "all",
            limit: 80,
            type: "links",
            after: `${getFrom}`,
          };
        }
        let savedContent = await r.getMe().getSavedContent(queryOptions);

        urls = savedContent.map((item) => {
          //If post doesn't fit criteria then it's sent as 'undefined'

          if (
            !item.is_self &&
            item.url &&
            !item.is_video &&
            item.preview &&
            item.post_hint === "image"
          ) {
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
              allResolutions: item.preview.images[0].resolutions.map(
                (e) => e.url
              ),
              imgSmall: item.preview?.images[0]?.resolutions[0].url,
              imgMed:
                item.preview?.images[0]?.resolutions[1]?.url ||
                item.preview?.images[0].resolutions[0].url,
            };
          }
        });
        //Filters through saved posts that were returned as 'undefined'
        urlsCleaned = urls.filter((post) => post !== undefined);
        return res.json(urlsCleaned);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error });
      }
    }

    getSavedPosts();
  }
});

module.exports = router;
