const dotenv = require("dotenv").config();
const router = require("express").Router();
const snoowrap = require("snoowrap");
const cors = require("cors");

const {
  USER_AGENT,
  REDIRECT_URI,
  CLIENT_HOST_ADDRESS = "localhost",
  CLIENT_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  NODE_ENV,
  REDDIT_USER,
  REDDIT_PASSWORD,
} = process.env;

const CLIENT_HOME_PAGE =
  NODE_ENV === "development"
    ? `http://${CLIENT_HOST_ADDRESS}:${CLIENT_PORT}`
    : CLIENT_HOST_ADDRESS;

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

router.get("/login/success", (req, res) => {
  console.log(`/login/success endpoint: ${req.session}`);
  if (req.session.userName) {
    return res.json({
      success: true,
      message: "User has successfully authenticated",
      user: req.session.userName,
      cookies: req.session.cookie,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User failed to authenticate.",
  });
});

router.get("/logout", (req, res) => {
  //Sessions not deleted from store but expire after an hour anyways, worth the trouble? TBD...
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }

    return res.redirect(CLIENT_HOME_PAGE);
  });
});

//Authorize with access token
router.get("/reddit/callback", (req, res, next) => {
  console.log(`/reddit/callback endpoint: ${req.session}`);
  const requestToken = req.query.code;

  snoowrap
    .fromAuthCode({
      code: requestToken,
      userAgent: USER_AGENT,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
    })
    .then((response) => {
      const refreshToken = response.refreshToken;
      const accessToken = response.access_token;
      req.session.token = accessToken;
      response.getMe().then((a) => {
        //getMe method gets user object from snoowrap
        //Set currentUser to reddit username
        const currentUser = a.name;

        //Offloads to ../db/services/user; seaches db for currentUser; returns user object from db if found, creates new user if not found.
        //userServices.findOrCreate(currentUser, accessToken);
        //Redirects to client home.
        // res.redirect(CLIENT_HOST_ADDRESS);
        req.session.userName = currentUser;
        console.log(req.session);
        return res.redirect(CLIENT_HOME_PAGE);
      });
    });
});

//GENERATE AUTH URL
router.get("/reddit", (req, res) => {
  //Creates URL where users can authenticate via reddit
  //If user chooses "Allow" then they are redirected to redirectUri
  let authenticationUrl = snoowrap.getAuthUrl({
    clientId: CLIENT_ID,
    scope: ["identity", "read", "mysubreddits", "history"],
    //Change to false. Will last an hour.
    permanent: false,
    redirectUri: REDIRECT_URI,
    state: "teststring",
  });

  return res.redirect(authenticationUrl);
});

module.exports = router;
