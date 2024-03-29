const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
const RedisStore = require("connect-redis")(session);
const app = express();
const cors = require("cors");

const ONE_HOUR = 1000 * 60 * 60 * 1;

//Environment variables
const {
  CLIENT_HOST_ADDRESS = "localhost",
  PORT = 8081,
  CLIENT_PORT = 3000,
  NODE_ENV = "development",
  SESS_LIFETIME = ONE_HOUR,
  SESS_NAME = "sid",
  SESS_SECRET = "somesupersecretstring",
} = process.env;

const IN_PROD = NODE_ENV === "production";

const CLIENT_HOME_PAGE =
  NODE_ENV === "development"
    ? `http://${CLIENT_HOST_ADDRESS}:${CLIENT_PORT}`
    : CLIENT_HOST_ADDRESS;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Redis error handling
redisClient.on("error", (err) => console.log(`Redis error: ${err}`));

app.set("trust proxy", true);

//Create session object with cookie
app.use(
  session({
    name: SESS_NAME,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: IN_PROD ? "none" : false,
      secure: IN_PROD,
    },
  })
);

//SETUP CORS
app.use(
  cors({
    // origin: `${CLIENT_HOST_ADDRESS}`,
    origin: CLIENT_HOME_PAGE,
    credentials: true,
    allowedHeaders: ["Content-Type", "Credentials"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
  })
);

app.options("*", cors());

//ROUTES
app.use("/auth", require("./routes/auth_routes"));
app.use("/dashboard", require("./routes/dashboard_routes"));

//Get welcome page with login
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

app.get("/", authCheck, (req, res) => {
  console.log(`/ endpoint: ${req.session}`);

  res.status(200).json({
    authenticated: true,
    message: "User successfully authenticated.",
    user: req.session.userName,
    cookies: req.cookies,
  });
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
