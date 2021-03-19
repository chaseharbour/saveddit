const dotenv = require("dotenv").config();
const router = require("express").Router();
const snoowrap = require("snoowrap");
<<<<<<< HEAD
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/";

//const userServices = require('../db/services/user');

const { CLIENT_ID, CLIENT_SECRET, REDDIT_USER, REDDIT_PASSWORD } = process.env;

=======

const {
  REDIRECT_URI,
  CLIENT_HOST_ADDRESS = "localhost",
  CLIENT_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  REDDIT_USER,
  REDDIT_PASSWORD,
} = process.env;

const CLIENT_HOME_PAGE = `http://${CLIENT_HOST_ADDRESS}:${CLIENT_PORT}/`;

>>>>>>> development
router.get("/login/success", (req, res) => {
  if (req.session.userName) {
    res.json({
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

    res.redirect(CLIENT_HOME_PAGE);
  });
});

//Authorize with access token
router.get("/reddit/callback", (req, res, next) => {
  const requestToken = req.query.code;

  snoowrap
    .fromAuthCode({
      code: requestToken,
      userAgent: "scheddit",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
<<<<<<< HEAD
      redirectUri: "http://localhost:8081/auth/reddit/callback",
=======
      redirectUri: REDIRECT_URI,
>>>>>>> development
    })
    .then((response) => {
      const refreshToken = response.refreshToken;
      const accessToken = response.access_token;
      console.log(refreshToken);
      req.session.token = accessToken;
      req.session.refresh = refreshToken;
      //CURRENT TODO:
      //Save sessionID to DB.
      //Session pesistence.
      //Send user info to client.
      //Display logged in on client side.
      response.getMe().then((a) => {
        //getMe method gets user object from snoowrap
        //Set currentUser to reddit username
        const currentUser = a.name;

        //Offloads to ../db/services/user; seaches db for currentUser; returns user object from db if found, creates new user if not found.
        //userServices.findOrCreate(currentUser, accessToken);
        //Redirects to client home.
        req.session.userName = currentUser;
        res.redirect(CLIENT_HOME_PAGE);
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
<<<<<<< HEAD
    redirectUri: "http://localhost:8081/auth/reddit/callback",
=======
    redirectUri: REDIRECT_URI,
>>>>>>> development
    state: "teststring",
  });

  res.redirect(authenticationUrl);
});

module.exports = router;
